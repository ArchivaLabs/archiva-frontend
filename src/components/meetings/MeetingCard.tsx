import { CalendarDays, FileText, MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";
import TagBadge from "../shared/TagBadge";
import type { Meeting } from "@/lib/types";

export default function MeetingCard({ meeting }: { meeting: Meeting }) {
  return (
    <Link
      to={`/meetings/${meeting.id}`}
      className="group relative flex flex-col gap-4 overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      {/* More options — visible on hover */}
      <button
        onClick={(e) => e.preventDefault()}
        className="absolute top-2 right-2 rounded p-1 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:bg-surface-container-high"
      >
        <MoreVertical className="size-4" />
      </button>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {meeting.tags.map((t) => (
          <TagBadge key={t.label} label={t.label} variant={t.variant} />
        ))}
      </div>

      {/* Title & date */}
      <div>
        <h3 className="mb-1 text-base font-semibold text-foreground transition-colors group-hover:text-primary">
          {meeting.title}
        </h3>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <CalendarDays className="size-4 shrink-0" />
          {meeting.date} • {meeting.time}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-border pt-4">
        <div className="flex items-center gap-2">
          <img
            src={meeting.creator.avatar}
            alt={meeting.creator.name}
            className="size-6 rounded-full object-cover ring-2 ring-background"
          />
          <span className="text-xs font-medium text-foreground">
            {meeting.creator.name}
          </span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <FileText className="size-4" />
          <span className="text-xs">{meeting.docCount} Docs</span>
        </div>
      </div>
    </Link>
  );
}
