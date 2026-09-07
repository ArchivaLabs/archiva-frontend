import { Bell, Plus, Search, Menu } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import ThemeSwitcher from "@/components/shared/ThemeSwitcher";
import CreateMeetingModal from "@/components/meetings/CreateMeetingModal";

interface TopbarProps {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const q = (e.currentTarget.value ?? "").trim();
      navigate(`/search${q ? `?q=${encodeURIComponent(q)}` : ""}`);
    }
  };

  return (
    <header className="flex shrink-0 items-center gap-3 border-b border-border bg-background px-margin-mobile py-3 sm:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="size-8 shrink-0 lg:hidden"
        onClick={onMenuClick}
        aria-label="Open navigation menu"
      >
        <Menu className="size-4" />
      </Button>

      <div className="relative hidden max-w-sm flex-1 sm:block">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          className="h-9 w-full rounded-lg border border-border bg-surface-container-low pr-3 pl-9 text-sm text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-ring focus:outline-none"
          placeholder="Search records, meetings, or faculty..."
          onKeyDown={handleSearchKeyDown}
          readOnly={isSearchPage}
          onClick={() => isSearchPage && navigate("/search")}
        />
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="size-8 shrink-0 sm:hidden"
        onClick={() => navigate("/search")}
        aria-label="Search"
      >
        <Search className="size-4" />
      </Button>

      <div className="ml-auto flex items-center gap-1.5">
        <ThemeSwitcher />
        <Button variant="ghost" size="icon" className="size-8">
          <Bell className="size-4" />
        </Button>

        <div className="mx-2 hidden h-5 w-px bg-border sm:block" />

        <CreateMeetingModal
          trigger={
            <Button
              size="sm"
              className="gap-2 text-white max-md:size-8 max-md:p-0 md:p-5"
              aria-label="New Meeting"
            >
              <Plus className="size-4" />
              <span className="hidden md:inline">New Meeting</span>
            </Button>
          }
        />
      </div>
    </header>
  );
}
