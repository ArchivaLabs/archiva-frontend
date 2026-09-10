import { authService } from "@/services/auth.service";
import { createDeadlineRetry, retryDelay } from "@/lib/retry";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useMemo } from "react";
import { toast } from "sonner";

export function useSyncUser() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  // One predicate instance per hook instance. It holds the deadline timer, so it
  // must not be shared with any other request. If React ever discards the memo
  // the only effect is a fresh timer, which is harmless.
  const shouldRetry = useMemo(() => createDeadlineRetry(), []);

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
    //
    // Bounded by five retries AND a 30s deadline, so a backend that is genuinely
    // down surfaces its error rather than spinning indefinitely.
    retry: shouldRetry,
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
