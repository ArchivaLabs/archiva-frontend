export type TagVariant =
  | "urgent"
  | "primary"
  | "neutral"
  | "secondary"
  | "tertiary";

export type SearchResultType = "document" | "meeting";
export type SearchSortBy = "relevance" | "date_desc" | "date_asc";

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  snippet: string;
  date: string;
  source: string;
  tags: string[];
  fileType?: FileType;
  meetingId?: string;
}

export interface SearchFilters {
  searchIn: {
    titles: boolean;
    content: boolean;
    meetingMinutes: boolean;
  };
  dateFrom: string;
  dateTo: string;
  activeTags: string[];
  department: string;
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
}

export type FileType = "PDF" | "DOCX" | "XLSX" | "TXT";

export interface MeetingDocument {
  id: string;
  name: string;
  type: FileType;
  uploader: { name: string; initials: string; colorClass: string };
  date: string;
}

export type SyncStatus = "new" | "invited" | "existing";
export type UserRole = "Admin" | "User";

export interface SyncUserPayload {
  userId: string;
  displayName: string;
  email: string;
  avatarUrl: string | null;
}

export interface SyncUserResponse {
  status: SyncStatus;
  organizationId: number | null;
  role: UserRole | null;
  userId: string;
  displayName: string | null;
  email: string | null;
  avatarUrl: string | null;
  organizationName: string | null;
  organizationUrl: string | null;
}

export interface CreateOrganizationPayload {
  name: string;
  logoUrl: string | null;
}

export interface CreateOrganizationResponse {
  organizationId: number;
  role: UserRole;
  userId: string;
  organizationName: string;
  organizationUrl: string | null;
}

export interface MeetingDto {
  id: number;
  title: string;
  description: string | null;
  meetingDate: string; // ISO DATE STRING.
  meetingTime: string;
  location: string | null;
  createdBy: string | null;
  createdByAvatar: string | null;
  tags: string[];
  documentCount: number;
  created: string; // ISO DATE TIME.
}

export interface GetMeetingsResponse {
  meetings: MeetingDto[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface CreateMeetingPayload {
  title: string;
  description: string | null;
  meetingDate: string; // YYYY-MM-DD
  meetingTime: string; // HH:mm:ss
  location: string | null;
  tags: string[];
}

export interface CreateMeetingResponse {
  id: number;
  title: string;
  description: string | null;
  meetingDate: string;
  meetingTime: string;
  organizationId: number;
  tags: string[];
}

export interface DocumentDto {
  id: number;
  fileName: string;
  fileType: string;
  fileSizeInBytes: number;
  blobUrl: string;
  description: string | null;
  uploadedBy: string | null;
  created: string;
}

export interface MeetingDetailDto {
  id: number;
  title: string;
  description: string | null;
  meetingDate: string;
  meetingTime: string;
  location: string | null;
  createdBy: string | null;
  createdByAvatar: string | null;
  tags: string[];
  documents: DocumentDto[];
  created: string;
}
