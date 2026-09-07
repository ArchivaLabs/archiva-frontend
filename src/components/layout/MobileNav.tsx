import { useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import SidebarNav from "@/components/layout/SidebarNav";

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function MobileNav({ open, onOpenChange }: MobileNavProps) {
  // The desktop sidebar takes over at `lg`; close the drawer if the viewport
  // grows past that while it is open, so it can't sit on top of the sidebar.
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e: MediaQueryListEvent) =>
      e.matches && onOpenChange(false);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [open, onOpenChange]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        showCloseButton={false}
        className="w-sidebar-width max-w-[80vw] flex-col bg-nav-sidebar px-5"
      >
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <SheetDescription className="sr-only">
          Main site navigation links
        </SheetDescription>
        <SidebarNav onNavigate={() => onOpenChange(false)} />
      </SheetContent>
    </Sheet>
  );
}
