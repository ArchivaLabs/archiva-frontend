import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { documentKeys } from "@/hooks/queries/useDocument";
import { meetingKeys } from "@/hooks/queries/useMeeting";
import { documentService } from "@/services/documents.service";

export function useRetryDocumentAnalysis(
  documentId: number,
  meetingId: number
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => documentService.retryAnalysis(documentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: documentKeys.detail(documentId),
      });
      queryClient.invalidateQueries({
        queryKey: meetingKeys.detail(meetingId),
      });
      toast.success("Document analysis queued again.");
    },
    onError: (error) => {
      const status = isAxiosError(error) ? error.response?.status : undefined;
      toast.error(
        status === 403
          ? "You do not have permission to retry this analysis."
          : status === 400
            ? "This document cannot be retried in its current state."
            : "Could not retry document analysis. Please try again."
      );
    },
  });
}
