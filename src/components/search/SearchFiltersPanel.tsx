import SearchFilterFields, {
  type SearchFilterFieldsProps,
} from "@/components/search/SearchFilterFields";

/** Desktop filter rail — permanently visible from `lg` up. */
export default function SearchFiltersPanel(props: SearchFilterFieldsProps) {
  return (
    <aside className="hidden w-72 shrink-0 overflow-y-auto border-r border-border bg-background p-6 lg:block">
      <p className="mb-6 text-xs font-medium tracking-wider text-muted-foreground uppercase">
        Filters
      </p>
      <SearchFilterFields {...props} />
    </aside>
  );
}
