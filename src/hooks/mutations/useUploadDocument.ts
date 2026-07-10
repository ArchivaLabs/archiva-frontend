import { documentService } from "@/services/documents.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { meetingKeys } from "../queries/useMeeting";
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
      toast.success("Document uploaded successfully");
      onSuccess?.();
    },
    onError: () => {
      toast.error("Failed to upload document. Please try again");
    },
  });
}
