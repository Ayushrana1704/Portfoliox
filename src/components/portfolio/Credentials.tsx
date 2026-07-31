import { Award, BadgeCheck, Users } from "lucide-react";
import { achievements, certifications, leadership } from "@/data/portfolio";
import { Reveal, SectionHeading, tone } from "./primitives";

type Item = { title: string; detail: string; href?: string };

const columns: { title: string; icon: typeof Award; items: Item[] }[] = [
  {
    title: "Certifications",
    icon: BadgeCheck,
    items: certifications.map((c) => ({ title: c.title, detail: c.issuer, href: c.href })),
  },
  { title: "Achievements", icon: Award, items: achievements },
  { title: "Leadership", icon: Users, items: leadership },
];

export function Credentials() {
  return (
    <section id="credentials" className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading index="04" title="Credentials" lead="Certified, ranked, and occasionally in charge." />

      <div className="mt-16 grid gap-10 lg:grid-cols-3">
        {columns.map((col, ci) => (
          <Reveal key={col.title} delay={ci * 0.08}>
            <div style={{ transform: `translateY(${ci * 22}px)` }}>
              <div
                className="flex items-center gap-3 border-b-2 pb-4"
                style={{ borderColor: `color-mix(in oklab, ${tone(ci)} 55%, transparent)` }}
              >
                <col.icon size={16} className="shrink-0" style={{ color: tone(ci) }} />
                <h3
                  className="font-mono text-[0.68rem] uppercase tracking-[0.22em]"
                  style={{ color: tone(ci) }}
                >
                  {col.title}
                </h3>
              </div>
              <ul className="mt-6 space-y-6">
                {col.items.map((item) => (
                  <li key={item.title} className="min-w-0">
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="underline-sweep font-display inline-block text-xl leading-tight tracking-[-0.02em] transition-colors duration-300 hover:text-accent sm:text-2xl"
                      >
                        {item.title}
                      </a>
                    ) : (
                      <p className="font-display text-xl leading-tight tracking-[-0.02em] sm:text-2xl">
                        {item.title}
                      </p>
                    )}
                    <p className="mt-1.5 text-sm text-muted-foreground">{item.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}