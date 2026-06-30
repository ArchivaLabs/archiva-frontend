import type { SyncStatus, UserRole } from "@/lib/types"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface AuthState {
  userId: string | null
  organizationId: number | null
  role: UserRole | null
  status: SyncStatus | null

  setAuth: (payload: {
    userId: string
    organizationId: number | null
    role: UserRole | null
    status: SyncStatus
  }) => void

  setOrganization: (organizationId: number, role: UserRole) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userId: null,
      organizationId: null,
      role: null,
      status: null,

      setAuth: ({ userId, organizationId, role, status }) =>
        set({ userId, organizationId, role, status }),

      setOrganization: (organizationId, role) =>
        set({ organizationId, role, status: "existing" }),

      clearAuth: () =>
        set({ userId: null, organizationId: null, role: null, status: null }),
    }),
    {
      name: "archiva-auth",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
