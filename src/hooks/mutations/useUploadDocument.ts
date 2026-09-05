import { documentService } from "@/services/documents.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { meetingKeys } from "../queries/useMeeting";
import { meetingsKeys } from "../queries/useMeetings";
import { dashboardKeys } from "../queries/useDashboardStats";
import { toast } from "sonner";

export function useUploadDocument(meetingId: number, onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { file: File; description?: string }) =>
      documentService.uploadDocument({
        meetingId,
        file: payload.file,
        description: payload.description,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: meetingKeys.detail(meetingId),
      });
      // The meeting list carries documentCount per card, and the dashboard
      // carries the org-wide total — both are now behind by one.
      queryClient.invalidateQueries({ queryKey: meetingsKeys.all });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
      toast.success("Document uploaded successfully");
      onSuccess?.();
    },
    onError: () => {
      toast.error("Failed to upload document. Please try again");
    },
  });
}
