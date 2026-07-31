import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * Soft follower circle. Purely decorative — the native cursor stays visible
 * so pointer affordances and accessibility are unaffected.
 */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 320, damping: 30, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 320, damping: 30, mass: 0.5 });

  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const el = e.target as HTMLElement | null;
      setHot(Boolean(el?.closest("a, button, [role='button'], input, textarea, select")));
    };
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden lg:block"
      style={{ x: sx, y: sy }}
    >
      <motion.span
        className="block rounded-full border"
        animate={{
          width: hot ? 44 : 22,
          height: hot ? 44 : 22,
          opacity: visible ? (hot ? 0.9 : 0.5) : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        style={{
          marginLeft: "-50%",
          marginTop: "-50%",
          translateX: "-0%",
          borderColor: "color-mix(in oklab, var(--c1) 70%, transparent)",
          backgroundColor: "color-mix(in oklab, var(--c1) 12%, transparent)",
          backdropFilter: "blur(1px)",
        }}
      />
    </motion.div>
  );
}
