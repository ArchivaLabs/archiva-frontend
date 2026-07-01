import api from "@/lib/api";
import type {
  CreateOrganizationPayload,
  CreateOrganizationResponse,
  SyncUserPayload,
  SyncUserResponse,
} from "@/lib/types";

export const authService = {
  async syncUser(payload: SyncUserPayload): Promise<SyncUserResponse> {
    const { data } = await api.post<SyncUserResponse>(
      "/api/auth/sync",
      payload
    );
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
