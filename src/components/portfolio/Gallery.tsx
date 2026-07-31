import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { tone } from "./primitives";

type GalleryProps = {
  images: string[];
  index: number;
  title: string;
};

const EASE = [0.16, 1, 0.3, 1] as const;

export function Gallery({ images, index, title }: GalleryProps) {
  const c = tone(index);
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);
  const frameRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // subtle pointer tilt
  const tx = useMotionValue(0);
  const ty = useMotionValue(0);
  const rotateY = useSpring(useTransform(tx, [-0.5, 0.5], [-6, 6]), {
    stiffness: 180,
    damping: 20,
  });
  const rotateX = useSpring(useTransform(ty, [-0.5, 0.5], [5, -5]), {
    stiffness: 180,
    damping: 20,
  });

  const count = images.length;
  const multiple = count > 1;

  const go = useCallback(
    (next: number) => {
      const wrapped = (next + count) % count;
      setDirection(next > active ? 1 : -1);
      setActive(wrapped);
    },
    [count, active],
  );

  // keyboard nav when the frame is focused
  useEffect(() => {
    const el = frameRef.current;
    if (!el || !multiple) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setDirection(1);
        setActive((a) => (a + 1) % count);
      } else if (e.key === "ArrowLeft") {
        setDirection(-1);
        setActive((a) => (a - 1 + count) % count);
      }
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [count, multiple]);

  if (count === 0) return null;

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 48 : -48, scale: 0.98 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -48 : 48, scale: 0.98 }),
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: EASE }}
      onPointerMove={(e) => {
        const el = cardRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        tx.set((e.clientX - r.left) / r.width - 0.5);
        ty.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        tx.set(0);
        ty.set(0);
      }}
      className="card-tint relative overflow-hidden rounded-xl border bg-card/70 shadow-2xl backdrop-blur"
      style={{
        // @ts-expect-error css var
        "--tint": c,
        rotateX,
        rotateY,
        transformPerspective: 1100,
        borderColor: `color-mix(in oklab, ${c} 35%, transparent)`,
        boxShadow: `0 48px 120px -52px ${c}, 0 8px 30px -18px color-mix(in oklab, black 60%, transparent)`,
      }}
    >
      {/* browser chrome */}
      <div className="flex items-center gap-2 border-b border-border/60 bg-background/50 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: c }} />
        <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
        <span className="ml-3 truncate font-mono text-[0.58rem] uppercase tracking-[0.16em] text-muted-foreground">
          {title}
        </span>
      </div>

      {/* main stage */}
      <div
        ref={frameRef}
        role="group"
        aria-roledescription="carousel"
        aria-label={`${title} screenshots`}
        tabIndex={multiple ? 0 : -1}
        className="group/stage relative aspect-[16/9] w-full overflow-hidden bg-muted/30 outline-none"
      >
        <AnimatePresence custom={direction} initial={false} mode="popLayout">
          <motion.img
            key={active}
            src={images[active]}
            alt={`${title} — screenshot ${active + 1} of ${count}`}
            className="absolute inset-0 h-full w-full object-cover object-top"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: EASE }}
            loading="lazy"
            draggable={false}
          />
        </AnimatePresence>

        {/* tint sheen */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-20 mix-blend-soft-light"
          style={{
            backgroundImage: `linear-gradient(135deg, ${c}, transparent 55%)`,
          }}
        />

        {/* controls */}
        {multiple ? (
          <>
            <button
              type="button"
              aria-label="Previous screenshot"
              onClick={() => go(active - 1)}
              className="absolute left-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-border/70 bg-background/70 text-foreground backdrop-blur transition-all hover:scale-110 hover:bg-background"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              type="button"
              aria-label="Next screenshot"
              onClick={() => go(active + 1)}
              className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-border/70 bg-background/70 text-foreground backdrop-blur transition-all hover:scale-110 hover:bg-background"
            >
              <ChevronRight size={15} />
            </button>

            {/* counter */}
            <div className="absolute right-2 top-2 rounded-full border border-border/70 bg-background/70 px-2.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
              <span style={{ color: c }}>{String(active + 1).padStart(2, "0")}</span>
              <span className="opacity-50"> / {String(count).padStart(2, "0")}</span>
            </div>
          </>
        ) : null}
      </div>

      {/* thumbnail strip */}
      {multiple ? (
        <div className="flex gap-2 border-t border-border/60 p-2">
          {images.map((img, i) => (
            <button
              key={img + i}
              type="button"
              aria-label={`Go to screenshot ${i + 1}`}
              aria-current={i === active ? "true" : undefined}
              onClick={() => {
                setDirection(i > active ? 1 : -1);
                setActive(i);
              }}
              className="relative h-11 w-[4.25rem] shrink-0 overflow-hidden rounded-md border transition-all"
              style={{
                borderColor:
                  i === active
                    ? c
                    : "color-mix(in oklab, var(--border) 70%, transparent)",
                opacity: i === active ? 1 : 0.5,
              }}
            >
              <img
                src={img}
                alt=""
                className="h-full w-full object-cover object-top"
                loading="lazy"
                draggable={false}
              />
            </button>
          ))}
        </div>
      ) : null}
    </motion.div>
  );
}
