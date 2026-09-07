import { ChevronRight } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import DashboardStatCards from "@/components/dashboard/DashboardStatCards";
import RecentMeetingsList from "@/components/dashboard/RecentMeetingsList";
import DashboardQuickActions from "@/components/dashboard/DashboardQuickActions";

export default function DashboardPage() {
  const { displayName, organizationName } = useAuthStore();

  return (
    <section className="flex flex-col gap-6 p-margin-mobile sm:p-6">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {organizationName && (
          <>
            <span>{organizationName}</span>
            <ChevronRight className="size-3" />
          </>
        )}
        <span className="text-foreground">Dashboard</span>
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Welcome{displayName ? `, ${displayName}` : ""}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A summary of what your organisation has archived.
        </p>
      </div>

      <DashboardStatCards />
      <RecentMeetingsList />
      <DashboardQuickActions />
    </section>
  );
}
