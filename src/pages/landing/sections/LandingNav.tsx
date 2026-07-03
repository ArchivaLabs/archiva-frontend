import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ThemeSwitcher from "@/components/shared/ThemeSwitcher";
import Logo from "@/components/shared/Logo";

export default function LandingNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Logo />

        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
          <Button size="sm" asChild className="text-white">
            <Link to="/login">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
