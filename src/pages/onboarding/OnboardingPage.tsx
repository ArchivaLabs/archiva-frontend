import { useState } from "react";
import { ArrowRight, Building2, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthLeftPanel from "@/components/layout/AuthLeftPanel";
import { useCreateOrganization } from "@/hooks/mutations/useCreateOrganization";

const steps = [
  { step: "01", label: "Create workspace" },
  { step: "02", label: "Invite your team" },
  { step: "03", label: "Upload records" },
];

export default function OnboardingPage() {
  const createOrganization = useCreateOrganization();
  const [orgName, setOrgName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [logoLoadError, setLogoLoadError] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!orgName.trim()) return;

    setError(null);

    try {
      await createOrganization.mutateAsync({
        name: orgName.trim(),
        logoUrl: logoUrl.trim() || null,
      });
    } catch {
      setError("Failed to create your workspace. Please try again.");
    }
  }

  return (
    <section className="flex h-screen overflow-hidden">
      <AuthLeftPanel
        badge="One-time setup"
        headline="Build your organisation's knowledge base."
        subtext="You're one step away from centralising your institution's meeting records, governance minutes, and institutional knowledge — all in one secure workspace."
        footer={
          <>
            <span className="size-1.5 rounded-full bg-green-400/80" />
            Microsoft Authentication: Verified
            <span className="text-white/20">•</span>
            Step 1 of 1
          </>
        }
      >
        <div className="grid max-w-xl grid-cols-3 gap-3">
          {steps.map(({ step, label }) => (
            <div
              key={step}
              className="rounded-lg border border-white/20 bg-white/10 p-4"
            >
              <p className="mb-1 text-[10px] font-semibold tracking-wider text-white/40 uppercase">
                Step {step}
              </p>
              <p className="text-sm font-semibold text-white">{label}</p>
            </div>
          ))}
        </div>
      </AuthLeftPanel>

      {/* ── Right panel ───────────────────────────────── */}
      <article className="flex w-[40%] flex-col justify-center gap-4 overflow-y-auto bg-surface-container-low px-10 py-10">
        {/* Main form card */}
        <div className="rounded-2xl border border-border bg-card px-8 py-8 shadow-sm">
          {/* Progress bar */}
          <div className="mb-7 h-1.5 w-full overflow-hidden rounded-full bg-surface-container">
            <div className="h-full w-full rounded-full bg-primary" />
          </div>

          <div className="mb-7">
            <h2 className="text-2xl font-bold text-foreground">
              Create your organisation
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Tell us about your institution to get started.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Organisation name */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Organisation name <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <Building2 className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="University of Abuja"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  required
                  autoFocus
                  className="h-11 w-full rounded-lg border border-border bg-surface-container-low pr-3 pl-9 text-sm text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-ring focus:outline-none"
                />
              </div>
            </div>

            {/* Logo URL */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Logo URL{" "}
                <span className="text-xs font-normal text-muted-foreground">
                  (optional)
                </span>
              </label>
              <div className="relative">
                <ImageIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="url"
                  placeholder="https://your-institution.edu/logo.png"
                  value={logoUrl}
                  onChange={(e) => {
                    setLogoUrl(e.target.value);
                    setLogoLoadError(false);
                  }}
                  className="h-11 w-full rounded-lg border border-border bg-surface-container-low pr-3 pl-9 text-sm text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-ring focus:outline-none"
                />
              </div>

              {/* Live logo preview */}
              {logoUrl && !logoLoadError && (
                <div className="mt-2.5 flex items-center gap-3 rounded-lg border border-border bg-surface-container p-3">
                  <img
                    src={logoUrl}
                    alt="Organisation logo preview"
                    className="size-10 rounded-md object-contain"
                    onError={() => setLogoLoadError(true)}
                  />
                  <div>
                    <p className="text-xs font-medium text-foreground">
                      Logo preview
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Looks good!
                    </p>
                  </div>
                </div>
              )}
              {logoUrl && logoLoadError && (
                <p className="mt-1.5 text-xs text-destructive">
                  Could not load image. Double-check the URL.
                </p>
              )}
            </div>

            {/* API error */}
            {error && (
              <div className="rounded-lg bg-destructive-container px-4 py-3">
                <p className="text-sm text-on-destructive-container">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={createOrganization.isPending || !orgName.trim()}
              className="h-12 w-full gap-2 text-sm font-semibold"
            >
              {createOrganization.isPending
                ? "Creating workspace…"
                : "Create workspace"}
              {!createOrganization.isPending && (
                <ArrowRight className="size-4" />
              )}
            </Button>
          </form>

          <p className="mt-5 text-center text-xs text-muted-foreground">
            You will be assigned as{" "}
            <span className="font-semibold text-foreground">Admin</span> of this
            workspace.
          </p>
        </div>

        {/* Info card */}
        <div className="rounded-2xl border border-border bg-card px-6 py-4 shadow-sm">
          <p className="text-center text-xs leading-relaxed text-muted-foreground">
            After creating your workspace, you can invite team members, upload
            meeting records, and configure your organisation from the Admin
            panel.
          </p>
        </div>
      </article>
    </section>
  );
}
