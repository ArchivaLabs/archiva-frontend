import { useState } from "react";
import { Link } from "react-router";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import ThemeSwitcher from "@/components/shared/ThemeSwitcher";
import Logo from "@/components/shared/Logo";
import { useCloseOnBreakpoint } from "@/hooks/useCloseOnBreakpoint";

export default function LandingNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Inline actions return at `sm`; close the drawer if it's open past that.
  useCloseOnBreakpoint(menuOpen, 640, () => setMenuOpen(false));

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-margin-mobile py-3 sm:px-6">
        <Logo />

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 sm:flex">
          <ThemeSwitcher />
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
          <Button size="sm" asChild className="text-white">
            <Link to="/login">Get Started</Link>
          </Button>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-1 sm:hidden">
          <ThemeSwitcher />
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="size-4" />
          </Button>
        </div>
      </div>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="right" className="w-72 max-w-[80vw] gap-4 p-6">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Sign in or create an Archiva workspace
          </SheetDescription>
          <div className="mt-8 flex flex-col gap-3">
            <Button
              variant="outline"
              asChild
              onClick={() => setMenuOpen(false)}
            >
              <Link to="/login">Sign In</Link>
            </Button>
            <Button
              asChild
              className="text-white"
              onClick={() => setMenuOpen(false)}
            >
              <Link to="/login">Get Started</Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
