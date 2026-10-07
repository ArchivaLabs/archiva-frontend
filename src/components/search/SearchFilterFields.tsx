import { cn } from "@/lib/utils";
import type { SearchFilters } from "@/lib/types";

export interface SearchFilterFieldsProps {
  filters: SearchFilters;
  availableTags: string[];
  onToggleSearchIn: (key: keyof SearchFilters["searchIn"]) => void;
  onDateFromChange: (date: string) => void;
  onDateToChange: (date: string) => void;
  onToggleTag: (tag: string) => void;
  onReset: () => void;
  filterOptionsError?: string | null;
}

/**
 * The filter controls, with no layout container of its own. Rendered inside the
 * desktop `<aside>` (SearchFiltersPanel) and the mobile drawer
 * (SearchFiltersSheet).
 */
export default function SearchFilterFields({
  filters,
  availableTags,
  onToggleSearchIn,
  onDateFromChange,
  onDateToChange,
  onToggleTag,
  onReset,
  filterOptionsError,
}: SearchFilterFieldsProps) {
  return (
    <>
      <div className="space-y-8">
        {/* Search In */}
        <section>
          <p className="mb-3 text-sm font-medium text-foreground">
            Record types
          </p>
          <div className="space-y-2.5">
            {(
              [
                { key: "documents", label: "Documents" },
                { key: "meetings", label: "Meetings" },
              ] as const
            ).map(({ key, label }) => (
              <label
                key={key}
                className="group flex cursor-pointer items-center gap-3"
              >
                <input
                  type="checkbox"
                  checked={filters.searchIn[key]}
                  disabled={
                    filters.searchIn[key] &&
                    !filters.searchIn[
                      key === "documents" ? "meetings" : "documents"
                    ]
                  }
                  onChange={() => onToggleSearchIn(key)}
                  className="size-4 rounded border-border text-primary accent-primary focus:ring-primary disabled:cursor-not-allowed"
                />
                <span className="text-sm text-foreground transition-colors group-hover:text-primary">
                  {label}
                </span>
              </label>
            ))}
          </div>
        </section>

        <section>
          <p className="mb-3 text-sm font-medium text-foreground">
            Match within
          </p>
          <div className="space-y-2.5">
            {(
              [
                { key: "titles", label: "Titles" },
                { key: "content", label: "Content" },
              ] as const
            ).map(({ key, label }) => (
              <label
                key={key}
                className="group flex cursor-pointer items-center gap-3"
              >
                <input
                  type="checkbox"
                  checked={filters.searchIn[key]}
                  disabled={
                    filters.searchIn[key] &&
                    !filters.searchIn[key === "titles" ? "content" : "titles"]
                  }
                  onChange={() => onToggleSearchIn(key)}
                  className="size-4 rounded border-border text-primary accent-primary focus:ring-primary disabled:cursor-not-allowed"
                />
                <span className="text-sm text-foreground transition-colors group-hover:text-primary">
                  {label}
                </span>
              </label>
            ))}
          </div>
        </section>

        {/* Date Range */}
        <section>
          <p className="mb-3 text-sm font-medium text-foreground">Date Range</p>
          <div className="space-y-3">
            <div className="relative">
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => onDateFromChange(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="From date"
              />
            </div>
            <div className="relative">
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => onDateToChange(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="To date"
              />
            </div>
          </div>
        </section>

        {/* Tags */}
        <section>
          <p className="mb-3 text-sm font-medium text-foreground">Tags</p>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => {
              const isActive = filters.activeTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  disabled={!isActive && filters.activeTags.length >= 20}
                  onClick={() => onToggleTag(tag)}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50",
                    isActive
                      ? "text-on-primary bg-primary"
                      : "bg-surface-container-high text-on-surface-variant hover:bg-primary-container/20"
                  )}
                >
                  {tag}
                </button>
              );
            })}
          </div>
          {filterOptionsError && (
            <p className="mt-2 text-xs text-muted-foreground" role="status">
              {filterOptionsError}
            </p>
          )}
        </section>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="mt-10 w-full rounded-lg border border-border py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-surface-container-low"
      >
        Reset all filters
      </button>
    </>
  );
}
