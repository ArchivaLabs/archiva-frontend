import { XCircle, Folder, FileText, Paperclip, UserX } from "lucide-react";

const painPoints = [
  "Fragmented records across departments lead to policy inconsistencies.",
  "Lack of traceability for meeting decisions and voting outcomes.",
  "Information silos prevent collaborative research and administrative efficiency.",
];

function MockCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-border bg-card p-4 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

function SkeletonLine({
  width = "w-full",
  className = "",
}: {
  width?: string;
  className?: string;
}) {
  return <div className={`h-2 rounded-full ${width} ${className}`} />;
}

export default function ProblemSection() {
  return (
    <section className="bg-surface-container-low px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground">
              Lost in a sea of documents?
            </h2>
            <p className="mb-8 text-base text-muted-foreground">
              University governance generates thousands of documents annually.
              From scattered PDFs in personal drives to untraceable email
              threads, critical institutional knowledge is leaking out of the
              system.
            </p>

            <ul className="space-y-3">
              {painPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <XCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
                  <span className="text-sm text-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <MockCard>
              <Folder className="mb-3 size-5 text-muted-foreground" />
              <div className="space-y-2">
                <SkeletonLine className="bg-skeleton-1" />
                <SkeletonLine className="bg-skeleton-2" width="w-5/6" />
              </div>
            </MockCard>

            <MockCard>
              <Paperclip className="mb-3 size-5 text-muted-foreground" />
              <div className="space-y-2">
                <SkeletonLine className="bg-skeleton-1" width="w-4/5" />
                <SkeletonLine className="bg-skeleton-2" width="w-2/3" />
              </div>
            </MockCard>

            <MockCard>
              <FileText className="mb-3 size-5 text-muted-foreground" />
              <div className="space-y-2">
                <SkeletonLine className="bg-skeleton-1" />
                <SkeletonLine className="bg-skeleton-2" width="w-4/5" />
              </div>
            </MockCard>

            <MockCard className="flex flex-col items-center justify-center text-center">
              <UserX className="mb-2 size-5 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Record not found.</p>
            </MockCard>
          </div>
        </div>
      </div>
    </section>
  );
}
