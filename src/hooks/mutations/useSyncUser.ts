import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useSyncUser() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: authService.syncUser,
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
