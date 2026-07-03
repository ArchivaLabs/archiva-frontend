import { create } from "zustand";
import type { SearchFilters, SearchResult, SearchSortBy } from "@/lib/types";

const DEFAULT_FILTERS: SearchFilters = {
  searchIn: {
    titles: true,
    content: true,
    meetingMinutes: false,
  },
  dateFrom: "",
  dateTo: "",
  activeTags: [],
  department: "All Departments",
};

interface SearchStore {
  query: string;
  filters: SearchFilters;
  sortBy: SearchSortBy;
  page: number;
  results: SearchResult[];
  total: number;
  isLoading: boolean;
  error: string | null;

  setQuery: (q: string) => void;
  toggleSearchIn: (key: keyof SearchFilters["searchIn"]) => void;
  setDateFrom: (date: string) => void;
  setDateTo: (date: string) => void;
  toggleTag: (tag: string) => void;
  setDepartment: (dept: string) => void;
  setSortBy: (sortBy: SearchSortBy) => void;
  setPage: (page: number) => void;
  setResults: (results: SearchResult[], total: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetFilters: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  query: "",
  filters: { ...DEFAULT_FILTERS, searchIn: { ...DEFAULT_FILTERS.searchIn } },
  sortBy: "relevance",
  page: 1,
  results: [],
  total: 0,
  isLoading: false,
  error: null,

  setQuery: (query) => set({ query, page: 1 }),

  toggleSearchIn: (key) =>
    set((s) => ({
      filters: {
        ...s.filters,
        searchIn: { ...s.filters.searchIn, [key]: !s.filters.searchIn[key] },
      },
      page: 1,
    })),

  setDateFrom: (dateFrom) =>
    set((s) => ({ filters: { ...s.filters, dateFrom }, page: 1 })),

  setDateTo: (dateTo) =>
    set((s) => ({ filters: { ...s.filters, dateTo }, page: 1 })),

  toggleTag: (tag) =>
    set((s) => ({
      filters: {
        ...s.filters,
        activeTags: s.filters.activeTags.includes(tag)
          ? s.filters.activeTags.filter((t) => t !== tag)
          : [...s.filters.activeTags, tag],
      },
      page: 1,
    })),

  setDepartment: (department) =>
    set((s) => ({ filters: { ...s.filters, department }, page: 1 })),

  setSortBy: (sortBy) => set({ sortBy, page: 1 }),

  setPage: (page) => set({ page }),

  setResults: (results, total) => set({ results, total }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  resetFilters: () =>
    set({
      filters: {
        ...DEFAULT_FILTERS,
        searchIn: { ...DEFAULT_FILTERS.searchIn },
      },
      page: 1,
    }),
}));
