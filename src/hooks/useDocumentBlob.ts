import { useEffect, useState } from "react";
import { documentService } from "@/services/documents.service";

interface UseDocumentBlobResult {
  data: ArrayBuffer | null;
  isLoading: boolean;
  isError: boolean;
}

export function useDocumentBlob(documentId: number): UseDocumentBlobResult {
  const [data, setData] = useState<ArrayBuffer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setData(null);
      setIsLoading(true);
      setIsError(false);

      try {
        const buffer = await documentService.downloadContent(
          documentId,
          controller.signal
        );
        setData(buffer);
        setIsLoading(false);
      } catch (err) {
        if (controller.signal.aborted) return;
        console.error(err);
        setIsError(true);
        setIsLoading(false);
      }
    }

    load();

    return () => controller.abort();
  }, [documentId]);

  return { data, isLoading, isError };
}
