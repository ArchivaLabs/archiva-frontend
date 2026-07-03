import { FileSpreadsheet, FileText } from "lucide-react";
import type { Meeting, MeetingDocument, SearchResult } from "./types";

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
];

export const PAGE_SIZE = 5;

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
};

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
];

export const MEMBERS = [
  { name: "Sarah M.", avatar: "https://i.pravatar.cc/40?img=47" },
  { name: "James R.", avatar: "https://i.pravatar.cc/40?img=53" },
  { name: "Patricia C.", avatar: "https://i.pravatar.cc/40?img=32" },
];

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
];

export const FILE_ICON: Record<MeetingDocument["type"], typeof FileText> = {
  PDF: FileText,
  DOCX: FileText,
  XLSX: FileSpreadsheet,
  TXT: FileText,
};

export const SEARCH_PAGE_SIZE = 8;

export const SEARCH_FILTER_TAGS = [
  "Senate",
  "Budget",
  "Proposal",
  "Academic",
  "Finance",
  "Research",
  "Archive",
  "Admin",
  "Governance",
  "Minutes",
];

export const SEARCH_FILTER_DEPARTMENTS = [
  "All Departments",
  "Faculty of Science",
  "Administration",
  "External Relations",
  "Financial Archives",
  "Senate Finance Committee",
  "Academic Affairs",
];

export const SEARCH_MOCK_RESULTS: SearchResult[] = [
  {
    id: "sr-1",
    type: "document",
    title: "FY2024 Senate Budget Proposal - Final Draft",
    snippet:
      "The Senate Budget Proposal for the fiscal year 2024 outlines a 15% increase in research grants. This proposal focuses on infrastructure upgrades in the Faculty of Science and new laboratory equipment allocations.",
    date: "Dec 12, 2023",
    source: "Senate Finance Committee",
    tags: ["Senate2024", "Budget", "Finance"],
    fileType: "PDF",
  },
  {
    id: "sr-2",
    type: "meeting",
    title: "Minutes: Q4 Senate Meeting",
    snippet:
      "Item 4.2: Presentation of the preliminary Budget Proposal by Dr. Aris. The Senate members voted unanimously to proceed to the next phase of the approval process.",
    date: "Nov 05, 2023",
    source: "Administrative Board",
    tags: ["Minutes", "Senate"],
    meetingId: "1",
  },
  {
    id: "sr-3",
    type: "document",
    title: "Legacy Archive: Budget Reports 2018–2024",
    snippet:
      "This collection includes the historical proposals submitted to the Senate. Note the correlation between the 2024 budget and the preceding four years of financial data.",
    date: "Nov 28, 2023",
    source: "Financial Archives",
    tags: ["Archive", "Finance"],
    fileType: "DOCX",
  },
  {
    id: "sr-4",
    type: "document",
    title: "Doctoral Program Accreditation Review 2024",
    snippet:
      "Annual review of doctoral program accreditation standards across the Faculty of Science. Recommendations for the 2025 cycle are included in Appendix B.",
    date: "Jan 10, 2024",
    source: "Academic Affairs",
    tags: ["Academic", "Governance"],
    fileType: "PDF",
  },
  {
    id: "sr-5",
    type: "meeting",
    title: "Faculty Board Emergency Session — Grant Allocation",
    snippet:
      "Emergency session called by the Dean to address the shortfall in research grant distribution. Members present approved a temporary reallocation from the infrastructure reserve.",
    date: "Nov 10, 2023",
    source: "Faculty of Science",
    tags: ["Research", "Finance", "Senate"],
    meetingId: "6",
  },
  {
    id: "sr-6",
    type: "document",
    title: "Research Grants Framework Final",
    snippet:
      "Final framework document governing the allocation of research grants for the 2025–2026 academic cycle. Supersedes the 2022 framework in all respects.",
    date: "Mar 12, 2025",
    source: "Senate Finance Committee",
    tags: ["Research", "Governance"],
    fileType: "PDF",
  },
  {
    id: "sr-7",
    type: "document",
    title: "Staff Disciplinary Procedures Manual (Rev. 4)",
    snippet:
      "Revised procedures for staff disciplinary hearings, including new provisions for remote hearings introduced after 2022. Approved by Administration on March 1, 2024.",
    date: "Mar 01, 2024",
    source: "Administration",
    tags: ["Admin", "Governance"],
    fileType: "DOCX",
  },
  {
    id: "sr-8",
    type: "meeting",
    title: "Academic Affairs Monthly — October 2023",
    snippet:
      "Agenda included review of the semester timetable, proposed curriculum changes for the Engineering faculty, and an update on the student council elections.",
    date: "Oct 28, 2023",
    source: "Academic Affairs",
    tags: ["Academic", "Minutes"],
    meetingId: "3",
  },
  {
    id: "sr-9",
    type: "document",
    title: "Budget Allocation Sheet 2025",
    snippet:
      "Detailed allocation of the 2025 institutional budget across all faculties and departments. Includes comparative figures from 2023 and 2024 for reference.",
    date: "Mar 13, 2025",
    source: "Financial Archives",
    tags: ["Budget", "Finance"],
    fileType: "XLSX",
  },
  {
    id: "sr-10",
    type: "meeting",
    title: "External Relations Strategy Session",
    snippet:
      "Session focused on international partnership opportunities. The committee reviewed proposals from three partner universities and approved two MoUs for the 2024–2025 academic year.",
    date: "Oct 15, 2023",
    source: "External Relations",
    tags: ["Governance", "Minutes"],
    meetingId: "4",
  },
];
