import { Github, Linkedin, Code2, Globe, Download, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/portfolio";
import { Reveal, SectionHeading, tone } from "./primitives";

const cards = [
  { label: "GitHub", href: profile.github, icon: Github, note: "Source & experiments" },
  { label: "LeetCode", href: profile.leetcode, icon: Code2, note: "Problem solving" },
  { label: "LinkedIn", href: profile.linkedin, icon: Linkedin, note: "Professional" },
  { label: "Portfolio", href: profile.portfolio, icon: Globe, note: "This site" },
  { label: "Resume", href: profile.resumeUrl, icon: Download, note: "PDF download" },
];

export function Profiles() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading index="05" title="Profiles" />

      <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((c, i) => (
          <Reveal key={c.label} delay={i * 0.05} className="bg-card">
            <a
              href={c.href}
              target={c.label === "Resume" ? undefined : "_blank"}
              rel="noreferrer"
              download={c.label === "Resume" ? true : undefined}
              className="card-tint group flex h-full flex-col justify-between gap-10 p-6 transition-transform duration-500 hover:-translate-y-1"
              // @ts-expect-error css var
              style={{ "--tint": tone(i) }}
            >
              <c.icon
                size={20}
                className="shrink-0 transition-transform duration-500 group-hover:scale-110"
                style={{ color: tone(i) }}
              />
              <div className="min-w-0">
                <p className="font-display text-2xl tracking-[-0.02em]" style={{ color: tone(i) }}>
                  {c.label}
                </p>
                <p className="mt-1.5 flex items-center gap-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] opacity-60 transition-opacity duration-300 group-hover:opacity-100">
                  {c.note}
                  <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </p>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}