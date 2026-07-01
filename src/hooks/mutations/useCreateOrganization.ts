import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useCreateOrganization() {
  const navigate = useNavigate();
  const { setOrganization } = useAuthStore();

  return useMutation({
    mutationFn: authService.createOrganization,
    onSuccess: (data) => {
      setOrganization({
        organizationId: data.organizationId,
        role: data.role,
        organizationName: data.organizationName,
        organizationUrl: data.organizationUrl,
      });
      navigate("/dashboard", { replace: true });
    },
    onError: () => {
      toast.error("Failed to create organization. Please try again.");
    },
  });
}
