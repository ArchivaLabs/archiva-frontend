import type { SyncStatus, UserRole } from "@/lib/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  userId: string | null;
  organizationId: number | null;
  role: UserRole | null;
  status: SyncStatus | null;
  displayName: string | null;
  email: string | null;
  avatarUrl: string | null;
  organizationName: string | null;
  organizationUrl: string | null;

  setAuth: (payload: {
    userId: string;
    organizationId: number | null;
    role: UserRole | null;
    status: SyncStatus;
    displayName: string | null;
    email: string | null;
    avatarUrl: string | null;
    organizationName: string | null;
    organizationUrl: string | null;
  }) => void;

  setOrganization: (payload: {
    organizationId: number;
    role: UserRole;
    organizationName: string;
    organizationUrl: string | null;
  }) => void;

  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userId: null,
      organizationId: null,
      role: null,
      status: null,
      displayName: null,
      email: null,
      avatarUrl: null,
      organizationName: null,
      organizationUrl: null,

      setAuth: (payload) => set({ ...payload }),

      setOrganization: ({
        organizationId,
        role,
        organizationName,
        organizationUrl,
      }) =>
        set({
          organizationId,
          role,
          organizationName,
          organizationUrl,
          status: "existing",
        }),

      clearAuth: () =>
        set({
          userId: null,
          organizationId: null,
          role: null,
          status: null,
          displayName: null,
          email: null,
          avatarUrl: null,
          organizationName: null,
          organizationUrl: null,
        }),
    }),
    {
      name: "archiva-auth",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
