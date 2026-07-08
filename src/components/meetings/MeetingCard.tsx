import { CalendarDays, FileText, MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";
import TagBadge from "../shared/TagBadge";
import type { MeetingDto } from "@/lib/types";
import { getAvatarUrl } from "@/lib/avatar";

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("T")[0].split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatTime(timeStr: string): string {
  const [hours, minutes] = timeStr.split(":");
  const date = new Date();
  date.setHours(Number(hours), Number(minutes));
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export default function MeetingCard({ meeting }: { meeting: MeetingDto }) {
  return (
    <Link
      to={`/meetings/${meeting.id}`}
      className="group relative flex flex-col gap-4 overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <button
        onClick={(e) => e.preventDefault()}
        className="absolute top-2 right-2 rounded p-1 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:bg-surface-container-high"
      >
        <MoreVertical className="size-4" />
      </button>

      <div className="flex flex-wrap gap-2">
        {meeting.tags.map((tag) => (
          <TagBadge key={tag} label={tag} variant="neutral" />
        ))}
      </div>

      <div>
        <h3 className="mb-1 text-base font-semibold text-foreground transition-colors group-hover:text-primary">
          {meeting.title}
        </h3>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <CalendarDays className="size-4 shrink-0" />
          {formatDate(meeting.meetingDate)} • {formatTime(meeting.meetingTime)}
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-border pt-4">
        <div className="flex items-center gap-2">
          <img
            src={getAvatarUrl(meeting.createdByAvatar, meeting.createdBy)}
            alt={meeting.createdBy ?? "User"}
            className="size-6 rounded-full object-cover ring-2 ring-background"
          />
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
