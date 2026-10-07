import api from "@/lib/api";
import type {
  SearchFilters,
  SearchResponse,
  SearchResult,
  SearchSortBy,
} from "@/lib/types";

interface SearchApiResult {
  id: number;
  type: "document" | "meeting";
  title: string;
  snippet: string;
  meetingDate: string;
  source: string;
  tags: string[];
  fileType: string | null;
  meetingId: number;
}

interface SearchApiResponse {
  results: SearchApiResult[];
  totalCount: number;
  page: number;
  pageSize: number;
}

interface SearchParams {
  query: string;
  filters: SearchFilters;
  page: number;
  pageSize?: number;
  sortBy: SearchSortBy;
}

export async function getFilterOptions(): Promise<{ tags: string[] }> {
  const { data } = await api.get<{ tags: string[] }>(
    "/api/search/filter-options"
  );
  return data;
}

export async function searchRecords(
  params: SearchParams
): Promise<SearchResponse> {
  const { data } = await api.post<SearchApiResponse>("/api/search", {
    searchTerm: params.query,
    page: params.page,
    pageSize: params.pageSize,
    sortBy: params.sortBy,
    includeMeetings: params.filters.searchIn.meetings,
    includeDocuments: params.filters.searchIn.documents,
    searchTitles: params.filters.searchIn.titles,
    searchContent: params.filters.searchIn.content,
    dateFrom: params.filters.dateFrom || null,
    dateTo: params.filters.dateTo || null,
    tags: params.filters.activeTags,
  });

  const results: SearchResult[] = data.results.map((result) => ({
    id: String(result.id),
    type: result.type,
    title: result.title,
    snippet: result.snippet,
    date: result.meetingDate,
    source: result.source,
    tags: result.tags,
    fileType:
      (result.fileType?.toUpperCase() as SearchResult["fileType"]) ?? undefined,
    meetingId: String(result.meetingId),
  }));

  return { results, total: data.totalCount };
}
