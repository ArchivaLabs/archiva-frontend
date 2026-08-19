import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { meetingsService } from "@/services/meetings.service";
import { meetingKeys } from "@/hooks/queries/useMeeting";
import { meetingsKeys } from "@/hooks/queries/useMeetings";
import type { UpdateMeetingPayload } from "@/lib/types";

export function useUpdateMeeting(meetingId: number, onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateMeetingPayload) =>
      meetingsService.updateMeeting(meetingId, payload),
    onSuccess: (updatedMeeting) => {
      // Update the meeting detail cache directly from the response
      // so the page reflects changes instantly without a refetch.
      queryClient.setQueryData(meetingKeys.detail(meetingId), updatedMeeting);

      // Invalidate the meetings list so the card on /meetings reflects
      // any title/date/tag changes too.
      queryClient.invalidateQueries({ queryKey: meetingsKeys.all });

      toast.success("Meeting updated successfully.");
      onSuccess?.();
    },
    onError: () => {
      toast.error("Failed to update meeting. Please try again.");
    },
  });
}
