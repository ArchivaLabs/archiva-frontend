export type TagVariant =
  | "urgent"
  | "primary"
  | "neutral"
  | "secondary"
  | "tertiary"

export type SearchResultType = "document" | "meeting"
export type SearchSortBy = "relevance" | "date_desc" | "date_asc"

export interface SearchResult {
  id: string
  type: SearchResultType
  title: string
  snippet: string
  date: string
  source: string
  tags: string[]
  fileType?: FileType
  meetingId?: string
}

export interface SearchFilters {
  searchIn: {
    titles: boolean
    content: boolean
    meetingMinutes: boolean
  }
  dateFrom: string
  dateTo: string
  activeTags: string[]
  department: string
}

export interface SearchResponse {
  results: SearchResult[]
  total: number
}

export interface Meeting {
  id: string
  title: string
  date: string
  time: string
  tags: { label: string; variant: TagVariant }[]
  creator: { name: string; avatar: string }
  docCount: number
}

export type FileType = "PDF" | "DOCX" | "XLSX" | "TXT"

export interface MeetingDocument {
  id: string
  name: string
  type: FileType
  uploader: { name: string; initials: string; colorClass: string }
  date: string
}
