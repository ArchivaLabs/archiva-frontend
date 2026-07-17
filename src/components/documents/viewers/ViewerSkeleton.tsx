import { cn } from "@/lib/utils";

export default function ViewerSkeleton() {
  return (
    <div className="flex flex-1 flex-col items-center gap-4 overflow-hidden px-6 py-8">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "aspect-[8.5/11] w-full max-w-2xl animate-pulse rounded-lg bg-surface-container-high",
            i > 0 && "hidden sm:block"
          )}
        />
      ))}
    </div>
  );
}
