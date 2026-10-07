import SearchEmptyState from "@/components/search/SearchEmptyState";
import SearchResultCard from "@/components/search/SearchResultCard";
import SearchResultsSkeleton from "@/components/search/SearchResultsSkeleton";
import type { SearchResult } from "@/lib/types";

interface SearchResultsContentProps {
  isLoading: boolean;
  error: string | null;
  results: SearchResult[];
  query: string;
  hasFilters: boolean;
}

export default function SearchResultsContent({
  isLoading,
  error,
  results,
  query,
  hasFilters,
}: SearchResultsContentProps) {
  if (isLoading) {
    return <SearchResultsSkeleton count={4} />;
  }

  if (error) {
    return (
      <div
        role="alert"
        className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive"
      >
        {error}
      </div>
    );
  }

  if (results.length === 0) {
    return <SearchEmptyState query={query} hasFilters={hasFilters} />;
  }

  return (
    <div className="space-y-4">
      {results.map((result) => (
        <SearchResultCard
          key={`${result.type}-${result.id}`}
          result={result}
          query={query}
        />
      ))}
    </div>
  );
}
