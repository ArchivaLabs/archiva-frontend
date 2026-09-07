import { FILE_ICON, PAGE_SIZE } from "@/lib/constants";
import type { DocumentDto } from "@/lib/types";
import { ChevronLeft, ChevronRight, Download, Eye } from "lucide-react";
import { useState } from "react";
import FileTypeBadge from "../shared/FileTypeBadge";
import { cn, formatDate, formatFileSize } from "@/lib/utils";
import { getAvatarUrl } from "@/lib/avatar";
import DocumentViewerModal from "@/components/documents/DocumentViewerModal";

export default function MeetingDocumentsTable({
  documents,
}: {
  documents: DocumentDto[];
}) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(documents.length / PAGE_SIZE);
  const pagedDocs = documents.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-8 sm:py-5">
        <h3 className="text-base font-semibold text-foreground">
          Meeting Documents
        </h3>
        <span className="text-xs text-muted-foreground">
          {documents.length} Documents Total
        </span>
      </div>

      {documents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-sm font-medium text-foreground">
            No documents yet.
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Upload documents to this meeting to get started.
          </p>
        </div>
      ) : (
        <>
          {/* Mobile: the six-column table is unreadable below sm, so each
              document collapses to a card. */}
          <div className="divide-y divide-border sm:hidden">
            {pagedDocs.map((doc) => {
              const fileType =
                doc.fileType.toUpperCase() as keyof typeof FILE_ICON;
              const Icon = FILE_ICON[fileType] ?? FILE_ICON["PDF"];
              return (
                <div key={doc.id} className="flex items-start gap-3 px-5 py-4">
                  <Icon className="mt-0.5 size-5 shrink-0 text-muted-foreground" />

                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <span className="text-[13px] font-medium break-words text-foreground">
                      {doc.fileName}
                    </span>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <FileTypeBadge type={fileType} />
                      <span>{formatFileSize(doc.fileSizeInBytes)}</span>
                      <span>{formatDate(doc.created)}</span>
                    </div>
                    <span className="truncate text-xs text-muted-foreground">
                      Uploaded by {doc.uploadedBy ?? "Unknown"}
                    </span>
                  </div>

                  <div className="flex shrink-0 items-center gap-1">
                    <DocumentViewerModal
                      document={doc}
                      trigger={
                        <button
                          type="button"
                          className="rounded p-1 text-primary transition-colors hover:bg-primary/10"
                          title="Preview"
                        >
                          <Eye className="size-4" />
                        </button>
                      }
                    />
                    <a
                      href={doc.blobUrl}
                      download={doc.fileName}
                      className="rounded p-1 text-muted-foreground transition-colors hover:bg-surface-container-high"
                      title="Download"
                    >
                      <Download className="size-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="hidden overflow-x-auto sm:block">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-border bg-surface-container-lowest">
                  <th className="px-8 py-4 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    File Name
                  </th>
                  <th className="px-4 py-4 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    Type
                  </th>
                  <th className="px-4 py-4 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    Size
                  </th>
                  <th className="px-4 py-4 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    Uploaded By
                  </th>
                  <th className="px-4 py-4 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    Date
                  </th>
                  <th className="px-8 py-4 text-right text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {pagedDocs.map((doc) => {
                  const fileType =
                    doc.fileType.toUpperCase() as keyof typeof FILE_ICON;
                  const Icon = FILE_ICON[fileType] ?? FILE_ICON["PDF"];
                  return (
                    <tr
                      key={doc.id}
                      className="transition-colors hover:bg-surface-container-low"
                    >
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <Icon className="size-5 shrink-0 text-muted-foreground" />
                          <span className="text-sm font-medium text-foreground">
                            {doc.fileName}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-5">
                        <FileTypeBadge type={fileType} />
                      </td>
                      <td className="px-4 py-5">
                        <span className="text-sm text-muted-foreground">
                          {formatFileSize(doc.fileSizeInBytes)}
                        </span>
                      </td>
                      <td className="px-4 py-5">
                        <div className="flex items-center gap-2">
                          <img
                            src={getAvatarUrl(null, doc.uploadedBy)}
                            alt={doc.uploadedBy ?? "User"}
                            className="size-6 rounded-full object-cover"
                          />
                          <span className="text-sm text-muted-foreground">
                            {doc.uploadedBy ?? "Unknown"}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-5">
                        <span className="text-sm text-muted-foreground">
                          {formatDate(doc.created)}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="inline-flex items-center gap-1">
                          <DocumentViewerModal
                            document={doc}
                            trigger={
                              <button
                                type="button"
                                className="rounded p-1 text-primary transition-colors hover:bg-primary/10"
                                title="Preview"
                              >
                                <Eye className="size-4" />
                              </button>
                            }
                          />
                          <a
                            href={doc.blobUrl}
                            download={doc.fileName}
                            className="rounded p-1 text-muted-foreground transition-colors hover:bg-surface-container-high"
                            title="Download"
                          >
                            <Download className="size-4" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-border bg-surface-container-lowest px-5 py-4 sm:px-8">
              <button
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 1}
                className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary disabled:pointer-events-none disabled:opacity-40"
              >
                <ChevronLeft className="size-4" />
                Previous
              </button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (n) => (
                    <button
                      key={n}
                      onClick={() => setPage(n)}
                      className={cn(
                        "flex size-8 items-center justify-center rounded text-xs font-semibold transition-colors",
                        n === page
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-surface-container-high"
                      )}
                    >
                      {n}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page === totalPages}
                className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary disabled:pointer-events-none disabled:opacity-40"
              >
                Next
                <ChevronRight className="size-4" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
