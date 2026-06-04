import { Link } from "react-router-dom"
import { Archive } from "lucide-react"
import { Button } from "@/components/ui/button"
import ThemeSwitcher from "@/components/shared/ThemeSwitcher"

export default function LandingNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-md bg-primary">
            <Archive className="size-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">Archiva</span>
        </div>

        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/login">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
