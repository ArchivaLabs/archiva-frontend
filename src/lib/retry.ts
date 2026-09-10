import axios from "axios";

/**
 * Whether a failed request is worth retrying.
 *
 * The backend Container App runs with `minReplicas: 0` to stay inside the Azure
 * budget, so a request that arrives while it is cold-starting can fail at the
 * ingress before ever reaching the app. The browser surfaces that as a network
 * error — and confusingly, often as a CORS error too, because an ingress error
 * response carries no `Access-Control-Allow-Origin` header. Retrying a moment
 * later succeeds, because by then the container is up.
 *
 * Only transient failures qualify. A 4xx is a real answer from the server, and
 * retrying it just delays the error the user needs to see.
 */
export function isTransientError(error: unknown): boolean {
  if (!axios.isAxiosError(error)) return false;

  // No response at all — network failure, connection reset, or an ingress error
  // the browser refused to expose to JavaScript. This is the cold-start case.
  if (!error.response) return true;

  const { status } = error.response;
  return status >= 500 || status === 408 || status === 429;
}

/**
 * Exponential backoff, capped at 8s: 1s, 2s, 4s, 8s, 8s.
 *
 * Sized against a measured cold start rather than a guess — a real one on
 * 2026-09-10 took three failed attempts (7s of backoff) before succeeding.
 */
export function retryDelay(attemptIndex: number): number {
  return Math.min(1000 * 2 ** attemptIndex, 8000);
}

/**
 * Total attempts allowed: one initial request plus five retries.
 *
 * Counted as attempts rather than retries because that is what React Query's
 * `failureCount` measures — it is the number of failures so far, so comparing it
 * against a retry count silently gives one fewer retry than intended.
 *
 * Six attempts means backoffs of 1+2+4+8+8 = 23s, inside the 30s deadline below.
 */
export const MAX_ATTEMPTS = 6;

/**
 * Stop retrying once this much time has passed since the first failure, however
 * few retries have been used. Past roughly half a minute a user assumes the page
 * is broken and reloads anyway, so continuing to retry only delays the error
 * they need to see.
 */
export const RETRY_DEADLINE_MS = 30_000;

/**
 * Retry predicate for idempotent requests. Not safe for mutations that create
 * resources — a retry after a lost response would duplicate them.
 *
 * Bounded by retry count only. For a deadline as well, use `createDeadlineRetry`.
 */
export function retryTransient(failureCount: number, error: unknown): boolean {
  return failureCount < MAX_ATTEMPTS && isTransientError(error);
}

/**
 * Builds a retry predicate bounded by both `MAX_ATTEMPTS` and a wall-clock
 * deadline measured from the first failure.
 *
 * Returns a fresh closure holding its own timer, so each caller must create its
 * own — a single shared instance would interleave timers across concurrent
 * requests and cut retries short for whichever started later.
 */
export function createDeadlineRetry(deadlineMs: number = RETRY_DEADLINE_MS) {
  let deadline: number | null = null;

  return (failureCount: number, error: unknown): boolean => {
    if (!isTransientError(error)) {
      deadline = null;
      return false;
    }

    // React Query counts the first failure as 1, which is the signal to start
    // (or restart) the clock for this run.
    if (failureCount === 1) deadline = Date.now() + deadlineMs;

    const withinDeadline = deadline !== null && Date.now() < deadline;
    const keepGoing = failureCount < MAX_ATTEMPTS && withinDeadline;

    if (!keepGoing) deadline = null;
    return keepGoing;
  };
}
