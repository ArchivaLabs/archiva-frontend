// Mock implementation — replace body of each function with real API calls once backend is ready.
// Shape is stable: callers won't need to change.
import {
  SEARCH_FILTER_DEPARTMENTS,
  SEARCH_FILTER_TAGS,
  SEARCH_MOCK_RESULTS,
  SEARCH_PAGE_SIZE,
} from "@/lib/constants"
import type { SearchFilters, SearchResponse, SearchSortBy } from "@/lib/types"

interface SearchParams {
  query: string
  filters: SearchFilters
  page: number
  pageSize?: number
  sortBy: SearchSortBy
}

export async function getFilterOptions(): Promise<{
  tags: string[]
  departments: string[]
}> {
  // Replace with: return api.get('/search/filter-options').then(r => r.data)
  return { tags: SEARCH_FILTER_TAGS, departments: SEARCH_FILTER_DEPARTMENTS }
}

export async function searchRecords(params: SearchParams): Promise<SearchResponse> {
  // Replace with: return api.post('/search', params).then(r => r.data)
  await new Promise((r) => setTimeout(r, 350))

  const { query, filters, page, pageSize = SEARCH_PAGE_SIZE, sortBy } = params

  let results = [...SEARCH_MOCK_RESULTS]

  if (query.trim()) {
    const q = query.toLowerCase()
    results = results.filter((r) => {
      const inTitle = filters.searchIn.titles && r.title.toLowerCase().includes(q)
      const inContent = filters.searchIn.content && r.snippet.toLowerCase().includes(q)
      const inMeetings =
        filters.searchIn.meetingMinutes && r.type === "meeting" && r.snippet.toLowerCase().includes(q)
      return inTitle || inContent || inMeetings
    })
  }

  if (filters.activeTags.length > 0) {
    results = results.filter((r) => r.tags.some((t) => filters.activeTags.includes(t)))
  }

  if (filters.department && filters.department !== "All Departments") {
    results = results.filter((r) => r.source === filters.department)
  }

  if (filters.dateFrom) {
    const from = new Date(filters.dateFrom).getTime()
    results = results.filter((r) => new Date(r.date).getTime() >= from)
  }

  if (filters.dateTo) {
    const to = new Date(filters.dateTo).getTime()
    results = results.filter((r) => new Date(r.date).getTime() <= to)
  }

  if (sortBy === "date_desc") {
    results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } else if (sortBy === "date_asc") {
    results.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }

  const total = results.length
  const paginated = results.slice((page - 1) * pageSize, page * pageSize)

  return { results: paginated, total }
}
