import { Bookmark, FileSpreadsheet, FileText, Users } from "lucide-react"
import { useNavigate } from "react-router-dom"
import FileTypeBadge from "@/components/shared/FileTypeBadge"
import { cn } from "@/lib/utils"
import type { SearchResult } from "@/lib/types"

function highlightText(text: string, query: string) {
  if (!query.trim()) return <>{text}</>
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const parts = text.split(new RegExp(`(${escaped})`, "gi"))
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark
            key={i}
            className="rounded-sm border-b-2 border-primary bg-primary-container/30 font-semibold not-italic"
          >
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  )
}

const iconConfig: Record<
  string,
  { bg: string; color: string; icon: typeof FileText }
> = {
  PDF: {
    bg: "bg-destructive/10",
    color: "text-destructive",
    icon: FileText,
  },
  DOCX: {
    bg: "bg-secondary-container/20",
    color: "text-secondary",
    icon: FileText,
  },
  XLSX: {
    bg: "bg-surface-container-highest",
    color: "text-on-surface-variant",
    icon: FileSpreadsheet,
  },
  TXT: {
    bg: "bg-surface-container-highest",
    color: "text-on-surface-variant",
    icon: FileText,
  },
  meeting: {
    bg: "bg-primary-container/20",
    color: "text-primary",
    icon: Users,
  },
}

interface SearchResultCardProps {
  result: SearchResult
  query: string
}

export default function SearchResultCard({ result, query }: SearchResultCardProps) {
  const navigate = useNavigate()
  const iconKey = result.type === "meeting" ? "meeting" : (result.fileType ?? "PDF")
  const { bg, color, icon: Icon } = iconConfig[iconKey] ?? iconConfig["PDF"]

  const handleClick = () => {
    if (result.type === "document") {
      navigate(`/documents/${result.id}`)
    } else {
      navigate(`/meetings/${result.meetingId ?? result.id}`)
    }
  }

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer rounded-xl border border-border bg-card p-6 transition-all hover:shadow-md hover:shadow-primary/5"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "flex size-12 shrink-0 items-center justify-center rounded-lg",
              bg,
              color,
            )}
          >
            <Icon className="size-6" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-primary group-hover:underline">
                {highlightText(result.title, query)}
              </h4>
              {result.type === "document" && result.fileType ? (
                <FileTypeBadge type={result.fileType} />
              ) : (
                <span className="inline-flex items-center rounded px-2 py-1 text-[10px] font-bold bg-primary-container/20 text-primary">
                  Meeting
                </span>
              )}
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {result.source} &bull; {result.date}
            </p>
          </div>
        </div>

        <button
          onClick={(e) => e.stopPropagation()}
          className="shrink-0 text-muted-foreground transition-colors hover:text-primary"
          aria-label="Bookmark"
        >
          <Bookmark className="size-4" />
        </button>
      </div>

      <div className="pl-16">
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {highlightText(result.snippet, query)}
        </p>

        {result.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {result.tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-surface-container-high px-2 py-1 text-[11px] text-on-surface-variant"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
