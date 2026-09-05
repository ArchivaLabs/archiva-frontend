import { Link } from "react-router";
import { ScrollText, Paperclip, ArrowRight } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { useMeetings } from "@/hooks/queries/useMeetings";

const RECENT_COUNT = 5;

// One grid template shared by the header and every row keeps the columns
// aligned without a <table>, so each row can be a real anchor.
const ROW_GRID = "grid grid-cols-[1fr_7.5rem_6rem] items-center gap-3";

function RowSkeleton({ delay }: { delay: number }) {
  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      className={cn(
        ROW_GRID,
        "animate-rise border-b border-border px-5 py-3.5"
      )}
    >
      <div className="flex items-center gap-3">
        <div className="size-7 shrink-0 animate-pulse rounded-md bg-surface-container-high" />
        <div className="h-4 w-2/5 animate-pulse rounded bg-surface-container-high" />
      </div>
      <div className="h-3 w-20 animate-pulse rounded bg-surface-container-high" />
      <div className="h-3 w-10 animate-pulse rounded bg-surface-container-high" />
    </div>
  );
}

export default function RecentMeetingsList() {
  const { data, isPending, isError } = useMeetings(1, RECENT_COUNT);

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h2 className="text-sm font-semibold text-foreground">
          Recent Meetings
        </h2>
        <Link
          to="/meetings"
          className="text-xs font-medium text-primary transition-opacity duration-150 hover:opacity-70"
        >
          View all
        </Link>
      </div>

      <div
        className={cn(
          ROW_GRID,
          "border-b border-border bg-dashboard-recent px-5 py-2.5 text-xs font-semibold tracking-wider text-muted-foreground uppercase"
        )}
      >
        <span>Title</span>
        <span>Date</span>
        <span>Documents</span>
      </div>

      {isPending ? (
        <div>
          {Array.from({ length: RECENT_COUNT }).map((_, i) => (
            <RowSkeleton key={i} delay={i * 40} />
          ))}
        </div>
      ) : isError ? (
        <div className="px-5 py-12 text-center">
          <p className="text-sm font-medium text-destructive">
            Failed to load meetings.
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Check your connection and try again.
          </p>
        </div>
      ) : data.meetings.length === 0 ? (
        <div className="flex flex-col items-center px-5 py-12 text-center">
          <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10">
            <ScrollText className="size-5 text-primary" />
          </div>
          <p className="text-sm font-medium text-foreground">No meetings yet</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Once you record a meeting, it will appear here.
          </p>
          <Link
            to="/meetings"
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-xs font-semibold text-white transition-transform duration-150 ease-out active:scale-[0.97]"
          >
            Create your first meeting
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      ) : (
        <div>
          {data.meetings.map((meeting, i) => (
            <Link
              key={meeting.id}
              to={`/meetings/${meeting.id}`}
              style={{ animationDelay: `${i * 40}ms` }}
              className={cn(
                ROW_GRID,
                "animate-rise border-b border-border px-5 py-3.5 transition-colors duration-150 last:border-b-0",
                "hover:bg-surface-container-low active:bg-surface-container"
              )}
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-surface-container">
                  <ScrollText className="size-3.5 text-muted-foreground" />
                </div>
                <span className="truncate text-sm text-foreground">
                  {meeting.title}
                </span>
              </div>
              <span className="text-sm whitespace-nowrap text-muted-foreground">
                {formatDate(meeting.meetingDate)}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground tabular-nums">
                <Paperclip className="size-3.5 shrink-0" />
                {meeting.documentCount}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
