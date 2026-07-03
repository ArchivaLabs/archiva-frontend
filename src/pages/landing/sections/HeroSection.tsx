import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, CloudDownload } from "lucide-react";
import { Button } from "@/components/ui/button";
import dashboardPreview from "/dashboard-preview.png";

export default function HeroSection() {
  return (
    <section className="bg-background px-6 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-container-low px-3 py-1">
          <ShieldCheck className="size-3.5 text-primary" />
          <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Trusted by 50+ Global Universities
          </span>
        </div>

        <h1 className="mb-5 text-6xl font-bold tracking-tight text-foreground lg:text-7xl">
          Archiva
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
          Your organisation&apos;s meeting memory. Seamlessly capture, index,
          and retrieve institutional knowledge from every senate, faculty, and
          committee session.
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button className="h-11 gap-4 p-6 text-base" asChild>
            <Link to="/login">
              <CloudDownload className="size-4" />
              Get Started with Microsoft
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button variant="outline" className="h-11 p-6 text-base" asChild>
            <Link to="/login">Request Demo</Link>
          </Button>
        </div>

        <div className="mt-16 overflow-hidden rounded-2xl bg-primary/10 p-3 shadow-xl ring-1 ring-border">
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <div className="flex items-center gap-1.5 border-b border-border bg-surface-container-low px-4 py-2.5">
              <span className="size-2.5 rounded-full bg-destructive/60" />
              <span className="size-2.5 rounded-full bg-[oklch(0.75_0.15_85)]/60" />
              <span className="size-2.5 rounded-full bg-primary/60" />
            </div>
            <img
              src={dashboardPreview}
              alt="Archiva dashboard preview"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
