import {
  PublicClientApplication,
  LogLevel,
  type Configuration,
} from "@azure/msal-browser";

const msalConfig: Configuration = {
  auth: {
    clientId: "1274d0e7-b545-4dcc-8c4d-005dee797414",
    authority:
      "https://login.microsoftonline.com/bbb41b2b-8961-4881-b480-2268de4887ed",
    redirectUri: window.location.origin, // http://localhost:5173 in dev
    postLogoutRedirectUri: "/login",
  },
  cache: {
    cacheLocation: "sessionStorage",
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii || !import.meta.env.DEV) return;
        if (level === LogLevel.Error) console.error("[MSAL]", message);
        if (level === LogLevel.Warning) console.warn("[MSAL]", message);
      },
    },
  },
};

// Scopes sent during login — includes the API scope so consent is granted upfront.
export const loginRequest = {
  scopes: [
    "openid",
    "profile",
    "email",
    "api://1274d0e7-b545-4dcc-8c4d-005dee797414/access_as_user",
  ],
};

// Scopes used for silent token acquisition on every API call.
export const apiTokenRequest = {
  scopes: ["api://1274d0e7-b545-4dcc-8c4d-005dee797414/access_as_user"],
};

export const msalInstance = new PublicClientApplication(msalConfig);
