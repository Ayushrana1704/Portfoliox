import { motion } from "motion/react";
import { Github, ArrowUpRight, Sparkles } from "lucide-react";
import { projects } from "@/data/portfolio";
import { Chip, Magnetic, Reveal, SectionHeading, tone } from "./primitives";
import { Gallery } from "./Gallery";
import { Architecture } from "./Architecture";
import { ProjectMotif } from "./ProjectMotif";
import { techIcon } from "./techIcons";
import { SectionAtmosphere } from "./SectionAtmosphere";

const flowLabel: Record<string, string> = {
  neural: "Hybrid retrieval → RAG pipeline",
  agents: "Multi-agent orchestration flow",
  board: "Application flow",
  chat: "Message flow",
  cart: "Checkout flow",
};

export function Projects() {
  return (
    <section id="work" className="relative mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-40">
      <SectionAtmosphere variant="flow" tint="var(--c1)" />
      <SectionHeading index="03" title="Selected work" lead="Systems, built end to end." />

      <div className="mt-24 space-y-32 sm:mt-28 sm:space-y-40">
        {projects.map((p, i) => {
          const c = tone(i);
          const flipped = i % 2 === 1;
          return (
            <Reveal key={p.title} delay={0.05}>
              <article className="group relative isolate">
                <ProjectMotif motif={p.motif} color={c} />

                {/* ---- masthead: number + title | summary & actions ---- */}
                <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-12">
                  <div className={`min-w-0 lg:col-span-7 ${flipped ? "lg:order-2" : ""}`}>
                    <div className="flex items-start gap-5">
                      <span
                        aria-hidden
                        className="font-display text-rainbow block shrink-0 text-[3.5rem] leading-[0.8] tracking-[-0.05em] opacity-40 sm:text-[6rem]"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0 pt-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <p
                            className="font-mono text-[0.65rem] uppercase tracking-[0.22em]"
                            style={{ color: c }}
                          >
                            {p.kicker}
                          </p>
                          {p.featured ? (
                            <span
                              className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.2em]"
                              style={{
                                color: c,
                                borderColor: `color-mix(in oklab, ${c} 55%, transparent)`,
                                backgroundColor: `color-mix(in oklab, ${c} 12%, transparent)`,
                              }}
                            >
                              <Sparkles size={11} aria-hidden /> Featured
                            </span>
                          ) : null}
                        </div>
                        <h3 className="font-display mt-3 text-balance text-4xl leading-[1.02] tracking-[-0.03em] sm:text-6xl">
                          {p.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className={`min-w-0 lg:col-span-5 ${flipped ? "lg:order-1" : ""}`}>
                    <p className="text-base leading-[1.75] text-muted-foreground">
                      {p.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Magnetic strength={0.22}>
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${p.title} — GitHub repository`}
                          className="inline-flex items-center gap-2 rounded-full border px-5 py-3 font-mono text-[0.66rem] uppercase tracking-[0.16em] transition-[transform,background-color] duration-400 hover:-translate-y-0.5"
                          style={{
                            color: c,
                            borderColor: `color-mix(in oklab, ${c} 45%, transparent)`,
                            backgroundColor: `color-mix(in oklab, ${c} 6%, transparent)`,
                          }}
                        >
                          <Github size={14} /> Repository
                        </a>
                      </Magnetic>
                      {p.demo ? (
                        <Magnetic strength={0.22}>
                          <a
                            href={p.demo}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${p.title} — live demo`}
                            className="sheen group/cta inline-flex items-center gap-2 rounded-full px-5 py-3 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-accent-foreground transition-[transform,box-shadow] duration-400 hover:-translate-y-0.5"
                            style={{
                              backgroundImage: `linear-gradient(120deg, ${c}, ${tone(i + 2)}, ${c})`,
                              backgroundSize: "220% 220%",
                              boxShadow: `0 14px 34px -22px ${c}`,
                            }}
                          >
                            Live Demo
                            <ArrowUpRight
                              size={14}
                              className="transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                            />
                          </a>
                        </Magnetic>
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* ---- the product, front and centre ---- */}
                {p.images.length > 0 ? (
                  <div className="mt-14 sm:mt-16">
                    <Gallery images={p.images} index={i} title={p.title} />
                  </div>
                ) : null}

                {/* ---- case study detail ---- */}
                <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-12">
                  <div className={`min-w-0 lg:col-span-5 ${flipped ? "lg:order-2" : ""}`}>
                    <dl
                      className="space-y-7 border-l-2 pl-5"
                      style={{ borderColor: `color-mix(in oklab, ${c} 40%, transparent)` }}
                    >
                      <div>
                        <dt className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-muted-foreground">
                          Problem
                        </dt>
                        <dd className="mt-2 text-sm leading-[1.7] sm:text-[0.95rem]">
                          {p.problem}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-muted-foreground">
                          Solution
                        </dt>
                        <dd className="mt-2 text-sm leading-[1.7] sm:text-[0.95rem]">
                          {p.solution}
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-8 pl-5">
                      <p className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-muted-foreground">
                        Technologies
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2.5">
                        {p.tech.map((t, j) => {
                          const Icon = techIcon(t);
                          return (
                            <Chip key={t} index={i + j}>
                              <Icon size={12} aria-hidden className="shrink-0" />
                              {t}
                            </Chip>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className={`min-w-0 lg:col-span-7 ${flipped ? "lg:order-1" : ""}`}>
                    <div
                      className="card-tint lift rounded-2xl border bg-card/60 p-7 backdrop-blur"
                      style={{
                        // @ts-expect-error css var
                        "--tint": c,
                        borderColor: `color-mix(in oklab, ${c} 30%, transparent)`,
                        boxShadow: `0 24px 80px -56px ${c}`,
                      }}
                    >
                      <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground">
                        Key features
                      </p>
                      <motion.ul
                        className="mt-6 grid gap-4 sm:grid-cols-2"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-60px" }}
                        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
                      >
                        {p.features.map((f) => (
                          <motion.li
                            key={f}
                            variants={{
                              hidden: { opacity: 0, x: -10 },
                              show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                            }}
                            className="flex min-w-0 gap-3 text-sm leading-[1.7]"
                          >
                            <span
                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                              style={{ backgroundColor: c }}
                            />
                            <span className="min-w-0">{f}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </div>
                  </div>
                </div>

                {/* ---- workflow, full width ---- */}
                {p.architecture ? (
                  <div className="mt-8">
                    <Architecture
                      steps={p.architecture}
                      index={i}
                      label={flowLabel[p.motif] ?? "Workflow"}
                    />
                  </div>
                ) : null}

                {/* ---- transition rule into the next project ---- */}
                {i < projects.length - 1 ? (
                  <div
                    aria-hidden
                    className="mx-auto mt-20 h-px w-2/3 sm:mt-24"
                    style={{
                      background: `linear-gradient(90deg, transparent, color-mix(in oklab, ${tone(i + 1)} 45%, transparent), transparent)`,
                    }}
                  />
                ) : null}
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
