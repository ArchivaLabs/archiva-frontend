import { cn } from "@/lib/utils";
import type { SearchFilters } from "@/lib/types";

interface SearchFiltersPanelProps {
  filters: SearchFilters;
  availableTags: string[];
  availableDepartments: string[];
  onToggleSearchIn: (key: keyof SearchFilters["searchIn"]) => void;
  onDateFromChange: (date: string) => void;
  onDateToChange: (date: string) => void;
  onToggleTag: (tag: string) => void;
  onDepartmentChange: (dept: string) => void;
  onReset: () => void;
}

export default function SearchFiltersPanel({
  filters,
  availableTags,
  availableDepartments,
  onToggleSearchIn,
  onDateFromChange,
  onDateToChange,
  onToggleTag,
  onDepartmentChange,
  onReset,
}: SearchFiltersPanelProps) {
  return (
    <aside className="hidden w-72 shrink-0 overflow-y-auto border-r border-border bg-background p-6 lg:block">
      <p className="mb-6 text-xs font-medium tracking-wider text-muted-foreground uppercase">
        Filters
      </p>

      <div className="space-y-8">
        {/* Search In */}
        <section>
          <p className="mb-3 text-sm font-medium text-foreground">Search In</p>
          <div className="space-y-2.5">
            {(
              [
                { key: "titles", label: "Document Titles" },
                { key: "content", label: "Document Content" },
                { key: "meetingMinutes", label: "Meeting Minutes" },
              ] as const
            ).map(({ key, label }) => (
              <label
                key={key}
                className="group flex cursor-pointer items-center gap-3"
              >
                <input
                  type="checkbox"
                  checked={filters.searchIn[key]}
                  onChange={() => onToggleSearchIn(key)}
                  className="size-4 rounded border-border text-primary accent-primary focus:ring-primary"
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
                  onClick={() => onToggleTag(tag)}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium transition-colors",
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
        </section>

        {/* Departments */}
        <section>
          <p className="mb-3 text-sm font-medium text-foreground">
            Departments
          </p>
          <select
            value={filters.department}
            onChange={(e) => onDepartmentChange(e.target.value)}
            className="w-full appearance-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          >
            {availableDepartments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </section>
      </div>

      <button
        onClick={onReset}
        className="mt-10 w-full rounded-lg border border-border py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-surface-container-low"
      >
        Reset all filters
      </button>
    </aside>
  );
}
