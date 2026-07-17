import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { useDocumentBlob } from "@/hooks/useDocumentBlob";
import ViewerSkeleton from "./ViewerSkeleton";
import UnsupportedViewer from "./UnsupportedViewer";
import pdfWorkerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;

const MIN_SCALE = 0.5;
const MAX_SCALE = 2.5;
const SCALE_STEP = 0.25;

export default function PdfViewer({
  blobUrl,
  fileName,
}: {
  blobUrl: string;
  fileName: string;
}) {
  const { data, isLoading, isError } = useDocumentBlob(blobUrl);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [loadError, setLoadError] = useState(false);

  if (isLoading) return <ViewerSkeleton />;
  if (isError || loadError || !data)
    return <UnsupportedViewer fileName={fileName} blobUrl={blobUrl} />;

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-border bg-surface-container-lowest px-4 py-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
            disabled={pageNumber <= 1}
            className="rounded p-1 text-muted-foreground transition-colors hover:bg-surface-container-high disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronLeft className="size-4" />
          </button>
          <span className="text-xs text-muted-foreground">
            Page {pageNumber} of {numPages ?? "…"}
          </span>
          <button
            onClick={() => setPageNumber((p) => Math.min(numPages ?? p, p + 1))}
            disabled={!numPages || pageNumber >= numPages}
            className="rounded p-1 text-muted-foreground transition-colors hover:bg-surface-container-high disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setScale((s) => Math.max(MIN_SCALE, s - SCALE_STEP))}
            disabled={scale <= MIN_SCALE}
            className="rounded p-1 text-muted-foreground transition-colors hover:bg-surface-container-high disabled:pointer-events-none disabled:opacity-40"
          >
            <ZoomOut className="size-4" />
          </button>
          <span className="w-10 text-center text-xs text-muted-foreground">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={() => setScale((s) => Math.min(MAX_SCALE, s + SCALE_STEP))}
            disabled={scale >= MAX_SCALE}
            className="rounded p-1 text-muted-foreground transition-colors hover:bg-surface-container-high disabled:pointer-events-none disabled:opacity-40"
          >
            <ZoomIn className="size-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 justify-center overflow-auto bg-surface-container-lowest px-6 py-6">
        <Document
          file={data}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          onLoadError={() => setLoadError(true)}
          loading={<ViewerSkeleton />}
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            renderTextLayer
            renderAnnotationLayer
            className="shadow-lg"
          />
        </Document>
      </div>
    </div>
  );
}
