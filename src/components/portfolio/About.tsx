import { motion } from "motion/react";
import { about } from "@/data/portfolio";
import { Counter, Reveal, SectionHeading, Stagger, staggerItem, tone } from "./primitives";
import { SectionAtmosphere } from "./SectionAtmosphere";

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-40">
      <SectionAtmosphere variant="blueprint" tint="var(--c3)" />
      <SectionHeading index="01" title="About" />

        <div className="mt-20 grid gap-20 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <Stagger className="min-w-0 space-y-10" gap={0.09}>
          {about.paragraphs.map((p, i) => (
            <motion.p
              key={p}
              variants={staggerItem}
              className={
                i === 0
                  ? "font-display max-w-2xl text-3xl leading-[1.2] tracking-[-0.025em] sm:text-[2.75rem]"
                  : "max-w-xl text-base leading-[1.75] text-muted-foreground sm:text-lg"
              }
            >
              {p}
            </motion.p>
          ))}
        </Stagger>

        <div className="min-w-0 lg:pt-16">
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border lg:rotate-[1.2deg]">
              {about.stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="card-tint group relative bg-card px-5 py-8"
                  // @ts-expect-error css var
                  style={{ "--tint": tone(i) }}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${tone(i)} 45%, transparent), 0 22px 50px -34px ${tone(i)}`,
                    }}
                  />
                  <div
                    className="font-display text-4xl tracking-[-0.03em] sm:text-5xl"
                    style={{ color: tone(i) }}
                  >
                    <Counter to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-2.5 font-mono text-[0.62rem] uppercase leading-relaxed tracking-[0.16em] text-muted-foreground">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 font-mono text-[0.66rem] uppercase leading-relaxed tracking-[0.16em] text-muted-foreground lg:pl-6">
              B.Tech CSE — Cyber Physical Systems
              <br />
              VIT Chennai
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}