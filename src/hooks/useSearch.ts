import { useEffect } from "react";
import { SEARCH_PAGE_SIZE } from "@/lib/constants";
import { searchRecords } from "@/services/search";
import { useSearchStore } from "@/store/searchStore";
import { useAuthStore } from "@/store/authStore";
import { useDebounce } from "./useDebounce";

export function useSearch() {
  const store = useSearchStore();
  const debouncedQuery = useDebounce(store.query, 300);

  useEffect(() => {
    let cancelled = false;
    const identity = useAuthStore.getState();
    const isCurrentIdentity = () => {
      const current = useAuthStore.getState();
      return (
        current.userId === identity.userId &&
        current.organizationId === identity.organizationId
      );
    };

    const run = async () => {
      store.setLoading(true);
      store.setError(null);
      try {
        const res = await searchRecords({
          query: debouncedQuery,
          filters: store.filters,
          page: store.page,
          pageSize: SEARCH_PAGE_SIZE,
          sortBy: store.sortBy,
        });
        if (!cancelled && isCurrentIdentity()) {
          store.setResults(res.results, res.total);
        }
      } catch {
        if (!cancelled && isCurrentIdentity()) {
          store.setError("Search failed. Please try again.");
        }
      } finally {
        if (!cancelled && isCurrentIdentity()) store.setLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery, store.filters, store.page, store.sortBy]);

  return store;
}
