import type { TagVariant } from "@/lib/types"
import { cn } from "@/lib/utils"

const variantStyles: Record<TagVariant, string> = {
  urgent: "bg-destructive-container text-on-destructive-container",
  primary: "bg-primary/15 text-primary",
  neutral: "bg-surface-container-high text-on-surface-variant",
  secondary: "bg-secondary-container/20 text-secondary",
  tertiary: "bg-tertiary/15 text-tertiary",
}

interface TagBadgeProps {
  label: string
  variant?: TagVariant
  className?: string
}

export default function TagBadge({
  label,
  variant = "primary",
  className,
}: TagBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase",
        variantStyles[variant],
        className
      )}
    >
      {label}
    </span>
  )
}
