import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { SearchSortBy } from "@/lib/types";
import { cn } from "@/lib/utils";

const SORT_OPTIONS: { value: SearchSortBy; label: string }[] = [
  { value: "relevance", label: "Relevance" },
  { value: "date_desc", label: "Newest first" },
  { value: "date_asc", label: "Oldest first" },
];

interface SearchSortMenuProps {
  sortBy: SearchSortBy;
  onSortChange: (sortBy: SearchSortBy) => void;
}

export default function SearchSortMenu({
  sortBy,
  onSortChange,
}: SearchSortMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const currentSort =
    SORT_OPTIONS.find((option) => option.value === sortBy) ?? SORT_OPTIONS[0];

  return (
    <div className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="flex items-center gap-1 text-sm font-semibold text-primary"
      >
        {currentSort.label}
        <ChevronDown className="size-4" />
      </button>
      {isOpen && (
        <div
          role="menu"
          aria-label="Sort search results"
          className="absolute right-0 z-10 mt-1 w-40 overflow-hidden rounded-lg border border-border bg-card shadow-lg"
        >
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              role="menuitemradio"
              aria-checked={option.value === sortBy}
              onClick={() => {
                onSortChange(option.value);
                setIsOpen(false);
              }}
              className={cn(
                "w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-surface-container-low",
                option.value === sortBy
                  ? "font-semibold text-primary"
                  : "text-foreground"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
