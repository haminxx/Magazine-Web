"use client";

import { useTheme } from "./theme-provider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div
        aria-hidden
        className={
          "h-[18px] w-[88px] opacity-0 " + className
        }
      />
    );
  }

  return (
    <div
      role="group"
      aria-label="Theme"
      className={
        "helv flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-[var(--muted)] " +
        className
      }
    >
      <button
        type="button"
        onClick={() => setTheme("light")}
        aria-pressed={theme === "light"}
        className={
          "transition-colors hover:text-[var(--foreground)] " +
          (theme === "light"
            ? "text-[var(--foreground)] underline underline-offset-4"
            : "")
        }
      >
        Bright
      </button>
      <span aria-hidden className="opacity-40">
        /
      </span>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        aria-pressed={theme === "dark"}
        className={
          "transition-colors hover:text-[var(--foreground)] " +
          (theme === "dark"
            ? "text-[var(--foreground)] underline underline-offset-4"
            : "")
        }
      >
        Dark
      </button>
    </div>
  );
}
