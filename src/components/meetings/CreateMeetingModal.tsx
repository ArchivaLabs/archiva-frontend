import { useState, type ReactNode } from "react";
import {
  AlignLeft,
  CalendarDays,
  Clock,
  MapPin,
  Plus,
  Tag as TagIcon,
  Type,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const EMPTY_FORM = {
  title: "",
  date: "",
  time: "",
  location: "",
  description: "",
};

const fieldClasses =
  "h-11 w-full rounded-lg border border-border bg-surface-container-low pr-3 pl-9 text-sm text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-ring focus:outline-none";

export default function CreateMeetingModal({
  trigger,
}: {
  /** Custom element that opens the modal. Defaults to a standard "New Meeting" button. */
  trigger?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [touched, setTouched] = useState(false);

  const isValid = form.title.trim() && form.date && form.time;

  function resetForm() {
    setForm(EMPTY_FORM);
    setTags([]);
    setTagInput("");
    setTouched(false);
  }

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) resetForm();
  }

  function addTag() {
    const value = tagInput.trim();
    if (!value || tags.includes(value)) {
      setTagInput("");
      return;
    }
    setTags((prev) => [...prev, value]);
    setTagInput("");
  }

  function handleTagKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && !tagInput && tags.length) {
      setTags((prev) => prev.slice(0, -1));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;
    // TODO: wire to POST /api/Meetings once the backend endpoint is available.
    // Submission is intentionally a no-op for now — see ASSUMPTIONS.md.
    handleOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button className="gap-2 px-5">
            <Plus className="size-4" />
            New Meeting
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader>
          <DialogTitle>Schedule a new meeting</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a record for this meeting.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-7 py-6">
          {/* Title */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Meeting title <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <Type className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Senate Committee General Session"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                autoFocus
                className={fieldClasses}
              />
            </div>
            {touched && !form.title.trim() && (
              <p className="mt-1.5 text-xs text-destructive">
                Title is required.
              </p>
            )}
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Date <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <CalendarDays className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, date: e.target.value }))
                  }
                  className={fieldClasses}
                />
              </div>
              {touched && !form.date && (
                <p className="mt-1.5 text-xs text-destructive">
                  Date is required.
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Time <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <Clock className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="time"
                  value={form.time}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, time: e.target.value }))
                  }
                  className={fieldClasses}
                />
              </div>
              {touched && !form.time && (
                <p className="mt-1.5 text-xs text-destructive">
                  Time is required.
                </p>
              )}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Location{" "}
              <span className="text-xs font-normal text-muted-foreground">
                (optional)
              </span>
            </label>
            <div className="relative">
              <MapPin className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Senate Hall (Room 402)"
                value={form.location}
                onChange={(e) =>
                  setForm((f) => ({ ...f, location: e.target.value }))
                }
                className={fieldClasses}
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Tags{" "}
              <span className="text-xs font-normal text-muted-foreground">
                (optional)
              </span>
            </label>
            <div className="relative">
              <TagIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Type a tag and press Enter"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                onBlur={addTag}
                className={fieldClasses}
              />
            </div>
            {tags.length > 0 && (
              <div className="mt-2.5 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 rounded-full bg-primary/15 px-3 py-1 text-[11px] font-semibold text-primary"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() =>
                        setTags((prev) => prev.filter((t) => t !== tag))
                      }
                      className="transition-opacity hover:opacity-70"
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Description{" "}
              <span className="text-xs font-normal text-muted-foreground">
                (optional)
              </span>
            </label>
            <div className="relative">
              <AlignLeft className="absolute top-3 left-3 size-4 text-muted-foreground" />
              <textarea
                rows={3}
                placeholder="What is this meeting about?"
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                className="w-full resize-none rounded-lg border border-border bg-surface-container-low py-2.5 pr-3 pl-9 text-sm text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-ring focus:outline-none"
              />
            </div>
          </div>

          <DialogFooter className="-mx-7 mt-2 -mb-6">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="gap-2 px-5">
              <Plus className="size-4" />
              Create meeting
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
