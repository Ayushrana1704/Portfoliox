import { motion } from "motion/react";
import { marqueeSkills, skillGroups } from "@/data/portfolio";
import { Chip, SectionHeading, Stagger, staggerItem, tone } from "./primitives";
import { SectionAtmosphere } from "./SectionAtmosphere";
import { techIcon } from "./techIcons";

export function Skills() {
  return (
    <section id="skills" className="relative py-28 sm:py-40">
      <SectionAtmosphere variant="editor" tint="var(--c2)" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index="02" title="Stack" lead="The tools I reach for, grouped by the job they do." />

        <Stagger className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" gap={0.07}>
          {skillGroups.map((group, i) => (
            <motion.div key={group.title} variants={staggerItem} style={{ marginTop: (i % 3) * 14 }}>
              <div
                className="card-tint lift h-full rounded-xl border bg-card/70 p-6 backdrop-blur"
                style={{
                  // @ts-expect-error css var
                  "--tint": tone(i),
                  borderColor: `color-mix(in oklab, ${tone(i)} 32%, transparent)`,
                }}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-2xl tracking-[-0.02em]" style={{ color: tone(i) }}>
                    {group.title}
                  </h3>
                  <span className="shrink-0 font-mono text-[0.6rem] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {group.items.map((item, j) => {
                    const Icon = techIcon(item);
                    return (
                      <Chip key={item} index={i + j}>
                        <Icon size={12} aria-hidden className="shrink-0" />
                        {item}
                      </Chip>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </Stagger>
      </div>

      <div className="relative mt-24 overflow-hidden border-y border-border py-7">
        <div className="animate-marquee flex w-max gap-12 whitespace-nowrap">
          {[...marqueeSkills, ...marqueeSkills].map((s, i) => (
            <span
              key={`${s}-${i}`}
              className="font-display text-3xl tracking-[-0.02em] sm:text-5xl"
              style={{ color: tone(i) }}
            >
              {s}
              <span className="ml-12 opacity-50">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}