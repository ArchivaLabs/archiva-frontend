import { CalendarDays, FileText, MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";
import TagBadge from "../shared/TagBadge";
import type { MeetingDto } from "@/lib/types";
import { getInitials } from "@/lib/utils";

export default function MeetingCard({ meeting }: { meeting: MeetingDto }) {
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
          <TagBadge key={t} label={t} variant="neutral" />
        ))}
      </div>

      {/* Title & date */}
      <div>
        <h3 className="mb-1 text-base font-semibold text-foreground transition-colors group-hover:text-primary">
          {meeting.title}
        </h3>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <CalendarDays className="size-4 shrink-0" />
          {meeting.meetingDate} • {meeting.meetingTime}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-border pt-4">
        <div className="flex items-center gap-2">
          {meeting.createdByAvatar ? (
            <img
              src={meeting.createdByAvatar}
              alt={meeting.createdBy ?? ""}
              className="size-6 rounded-full object-cover ring-2 ring-background"
            />
          ) : (
            <div className="flex size-6 items-center justify-center rounded-full bg-primary/20 text-[10px] font-semibold text-primary ring-2 ring-background">
              {meeting.createdBy ? getInitials(meeting.createdBy) : "?"}
            </div>
          )}
          <span className="text-xs font-medium text-foreground">
            {meeting.createdBy ?? "Unknown"}
          </span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <FileText className="size-4" />
          <span className="text-xs">{meeting.documentCount} Docs</span>
        </div>
      </div>
    </Link>
  );
}
