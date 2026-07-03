import { Lightbulb, SearchX } from "lucide-react";

interface SearchEmptyStateProps {
  query: string;
  hasFilters: boolean;
}

export default function SearchEmptyState({
  query,
  hasFilters,
}: SearchEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-surface-container-low">
        <SearchX className="size-10 text-muted-foreground" />
      </div>

      <h2 className="mb-2 text-xl font-semibold text-foreground">
        No records found
      </h2>
      <p className="max-w-md text-sm text-muted-foreground">
        {query
          ? `We couldn't find anything matching "${query}"${hasFilters ? " with the current filters" : ""}.`
          : "Start typing to search across documents and meeting records."}
      </p>

      <div className="mt-10 max-w-sm rounded-xl border border-border bg-card p-6 text-left">
        <h4 className="mb-3 flex items-center gap-2 font-semibold text-primary">
          <Lightbulb className="size-4" />
          Search Tips
        </h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <span>&bull;</span> Use specific department names
          </li>
          <li className="flex gap-2">
            <span>&bull;</span> Check for typos in document titles
          </li>
          <li className="flex gap-2">
            <span>&bull;</span> Try removing a filter or two
          </li>
          <li className="flex gap-2">
            <span>&bull;</span> Search by meeting dates (MMM DD, YYYY)
          </li>
        </ul>
      </div>
    </div>
  );
}
