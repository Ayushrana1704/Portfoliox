import type { Project } from "@/data/portfolio";

/**
 * Subtle, domain-specific background treatment behind each project block.
 * Same visual language everywhere — only the pattern changes.
 */
export function ProjectMotif({ motif, color }: { motif: Project["motif"]; color: string }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -inset-x-6 -inset-y-10 -z-10 overflow-hidden rounded-3xl opacity-[0.55]"
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(60% 55% at 70% 12%, color-mix(in oklab, ${color} 13%, transparent), transparent 70%)`,
        }}
      />
      <svg
        className="absolute inset-0 h-full w-full"
        style={{ color, opacity: 0.22 }}
        preserveAspectRatio="none"
      >
        <defs>
          {motif === "neural" ? (
            <pattern id={`m-${motif}`} width="120" height="120" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1.6" fill="currentColor" />
              <circle cx="100" cy="60" r="1.6" fill="currentColor" />
              <circle cx="50" cy="100" r="1.6" fill="currentColor" />
              <path
                d="M20 20 L100 60 L50 100 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          ) : null}
          {motif === "agents" ? (
            <pattern id={`m-${motif}`} width="90" height="90" patternUnits="userSpaceOnUse">
              <rect
                x="20"
                y="20"
                width="26"
                height="26"
                rx="6"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.7"
              />
              <path d="M46 33 H84" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 4" />
              <path d="M33 46 V84" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 4" />
            </pattern>
          ) : null}
          {motif === "board" ? (
            <pattern id={`m-${motif}`} width="80" height="80" patternUnits="userSpaceOnUse">
              <rect
                x="8"
                y="8"
                width="64"
                height="20"
                rx="4"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.6"
              />
              <path d="M8 44 H52" stroke="currentColor" strokeWidth="0.6" />
              <path d="M8 56 H36" stroke="currentColor" strokeWidth="0.6" />
            </pattern>
          ) : null}
          {motif === "chat" ? (
            <pattern id={`m-${motif}`} width="96" height="96" patternUnits="userSpaceOnUse">
              <path
                d="M10 14 h40 a6 6 0 0 1 6 6 v16 a6 6 0 0 1 -6 6 h-28 l-12 10 z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.6"
              />
              <path
                d="M86 60 h-34 a6 6 0 0 0 -6 6 v12 a6 6 0 0 0 6 6 h22 l12 8 z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.6"
              />
            </pattern>
          ) : null}
        </defs>
        <rect width="100%" height="100%" fill={`url(#m-${motif})`} />
      </svg>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 70% at 50% 50%, transparent 30%, var(--background) 100%)",
        }}
      />
    </div>
  );
}
