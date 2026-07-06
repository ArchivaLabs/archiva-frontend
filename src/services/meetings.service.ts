import api from "@/lib/api";
import type {
  CreateMeetingPayload,
  CreateMeetingResponse,
  GetMeetingsResponse,
} from "@/lib/types";

export interface GetMeetingsParams {
  page?: number;
  pageSize?: number;
}

export const meetingsService = {
  async getMeetings(
    params: GetMeetingsParams = {}
  ): Promise<GetMeetingsResponse> {
    const { data } = await api.get<GetMeetingsResponse>("/api/meetings", {
      params: {
        page: params.page ?? 1,
        pageSize: params.pageSize ?? 10,
      },
    });

    console.log(data);

    return data;
  },

  async createMeeting(
    payload: CreateMeetingPayload
  ): Promise<CreateMeetingResponse> {
    const { data } = await api.post<CreateMeetingResponse>(
      "/api/meetings",
      payload
    );
    console.log(data);
    return data;
  },
};
