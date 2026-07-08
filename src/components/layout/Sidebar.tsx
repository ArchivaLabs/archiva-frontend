import { Link, useLocation } from "react-router-dom";
import {
  Plus,
  LayoutDashboard,
  CalendarDays,
  Search,
  Users,
  Settings,
  HelpCircle,
  LogOutIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Logo from "../shared/Logo";
import { useAuthStore } from "@/store/authStore";
import { getAvatarUrl } from "@/lib/avatar";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: CalendarDays, label: "Meetings", href: "/meetings" },
  { icon: Search, label: "Search", href: "/search" },
  { icon: Users, label: "Users", href: "/users" },
];

export default function Sidebar() {
  const { pathname } = useLocation();
  const { organizationName, displayName, avatarUrl } = useAuthStore();
  const { logout } = useAuth();

  return (
    <aside className="flex w-sidebar-width shrink-0 flex-col border-r border-border bg-nav-sidebar px-5">
      <div className="py-5">
        <Logo />
      </div>

      <div className="pb-8">
        <Button
          className="w-full gap-2 bg-primary py-5 text-white hover:bg-primary/90"
          size="sm"
        >
          <Plus className="size-4" />
          New Entry
        </Button>
      </div>

      <nav className="flex-1 space-y-0.5">
        {navItems.map(({ icon: Icon, label, href }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              to={href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "border-l-[3px] border-primary bg-primary/8 pl-[9px] text-primary dark:bg-white/10 dark:text-white"
                  : "text-muted-foreground hover:bg-surface-container hover:text-foreground dark:text-white/60 dark:hover:bg-white/5 dark:hover:text-white/90"
              )}
            >
              <Icon className="size-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-2 pb-2">
        <Link
          to="/settings"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface-container hover:text-foreground dark:text-white/60 dark:hover:bg-white/5 dark:hover:text-white/90"
        >
          <Settings className="size-4 shrink-0" />
          Settings
        </Link>
        <Link
          to="/help"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface-container hover:text-foreground dark:text-white/60 dark:hover:bg-white/5 dark:hover:text-white/90"
        >
          <HelpCircle className="size-4 shrink-0" />
          Help
        </Link>
        <button
          type="button"
          onClick={() => void logout()}
          className="flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface-container hover:text-foreground dark:text-white/60 dark:hover:bg-white/5 dark:hover:text-white/90"
        >
          <LogOutIcon className="size-4 shrink-0" />
          Logout
        </button>
      </div>

      <div className="border-t border-border px-3 py-3">
        <div className="flex items-center gap-2.5">
          <img
            src={getAvatarUrl(avatarUrl, displayName)}
            alt={displayName ?? "User"}
            className="size-8 shrink-0 rounded-full object-cover ring-2 ring-background"
          />
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-foreground dark:text-white">
              {displayName}
            </p>
            <p className="truncate text-xs text-muted-foreground dark:text-white/50">
              {organizationName}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
