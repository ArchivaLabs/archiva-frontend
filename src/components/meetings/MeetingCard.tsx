import { CalendarDays, FileText, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import TagBadge from "../shared/TagBadge";
import DeleteMeetingModal from "./DeleteMeetingModal";
import { Button } from "@/components/ui/button";
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
    // The delete trigger opens a dialog, so it sits as a sibling of the Link
    // rather than nested inside it — a button inside an anchor would navigate.
    <div className="group relative transition-transform duration-200 ease-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <Link
        to={`/meetings/${meeting.id}`}
        className="flex h-full flex-col gap-4 overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow duration-200 ease-out group-hover:shadow-lg"
      >
        <div className="flex flex-wrap gap-2 pr-8">
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

      {meeting.canDelete && (
        <div className="absolute top-2.5 right-2.5 opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100 focus-within:opacity-100 [@media(hover:none)]:opacity-100">
          <DeleteMeetingModal
            meetingId={meeting.id}
            title={meeting.title}
            documentCount={meeting.documentCount}
            trigger={
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={`Delete ${meeting.title}`}
                className="text-muted-foreground hover:bg-destructive-container hover:text-destructive"
              >
                <Trash2 className="size-4" />
              </Button>
            }
          />
        </div>
      )}
    </div>
  );
}
