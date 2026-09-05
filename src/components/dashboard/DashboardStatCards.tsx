import { CalendarDays, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDashboardStats } from "@/hooks/queries/useDashboardStats";

// Skeleton and card share this shell so swapping one for the other shifts
// nothing on the page — the only change is what fills it.
function StatCardShell({
  children,
  dark,
  delay = 0,
}: {
  children: React.ReactNode;
  dark?: boolean;
  delay?: number;
}) {
  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      className={cn(
        "animate-rise rounded-xl border p-5",
        dark
          ? "border-transparent bg-primary text-white"
          : "border-border bg-card"
      )}
    >
      {children}
    </div>
  );
}

function Bar({ className, dark }: { className?: string; dark?: boolean }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded",
        dark ? "bg-white/20" : "bg-surface-container-high",
        className
      )}
    />
  );
}

function StatCardSkeleton({ dark, delay }: { dark?: boolean; delay?: number }) {
  return (
    <StatCardShell dark={dark} delay={delay}>
      <div className="mb-4 flex items-center justify-between">
        <Bar dark={dark} className="size-10 rounded-lg" />
        <Bar dark={dark} className="h-3 w-24" />
      </div>
      <Bar dark={dark} className="mb-2 h-5 w-32" />
      <Bar dark={dark} className="h-9 w-20" />
    </StatCardShell>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  badge,
  dark,
  delay,
}: {
  icon: typeof CalendarDays;
  label: string;
  value: string;
  badge?: string;
  dark?: boolean;
  delay?: number;
}) {
  return (
    <StatCardShell dark={dark} delay={delay}>
      <div className="mb-4 flex items-center justify-between">
        <div
          className={cn(
            "flex size-10 items-center justify-center rounded-lg",
            dark ? "bg-white/20" : "bg-primary/10"
          )}
        >
          <Icon
            className={cn("size-5", dark ? "text-white" : "text-primary")}
          />
        </div>
        {badge && (
          <span
            className={cn(
              "text-xs font-medium",
              dark ? "text-white/70" : "text-primary"
            )}
          >
            {badge}
          </span>
        )}
      </div>
      <p
        className={cn(
          "mb-1 h-5 text-sm",
          dark ? "text-white/70" : "text-muted-foreground"
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          "text-3xl leading-9 font-bold tracking-tight tabular-nums",
          dark ? "text-white" : "text-foreground"
        )}
      >
        {value}
      </p>
    </StatCardShell>
  );
}

export default function DashboardStatCards() {
  const { data, isPending, isError } = useDashboardStats();

  if (isPending) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatCardSkeleton />
        <StatCardSkeleton dark delay={60} />
      </div>
    );
  }

  // An unreachable stats endpoint must not degrade into a plausible-looking
  // number — the point of this screen is that its figures can be trusted.
  if (isError) {
    return (
      <div className="animate-rise rounded-xl border border-border bg-card px-5 py-4">
        <p className="text-sm font-medium text-destructive">
          Could not load your organisation&apos;s totals.
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          The figures are hidden rather than shown stale. Refresh to try again.
        </p>
      </div>
    );
  }

  const added = data.meetingsAddedThisWeek;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <StatCard
        icon={CalendarDays}
        label="Total Meetings"
        value={data.meetingCount.toLocaleString()}
        badge={added > 0 ? `+${added} added this week` : undefined}
      />
      <StatCard
        dark
        delay={60}
        icon={FileText}
        label="Documents Archived"
        value={data.documentCount.toLocaleString()}
      />
    </div>
  );
}
