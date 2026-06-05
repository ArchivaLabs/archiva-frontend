import { Landmark } from "lucide-react"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

interface LogoProps {
  /**
   * "light" → teal box + teal text (light bg)
   * "dark"  → white box + white text (primary/teal bg)
   * omit   → auto: follows the active theme via CSS dark: classes
   */
  variant?: "light" | "dark"
  className?: string
}

export default function Logo({ variant, className }: LogoProps) {
  const forced = variant !== undefined
  const isDark = variant === "dark"

  return (
    <Link to="/" className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded",
          forced
            ? isDark
              ? "size-8 bg-white"
              : "size-8 bg-primary"
            : "size-8 bg-primary dark:bg-white"
        )}
      >
        <Landmark
          className={cn(
            forced
              ? isDark
                ? "size-4 text-primary"
                : "size-4 text-white"
              : "size-4 text-white dark:text-primary"
          )}
          strokeWidth={2}
        />
      </div>
      <span
        className={cn(
          "font-bold tracking-tight",
          forced
            ? isDark
              ? "text-xl text-white"
              : "text-xl text-primary"
            : "text-xl text-primary dark:text-white"
        )}
      >
        Archiva
      </span>
    </Link>
  )
}
