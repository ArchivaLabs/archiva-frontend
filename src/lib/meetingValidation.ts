import { z } from "zod";

const controlCharacter = /\p{Cc}/u;
const singleLineControls = (value: string) => controlCharacter.test(value);
const multiLineControls = (value: string) =>
  [...value].some(
    (character) =>
      controlCharacter.test(character) && !"\n\r\t".includes(character)
  );

const tagSchema = z
  .string()
  .trim()
  .min(1, "Enter a tag name.")
  .max(50, "Tags must be 50 characters or fewer.")
  .refine(
    (value) => !singleLineControls(value),
    "Tags cannot contain control characters."
  );

export const meetingFormSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Meeting title is required.")
      .max(200, "Title must be 200 characters or fewer.")
      .refine(
        (value) => !singleLineControls(value),
        "Title cannot contain control characters."
      ),
    date: z.iso.date("Choose a valid meeting date."),
    time: z.iso.time({
      precision: -1,
      message: "Choose a valid meeting time.",
    }),
    location: z
      .string()
      .trim()
      .max(500, "Location must be 500 characters or fewer.")
      .refine(
        (value) => !singleLineControls(value),
        "Location cannot contain control characters."
      ),
    description: z
      .string()
      .trim()
      .max(1000, "Description must be 1,000 characters or fewer.")
      .refine(
        (value) => !multiLineControls(value),
        "Description contains an unsupported character."
      ),
    tags: z.array(tagSchema).max(10, "A meeting can have at most 10 tags."),
  })
  .superRefine((form, context) => {
    if (
      new Set(form.tags.map((tag) => tag.toLocaleLowerCase())).size !==
      form.tags.length
    ) {
      context.addIssue({
        code: "custom",
        path: ["tags"],
        message: "Tags must be unique.",
      });
    }
    const start = new Date(`${form.date}T${form.time}:00`);
    const [year, month, day] = form.date.split("-").map(Number);
    const [hours, minutes] = form.time.split(":").map(Number);
    if (
      !Number.isFinite(start.getTime()) ||
      start.getFullYear() !== year ||
      start.getMonth() + 1 !== month ||
      start.getDate() !== day ||
      start.getHours() !== hours ||
      start.getMinutes() !== minutes
    ) {
      context.addIssue({
        code: "custom",
        path: ["date"],
        message: "Choose a valid meeting date and time.",
      });
    } else if (start.getTime() <= Date.now()) {
      context.addIssue({
        code: "custom",
        path: ["time"],
        message: "Meeting date and time must be in the future.",
      });
    }
  });

export type MeetingFormValues = Omit<z.input<typeof meetingFormSchema>, "tags">;
export type MeetingFormErrors = Partial<
  Record<keyof z.input<typeof meetingFormSchema>, string>
>;

export function localDate(now = new Date()): string {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

export function validateTagName(value: string, tags: string[]): string | null {
  const parsed = tagSchema.safeParse(value);
  if (!parsed.success) return parsed.error.issues[0].message;
  if (
    tags.some(
      (tag) => tag.toLocaleLowerCase() === parsed.data.toLocaleLowerCase()
    )
  )
    return "This tag is already added.";
  if (tags.length >= 10) return "A meeting can have at most 10 tags.";
  return null;
}

export function parseMeetingForm(form: MeetingFormValues, tags: string[]) {
  return meetingFormSchema.safeParse({ ...form, tags });
}

export function meetingFormErrors(
  issues: z.core.$ZodIssue[]
): MeetingFormErrors {
  const errors: MeetingFormErrors = {};
  for (const issue of issues) {
    const field = issue.path[0] as keyof MeetingFormErrors;
    if (field && !errors[field]) errors[field] = issue.message;
  }
  return errors;
}
