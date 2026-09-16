import axios from "axios";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { msalInstance, apiTokenRequest } from "@/lib/msalConfig";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5150",
  headers: { "Content-Type": "application/json" },
});

/**
 * Raised when a request could not be given an access token.
 *
 * Distinct from a server 401 on purpose. Previously the interceptor swallowed
 * token-acquisition failures and let the request go out with no Authorization
 * header, so the server answered 401 — making a client-side token problem
 * indistinguishable from the server rejecting a valid token. That ambiguity is
 * what made a tenancy bug take hours to diagnose.
 */
export class TokenAcquisitionError extends Error {
  readonly cause?: unknown;

  constructor(message: string, cause?: unknown) {
    super(message);
    this.name = "TokenAcquisitionError";
    this.cause = cause;
  }
}

api.interceptors.request.use(async (config) => {
  // Prefer the active account. getAllAccounts()[0] is whichever account MSAL
  // happens to list first, and the same person signing in with a work account
  // versus a personal one has two different object ids — picking the wrong one
  // mints a token for the wrong identity, and therefore the wrong organisation.
  const account = msalInstance.getActiveAccount() ?? msalInstance.getAllAccounts()[0];

  if (!account) {
    throw new TokenAcquisitionError("No signed-in account; cannot authorise request.");
  }

  try {
    const { accessToken } = await msalInstance.acquireTokenSilent({
      ...apiTokenRequest,
      account,
    });
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  } catch (err) {
    // The session cannot be renewed without the user interacting. Send them to
    // login rather than calling acquireTokenRedirect here, which would hijack
    // navigation mid-request.
    if (err instanceof InteractionRequiredAuthError) {
      window.location.replace("/login");
    }

    // Reject either way. Returning `config` here would send the request with no
    // Authorization header, turning a token failure into a silent 401.
    throw new TokenAcquisitionError(
      err instanceof Error
        ? `Could not acquire an access token: ${err.message}`
        : "Could not acquire an access token.",
      err,
    );
  }
});

export default api;
