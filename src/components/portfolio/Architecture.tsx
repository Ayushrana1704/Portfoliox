import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { EASE, tone } from "./primitives";

/**
 * Horizontal, wrapping workflow diagram. Each project passes its own steps,
 * so no two projects share a flow.
 */
export function Architecture({
  steps,
  index,
  label = "Workflow",
}: {
  steps: string[];
  index: number;
  label?: string;
}) {
  const c = tone(index);
  return (
    <div
      className="card-tint rounded-2xl border bg-card/50 p-6 backdrop-blur sm:p-8"
      style={{
        // @ts-expect-error css var
        "--tint": c,
        borderColor: `color-mix(in oklab, ${c} 26%, transparent)`,
      }}
    >
      <div className="flex items-center gap-4">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground">
          {label}
        </p>
        <span
          className="h-px flex-1"
          style={{ background: `linear-gradient(90deg, ${c}, transparent)`, opacity: 0.5 }}
        />
      </div>

      <motion.ol
        className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
      >
        {steps.map((step, i) => (
          <motion.li
            key={step}
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
            }}
            className="relative flex items-center gap-3 rounded-xl border px-4 py-3.5 transition-transform duration-300 hover:-translate-y-0.5"
            style={{
              borderColor: `color-mix(in oklab, ${c} 28%, transparent)`,
              backgroundColor: `color-mix(in oklab, ${c} 6%, transparent)`,
            }}
          >
            <span
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full border font-mono text-[0.55rem] tracking-[0.08em]"
              style={{
                color: c,
                borderColor: `color-mix(in oklab, ${c} 40%, transparent)`,
                backgroundColor: `color-mix(in oklab, ${c} 10%, transparent)`,
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0 text-sm leading-snug">{step}</span>
            {i < steps.length - 1 ? (
              <ChevronRight
                aria-hidden
                size={14}
                className="ml-auto shrink-0 opacity-45"
                style={{ color: c }}
              />
            ) : null}
          </motion.li>
        ))}
      </motion.ol>
    </div>
  );
}
