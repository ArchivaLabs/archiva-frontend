import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { meetingsService } from "@/services/meetings.service";
import { meetingKeys } from "@/hooks/queries/useMeeting";
import { meetingsKeys } from "@/hooks/queries/useMeetings";
import { dashboardKeys } from "@/hooks/queries/useDashboardStats";

export function useDeleteMeeting(meetingId: number, onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      try {
        await meetingsService.deleteMeeting(meetingId);
      } catch (error) {
        // A 404 means the meeting is already gone — someone else deleted it, or
        // this tab held a stale card. The caller's intent is satisfied either
        // way, so treat it as success rather than showing a phantom failure.
        if (isAxiosError(error) && error.response?.status === 404) return;
        throw error;
      }
    },
    onSuccess: () => {
      // Navigate before touching the cache: the detail page is still mounted
      // observing this key, and removing it first would trigger a refetch of a
      // meeting that no longer exists.
      onSuccess?.();

      queryClient.removeQueries({ queryKey: meetingKeys.detail(meetingId) });
      queryClient.invalidateQueries({ queryKey: meetingsKeys.all });
      // Deleting a meeting cascades to its documents, so both counts move.
      queryClient.invalidateQueries({ queryKey: dashboardKeys.all });

      toast.success("Meeting deleted.");
    },
    onError: (error) => {
      // The backend is the enforcement point. A 403 here means the canDelete
      // flag this UI rendered against was stale — say so plainly.
      const status = isAxiosError(error) ? error.response?.status : undefined;
      toast.error(
        status === 403
          ? "You do not have permission to delete this meeting."
          : "Failed to delete meeting. Please try again."
      );
    },
  });
}
