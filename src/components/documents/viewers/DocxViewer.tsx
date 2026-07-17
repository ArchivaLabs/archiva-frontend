import { useEffect, useRef, useState } from "react";
import { renderAsync } from "docx-preview";
import { useDocumentBlob } from "@/hooks/useDocumentBlob";
import ViewerSkeleton from "./ViewerSkeleton";
import UnsupportedViewer from "./UnsupportedViewer";

export default function DocxViewer({
  blobUrl,
  fileName,
}: {
  blobUrl: string;
  fileName: string;
}) {
  const { data, isLoading, isError } = useDocumentBlob(blobUrl);
  const containerRef = useRef<HTMLDivElement>(null);
  const [renderError, setRenderError] = useState(false);

  useEffect(() => {
    if (!data || !containerRef.current) return;
    setRenderError(false);

    renderAsync(data, containerRef.current, undefined, {
      className: "docx-viewer",
      ignoreWidth: true,
      ignoreHeight: true,
    }).catch((err) => {
      console.error(err);
      setRenderError(true);
    });
  }, [data]);

  if (isLoading) return <ViewerSkeleton />;
  if (isError || !data)
    return <UnsupportedViewer fileName={fileName} blobUrl={blobUrl} />;

  return (
    <div className="flex-1 overflow-auto bg-surface-container-lowest px-6 py-6">
      {renderError ? (
        <UnsupportedViewer fileName={fileName} blobUrl={blobUrl} />
      ) : (
        <div
          ref={containerRef}
          className="mx-auto max-w-3xl bg-white p-8 text-black shadow-lg"
        />
      )}
    </div>
  );
}
