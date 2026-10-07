import { create } from "zustand";
import type { SearchFilters, SearchResult, SearchSortBy } from "@/lib/types";

const DEFAULT_FILTERS: SearchFilters = {
  searchIn: {
    titles: true,
    content: true,
    documents: true,
    meetings: true,
  },
  dateFrom: "",
  dateTo: "",
  activeTags: [],
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
  setSortBy: (sortBy: SearchSortBy) => void;
  setPage: (page: number) => void;
  setResults: (results: SearchResult[], total: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetFilters: () => void;
  clearSearch: () => void;
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
    set((s) => {
      const next = { ...s.filters.searchIn, [key]: !s.filters.searchIn[key] };
      if (
        (!next.titles && !next.content) ||
        (!next.documents && !next.meetings)
      ) {
        return s;
      }
      return { filters: { ...s.filters, searchIn: next }, page: 1 };
    }),

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
          : s.filters.activeTags.length < 20
            ? [...s.filters.activeTags, tag]
            : s.filters.activeTags,
      },
      page: 1,
    })),

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

  clearSearch: () =>
    set({
      query: "",
      filters: {
        ...DEFAULT_FILTERS,
        searchIn: { ...DEFAULT_FILTERS.searchIn },
      },
      sortBy: "relevance",
      page: 1,
      results: [],
      total: 0,
      isLoading: false,
      error: null,
    }),
}));
