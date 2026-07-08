import { loginRequest } from "@/lib/msalConfig";
import { useAuthStore } from "@/store/authStore";
import { useMsal } from "@azure/msal-react";

export function useAuth() {
  const { instance, accounts } = useMsal();
  const { userId, organizationId, role, status, clearAuth } = useAuthStore();

  const isAuthenticated = !!userId;

  async function login() {
    await instance.loginPopup(loginRequest);
  }

  async function logout() {
    clearAuth();
    await instance.logoutRedirect({ postLogoutRedirectUri: "/login" });
  }

  return {
    isAuthenticated,
    userId,
    organizationId,
    role,
    status,
    account: accounts[0] ?? null,
    login,
    logout,
  };
}
