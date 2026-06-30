import {
  Calendar,
  Clock,
  MapPin,
  Upload,
  Pencil,
  ChevronRight,
} from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import TagBadge from "@/components/shared/TagBadge"
import MeetingDocumentsTable from "@/components/meetings/MeetingDocumentsTable"
import { MEETING, DOCUMENTS, MEMBERS, ACTIVITY } from "@/lib/constants"

export default function MeetingDetailsPage() {
  return (
    <section className="mx-auto flex w-full max-w-300 flex-col gap-6 p-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/meetings" className="transition-colors hover:text-primary">
          Meetings
        </Link>
        <ChevronRight className="size-3" />
        <span className="font-semibold text-foreground">
          {MEETING.breadcrumb}
        </span>
      </nav>

      {/* Header bento */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Info card */}
        <article className="flex flex-col gap-5 rounded-xl border border-border bg-card p-8 shadow-sm lg:col-span-2">
          <div className="flex flex-wrap gap-2">
            {MEETING.tags.map((t) => (
              <TagBadge key={t.label} label={t.label} variant={t.variant} />
            ))}
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {MEETING.title}
            </h1>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="size-4 shrink-0" />
                {MEETING.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-4 shrink-0" />
                {MEETING.time}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4 shrink-0" />
                {MEETING.location}
              </span>
            </div>
          </div>

          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {MEETING.description}
          </p>
        </article>

        {/* Actions card */}
        <article className="flex flex-col justify-between rounded-xl border border-border bg-card p-8 shadow-sm">
          <div>
            <h3 className="text-base font-semibold text-foreground">Actions</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Add new minutes, transcripts, or supporting documentation to this
              meeting record.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3">
            <Button className="w-full gap-2">
              <Upload className="size-4" />
              Upload Document
            </Button>
            <Button variant="outline" className="w-full gap-2">
              <Pencil className="size-4" />
              Edit Meeting Info
            </Button>
          </div>
        </article>
      </div>

      <MeetingDocumentsTable documents={DOCUMENTS} />
    </section>
  )
}
