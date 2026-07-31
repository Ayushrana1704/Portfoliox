import { useEffect, useState } from "react";
import { motion } from "motion/react";

const lines = [
  { text: "docker compose up", kind: "cmd" as const },
  { text: "FastAPI running", kind: "ok" as const },
  { text: "React connected", kind: "ok" as const },
  { text: "PostgreSQL connected", kind: "ok" as const },
  { text: "Qdrant healthy", kind: "ok" as const },
  { text: "Gemini API ready", kind: "ok" as const },
  { text: "Portfolio online", kind: "done" as const },
];

export function BootTerminal() {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown >= lines.length) return;
    const t = setTimeout(() => setShown((s) => s + 1), shown === 0 ? 700 : 420);
    return () => clearTimeout(t);
  }, [shown]);

  return (
    <div
      className="overflow-hidden rounded-xl border bg-card/60 backdrop-blur"
      style={{
        borderColor: "color-mix(in oklab, var(--c1) 28%, transparent)",
        boxShadow: "0 22px 60px -40px color-mix(in oklab, var(--c1) 90%, transparent)",
      }}
    >
      <div className="flex items-center gap-2 border-b border-border/60 px-3 py-2">
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "var(--c1)" }} />
        <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
        <span className="h-2 w-2 rounded-full bg-muted-foreground/20" />
        <span className="ml-2 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-muted-foreground">
          ~/ayush — zsh
        </span>
      </div>
      <div className="space-y-1.5 px-4 py-4 font-mono text-[0.66rem] leading-relaxed">
        {lines.slice(0, shown).map((l) => (
          <motion.p
            key={l.text}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="flex items-baseline gap-2"
          >
            {l.kind === "cmd" ? (
              <>
                <span className="text-muted-foreground">$</span>
                <span>{l.text}</span>
              </>
            ) : l.kind === "ok" ? (
              <>
                <span style={{ color: "var(--c4)" }}>✓</span>
                <span className="text-muted-foreground">{l.text}</span>
              </>
            ) : (
              <span className="text-rainbow tracking-[0.12em]">{l.text.toUpperCase()}</span>
            )}
          </motion.p>
        ))}
        <span
          className="inline-block h-3 w-[7px] translate-y-[2px] animate-pulse"
          style={{ backgroundColor: "var(--c1)" }}
        />
      </div>
    </div>
  );
}