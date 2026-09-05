import { Link } from "react-router";
import { CalendarDays, Search, Users, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";

export default function DashboardQuickActions() {
  const { role } = useAuthStore();

  const actions = [
    { icon: CalendarDays, label: "Browse meetings", href: "/meetings" },
    { icon: Search, label: "Search the archive", href: "/search" },
    // User management is Admin-only; don't offer a door that leads to a 403.
    ...(role === "Admin"
      ? [{ icon: Users, label: "Manage users", href: "/users" }]
      : []),
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {actions.map(({ icon: Icon, label, href }, i) => (
        <Link
          key={href}
          to={href}
          style={{ animationDelay: `${i * 40}ms` }}
          className={cn(
            "group flex animate-rise items-center justify-between rounded-xl border border-border bg-card px-4 py-3.5",
            "text-sm font-medium text-foreground",
            "transition-[transform,background-color] duration-150 ease-out",
            "hover:bg-surface-container-low active:scale-[0.98]"
          )}
        >
          <span className="flex items-center gap-2.5">
            <Icon className="size-4 text-primary" />
            {label}
          </span>
          <ArrowRight className="size-4 text-muted-foreground transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
        </Link>
      ))}
    </div>
  );
}
