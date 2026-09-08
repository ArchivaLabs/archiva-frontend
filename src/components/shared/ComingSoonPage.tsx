import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import TagBadge from "@/components/shared/TagBadge";

export interface ComingSoonSection {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ComingSoonPageProps {
  /** Page title, also used as the breadcrumb leaf. */
  title: string;
  /** One-line explanation shown under the title. */
  description: string;
  /** Preview of what the page will eventually contain. */
  sections: ComingSoonSection[];
}

export default function ComingSoonPage({
  title,
  description,
  sections,
}: ComingSoonPageProps) {
  const { organizationName } = useAuthStore();

  return (
    <section className="flex flex-col gap-6 p-margin-mobile sm:p-6">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {organizationName && (
          <>
            <span>{organizationName}</span>
            <ChevronRight className="size-3" />
          </>
        )}
        <span className="text-foreground">{title}</span>
      </div>

      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {title}
          </h1>
          <TagBadge label="Coming soon" />
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2">
        {sections.map(
          ({
            icon: Icon,
            title: sectionTitle,
            description: sectionDescription,
          }) => (
            <li
              key={sectionTitle}
              aria-disabled="true"
              className="flex gap-3 rounded-xl border border-border bg-card p-4 opacity-70"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {sectionTitle}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {sectionDescription}
                </p>
              </div>
            </li>
          )
        )}
      </ul>
    </section>
  );
}
