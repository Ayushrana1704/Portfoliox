import { ArrowUp } from "lucide-react";
import { motion } from "motion/react";
import { profile } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div aria-hidden className="rule-rainbow absolute inset-x-0 -top-px h-px opacity-40" />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-10 sm:px-8"
      >
        <p className="min-w-0 truncate font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
          © {new Date().getFullYear()} {profile.name} — Designed & built from scratch
        </p>
        <a
          href="#top"
          className="underline-sweep group inline-flex shrink-0 items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-accent"
        >
          Top
          <ArrowUp size={13} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
        </a>
      </motion.div>
    </footer>
  );
}