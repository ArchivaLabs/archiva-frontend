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
 * Exponential backoff: 1s, 2s, 4s, 8s. Four retries span about 15 seconds,
 * which comfortably covers a container cold start.
 */
export function retryDelay(attemptIndex: number): number {
  return Math.min(1000 * 2 ** attemptIndex, 8000);
}

/**
 * Retry predicate for idempotent requests. Not safe for mutations that create
 * resources — a retry after a lost response would duplicate them.
 */
export function retryTransient(failureCount: number, error: unknown): boolean {
  return failureCount < 4 && isTransientError(error);
}
