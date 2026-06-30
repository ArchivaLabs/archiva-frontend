import { useState } from "react";
import { ScrollText, Shield, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthLeftPanel from "@/components/layout/AuthLeftPanel";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "@/lib/msalConfig";
import { toast } from "sonner";
import MicrosoftRedirectLoader from "@/components/auth/MicrosoftRedirectLoader";

const featureCards = [
  { icon: ScrollText, label: "GOVERNANCE", title: "Senate Records" },
  { icon: Shield, label: "SECURITY", title: "Enterprise SSO" },
];

export default function LoginPage() {
  const { instance } = useMsal();
  const [isRedirecting, setIsRedirecting] = useState(false);

  async function handleMicrosoftLogin() {
    if (isRedirecting) return;
    sessionStorage.removeItem("msal.interaction.status");
    sessionStorage.setItem("archiva.login_pending", "true");
    setIsRedirecting(true);
    try {
      await instance.loginRedirect(loginRequest);
    } catch (err) {
      sessionStorage.removeItem("archiva.login_pending");
      setIsRedirecting(false);
      console.error("[Login] loginRedirect threw:", err);
      toast.error("Sign in failed. Please try again.");
    }
  }

  if (isRedirecting) return <MicrosoftRedirectLoader />;

  return (
    <section className="flex h-screen overflow-hidden">
      <AuthLeftPanel
        headline="Your organisation's meeting memory."
        subtext="The quiet infrastructure for university administration. Securely manage records, Senate Committee minutes, and institutional knowledge with academic precision and modern speed."
        footer={
          <>
            <span className="size-1.5 rounded-full bg-green-400/80" />
            System Status: Active
            <span className="text-white/20">•</span>
            v2.4.0-Academic
          </>
        }
      >
        <div className="grid max-w-xl grid-cols-2 gap-4">
          {featureCards.map(({ icon: Icon, label, title }) => (
            <div
              key={label}
              className="rounded-lg border border-white/20 bg-white/10 p-4"
            >
              <Icon className="mb-3 size-4 text-white/80" />
              <p className="mb-0.5 text-[10px] font-semibold tracking-wider text-white/50 uppercase">
                {label}
              </p>
              <p className="text-sm font-semibold text-white">{title}</p>
            </div>
          ))}
        </div>
      </AuthLeftPanel>

      {/* ── Right panel ───────────────────────────────── */}
      <article className="flex w-[40%] flex-col justify-center gap-4 overflow-y-auto bg-surface-container-low px-10 py-10">
        {/* Form card */}
        <div className="rounded-2xl border border-border bg-card px-8 py-8 shadow-sm">
          <div className="mb-7 text-center">
            <h2 className="text-2xl font-bold text-foreground">Archiva</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Sign in to your university workspace
            </p>
          </div>

          <Button
            variant="outline"
            className="mb-6 h-12 w-full gap-3 text-sm font-medium"
            onClick={handleMicrosoftLogin}
            disabled={isRedirecting}
          >
            {isRedirecting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <MicrosoftIcon />
            )}
            {isRedirecting ? "Signing in…" : "Sign in with Microsoft"}
          </Button>

          <div className="mb-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
              Internal Access
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="mb-3">
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Institutional Email
            </label>
            <input
              type="email"
              placeholder="name@university.edu"
              className="h-11 w-full rounded-lg border border-border bg-surface-container-low px-3 text-sm text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-ring focus:outline-none"
            />
          </div>

          <Button className="mb-6 h-12 w-full gap-2 text-sm font-semibold">
            Continue
            <ArrowRight className="size-4" />
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Need technical assistance?
            <div className="mt-1.5 flex justify-center gap-4">
              <a
                href="#"
                className="text-sm font-medium text-primary hover:underline"
              >
                Support Portal
              </a>
              <a
                href="#"
                className="text-sm font-medium text-primary hover:underline"
              >
                Access Policy
              </a>
            </div>
          </div>
        </div>

        {/* Compliance card */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <img
            src="/login.png"
            alt="University campus"
            className="h-30 w-full object-cover"
          />
          <div className="px-6 py-4">
            <p className="text-center text-xs leading-relaxed text-muted-foreground">
              Archiva is an official information system of the University. All
              actions are logged and audited for compliance.
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}

function MicrosoftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="0" y="0" width="8.5" height="8.5" fill="#f25022" />
      <rect x="9.5" y="0" width="8.5" height="8.5" fill="#7fba00" />
      <rect x="0" y="9.5" width="8.5" height="8.5" fill="#00a4ef" />
      <rect x="9.5" y="9.5" width="8.5" height="8.5" fill="#ffb900" />
    </svg>
  );
}
