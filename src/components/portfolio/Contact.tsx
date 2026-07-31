import { useState } from "react";
import { ArrowUpRight, Check, Copy, Download, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { profile } from "@/data/portfolio";
import { Magnetic, Reveal, SectionHeading, tone } from "./primitives";
import { SectionAtmosphere } from "./SectionAtmosphere";

const lines = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
  { label: "LinkedIn", value: "linkedin", href: profile.linkedin },
  { label: "GitHub", value: "github", href: profile.github },
  { label: "LeetCode", value: "leetcode", href: profile.leetcode },
];

const quick = [
  { label: "Resume", icon: Download, href: profile.resumeUrl, download: true },
  { label: "GitHub", icon: Github, href: profile.github },
  { label: "LinkedIn", icon: Linkedin, href: profile.linkedin },
  { label: "Email", icon: Mail, href: `mailto:${profile.email}` },
];

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-44">
      <SectionAtmosphere variant="workspace" tint="var(--c5)" />
      <SectionHeading index="06" title="Contact" />

      <Reveal>
        <h2 className="font-display mt-12 text-balance text-[clamp(2.6rem,8.4vw,7.6rem)] leading-[0.92] tracking-[-0.045em]">
          Let's build something
          <span className="text-rainbow block italic sm:ml-[14%]">impactful together.</span>
        </h2>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[0.66rem] uppercase tracking-[0.2em] text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <MapPin size={13} aria-hidden style={{ color: "var(--c3)" }} />
            {profile.location}
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
                style={{ backgroundColor: "var(--c4)" }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ backgroundColor: "var(--c4)" }}
              />
            </span>
            Available for full-time roles &amp; freelance
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.12}>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quick.map((q, i) => {
            const c = tone(i);
            const Icon = q.icon;
            return (
              <a
                key={q.label}
                href={q.href}
                {...(q.download ? { download: true } : {})}
                target={q.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="card-tint lift group flex items-center justify-between gap-4 rounded-xl border bg-card/60 px-6 py-6 backdrop-blur"
                style={{
                  // @ts-expect-error css var
                  "--tint": c,
                  borderColor: `color-mix(in oklab, ${c} 30%, transparent)`,
                }}
              >
                <span className="inline-flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.18em]">
                  <Icon size={15} aria-hidden style={{ color: c }} />
                  {q.label}
                </span>
                <ArrowUpRight
                  size={15}
                  aria-hidden
                  className="shrink-0 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  style={{ color: c }}
                />
              </a>
            );
          })}
        </div>
      </Reveal>

      <div className="mt-24 grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <Reveal delay={0.1}>
          <p className="font-display max-w-md text-2xl leading-[1.3] tracking-[-0.02em]">
            Got a role, a product idea, or a hard problem? I'd like to hear about it.
          </p>
          <p className="mt-5 max-w-sm text-base leading-[1.75] text-muted-foreground">
            Open to full stack and AI engineering roles, freelance builds, and interesting
            collaborations. I reply to every message — usually within a day.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Magnetic strength={0.22}>
              <a
                href={`mailto:${profile.email}`}
                className="sheen group inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-accent-foreground transition-transform duration-400 hover:-translate-y-0.5"
                style={{
                  backgroundImage:
                    "linear-gradient(120deg, var(--c1), var(--c2) 45%, var(--c5) 75%, var(--c1))",
                  backgroundSize: "220% 220%",
                  animation: "gradient-pan 9s ease infinite",
                }}
              >
                <Mail size={14} /> Start a conversation
              </a>
            </Magnetic>
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3.5 font-mono text-[0.66rem] uppercase tracking-[0.16em] transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied" : "Copy email"}
            </button>
          </div>
          <span aria-live="polite" className="sr-only">
            {copied ? "Email address copied to clipboard" : ""}
          </span>
        </Reveal>

        <Reveal delay={0.18}>
          <ul className="border-t border-border">
            {lines.map((l, i) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-5 border-b border-border py-6 transition-[color,padding] duration-400 hover:pl-3"
                  style={{ ["--hov" as string]: tone(i) }}
                >
                  <span className="shrink-0 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
                    {l.label}
                  </span>
                  <span
                    className="font-display truncate text-2xl tracking-[-0.02em] transition-colors duration-300 group-hover:[color:var(--hov)] sm:text-3xl"
                  >
                    {l.value}
                  </span>
                  <ArrowUpRight
                    size={16}
                    aria-hidden
                    className="shrink-0 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 -translate-x-1"
                    style={{ color: tone(i) }}
                  />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}