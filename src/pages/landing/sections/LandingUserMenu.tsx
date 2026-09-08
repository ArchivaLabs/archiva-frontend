import { Link } from "react-router";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import { getAvatarUrl } from "@/lib/avatar";

interface LandingUserMenuProps {
  layout: "bar" | "drawer";
  /** Called after a nav link is activated — used to close the mobile drawer. */
  onNavigate?: () => void;
}

export default function LandingUserMenu({
  layout,
  onNavigate,
}: LandingUserMenuProps) {
  const { logout } = useAuth();
  const { displayName, avatarUrl } = useAuthStore();

  const avatarAlt = displayName ?? "Your account";

  if (layout === "bar") {
    return (
      <div className="flex items-center gap-2">
        <img
          src={getAvatarUrl(avatarUrl, displayName)}
          alt={avatarAlt}
          className="size-7 shrink-0 rounded-full object-cover ring-1 ring-border"
        />
        <Button size="sm" asChild className="text-white">
          <Link to="/dashboard" onClick={onNavigate}>
            Dashboard
          </Link>
        </Button>
        <Button
          size="icon-sm"
          variant="ghost"
          onClick={() => void logout()}
          aria-label="Log out"
          title="Log out"
        >
          <LogOut className="size-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-col gap-3">
      <div className="flex items-center gap-2.5">
        <img
          src={getAvatarUrl(avatarUrl, displayName)}
          alt={avatarAlt}
          className="size-8 shrink-0 rounded-full object-cover ring-1 ring-border"
        />
        <p className="min-w-0 truncate text-sm font-medium text-foreground">
          {displayName}
        </p>
      </div>
      <Button asChild className="text-white" onClick={onNavigate}>
        <Link to="/dashboard">Go to Dashboard</Link>
      </Button>
      <Button variant="outline" onClick={() => void logout()}>
        <LogOut className="size-4" />
        Log out
      </Button>
    </div>
  );
}
