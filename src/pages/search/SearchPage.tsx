import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { ChevronLeft, ChevronRight, ChevronDown, Search } from "lucide-react"
import SearchEmptyState from "@/components/search/SearchEmptyState"
import SearchFiltersPanel from "@/components/search/SearchFiltersPanel"
import SearchResultCard from "@/components/search/SearchResultCard"
import SearchResultsSkeleton from "@/components/search/SearchResultsSkeleton"
import { Button } from "@/components/ui/button"
import { SEARCH_PAGE_SIZE } from "@/lib/constants"
import type { SearchSortBy } from "@/lib/types"
import { getFilterOptions } from "@/services/search"
import { useSearchStore } from "@/store/searchStore"
import { useSearch } from "@/hooks/useSearch"
import { cn } from "@/lib/utils"

const SORT_OPTIONS: { value: SearchSortBy; label: string }[] = [
  { value: "relevance", label: "Relevance" },
  { value: "date_desc", label: "Newest first" },
  { value: "date_asc", label: "Oldest first" },
]

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const [availableTags, setAvailableTags] = useState<string[]>([])
  const [availableDepartments, setAvailableDepartments] = useState<string[]>([])
  const [sortOpen, setSortOpen] = useState(false)

  const store = useSearchStore()
  useSearch()

  // Sync URL query param → store on first render
  useEffect(() => {
    const urlQuery = searchParams.get("q") ?? ""
    if (urlQuery && urlQuery !== store.query) {
      store.setQuery(urlQuery)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Fetch filter options once
  useEffect(() => {
    getFilterOptions().then(({ tags, departments }) => {
      setAvailableTags(tags)
      setAvailableDepartments(departments)
    })
  }, [])

  const totalPages = Math.ceil(store.total / SEARCH_PAGE_SIZE)
  const hasFilters =
    store.filters.activeTags.length > 0 ||
    !!store.filters.dateFrom ||
    !!store.filters.dateTo ||
    store.filters.department !== "All Departments"

  const currentSort = SORT_OPTIONS.find((o) => o.value === store.sortBy) ?? SORT_OPTIONS[0]

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Page-level search header */}
      <div className="shrink-0 border-b border-border bg-background/80 px-6 py-4 backdrop-blur-sm">
        <div className="relative max-w-3xl">
          <Search className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" />
          <input
            autoFocus
            type="text"
            value={store.query}
            onChange={(e) => store.setQuery(e.target.value)}
            placeholder="Search for documents, meeting minutes, faculty records..."
            className="w-full rounded-xl border-none bg-surface-container-low py-4 pr-4 pl-12 text-base text-foreground shadow-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:outline-none"
          />
        </div>
      </div>

      {/* Filters + Results */}
      <div className="flex flex-1 overflow-hidden">
        <SearchFiltersPanel
          filters={store.filters}
          availableTags={availableTags}
          availableDepartments={availableDepartments}
          onToggleSearchIn={store.toggleSearchIn}
          onDateFromChange={store.setDateFrom}
          onDateToChange={store.setDateTo}
          onToggleTag={store.toggleTag}
          onDepartmentChange={store.setDepartment}
          onReset={store.resetFilters}
        />

        {/* Results area */}
        <section className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-3xl space-y-6">
            {/* Results header */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {store.isLoading
                  ? "Searching..."
                  : store.query
                    ? `Found ${store.total} record${store.total !== 1 ? "s" : ""} for "${store.query}"`
                    : `${store.total} record${store.total !== 1 ? "s" : ""} available`}
              </p>

              {/* Sort dropdown */}
              <div className="relative">
                <button
                  onClick={() => setSortOpen((o) => !o)}
                  className="flex items-center gap-1 text-sm font-semibold text-primary"
                >
                  {currentSort.label}
                  <ChevronDown className="size-4" />
                </button>
                {sortOpen && (
                  <div className="absolute right-0 z-10 mt-1 w-40 overflow-hidden rounded-lg border border-border bg-card shadow-lg">
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          store.setSortBy(opt.value)
                          setSortOpen(false)
                        }}
                        className={cn(
                          "w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-surface-container-low",
                          opt.value === store.sortBy
                            ? "font-semibold text-primary"
                            : "text-foreground",
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Loading skeleton */}
            {store.isLoading && <SearchResultsSkeleton count={4} />}

            {/* Error */}
            {!store.isLoading && store.error && (
              <div className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                {store.error}
              </div>
            )}

            {/* Empty state */}
            {!store.isLoading && !store.error && store.results.length === 0 && (
              <SearchEmptyState query={store.query} hasFilters={hasFilters} />
            )}

            {/* Results */}
            {!store.isLoading && !store.error && store.results.length > 0 && (
              <div className="space-y-4">
                {store.results.map((result) => (
                  <SearchResultCard key={result.id} result={result} query={store.query} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {!store.isLoading && totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pb-20 pt-10">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-10"
                  disabled={store.page <= 1}
                  onClick={() => store.setPage(store.page - 1)}
                >
                  <ChevronLeft className="size-4" />
                </Button>

                {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                  const pageNum = i + 1
                  return (
                    <button
                      key={pageNum}
                      onClick={() => store.setPage(pageNum)}
                      className={cn(
                        "flex size-10 items-center justify-center rounded-lg text-sm transition-colors",
                        pageNum === store.page
                          ? "bg-primary font-semibold text-on-primary"
                          : "border border-border text-foreground hover:bg-surface-container-low",
                      )}
                    >
                      {pageNum}
                    </button>
                  )
                })}

                {totalPages > 5 && (
                  <>
                    <span className="px-1 text-muted-foreground">...</span>
                    <button
                      onClick={() => store.setPage(totalPages)}
                      className={cn(
                        "flex size-10 items-center justify-center rounded-lg border border-border text-sm transition-colors hover:bg-surface-container-low",
                        store.page === totalPages &&
                          "border-0 bg-primary font-semibold text-on-primary",
                      )}
                    >
                      {totalPages}
                    </button>
                  </>
                )}

                <Button
                  variant="outline"
                  size="icon"
                  className="size-10"
                  disabled={store.page >= totalPages}
                  onClick={() => store.setPage(store.page + 1)}
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
