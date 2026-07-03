import { FILE_ICON, PAGE_SIZE } from "@/lib/constants";
import type { MeetingDocument } from "@/lib/types";
import { ChevronLeft, ChevronRight, Download, Eye } from "lucide-react";
import { useState } from "react";
import FileTypeBadge from "../shared/FileTypeBadge";
import { cn } from "@/lib/utils";

export default function MeetingDocumentsTable({
  documents,
}: {
  documents: MeetingDocument[];
}) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(documents.length / PAGE_SIZE);
  const pagedDocs = documents.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border px-8 py-5">
        <h3 className="text-base font-semibold text-foreground">
          Meeting Documents
        </h3>
        <span className="text-xs text-muted-foreground">
          {documents.length} Documents Total
        </span>
      </div>

      <div className="overflow-x-auto">
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
              const Icon = FILE_ICON[doc.type];
              return (
                <tr
                  key={doc.id}
                  className="transition-colors hover:bg-surface-container-low"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <Icon className="size-5 shrink-0 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">
                        {doc.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <FileTypeBadge type={doc.type} />
                  </td>
                  <td className="px-4 py-5">
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                          doc.uploader.colorClass
                        )}
                      >
                        {doc.uploader.initials}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {doc.uploader.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <span className="text-sm text-muted-foreground">
                      {doc.date}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        className="rounded p-1 text-primary transition-colors hover:bg-primary/10"
                        title="Preview"
                      >
                        <Eye className="size-4" />
                      </button>
                      <button
                        className="rounded p-1 text-muted-foreground transition-colors hover:bg-surface-container-high"
                        title="Download"
                      >
                        <Download className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-border bg-surface-container-lowest px-8 py-4">
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
          className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronLeft className="size-4" />
          Previous
        </button>

        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
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
          ))}
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
    </div>
  );
}
