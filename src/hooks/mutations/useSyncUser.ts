import { authService } from "@/services/auth.service";
import { retryDelay, retryTransient } from "@/lib/retry";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function useSyncUser() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: authService.syncUser,
    // This is the first request after login, so it is the one that meets a
    // cold-starting backend (minReplicas: 0) and fails at the ingress. Without
    // a retry a single such failure drops the user back to /login, which reads
    // as "sign in is broken" rather than "wait a moment".
    //
    // Safe to retry because sync is idempotent: it resolves membership from the
    // token and returns the existing row on a second call. Mutations that create
    // resources deliberately keep the global retry: 0 default.
    retry: retryTransient,
    retryDelay,
    onSuccess: (data) => {
      setAuth({
        userId: data.userId,
        organizationId: data.organizationId,
        role: data.role,
        status: data.status,
        displayName: data.displayName,
        email: data.email,
        avatarUrl: data.avatarUrl,
        organizationName: data.organizationName,
        organizationUrl: data.organizationUrl,
      });

      navigate(data.status === "new" ? "/onboarding" : "/dashboard", {
        replace: true,
      });
    },
    onError: () => {
      toast.error("Sign in failed. Please try again.");
      navigate("/login", { replace: true });
    },
  });
}
