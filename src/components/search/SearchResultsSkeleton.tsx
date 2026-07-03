import { cn } from "@/lib/utils";

function SkeletonLine({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded bg-surface-container-high",
        className
      )}
    />
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-4 flex items-start gap-4">
        <SkeletonLine className="size-12 shrink-0 rounded-lg" />
        <div className="flex-1 space-y-2">
          <SkeletonLine className="h-4 w-3/4" />
          <SkeletonLine className="h-3 w-1/3" />
        </div>
      </div>
      <div className="space-y-2 pl-16">
        <SkeletonLine className="h-3 w-full" />
        <SkeletonLine className="h-3 w-5/6" />
        <div className="mt-4 flex gap-2">
          <SkeletonLine className="h-5 w-16 rounded" />
          <SkeletonLine className="h-5 w-16 rounded" />
        </div>
      </div>
    </div>
  );
}

export default function SearchResultsSkeleton({
  count = 4,
}: {
  count?: number;
}) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
