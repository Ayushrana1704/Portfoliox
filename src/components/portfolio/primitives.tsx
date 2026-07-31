import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

export const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  className,
  y = 28,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  index,
  title,
  lead,
  className,
}: {
  index: string;
  title: string;
  lead?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <span
        aria-hidden
        className="font-display text-rainbow pointer-events-none absolute -left-2 -top-16 select-none text-[9rem] leading-none opacity-20 sm:-left-8 sm:-top-24 sm:text-[16rem]"
      >
        {index}
      </span>
      <Reveal>
        <div className="flex items-center gap-4">
          <p className="text-rainbow font-mono text-[0.7rem] font-semibold uppercase tracking-[0.28em]">
            {index} — {title}
          </p>
          <span className="rule-rainbow hidden w-32 sm:block" />
        </div>
      </Reveal>
      {lead ? (
        <Reveal delay={0.08}>
          <h2 className="font-display mt-4 max-w-3xl text-balance text-4xl leading-[1.02] tracking-[-0.03em] sm:text-6xl">
            {lead}
          </h2>
        </Reveal>
      ) : null}
    </div>
  );
}

export const tones = ["var(--c1)", "var(--c2)", "var(--c3)", "var(--c4)", "var(--c5)"];

export function tone(i: number) {
  return tones[i % tones.length];
}

export function Chip({ children, index = 0 }: { children: ReactNode; index?: number }) {
  const c = tone(index);
  return (
    <motion.span
      whileHover={{ y: -2, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.12em] backdrop-blur"
      style={{
        color: c,
        borderColor: `color-mix(in oklab, ${c} 45%, transparent)`,
        backgroundColor: `color-mix(in oklab, ${c} 10%, transparent)`,
        boxShadow: `0 6px 18px -14px ${c}`,
      }}
    >
      {children}
    </motion.span>
  );
}

/** Staggered container: children animate in one after another on scroll. */
export function Stagger({
  children,
  className,
  gap = 0.08,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-70px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

/** Wraps an interactive element so it drifts gently toward the pointer. */
export function Magnetic({
  children,
  className,
  strength = 0.28,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18 });

  return (
    <motion.span
      ref={ref}
      style={{ x, y, display: "inline-flex" }}
      className={className}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1200;
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}