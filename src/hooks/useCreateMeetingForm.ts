import { useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { useCreateMeeting } from "@/hooks/mutations/useCreateMeeting";
import {
  meetingFormErrors,
  parseMeetingForm,
  validateTagName,
} from "@/lib/meetingValidation";

const emptyForm = {
  title: "",
  date: "",
  time: "",
  location: "",
  description: "",
};

export function useCreateMeetingForm() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [touched, setTouched] = useState(false);
  const [tagError, setTagError] = useState<string | null>(null);
  const submitting = useRef(false);
  const createMeeting = useCreateMeeting(() => handleOpenChange(false, true));
  const validation = parseMeetingForm(form, tags);
  const errors = validation.success
    ? {}
    : meetingFormErrors(validation.error.issues);

  function handleOpenChange(next: boolean, completed = false) {
    if (!next && submitting.current && !completed) return;
    setOpen(next);
    if (!next) {
      setForm(emptyForm);
      setTags([]);
      setTagInput("");
      setTouched(false);
      setTagError(null);
    }
  }

  function addTag() {
    const value = tagInput.trim();
    if (!value) return;
    const error = validateTagName(value, tags);
    if (error) {
      setTagError(error);
      return;
    }
    setTags((previous) => [...previous, value]);
    setTagInput("");
    setTagError(null);
  }

  function handleTagKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag();
    } else if (event.key === "Backspace" && !tagInput && tags.length) {
      setTags((previous) => previous.slice(0, -1));
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (submitting.current) return;
    setTouched(true);
    const pendingTag = tagInput.trim();
    if (pendingTag) {
      const error = validateTagName(pendingTag, tags);
      if (error) {
        setTagError(error);
        return;
      }
    }
    const result = parseMeetingForm(
      form,
      pendingTag ? [...tags, pendingTag] : tags
    );
    if (!result.success) return;
    submitting.current = true;
    const values = result.data;
    createMeeting.mutate(
      {
        title: values.title,
        description: values.description || null,
        meetingDate: values.date,
        meetingTime: `${values.time}:00`,
        utcOffsetMinutes: new Date(
          `${values.date}T${values.time}:00`
        ).getTimezoneOffset(),
        location: values.location,
        tags: values.tags,
      },
      {
        onSettled: () => {
          submitting.current = false;
        },
      }
    );
  }

  return {
    open,
    form,
    setForm,
    tags,
    setTags,
    tagInput,
    setTagInput,
    touched,
    tagError,
    errors,
    createMeeting,
    handleOpenChange,
    handleTagKeyDown,
    handleSubmit,
  };
}
