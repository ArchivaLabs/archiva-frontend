import api from "@/lib/api";
import type { DashboardStats } from "@/lib/types";

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const { data } = await api.get<DashboardStats>("/api/dashboard/stats");
    return data;
  },
};
