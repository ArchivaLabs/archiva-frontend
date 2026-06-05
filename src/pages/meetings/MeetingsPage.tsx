import { useState } from "react"
import { Link } from "react-router-dom"
import {
  ChevronRight,
  CalendarDays,
  FileText,
  LayoutGrid,
  List,
  Plus,
  X,
  Filter,
  MoreVertical,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import TagBadge, { type TagVariant } from "@/components/shared/TagBadge"

interface Meeting {
  id: string
  title: string
  date: string
  time: string
  tags: { label: string; variant: TagVariant }[]
  creator: { name: string; avatar: string }
  docCount: number
}

const MEETINGS: Meeting[] = [
  {
    id: "1",
    title: "Faculty Board Review",
    date: "Oct 24, 2023",
    time: "10:00 AM",
    tags: [
      { label: "Urgent", variant: "urgent" },
      { label: "Senate", variant: "neutral" },
    ],
    creator: { name: "Dr. Yusuf", avatar: "https://i.pravatar.cc/24?img=14" },
    docCount: 12,
  },
  {
    id: "2",
    title: "Budget Allocation Q4",
    date: "Oct 26, 2023",
    time: "02:30 PM",
    tags: [{ label: "Finance", variant: "secondary" }],
    creator: { name: "Prof. Chen", avatar: "https://i.pravatar.cc/24?img=47" },
    docCount: 5,
  },
  {
    id: "3",
    title: "Academic Affairs Monthly",
    date: "Oct 28, 2023",
    time: "09:00 AM",
    tags: [
      { label: "Senate", variant: "neutral" },
      { label: "Recurring", variant: "primary" },
    ],
    creator: { name: "Dr. Aris", avatar: "https://i.pravatar.cc/24?img=53" },
    docCount: 28,
  },
  {
    id: "4",
    title: "Grant Proposal Symposium",
    date: "Nov 02, 2023",
    time: "11:30 AM",
    tags: [{ label: "Research", variant: "tertiary" }],
    creator: { name: "Prof. Sarah", avatar: "https://i.pravatar.cc/24?img=32" },
    docCount: 8,
  },
  {
    id: "5",
    title: "Staff Discipline Committee",
    date: "Nov 05, 2023",
    time: "03:00 PM",
    tags: [{ label: "Admin", variant: "neutral" }],
    creator: { name: "Mr. Thorne", avatar: "https://i.pravatar.cc/24?img=15" },
    docCount: 3,
  },
  {
    id: "6",
    title: "Emergency Grants Review",
    date: "Nov 10, 2023",
    time: "08:30 AM",
    tags: [
      { label: "Urgent", variant: "urgent" },
      { label: "Finance", variant: "secondary" },
    ],
    creator: { name: "Dr. Lee", avatar: "https://i.pravatar.cc/24?img=20" },
    docCount: 42,
  },
]

export default function MeetingsPage() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [activeFilters, setActiveFilters] = useState(["Urgent"])

  return (
    <section className="flex flex-col min-h-full">
      {/* Page header */}
      <div className="px-6 pt-8 pb-4">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <nav className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Link to="/dashboard" className="hover:text-primary transition-colors">
                Dashboard
              </Link>
              <ChevronRight className="size-3" />
              <span className="font-semibold text-primary">Meetings</span>
            </nav>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Meetings
            </h1>
          </div>
          <Button className="gap-2 px-5">
            <Plus className="size-4" />
            New Meeting
          </Button>
        </div>

        {/* Controls bar */}
        <div className="flex flex-wrap items-center gap-4 border-b border-border pb-6">
          {/* Date filter */}
          <div className="flex items-center gap-2">
            <CalendarDays className="size-5 text-muted-foreground" />
            <select className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring">
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
              {activeFilters.map((f) => (
                <span
                  key={f}
                  className="flex items-center gap-1 rounded-full bg-primary/15 px-3 py-1 text-[11px] font-semibold text-primary"
                >
                  {f}
                  <button
                    onClick={() => setActiveFilters((prev) => prev.filter((x) => x !== f))}
                    className="hover:opacity-70 transition-opacity"
                  >
                    <X className="size-3" />
                  </button>
                </span>
              ))}
              <button className="rounded-full border border-border bg-surface-container-high px-3 py-1 text-[11px] font-semibold text-muted-foreground hover:bg-surface-container-highest transition-colors">
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
                  : "text-muted-foreground hover:bg-surface-container-high",
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
                  : "text-muted-foreground hover:bg-surface-container-high",
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
  )
}

function MeetingCard({ meeting }: { meeting: Meeting }) {
  return (
    <Link
      to={`/meetings/${meeting.id}`}
      className="group relative flex flex-col gap-4 overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      {/* More options — visible on hover */}
      <button
        onClick={(e) => e.preventDefault()}
        className="absolute top-2 right-2 rounded p-1 text-muted-foreground opacity-0 transition-opacity hover:bg-surface-container-high group-hover:opacity-100"
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
  )
}
