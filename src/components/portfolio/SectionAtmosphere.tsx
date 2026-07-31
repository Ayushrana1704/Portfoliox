import { motion } from "motion/react";

type Variant = "blueprint" | "editor" | "flow" | "workspace";

/**
 * Per-section background identity: subtle engineering line-work drawn from
 * my own stack (API flows, component trees, containers, vector nodes).
 * Decorative only — very low contrast, never competes with text.
 */
export function SectionAtmosphere({
  variant,
  tint = "var(--c1)",
}: {
  variant: Variant;
  tint?: string;
}) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            background: `radial-gradient(ellipse 60% 45% at 50% 40%, color-mix(in oklab, ${tint} 8%, transparent), transparent 70%)`,
          }}
        />
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.16] dark:opacity-[0.2]"
          style={{
            color: tint,
            maskImage:
              "radial-gradient(ellipse 75% 65% at 50% 45%, black, transparent 78%)",
          }}
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 1200 700"
          fill="none"
        >
          {variant === "blueprint" ? <Blueprint /> : null}
          {variant === "editor" ? <Editor /> : null}
          {variant === "flow" ? <Flow /> : null}
          {variant === "workspace" ? <Workspace /> : null}
        </svg>
      </motion.div>
    </div>
  );
}

const stroke = { stroke: "currentColor", strokeWidth: 1, fill: "none" } as const;

/** About — notebook / blueprint: ruled paper, sketched SQL schema + API route. */
function Blueprint() {
  return (
    <g>
      {Array.from({ length: 14 }).map((_, i) => (
        <line key={i} x1="0" y1={50 * i + 30} x2="1200" y2={50 * i + 30} {...stroke} opacity={0.25} />
      ))}
      <line x1="120" y1="0" x2="120" y2="700" {...stroke} opacity={0.35} />
      <rect x="200" y="120" width="190" height="120" rx="6" {...stroke} />
      <line x1="200" y1="155" x2="390" y2="155" {...stroke} opacity={0.6} />
      <line x1="200" y1="185" x2="390" y2="185" {...stroke} opacity={0.4} />
      <line x1="200" y1="212" x2="390" y2="212" {...stroke} opacity={0.4} />
      <rect x="520" y="330" width="190" height="120" rx="6" {...stroke} />
      <line x1="520" y1="365" x2="710" y2="365" {...stroke} opacity={0.6} />
      <path d="M390 180 C450 180 460 390 520 390" {...stroke} opacity={0.7} />
      <rect x="840" y="150" width="210" height="90" rx="45" {...stroke} opacity={0.6} />
      <path d="M840 195 L700 195 L700 330" {...stroke} opacity={0.5} strokeDasharray="5 7" />
      <circle cx="945" cy="520" r="70" {...stroke} opacity={0.5} />
      <circle cx="945" cy="520" r="34" {...stroke} opacity={0.35} />
    </g>
  );
}

/** Skills — code editor window + component tree. */
function Editor() {
  return (
    <g>
      <rect x="70" y="90" width="520" height="330" rx="12" {...stroke} />
      <line x1="70" y1="126" x2="590" y2="126" {...stroke} opacity={0.7} />
      <circle cx="94" cy="108" r="5" {...stroke} />
      <circle cx="112" cy="108" r="5" {...stroke} />
      <circle cx="130" cy="108" r="5" {...stroke} />
      <line x1="170" y1="126" x2="170" y2="420" {...stroke} opacity={0.4} />
      {Array.from({ length: 9 }).map((_, i) => (
        <line
          key={i}
          x1="196"
          y1={162 + i * 28}
          x2={196 + ((i * 97) % 330) + 60}
          y2={162 + i * 28}
          {...stroke}
          opacity={0.45}
        />
      ))}
      {/* component tree */}
      <circle cx="820" cy="140" r="16" {...stroke} />
      <path d="M820 156 L820 200 M820 200 L700 200 L700 250 M820 200 L940 200 L940 250" {...stroke} opacity={0.6} />
      <circle cx="700" cy="268" r="14" {...stroke} />
      <circle cx="940" cy="268" r="14" {...stroke} />
      <path d="M700 282 L700 330 L620 330 M700 282 L700 330 L780 330" {...stroke} opacity={0.45} />
      <circle cx="620" cy="348" r="11" {...stroke} opacity={0.7} />
      <circle cx="780" cy="348" r="11" {...stroke} opacity={0.7} />
      <path d="M940 282 L940 348" {...stroke} opacity={0.45} />
      <circle cx="940" cy="366" r="11" {...stroke} opacity={0.7} />
    </g>
  );
}

/** Projects — retrieval / pipeline overlay: vector nodes + fusion arrows. */
function Flow() {
  return (
    <g>
      <path d="M60 350 H260" {...stroke} opacity={0.5} />
      <rect x="260" y="305" width="150" height="90" rx="10" {...stroke} />
      <path d="M410 330 C480 330 480 220 550 220 M410 370 C480 370 480 480 550 480" {...stroke} opacity={0.6} />
      <rect x="550" y="180" width="150" height="80" rx="10" {...stroke} />
      <rect x="550" y="440" width="150" height="80" rx="10" {...stroke} />
      <path d="M700 220 C780 220 780 350 860 350 M700 480 C780 480 780 350 860 350" {...stroke} opacity={0.6} />
      <circle cx="900" cy="350" r="40" {...stroke} />
      <path d="M940 350 H1140" {...stroke} opacity={0.5} />
      {Array.from({ length: 22 }).map((_, i) => (
        <circle
          key={i}
          cx={90 + ((i * 173) % 1050)}
          cy={70 + ((i * 271) % 560)}
          r={1.8 + (i % 3)}
          fill="currentColor"
          opacity={0.35}
        />
      ))}
    </g>
  );
}

/** Contact — minimal workspace: desk lamp arc, monitor, git commit graph. */
function Workspace() {
  return (
    <g>
      <path d="M120 520 H1080" {...stroke} opacity={0.5} />
      <rect x="380" y="230" width="430" height="250" rx="12" {...stroke} opacity={0.7} />
      <path d="M560 480 L560 520 M630 480 L630 520 M520 520 H670" {...stroke} opacity={0.5} />
      <path d="M150 520 L150 300 C150 240 210 210 270 240" {...stroke} opacity={0.6} />
      <path d="M240 232 a40 40 0 1 0 62 34 Z" {...stroke} opacity={0.6} />
      {/* git graph */}
      <path d="M900 460 V180" {...stroke} opacity={0.5} />
      <path d="M900 340 C980 340 1000 320 1000 270 V200" {...stroke} opacity={0.45} />
      {[440, 380, 320, 260, 200].map((y) => (
        <circle key={y} cx="900" cy={y} r="7" {...stroke} />
      ))}
      <circle cx="1000" cy="250" r="7" {...stroke} opacity={0.7} />
      <circle cx="1000" cy="200" r="7" {...stroke} opacity={0.7} />
    </g>
  );
}