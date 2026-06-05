export type TagVariant =
  | "urgent"
  | "primary"
  | "neutral"
  | "secondary"
  | "tertiary"

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
