import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function useTheme() {
  const [dark, setDark] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("ar-theme");
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefers;
    setDark(isDark);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("ar-theme", dark ? "dark" : "light");
  }, [dark, ready]);

  return { dark, toggle: () => setDark((d) => !d) };
}

export function ThemeToggle() {
  const { dark, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle colour theme"
      className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur transition-colors hover:border-accent hover:text-accent"
    >
      {dark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}