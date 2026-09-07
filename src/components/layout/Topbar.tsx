import { Bell, Plus, Search, Menu } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import ThemeSwitcher from "@/components/shared/ThemeSwitcher";
import CreateMeetingModal from "@/components/meetings/CreateMeetingModal";

interface TopbarProps {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const navigate = useNavigate();

  return (
    <header className="flex shrink-0 items-center gap-1.5 border-b border-border bg-background px-margin-mobile py-3 sm:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="size-8 shrink-0 lg:hidden"
        onClick={onMenuClick}
        aria-label="Open navigation menu"
      >
        <Menu className="size-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="size-8 shrink-0"
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
