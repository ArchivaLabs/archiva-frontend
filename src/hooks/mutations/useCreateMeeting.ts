import { meetingsService } from "@/services/meetings.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { meetingsKey } from "../queries/useMeetings";
import { toast } from "sonner";

export function useCreateMeeting(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: meetingsService.createMeeting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: meetingsKey.all });
      toast.success("Meeting created successfully");
      onSuccess?.();
    },
    onError: () => {
      toast.error("Failed to create meeting. Please try again.");
    },
  });
}
