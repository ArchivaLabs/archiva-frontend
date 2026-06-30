import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./index.css";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import router from "./router";
import { msalInstance } from "./lib/msalConfig";
import { MsalProvider } from "@azure/msal-react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import queryClient from "./lib/queryClient";

await msalInstance.initialize();

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
