import { useQuery } from "@tanstack/react-query";
import { documentService } from "@/services/documents.service";
import type { DocumentAnalysisStatus } from "@/lib/types";

export const documentKeys = {
  detail: (id: number) => ["documents", "detail", id] as const,
};

const isStillProcessing = (status?: DocumentAnalysisStatus) =>
  status === "Pending" || status === "Processing" || status === "Extracted";

export function useDocument(id: number) {
  return useQuery({
    queryKey: documentKeys.detail(id),
    queryFn: () => documentService.getDocument(id),
    enabled: Number.isSafeInteger(id) && id > 0,
    refetchInterval: (query) =>
      isStillProcessing(query.state.data?.analysisStatus) ? 3000 : false,
  });
}
