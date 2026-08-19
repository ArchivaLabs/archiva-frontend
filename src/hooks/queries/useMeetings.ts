import { meetingsService } from "@/services/meetings.service";
import { useQuery } from "@tanstack/react-query";

export const meetingsKeys = {
  all: ["meetings"] as const,
  list: (page: number, pageSize: number) =>
    [...meetingsKeys.all, "list", { page, pageSize }] as const,
};

export function useMeetings(page = 1, pageSize = 10) {
  return useQuery({
    queryKey: meetingsKeys.list(page, pageSize),
    queryFn: () => meetingsService.getMeetings({ page, pageSize }),
  });
}
