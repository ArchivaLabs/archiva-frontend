import { History, Bell, Upload, Plus, Search } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ThemeSwitcher from "@/components/shared/ThemeSwitcher";
import CreateMeetingModal from "@/components/meetings/CreateMeetingModal";

export default function Topbar() {
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
    <header className="flex shrink-0 items-center gap-3 border-b border-border bg-background px-6 py-3">
      <div className="relative max-w-sm flex-1">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          className="h-9 w-full rounded-lg border border-border bg-surface-container-low pr-3 pl-9 text-sm text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-ring focus:outline-none"
          placeholder="Search records, meetings, or faculty..."
          onKeyDown={handleSearchKeyDown}
          readOnly={isSearchPage}
          onClick={() => isSearchPage && navigate("/search")}
        />
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        <ThemeSwitcher />
        <Button variant="ghost" size="icon" className="size-8">
          <History className="size-4" />
        </Button>
        <Button variant="ghost" size="icon" className="relative size-8">
          <Bell className="size-4" />
          <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-destructive" />
        </Button>

        <div className="mx-2 h-5 w-px bg-border" />

        <Button variant="outline" size="sm" className="gap-2 p-5">
          <Upload className="size-4" />
          Upload Document
        </Button>
        <CreateMeetingModal
          trigger={
            <Button size="sm" className="gap-2 p-5 text-white">
              <Plus className="size-4" />
              New Meeting
            </Button>
          }
        />
      </div>
    </header>
  );
}
