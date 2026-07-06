import { meetingsService } from "@/services/meetings.service";
import { useQuery } from "@tanstack/react-query";

export const meetingsKey = {
  all: ["meetings"] as const,
  list: (page: number, pageSize: number) =>
    [...meetingsKey.all, "list", { page, pageSize }] as const,
};

export function useMeetings(page = 1, pageSize = 10) {
  return useQuery({
    queryKey: meetingsKey.list(page, pageSize),
    queryFn: () => meetingsService.getMeetings({ page, pageSize }),
  });
}
