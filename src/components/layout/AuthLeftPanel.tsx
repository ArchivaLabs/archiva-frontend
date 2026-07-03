import type { ReactNode } from "react";
import Logo from "@/components/shared/Logo";

const ringDiameters = [200, 330, 460, 590, 720, 850];

interface AuthLeftPanelProps {
  badge?: string;
  headline: string;
  subtext: string;
  children: ReactNode;
  footer: ReactNode;
}

export default function AuthLeftPanel({
  badge,
  headline,
  subtext,
  children,
  footer,
}: AuthLeftPanelProps) {
  return (
    <article className="relative flex w-[60%] flex-col overflow-hidden bg-primary px-14 py-10">
      {ringDiameters.map((d) => (
        <div
          key={d}
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/20"
          style={{ width: d, height: d }}
        />
      ))}

      <Logo variant="dark" />

      <div className="relative z-10 flex flex-1 flex-col justify-center">
        {badge && (
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1">
            <span className="size-1.5 rounded-full bg-green-400/80" />
            <span className="text-xs font-medium text-white/70">{badge}</span>
          </div>
        )}

        <h1 className="mb-5 max-w-xl text-[2.6rem] leading-tight font-bold text-white">
          {headline}
        </h1>
        <p className="mb-10 max-w-md text-[0.95rem] leading-relaxed text-white/65">
          {subtext}
        </p>

        {children}
      </div>

      <div className="relative z-10 flex items-center gap-2 text-xs text-white/40">
        {footer}
      </div>
    </article>
  );
}
