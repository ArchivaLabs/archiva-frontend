import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import MicrosoftRedirectLoader from "@/components/auth/MicrosoftRedirectLoader";
import { useMsal } from "@azure/msal-react";
import {
  EventType,
  InteractionType,
  BrowserAuthError,
} from "@azure/msal-browser";
import type { AuthenticationResult } from "@azure/msal-browser";
import { useSyncUser } from "@/hooks/mutations/useSyncUser";
import { toast } from "sonner";

export default function AuthRedirectHandler() {
  const { instance } = useMsal();
  const navigate = useNavigate();
  const syncUser = useSyncUser();
  const [isProcessingAuth, setIsProcessingAuth] = useState(
    () => sessionStorage.getItem("archiva.login_pending") === "true"
  );

  useEffect(() => {
    const callbackId = instance.addEventCallback((event) => {
      // loginRedirect fires ACQUIRE_TOKEN_SUCCESS (not LOGIN_SUCCESS) in MSAL v5.
      if (
        event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS &&
        event.interactionType === InteractionType.Redirect &&
        event.payload &&
        sessionStorage.getItem("archiva.login_pending") === "true"
      ) {
        sessionStorage.removeItem("archiva.login_pending");
        setIsProcessingAuth(false);
        const { account, idTokenClaims } =
          event.payload as AuthenticationResult;
        syncUser.mutate({
          userId: account.localAccountId,
          displayName: account.name ?? "",
          email:
            (idTokenClaims as Record<string, string> | undefined)
              ?.preferred_username ??
            account.username ??
            "",
          avatarUrl: null,
        });
      }

      if (
        event.eventType === EventType.ACQUIRE_TOKEN_FAILURE &&
        event.interactionType === InteractionType.Redirect &&
        !(event.error instanceof BrowserAuthError)
      ) {
        sessionStorage.removeItem("archiva.login_pending");
        setIsProcessingAuth(false);
        console.error("[Auth] redirect login failure:", event.error);
        toast.error("Sign in failed. Please try again.");
        navigate("/login");
      }
    });

    return () => {
      if (callbackId) instance.removeEventCallback(callbackId);
    };
  }, [instance]);

  if (isProcessingAuth || syncUser.isPending)
    return <MicrosoftRedirectLoader />;

  return <Outlet />;
}
