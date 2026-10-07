import { CalendarDays, ChevronLeft, Loader2 } from "lucide-react";
import { Link, useParams } from "react-router";
import DocumentAnalysisPanel from "@/components/documents/DocumentAnalysisPanel";
import DocumentViewer from "@/components/documents/DocumentViewer";
import TagBadge from "@/components/shared/TagBadge";
import { useDocument } from "@/hooks/queries/useDocument";
import { formatDate, formatFileSize } from "@/lib/utils";

export default function DocumentPreviewPage() {
  const { id } = useParams<{ id: string }>();
  const documentId = Number(id);
  const { data: document, isPending, isError } = useDocument(documentId);

  if (Number.isSafeInteger(documentId) && documentId > 0 && isPending) {
    return (
      <div
        className="flex h-full items-center justify-center py-24"
        role="status"
      >
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
        <span className="sr-only">Loading document</span>
      </div>
    );
  }

  if (
    !Number.isSafeInteger(documentId) ||
    documentId <= 0 ||
    isError ||
    !document
  ) {
    return (
      <section className="mx-auto flex max-w-3xl flex-col items-center justify-center py-24 text-center">
        <h1 className="text-xl font-semibold text-foreground">
          Document unavailable
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The document may not exist or you may not have access.
        </p>
        <Link
          to="/search"
          className="mt-5 text-sm font-medium text-primary hover:underline"
        >
          Back to search
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-margin-mobile sm:p-6">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-sm text-muted-foreground"
      >
        <Link
          to={`/meetings/${document.meetingId}`}
          className="hover:text-primary"
        >
          <ChevronLeft className="mr-1 inline size-4" />
          {document.meetingTitle}
        </Link>
      </nav>

      <header className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              {document.fileType} document
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight break-words text-foreground">
              {document.fileName}
            </h1>
          </div>
          <span className="rounded-full bg-surface-container-high px-3 py-1 text-xs font-medium text-on-surface-variant">
            {formatFileSize(document.fileSizeInBytes)}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-4" />
            Meeting date {formatDate(document.meetingDate)}
          </span>
          <span>Uploaded {formatDate(document.created)}</span>
        </div>

        {document.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {document.tags.map((tag) => (
              <TagBadge key={tag} label={tag} variant="neutral" />
            ))}
          </div>
        )}
      </header>

      <DocumentAnalysisPanel document={document} />

      <section
        aria-label="Document preview"
        className="rounded-xl border border-border bg-card p-3 shadow-sm sm:p-5"
      >
        <DocumentViewer doc={document} />
      </section>
    </section>
  );
}
