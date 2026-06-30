import { Landmark } from "lucide-react"

const rings = [
  { d: 160, dur: "22s", cw: true,  opacity: 0.28 },
  { d: 280, dur: "36s", cw: false, opacity: 0.20 },
  { d: 410, dur: "52s", cw: true,  opacity: 0.14 },
  { d: 550, dur: "70s", cw: false, opacity: 0.10 },
  { d: 700, dur: "95s", cw: true,  opacity: 0.07 },
  { d: 870, dur: "130s",cw: false, opacity: 0.05 },
]

export default function MicrosoftRedirectLoader() {
  return (
    <>
      <style>{`
        @keyframes archiva-cw {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes archiva-ccw {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(-360deg); }
        }
        @keyframes archiva-pulse {
          0%, 100% { transform: scale(1);    box-shadow: 0 0 0 0 rgba(255,255,255,0); }
          50%       { transform: scale(1.07); box-shadow: 0 0 40px 8px rgba(255,255,255,0.12); }
        }
        @keyframes archiva-enter {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes archiva-dot {
          0%, 80%, 100% { opacity: 0.15; }
          40%            { opacity: 1; }
        }
        @keyframes archiva-bar {
          0%   { width: 0%;   opacity: 1; }
          75%  { width: 82%;  opacity: 1; }
          100% { width: 88%;  opacity: 0.6; }
        }
      `}</style>

      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-primary">

        {/* Animated dashed rings */}
        {rings.map(({ d, dur, cw, opacity }) => (
          <div
            key={d}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: d,
              height: d,
              borderRadius: "50%",
              border: `1px dashed rgba(255,255,255,${opacity})`,
              animation: `${cw ? "archiva-cw" : "archiva-ccw"} ${dur} linear infinite`,
            }}
          />
        ))}

        {/* Central content */}
        <div
          className="relative z-10 flex flex-col items-center gap-7"
          style={{ animation: "archiva-enter 0.55s cubic-bezier(0.16,1,0.3,1) forwards" }}
        >
          {/* Logo mark */}
          <div
            className="flex size-[72px] items-center justify-center rounded-2xl bg-white"
            style={{ animation: "archiva-pulse 2.8s ease-in-out infinite" }}
          >
            <Landmark className="size-8 text-primary" strokeWidth={1.75} />
          </div>

          {/* Wordmark + status */}
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="font-heading text-[1.35rem] font-bold tracking-tight text-white">
              Archiva
            </p>
            <p className="flex items-center gap-px text-[0.8rem] font-medium tracking-wide text-white/55">
              Signing you in
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-block",
                    animation: `archiva-dot 1.5s ease-in-out ${i * 0.22}s infinite`,
                    opacity: 0.15,
                  }}
                >
                  .
                </span>
              ))}
            </p>
          </div>

          {/* Progress bar */}
          <div className="h-px w-44 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-white/50"
              style={{ animation: "archiva-bar 9s cubic-bezier(0.4,0,0.2,1) forwards" }}
            />
          </div>

          {/* Microsoft attribution */}
          <div className="flex items-center gap-2 text-white/30">
            <svg width="13" height="13" viewBox="0 0 18 18" fill="none">
              <rect x="0"   y="0"   width="8.5" height="8.5" fill="currentColor" />
              <rect x="9.5" y="0"   width="8.5" height="8.5" fill="currentColor" />
              <rect x="0"   y="9.5" width="8.5" height="8.5" fill="currentColor" />
              <rect x="9.5" y="9.5" width="8.5" height="8.5" fill="currentColor" />
            </svg>
            <span className="text-[0.72rem] tracking-widest uppercase">
              Microsoft Authentication
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
