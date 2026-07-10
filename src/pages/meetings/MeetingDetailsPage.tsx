import {
  Calendar,
  Clock,
  MapPin,
  Pencil,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import TagBadge from "@/components/shared/TagBadge";
import MeetingDocumentsTable from "@/components/meetings/MeetingDocumentsTable";
import UploadDocumentModal from "@/components/meetings/UploadDocumentModal";
import { useMeeting } from "@/hooks/queries/useMeeting";
import { getAvatarUrl } from "@/lib/avatar";
import { formatDate, formatTime } from "@/lib/utils";

export default function MeetingDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const meetingId = Number(id);
  const { data: meeting, isPending, isError } = useMeeting(meetingId);

  if (isPending) {
    return (
      <div className="flex h-full items-center justify-center py-24">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !meeting) {
    return (
      <div className="flex h-full flex-col items-center justify-center py-24 text-center">
        <p className="text-sm font-medium text-destructive">
          Failed to load meeting.
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          The meeting may not exist or you may not have access.
        </p>
        <Link
          to="/meetings"
          className="mt-4 text-sm font-medium text-primary hover:underline"
        >
          Back to Meetings
        </Link>
      </div>
    );
  }

  return (
    <section className="mx-auto flex w-full max-w-300 flex-col gap-6 p-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/meetings" className="transition-colors hover:text-primary">
          Meetings
        </Link>
        <ChevronRight className="size-3" />
        <span className="font-semibold text-foreground">{meeting.title}</span>
      </nav>

      {/* Header bento */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Info card */}
        <article className="flex flex-col gap-5 rounded-xl border border-border bg-card p-8 shadow-sm lg:col-span-2">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {meeting.tags.map((tag) => (
              <TagBadge key={tag} label={tag} variant="neutral" />
            ))}
          </div>

          {/* Title & meta */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {meeting.title}
            </h1>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="size-4 shrink-0" />
                {formatDate(meeting.meetingDate)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-4 shrink-0" />
                {formatTime(meeting.meetingTime)}
                {/* {meeting.meetingTime} */}
              </span>
              {meeting.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-4 shrink-0" />
                  {meeting.location}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          {meeting.description && (
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {meeting.description}
            </p>
          )}

          {/* Creator */}
          <div className="flex items-center gap-2 border-t border-border pt-4">
            <img
              src={getAvatarUrl(meeting.createdByAvatar, meeting.createdBy)}
              alt={meeting.createdBy ?? "User"}
              className="size-7 rounded-full object-cover ring-2 ring-background"
            />
            <span className="text-xs text-muted-foreground">
              Created by{" "}
              <span className="font-medium text-foreground">
                {meeting.createdBy ?? "Unknown"}
              </span>
            </span>
          </div>
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
            <UploadDocumentModal meetingId={meetingId} />
            <Button variant="outline" className="w-full gap-2">
              <Pencil className="size-4" />
              Edit Meeting Info
            </Button>
          </div>
        </article>
      </div>

      {/* Documents table */}
      <MeetingDocumentsTable documents={meeting.documents} />
    </section>
  );
}
