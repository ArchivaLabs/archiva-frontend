import { FileSpreadsheet, FileText } from "lucide-react"
import type { Meeting, MeetingDocument } from "./types"

export const DOCUMENTS: MeetingDocument[] = [
  {
    id: "1",
    name: "Senate_March_2025_Agenda.pdf",
    type: "PDF",
    uploader: {
      name: "Alice Murphy",
      initials: "AM",
      colorClass: "bg-secondary-container text-on-secondary-container",
    },
    date: "Mar 10, 2025",
  },
  {
    id: "2",
    name: "Doctoral_Program_Review_Draft.docx",
    type: "DOCX",
    uploader: {
      name: "Julian Vance",
      initials: "JV",
      colorClass: "bg-tertiary-container text-on-tertiary-container",
    },
    date: "Mar 11, 2025",
  },
  {
    id: "3",
    name: "Research_Grants_Framework_Final.pdf",
    type: "PDF",
    uploader: {
      name: "Robert Lee",
      initials: "RL",
      colorClass: "bg-primary-container text-on-primary-container",
    },
    date: "Mar 12, 2025",
  },
  {
    id: "4",
    name: "Budget_Allocation_Sheet_2025.xlsx",
    type: "XLSX",
    uploader: {
      name: "Alice Murphy",
      initials: "AM",
      colorClass: "bg-secondary-container text-on-secondary-container",
    },
    date: "Mar 13, 2025",
  },
  {
    id: "5",
    name: "Budget_Allocation_Sheet_2025.xlsx",
    type: "XLSX",
    uploader: {
      name: "Alice Murphy",
      initials: "AM",
      colorClass: "bg-secondary-container text-on-secondary-container",
    },
    date: "Mar 13, 2025",
  },
  {
    id: "6",
    name: "Budget_Allocation_Sheet_2025.xlsx",
    type: "XLSX",
    uploader: {
      name: "Alice Murphy",
      initials: "AM",
      colorClass: "bg-secondary-container text-on-secondary-container",
    },
    date: "Mar 13, 2025",
  },
  {
    id: "7",
    name: "Budget_Allocation_Sheet_2025.xlsx",
    type: "XLSX",
    uploader: {
      name: "Alice Murphy",
      initials: "AM",
      colorClass: "bg-secondary-container text-on-secondary-container",
    },
    date: "Mar 13, 2025",
  },
  {
    id: "8",
    name: "Budget_Allocation_Sheet_2025.xlsx",
    type: "XLSX",
    uploader: {
      name: "Alice Murphy",
      initials: "AM",
      colorClass: "bg-secondary-container text-on-secondary-container",
    },
    date: "Mar 13, 2025",
  },
]

export const PAGE_SIZE = 5

export const MEETING = {
  breadcrumb: "Senate Committee - March 2025",
  tags: [
    { label: "Governance", variant: "primary" as const },
    { label: "Annual Review", variant: "neutral" as const },
  ],
  title: "Senate Committee General Session",
  date: "March 14, 2025",
  time: "10:00 AM — 12:30 PM",
  location: "Senate Hall (Room 402)",
  description:
    "This session covers the annual review of doctoral program accreditation standards and the proposed amendments to the faculty research grant allocation framework for the 2025-2026 academic cycle.",
  documentCount: 5,
}

export const MEETINGS: Meeting[] = [
  {
    id: "1",
    title: "Faculty Board Review",
    date: "Oct 24, 2023",
    time: "10:00 AM",
    tags: [
      { label: "Urgent", variant: "urgent" },
      { label: "Senate", variant: "neutral" },
    ],
    creator: { name: "Dr. Yusuf", avatar: "https://i.pravatar.cc/24?img=14" },
    docCount: 12,
  },
  {
    id: "2",
    title: "Budget Allocation Q4",
    date: "Oct 26, 2023",
    time: "02:30 PM",
    tags: [{ label: "Finance", variant: "secondary" }],
    creator: { name: "Prof. Chen", avatar: "https://i.pravatar.cc/24?img=47" },
    docCount: 5,
  },
  {
    id: "3",
    title: "Academic Affairs Monthly",
    date: "Oct 28, 2023",
    time: "09:00 AM",
    tags: [
      { label: "Senate", variant: "neutral" },
      { label: "Recurring", variant: "primary" },
    ],
    creator: { name: "Dr. Aris", avatar: "https://i.pravatar.cc/24?img=53" },
    docCount: 28,
  },
  {
    id: "4",
    title: "Grant Proposal Symposium",
    date: "Nov 02, 2023",
    time: "11:30 AM",
    tags: [{ label: "Research", variant: "tertiary" }],
    creator: { name: "Prof. Sarah", avatar: "https://i.pravatar.cc/24?img=32" },
    docCount: 8,
  },
  {
    id: "5",
    title: "Staff Discipline Committee",
    date: "Nov 05, 2023",
    time: "03:00 PM",
    tags: [{ label: "Admin", variant: "neutral" }],
    creator: { name: "Mr. Thorne", avatar: "https://i.pravatar.cc/24?img=15" },
    docCount: 3,
  },
  {
    id: "6",
    title: "Emergency Grants Review",
    date: "Nov 10, 2023",
    time: "08:30 AM",
    tags: [
      { label: "Urgent", variant: "urgent" },
      { label: "Finance", variant: "secondary" },
    ],
    creator: { name: "Dr. Lee", avatar: "https://i.pravatar.cc/24?img=20" },
    docCount: 42,
  },
]

export const MEMBERS = [
  { name: "Sarah M.", avatar: "https://i.pravatar.cc/40?img=47" },
  { name: "James R.", avatar: "https://i.pravatar.cc/40?img=53" },
  { name: "Patricia C.", avatar: "https://i.pravatar.cc/40?img=32" },
]

export const ACTIVITY = [
  {
    id: "1",
    text: "Alice Murphy uploaded",
    highlight: "Senate_March_2025_Agenda.pdf",
    time: "2 hours ago",
    active: true,
  },
  {
    id: "2",
    text: "Julian Vance modified meeting description",
    highlight: null,
    time: "5 hours ago",
    active: false,
  },
]

export const FILE_ICON: Record<MeetingDocument["type"], typeof FileText> = {
  PDF: FileText,
  DOCX: FileText,
  XLSX: FileSpreadsheet,
  TXT: FileText,
}
