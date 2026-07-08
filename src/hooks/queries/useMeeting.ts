import { meetingsService } from "@/services/meetings.service";
import { useQuery } from "@tanstack/react-query";

export const meetingKeys = {
  detail: (id: number) => ["meetings", "detail", id] as const,
};

export function useMeeting(id: number) {
  return useQuery({
    queryKey: meetingKeys.detail(id),
    queryFn: () => meetingsService.getMeetingById(id),
    enabled: !!id,
  });
}
