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
    <article className="relative flex w-full shrink-0 flex-col overflow-hidden bg-primary px-margin-mobile py-8 [--ring-unit:0.34px] sm:px-8 sm:[--ring-unit:0.5px] lg:w-[55%] lg:px-14 lg:py-10 lg:[--ring-unit:0.75px] xl:[--ring-unit:1px]">
      {ringDiameters.map((d) => (
        <div
          key={d}
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/20"
          style={{
            width: `calc(${d} * var(--ring-unit))`,
            height: `calc(${d} * var(--ring-unit))`,
          }}
        />
      ))}

      <Logo variant="dark" />

      <div className="relative z-10 flex flex-1 flex-col justify-start lg:justify-center">
        {badge && (
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1">
            <span className="size-1.5 rounded-full bg-green-400/80" />
            <span className="text-xs font-medium text-white/70">{badge}</span>
          </div>
        )}

        <h1 className="mt-5 mb-3 max-w-xl text-2xl leading-tight font-bold text-white sm:text-3xl lg:mt-0 lg:mb-5 lg:text-[2.6rem]">
          {headline}
        </h1>
        <p className="mb-0 line-clamp-2 max-w-md text-sm leading-relaxed text-white/65 lg:mb-10 lg:line-clamp-none lg:text-[0.95rem]">
          {subtext}
        </p>

        <div className="hidden lg:block">{children}</div>
      </div>

      <div className="relative z-10 hidden items-center gap-2 text-xs text-white/40 lg:flex">
        {footer}
      </div>
    </article>
  );
}
