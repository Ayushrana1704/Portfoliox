import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight, Download, Mail } from "lucide-react";
import { profile } from "@/data/portfolio";
import heroWorkstation from "@/assets/hero-workstation.jpg";
import { EASE, Magnetic } from "./primitives";
import { BootTerminal } from "./BootTerminal";

const up = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

export function Hero() {
  // pointer parallax — normalised -0.5..0.5
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 90, damping: 20, mass: 0.6 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);

  const glowX = useTransform(sx, (v) => `${50 + v * 26}%`);
  const glowY = useTransform(sy, (v) => `${42 + v * 0 + v * 14}%`);
  const titleX = useTransform(sx, (v) => v * -18);
  const titleY = useTransform(sy, (v) => v * -10);
  const figX = useTransform(sx, (v) => v * 34);
  const figY = useTransform(sy, (v) => v * 22);
  const figRotate = useTransform(sx, (v) => v * 6);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: PointerEvent) => {
      px.set(e.clientX / window.innerWidth - 0.5);
      py.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py]);

  return (
    <section
      id="top"
      className="relative mx-auto max-w-7xl px-5 pb-20 pt-36 sm:px-8 sm:pb-28 sm:pt-48"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24 bottom-0 -z-10"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) =>
              `radial-gradient(ellipse 72% 62% at ${gx} ${gy}, color-mix(in oklab, var(--color-background) 82%, transparent), transparent 74%)`,
          ),
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -z-10 h-[42vw] w-[42vw] rounded-full blur-[130px]"
        style={{
          left: glowX,
          top: glowY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: 0.16,
          background: "radial-gradient(circle, var(--c1), transparent 68%)",
        }}
      />

      <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }}>
        <motion.p
          variants={up}
          className="text-rainbow font-mono text-[0.7rem] font-semibold uppercase tracking-[0.34em]"
        >
          {profile.role}
        </motion.p>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-14">
          <div className="min-w-0">
          <motion.h1
            style={{ x: titleX, y: titleY }}
            className="font-display text-[clamp(3.4rem,15vw,13rem)] leading-[0.82] tracking-[-0.045em]"
          >
            <motion.span variants={up} className="block">
              {profile.firstName}
            </motion.span>
            <motion.span variants={up} className="text-rainbow block italic sm:ml-[12%]">
              {profile.lastName}
            </motion.span>
          </motion.h1>

          <motion.div variants={up} className="mt-12 max-w-xl sm:mt-14">
            <div className="rule-rainbow mb-7 w-full" />
            <p className="font-display text-2xl leading-[1.3] tracking-[-0.02em] sm:text-3xl">
              {profile.tagline}
            </p>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              Production web platforms, hybrid-retrieval AI systems and the infrastructure that keeps
              them fast under real load.
            </p>
          </motion.div>
          </div>

          <motion.figure
            variants={up}
            style={{ x: figX, y: figY, rotate: figRotate }}
            className="relative m-0 w-full max-w-[20rem] justify-self-end self-start lg:mt-2"
          >
            <div
              className="overflow-hidden rounded-2xl border bg-card/40 p-2 backdrop-blur-sm transition-shadow duration-500 hover:shadow-2xl"
              style={{
                borderColor: "color-mix(in oklab, var(--c1) 35%, transparent)",
                boxShadow: "0 34px 90px -40px color-mix(in oklab, var(--c1) 75%, transparent)",
              }}
            >
              <img
                src={heroWorkstation}
                width={1024}
                height={1280}
                alt="Night-time engineering workstation: code editor, retrieval-pipeline architecture diagram, terminal logs and hand-drawn API sketches under warm desk lighting"
                className="aspect-[4/5] w-full rounded-xl object-cover"
              />
            </div>
            <div className="mt-4">
              <BootTerminal />
            </div>
            <figcaption className="mt-4 text-right font-mono text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground">
              The stack, running locally
            </figcaption>
          </motion.figure>
        </div>

        <motion.div variants={up} className="mt-12 max-w-xl">
          <div className="flex flex-wrap gap-3">
            <Magnetic>
              <a
                href="#work"
                className="sheen group inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-accent-foreground transition-[transform,box-shadow] duration-400 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-20px_var(--c1)]"
                style={{
                  backgroundImage:
                    "linear-gradient(120deg, var(--c1), var(--c2) 45%, var(--c5) 75%, var(--c1))",
                  backgroundSize: "220% 220%",
                  animation: "gradient-pan 9s ease infinite",
                }}
              >
                View Projects
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.resumeUrl}
                download
                className="group inline-flex items-center gap-2 rounded-full border px-6 py-3.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] transition-[transform,background-color,box-shadow] duration-400 hover:-translate-y-0.5"
                style={{
                  color: "var(--c3)",
                  borderColor: "color-mix(in oklab, var(--c3) 50%, transparent)",
                  backgroundColor: "color-mix(in oklab, var(--c3) 6%, transparent)",
                }}
              >
                <Download size={14} className="transition-transform duration-300 group-hover:translate-y-0.5" />
                Resume
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border px-6 py-3.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] transition-[transform,background-color] duration-400 hover:-translate-y-0.5"
                style={{
                  color: "var(--c4)",
                  borderColor: "color-mix(in oklab, var(--c4) 50%, transparent)",
                  backgroundColor: "color-mix(in oklab, var(--c4) 6%, transparent)",
                }}
              >
                <Mail size={14} /> Contact
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="mt-16 flex items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground"
      >
        <ArrowDown size={13} className="animate-bounce" />
        Scroll
      </motion.div>
    </section>
  );
}