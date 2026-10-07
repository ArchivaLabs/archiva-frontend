import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function SearchPagination({
  page,
  totalPages,
  onPageChange,
}: SearchPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const firstVisiblePage = Math.max(1, Math.min(page - 2, totalPages - 4));
  const visiblePages = Array.from(
    { length: Math.min(totalPages, 5) },
    (_, index) => firstVisiblePage + index
  );

  const pageButton = (pageNumber: number) => (
    <button
      key={pageNumber}
      type="button"
      aria-label={`Page ${pageNumber}`}
      aria-current={pageNumber === page ? "page" : undefined}
      onClick={() => onPageChange(pageNumber)}
      className={cn(
        "flex size-10 items-center justify-center rounded-lg border border-border text-sm transition-colors hover:bg-surface-container-low",
        pageNumber === page &&
          "text-on-primary border-0 bg-primary font-semibold"
      )}
    >
      {pageNumber}
    </button>
  );

  return (
    <nav
      aria-label="Search result pages"
      className="flex items-center justify-center gap-2 pt-10 pb-20"
    >
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="size-10"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft className="size-4" />
      </Button>

      {firstVisiblePage > 1 && pageButton(1)}
      {firstVisiblePage > 2 && (
        <span className="px-1 text-muted-foreground" aria-hidden="true">
          ...
        </span>
      )}
      {visiblePages.map(pageButton)}
      {firstVisiblePage + visiblePages.length < totalPages - 1 && (
        <span className="px-1 text-muted-foreground" aria-hidden="true">
          ...
        </span>
      )}
      {firstVisiblePage + visiblePages.length <= totalPages &&
        pageButton(totalPages)}

      <Button
        type="button"
        variant="outline"
        size="icon"
        className="size-10"
        aria-label="Next page"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        <ChevronRight className="size-4" />
      </Button>
    </nav>
  );
}
