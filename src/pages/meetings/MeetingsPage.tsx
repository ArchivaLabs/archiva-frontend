import { Link } from "react-router-dom";
import {
  ChevronRight,
  CalendarDays,
  LayoutGrid,
  List,
  X,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import MeetingCard from "@/components/meetings/MeetingCard";
import CreateMeetingModal from "@/components/meetings/CreateMeetingModal";
import { useMeetingStore } from "@/store/meetingStore";
import { MEETINGS } from "@/lib/constants";

export default function MeetingsPage() {
  const { view, filters, setView, setDateRange, removeTag } = useMeetingStore();
  const { activeTags, dateRange } = filters;

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

      {/* Cards grid */}
      <div className="px-6 pb-12">
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MEETINGS.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      </div>
    </section>
  );
}
