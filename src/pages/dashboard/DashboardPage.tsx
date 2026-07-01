import { Link } from "react-router-dom"
import {
  CalendarDays,
  FileText,
  Database,
  ChevronRight,
  ArrowRight,
  Sparkles,
  FolderOpen,
  Shield,
  CloudUpload,
  BarChart2,
  ScrollText,
  Banknote,
  BookOpen,
  Briefcase,
  FlaskConical,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/store/authStore"

const stats = [
  {
    icon: CalendarDays,
    iconBg: "bg-secondary/10",
    iconColor: "text-secondary",
    badge: "+4 this week",
    badgeColor: "text-primary",
    label: "Total Meetings",
    value: "124",
    dark: false,
  },
  {
    icon: FileText,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    badge: "Updated 2h ago",
    badgeColor: "text-muted-foreground",
    label: "Documents Uploaded",
    value: "842",
    dark: false,
  },
  {
    icon: Database,
    iconBg: "bg-white/20",
    iconColor: "text-white",
    badge: null,
    badgeColor: "",
    label: "System Total Records",
    value: "1.2k",
    dark: true,
  },
]

const meetings = [
  {
    icon: ScrollText,
    title: "Senate Committee - March 2025",
    date: "Mar 12, 2025",
    status: "COMPLETED",
  },
  {
    icon: Banknote,
    title: "Budget Approval Planning",
    date: "Mar 10, 2025",
    status: "DRAFTING",
  },
  {
    icon: BookOpen,
    title: "Academic Integrity Review",
    date: "Mar 08, 2025",
    status: "COMPLETED",
  },
  {
    icon: Briefcase,
    title: "Faculty Hiring Protocol",
    date: "Mar 05, 2025",
    status: "COMPLETED",
  },
  {
    icon: FlaskConical,
    title: "Research Grant Allocation",
    date: "Mar 02, 2025",
    status: "ACTION REQ",
  },
]

const statusStyles: Record<string, string> = {
  COMPLETED: "bg-primary/10 text-primary",
  DRAFTING: "bg-secondary/10 text-secondary",
  "ACTION REQ": "bg-destructive/10 text-destructive",
}

const quickActions = [
  { icon: FolderOpen, label: "Faculty Archives" },
  { icon: Shield, label: "Senate Bylaws" },
  { icon: CloudUpload, label: "Bulk Upload" },
  { icon: BarChart2, label: "Audit Logs" },
]

export default function DashboardPage() {
  const {displayName} = useAuthStore();

  return (
    <section className="flex flex-col gap-6 p-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <span>Faculty of Engineering</span>
        <ChevronRight className="size-3" />
        <span className="text-foreground">Administrative Dashboard</span>
      </div>

      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Welcome, {displayName}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Here is a summary of the university records and upcoming governance
          actions.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon  
          return (
            <div
              key={stat.label}
              className={cn(
                "rounded-xl border p-5",
                stat.dark
                  ? "border-transparent bg-primary text-white"
                  : "border-border bg-card"
              )}
            >
              <div className="mb-4 flex items-center justify-between">
                <div
                  className={cn(
                    "flex size-10 items-center justify-center rounded-lg",
                    stat.iconBg
                  )}
                >
                  <Icon className={cn("size-5", stat.iconColor)} />
                </div>
                {stat.badge && (
                  <span className={cn("text-xs font-medium", stat.badgeColor)}>
                    {stat.badge}
                  </span>
                )}
              </div>
              <p
                className={cn(
                  "mb-1 text-sm",
                  stat.dark ? "text-white/70" : "text-muted-foreground"
                )}
              >
                {stat.label}
              </p>
              <p
                className={cn(
                  "text-3xl font-bold tracking-tight",
                  stat.dark ? "text-white" : "text-foreground"
                )}
              >
                {stat.value}
              </p>
            </div>
          )
        })}
      </div>

      {/* Main content: meetings + insights */}
      <div className="grid grid-cols-5 gap-6">
        {/* Recent Meetings */}
        <div className="col-span-3 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 className="text-sm font-semibold text-foreground">
              Recent Meetings
            </h2>
            <Link
              to="/meetings"
              className="text-xs font-medium text-primary hover:underline"
            >
              View all
            </Link>
          </div>

          <table className="w-full">
            <thead className="bg-dashboard-recent">
              <tr className="border-b border-border">
                <th className="px-5 py-2.5 text-left text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Title
                </th>
                <th className="w-46 py-2.5 text-left text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Date
                </th>
                <th className="w-30 py-2.5 text-left text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {meetings.map((meeting) => {
                const Icon = meeting.icon
                return (
                  <tr
                    key={meeting.title}
                    className="cursor-pointer border-b border-border transition-colors last:border-b-0 hover:bg-surface-container-low"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-surface-container">
                          <Icon className="size-3.5 text-muted-foreground" />
                        </div>
                        <span className="text-sm text-foreground">
                          {meeting.title}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 text-sm whitespace-nowrap text-muted-foreground">
                      {meeting.date}
                    </td>
                    <td className="py-3.5">
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase",
                          statusStyles[meeting.status]
                        )}
                      >
                        {meeting.status}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Right column */}
        <div className="col-span-2 flex flex-col gap-4">
          {/* Quick Insights */}
          <div className="rounded-xl border border-border bg-card">
            <div className="border-b border-border px-5 py-4">
              <h2 className="text-sm font-semibold text-foreground">
                Quick Insights
              </h2>
            </div>
            <div className="divide-y divide-border">
              <div className="flex items-start gap-3 px-5 py-4">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-tertiary/10">
                  <Sparkles className="size-4 text-tertiary" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    Archiva Suggestion
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    3 documents from &quot;Budget Approval&quot; are missing
                    metadata tags.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 px-5 py-4">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <FileText className="size-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    Pending Review
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Dean&apos;s Office has shared a new governance draft for
                    your review.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Archive Health */}
          <div className="rounded-xl border border-border bg-card px-5 py-4">
            <h2 className="mb-4 text-sm font-semibold text-foreground">
              Archive Health
            </h2>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Storage Utilization
              </span>
              <span className="text-xs font-semibold text-foreground">78%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: "78%" }}
              />
            </div>
            <p className="mt-2.5 text-xs text-muted-foreground">
              Optimization recommended in &quot;Legacy OCR&quot; records folder.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-3">
        {quickActions.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-container-low"
          >
            <div className="flex items-center gap-2.5">
              <Icon className="size-4 text-primary" />
              {label}
            </div>
            <ArrowRight className="size-4 text-muted-foreground" />
          </button>
        ))}
      </div>
    </section>
  )
}
