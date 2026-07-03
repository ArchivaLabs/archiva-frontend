import { Database, Search, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Database,
    title: "Centralized Records",
    description:
      "A single source of truth for all university meetings. Securely store minutes, agendas, and resolutions with automatic versioning and high-fidelity archival.",
  },
  {
    icon: Search,
    title: "Collaborative Search",
    description:
      "Search across decades of records in milliseconds. Use semantic filters to find specific faculty decisions or cross-reference policy changes instantly.",
  },
  {
    icon: Shield,
    title: "Admin Oversight",
    description:
      "Comprehensive role-based access control. Monitor document lifecycle, manage permissions, and ensure compliance with institutional data policies.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-background px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold text-primary">
            Intelligent Infrastructure
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Designed for Academic Rigor
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-2.5">
                <Icon className="size-5 text-primary" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-foreground">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
