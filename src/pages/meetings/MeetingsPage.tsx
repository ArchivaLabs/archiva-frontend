import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  CalendarDays,
  LayoutGrid,
  List,
  X,
  Filter,
  Loader2,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import MeetingCard from "@/components/meetings/MeetingCard";
import CreateMeetingModal from "@/components/meetings/CreateMeetingModal";
import { useMeetingStore } from "@/store/meetingStore";
import { useMeetings } from "@/hooks/queries/useMeetings";
import { Button } from "@/components/ui/button";

export default function MeetingsPage() {
  const { view, filters, setView, setDateRange, removeTag } = useMeetingStore();
  const { activeTags, dateRange } = filters;

  const [page, setPage] = useState(1);
  const { data, isPending, isError } = useMeetings(page);

  return (
    <section className="flex min-h-full flex-col">
      {/* Page header */}
      <div className="px-6 pt-8 pb-4">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <nav className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Link
                to="/dashboard"
                className="transition-colors hover:text-primary"
              >
                Dashboard
              </Link>
              <ChevronRight className="size-3" />
              <span className="font-semibold text-primary">Meetings</span>
            </nav>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Meetings
            </h1>
          </div>
          <CreateMeetingModal />
        </div>

        {/* Controls bar */}
        <div className="flex flex-wrap items-center gap-4 border-b border-border pb-6">
          {/* Date filter */}
          <div className="flex items-center gap-2">
            <CalendarDays className="size-5 text-muted-foreground" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:ring-1 focus:ring-ring focus:outline-none"
            >
              <option>This Week</option>
              <option>Last 30 Days</option>
              <option>Academic Quarter</option>
              <option>Custom Range</option>
            </select>
          </div>

          {/* Active filters */}
          <div className="flex items-center gap-2">
            <Filter className="size-4 text-muted-foreground" />
            <div className="flex gap-2">
              {activeTags.map((f) => (
                <span
                  key={f}
                  className="flex items-center gap-1 rounded-full bg-primary/15 px-3 py-1 text-[11px] font-semibold text-primary"
                >
                  {f}
                  <button
                    onClick={() => removeTag(f)}
                    className="transition-opacity hover:opacity-70"
                  >
                    <X className="size-3" />
                  </button>
                </span>
              ))}
              <button className="rounded-full border border-border bg-surface-container-high px-3 py-1 text-[11px] font-semibold text-muted-foreground transition-colors hover:bg-surface-container-highest">
                + Add Tag
              </button>
            </div>
          </div>

          {/* View toggle */}
          <div className="ml-auto flex gap-1">
            <button
              onClick={() => setView("grid")}
              className={cn(
                "rounded-lg p-2 transition-colors",
                view === "grid"
                  ? "bg-surface-container-highest text-primary"
                  : "text-muted-foreground hover:bg-surface-container-high"
              )}
            >
              <LayoutGrid className="size-5" />
            </button>
            <button
              onClick={() => setView("list")}
              className={cn(
                "rounded-lg p-2 transition-colors",
                view === "list"
                  ? "bg-surface-container-highest text-primary"
                  : "text-muted-foreground hover:bg-surface-container-high"
              )}
            >
              <List className="size-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-12">
        {isPending ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-sm font-medium text-destructive">
              Failed to load meetings.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Check your connection and try again.
            </p>
          </div>
        ) : data?.meetings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-sm font-medium text-foreground">
              No meetings yet.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Create your first meeting to get started.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {data?.meetings.map((meeting) => (
                <MeetingCard key={meeting.id} meeting={meeting} />
              ))}
            </div>

            {/* Pagination */}
            {data && data.totalPages > 1 && (
              <div className="mt-8 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  Showing{" "}
                  <span className="font-medium text-foreground">
                    {(page - 1) * data.pageSize + 1}–
                    {Math.min(page * data.pageSize, data.totalCount)}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-foreground">
                    {data.totalCount}
                  </span>{" "}
                  meetings
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => p - 1)}
                    disabled={!data.hasPreviousPage}
                    className="gap-1"
                  >
                    <ChevronLeft className="size-4" />
                    Previous
                  </Button>
                  <span className="text-xs text-muted-foreground">
                    Page {data.page} of {data.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => p + 1)}
                    disabled={!data.hasNextPage}
                    className="gap-1"
                  >
                    Next
                    <ChevronRightIcon className="size-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
