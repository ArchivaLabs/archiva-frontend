import { useMemo } from "react";
import { useDocumentBlob } from "@/hooks/useDocumentBlob";
import ViewerSkeleton from "./ViewerSkeleton";
import UnsupportedViewer from "./UnsupportedViewer";

export default function TextViewer({
  blobUrl,
  fileName,
}: {
  blobUrl: string;
  fileName: string;
}) {
  const { data, isLoading, isError } = useDocumentBlob(blobUrl);

  const text = useMemo(() => {
    if (!data) return null;
    try {
      return new TextDecoder("utf-8").decode(data);
    } catch (err) {
      console.error(err);
      return null;
    }
  }, [data]);

  if (isLoading) return <ViewerSkeleton />;
  if (isError || !data || text === null)
    return <UnsupportedViewer fileName={fileName} blobUrl={blobUrl} />;

  return (
    <div className="flex-1 overflow-auto bg-surface-container-lowest px-6 py-6">
      <pre className="mx-auto max-w-3xl rounded-lg border border-border bg-card p-6 text-sm whitespace-pre-wrap text-foreground">
        {text}
      </pre>
    </div>
  );
}
