import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Menu, X, Download } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { profile } from "@/data/portfolio";
import { EASE, Magnetic } from "./primitives";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#work", label: "Work" },
  { href: "#credentials", label: "Credentials" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // active section highlighting
  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border bg-background/70 shadow-[0_10px_40px_-32px_var(--c1)] backdrop-blur-2xl"
          : "border-b border-transparent"
      }`}
    >
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px origin-left"
        style={{
          scaleX: progress,
          backgroundImage: "linear-gradient(to right, var(--c1), var(--c2), var(--c5), var(--c3))",
        }}
      />
      <nav className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 sm:px-8">
        <a href="#top" className="group flex min-w-0 items-baseline gap-2">
          <span className="font-display truncate text-xl tracking-[-0.02em]">{profile.name}</span>
          <span className="hidden font-mono text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground sm:inline">
            Full Stack
          </span>
        </a>

        <div className="flex shrink-0 items-center gap-1.5">
          <ul className="mr-3 hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  data-active={active === l.href}
                  aria-current={active === l.href ? "true" : undefined}
                  className="underline-sweep font-mono text-[0.68rem] uppercase tracking-[0.18em] transition-colors duration-300 data-[active=true]:text-accent text-muted-foreground hover:text-accent"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <Magnetic strength={0.2} className="hidden sm:inline-flex">
            <a
              href={profile.resumeUrl}
              download
              className="sheen inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-accent-foreground transition-[transform,box-shadow] duration-400 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-18px_var(--c1)]"
            >
              <Download size={13} /> Resume
            </a>
          </Magnetic>
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-background/70 backdrop-blur transition-colors hover:border-accent hover:text-accent lg:hidden"
          >
            {open ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>
      </nav>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <motion.ul
              className="mx-auto flex max-w-7xl flex-col px-5 py-3 sm:px-8"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } } }}
            >
              {[...links, { href: profile.resumeUrl, label: "Resume" }].map((l) => (
                <motion.li
                  key={l.href}
                  variants={{
                    hidden: { opacity: 0, x: -14 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE } },
                  }}
                >
                  <a
                    href={l.href}
                    download={l.label === "Resume" ? true : undefined}
                    onClick={() => setOpen(false)}
                    data-active={active === l.href}
                    className={`font-display block border-b border-border/60 py-4 text-2xl tracking-[-0.02em] transition-colors duration-300 data-[active=true]:text-accent ${
                      l.label === "Resume" ? "border-b-0 text-accent" : ""
                    }`}
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}