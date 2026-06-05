import { create } from "zustand"

type ViewMode = "grid" | "list"

interface MeetingFilters {
  dateRange: string
  activeTags: string[]
}

interface MeetingStore {
  view: ViewMode
  filters: MeetingFilters

  setView: (view: ViewMode) => void
  setDateRange: (range: string) => void
  addTag: (tag: string) => void
  removeTag: (tag: string) => void
}

export const useMeetingStore = create<MeetingStore>((set) => ({
  view: "grid",
  filters: {
    dateRange: "This Week",
    activeTags: ["Urgent"],
  },

  setView: (view) => set({ view }),
  setDateRange: (dateRange) =>
    set((s) => ({ filters: { ...s.filters, dateRange } })),
  addTag: (tag) =>
    set((s) => ({
      filters: {
        ...s.filters,
        activeTags: s.filters.activeTags.includes(tag)
          ? s.filters.activeTags
          : [...s.filters.activeTags, tag],
      },
    })),
  removeTag: (tag) =>
    set((s) => ({
      filters: {
        ...s.filters,
        activeTags: s.filters.activeTags.filter((t) => t !== tag),
      },
    })),
}))
