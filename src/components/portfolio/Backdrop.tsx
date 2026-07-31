import wallpaper from "@/assets/hacker-desk.png.asset.json";

export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden grain">
      <div className="absolute inset-0 bg-background" />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.13] dark:opacity-[0.4]"
        style={{
          backgroundImage: `url(${wallpaper.url})`,
          maskImage: "radial-gradient(ellipse 90% 70% at 50% 22%, black 5%, transparent 80%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, color-mix(in oklab, var(--color-background) 55%, transparent) 0%, color-mix(in oklab, var(--color-background) 20%, transparent) 30%, color-mix(in oklab, var(--color-background) 85%, transparent) 68%, var(--color-background) 100%)",
        }}
      />
      {[
        { c: "var(--c1)", cls: "-left-[15%] top-[-10%] h-[60vw] w-[60vw] blur-[140px]", d: "0s", o: 0.16 },
        { c: "var(--c2)", cls: "right-[-20%] top-[18%] h-[55vw] w-[55vw] blur-[150px]", d: "-9s", o: 0.12 },
        { c: "var(--c3)", cls: "bottom-[-25%] left-[18%] h-[65vw] w-[65vw] blur-[160px]", d: "-17s", o: 0.12 },
        { c: "var(--c4)", cls: "left-[45%] top-[48%] h-[45vw] w-[45vw] blur-[150px]", d: "-5s", o: 0.1 },
        { c: "var(--c5)", cls: "right-[8%] bottom-[6%] h-[42vw] w-[42vw] blur-[140px]", d: "-22s", o: 0.1 },
      ].map((orb) => (
        <div
          key={orb.c}
          className={`animate-orb absolute rounded-full ${orb.cls}`}
          style={{
            background: `radial-gradient(circle, ${orb.c}, transparent 70%)`,
            opacity: orb.o,
            animationDelay: orb.d,
          }}
        />
      ))}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
          maskImage: "radial-gradient(ellipse at 50% 0%, black, transparent 78%)",
        }}
      />
    </div>
  );
}