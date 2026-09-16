import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

import "./index.css";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import router from "./router";
import { msalInstance } from "./lib/msalConfig";
import { MsalProvider } from "@azure/msal-react";
import { EventType, type AuthenticationResult } from "@azure/msal-browser";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import queryClient from "./lib/queryClient";

await msalInstance.initialize();

// MSAL never designates an active account by itself. Without one, anything that
// needs "the" account falls back to getAllAccounts()[0] — an arbitrary pick.
// That matters here because one person can hold two Microsoft identities (a
// work/school account and a personal one) whose object ids differ, and
// membership is resolved by object id, so the wrong pick resolves to the wrong
// organisation. Restore it on load, and keep it current as tokens are acquired.
if (!msalInstance.getActiveAccount()) {
  const [firstAccount] = msalInstance.getAllAccounts();
  if (firstAccount) msalInstance.setActiveAccount(firstAccount);
}

msalInstance.addEventCallback((event) => {
  // loginRedirect surfaces as ACQUIRE_TOKEN_SUCCESS rather than LOGIN_SUCCESS in
  // MSAL v5, so both are handled.
  if (
    event.eventType !== EventType.LOGIN_SUCCESS &&
    event.eventType !== EventType.ACQUIRE_TOKEN_SUCCESS
  ) {
    return;
  }

  const account = (event.payload as AuthenticationResult | null)?.account;
  if (account) msalInstance.setActiveAccount(account);
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MsalProvider instance={msalInstance}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light">
          <RouterProvider router={router} />
          <Toaster position="top-right" richColors />
        </ThemeProvider>

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </MsalProvider>
  </StrictMode>
);
