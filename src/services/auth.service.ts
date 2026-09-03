import api from "@/lib/api";
import type {
  CreateOrganizationPayload,
  CreateOrganizationResponse,
  SyncUserResponse,
} from "@/lib/types";

export const authService = {
  async syncUser(): Promise<SyncUserResponse> {
    const { data } = await api.post<SyncUserResponse>("/api/auth/sync");
    console.log(data);
    return data;
  },
  async createOrganization(
    payload: CreateOrganizationPayload
  ): Promise<CreateOrganizationResponse> {
    const { data } = await api.post<CreateOrganizationResponse>(
      "/api/organizations",
      payload
    );
    return data;
  },
};
