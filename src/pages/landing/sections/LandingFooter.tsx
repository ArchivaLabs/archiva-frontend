import { Link } from "react-router-dom";
import { Archive, Globe, AtSign } from "lucide-react";

const platformLinks = ["Solutions", "Security", "Compliance", "API Docs"];
const companyLinks = [
  "About Us",
  "Academic Ethics",
  "Privacy Policy",
  "Terms of Service",
];

export default function LandingFooter() {
  return (
    <footer className="border-t border-border bg-background px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded-md bg-primary">
                <Archive className="size-3.5 text-primary-foreground" />
              </div>
              <span className="text-base font-bold text-foreground">
                Archiva
              </span>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Providing the quiet infrastructure for university administration.
              Secure, compliant, and lightning-fast records management.
            </p>
            <div className="flex items-center gap-3">
              <Globe className="size-4 cursor-pointer text-muted-foreground transition-colors hover:text-foreground" />
              <AtSign className="size-4 cursor-pointer text-muted-foreground transition-colors hover:text-foreground" />
            </div>
          </div>

          <div className="flex gap-12">
            <div>
              <p className="mb-3 text-xs font-semibold tracking-wider text-foreground uppercase">
                Platform
              </p>
              <ul className="space-y-2">
                {platformLinks.map((link) => (
                  <li key={link}>
                    <Link
                      to="/login"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold tracking-wider text-foreground uppercase">
                Company
              </p>
              <ul className="space-y-2">
                {companyLinks.map((link) => (
                  <li key={link}>
                    <span className="cursor-default text-sm text-muted-foreground">
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            © 2026 Archiva University Systems. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">
              System Status: Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
