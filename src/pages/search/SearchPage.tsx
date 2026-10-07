import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Search } from "lucide-react";
import SearchFiltersPanel from "@/components/search/SearchFiltersPanel";
import SearchFiltersSheet from "@/components/search/SearchFiltersSheet";
import SearchPagination from "@/components/search/SearchPagination";
import SearchResultsContent from "@/components/search/SearchResultsContent";
import SearchSortMenu from "@/components/search/SearchSortMenu";
import { SEARCH_PAGE_SIZE } from "@/lib/constants";
import { getFilterOptions } from "@/services/search";
import { useSearchStore } from "@/store/searchStore";
import { useSearch } from "@/hooks/useSearch";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [filterOptionsError, setFilterOptionsError] = useState<string | null>(
    null
  );
  const store = useSearchStore();
  useSearch();

  // Sync URL query param → store on first render
  useEffect(() => {
    const urlQuery = searchParams.get("q") ?? "";
    if (urlQuery && urlQuery !== store.query) {
      store.setQuery(urlQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch filter options once
  useEffect(() => {
    getFilterOptions()
      .then(({ tags }) => {
        setAvailableTags(tags);
        setFilterOptionsError(null);
      })
      .catch(() => {
        setFilterOptionsError("Tags are temporarily unavailable.");
      });
  }, []);

  const totalPages = Math.ceil(store.total / SEARCH_PAGE_SIZE);
  const activeFilterCount =
    store.filters.activeTags.length +
    (store.filters.dateFrom ? 1 : 0) +
    (store.filters.dateTo ? 1 : 0) +
    Object.values(store.filters.searchIn).filter((enabled) => !enabled).length;
  const hasFilters = activeFilterCount > 0;

  const filterFieldProps = {
    filters: store.filters,
    availableTags,
    onToggleSearchIn: store.toggleSearchIn,
    onDateFromChange: store.setDateFrom,
    onDateToChange: store.setDateTo,
    onToggleTag: store.toggleTag,
    onReset: store.resetFilters,
    filterOptionsError,
  };

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Page-level search header */}
      <div className="shrink-0 border-b border-border bg-background/80 px-margin-mobile py-4 backdrop-blur-sm sm:px-6">
        <div className="flex items-center gap-3">
          <div className="relative max-w-3xl flex-1">
            <Search className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" />
            <input
              autoFocus
              type="text"
              maxLength={200}
              value={store.query}
              onChange={(e) => store.setQuery(e.target.value)}
              placeholder="Search document content and meeting records..."
              className="w-full rounded-xl border-none bg-surface-container-low py-4 pr-4 pl-12 text-base text-foreground shadow-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>
          <SearchFiltersSheet
            activeCount={activeFilterCount}
            {...filterFieldProps}
          />
        </div>
      </div>

      {/* Filters + Results */}
      <div className="flex flex-1 overflow-hidden">
        <SearchFiltersPanel {...filterFieldProps} />

        {/* Results area */}
        <section className="flex-1 overflow-y-auto p-margin-mobile sm:p-6">
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
              <SearchSortMenu
                sortBy={store.sortBy}
                onSortChange={store.setSortBy}
              />
            </div>

            <SearchResultsContent
              isLoading={store.isLoading}
              error={store.error}
              results={store.results}
              query={store.query}
              hasFilters={hasFilters}
            />
            {!store.isLoading && (
              <SearchPagination
                page={store.page}
                totalPages={totalPages}
                onPageChange={store.setPage}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
