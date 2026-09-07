import { SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SearchFilterFields, {
  type SearchFilterFieldsProps,
} from "@/components/search/SearchFilterFields";

interface SearchFiltersSheetProps extends SearchFilterFieldsProps {
  /** Count of active filters, shown as a badge on the trigger. */
  activeCount: number;
}

/** Mobile / tablet filter drawer — the only way to reach filters below `lg`. */
export default function SearchFiltersSheet({
  activeCount,
  ...fields
}: SearchFiltersSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-container-low lg:hidden"
        >
          <SlidersHorizontal className="size-4" />
          Filters
          {activeCount > 0 && (
            <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
              {activeCount}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-80 max-w-[85vw] overflow-y-auto p-6"
      >
        <SheetHeader className="p-0">
          <SheetTitle className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
            Filters
          </SheetTitle>
          <SheetDescription className="sr-only">
            Narrow search results by scope, date, tags, and department
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <SearchFilterFields {...fields} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
