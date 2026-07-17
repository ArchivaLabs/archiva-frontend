import { useEffect, useState } from "react";

interface UseDocumentBlobResult {
  data: ArrayBuffer | null;
  isLoading: boolean;
  isError: boolean;
}

export function useDocumentBlob(url: string): UseDocumentBlobResult {
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
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`Failed to fetch document: ${res.status}`);
        const buffer = await res.arrayBuffer();
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
  }, [url]);

  return { data, isLoading, isError };
}
