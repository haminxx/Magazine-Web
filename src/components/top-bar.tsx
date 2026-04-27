"use client";

import { useEffect, useState } from "react";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function TopBar() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const stamp = now
    ? `${now.getFullYear()}.${pad(now.getMonth() + 1)}.${pad(
        now.getDate()
      )} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(
        now.getSeconds()
      )} PDT`
    : "0000.00.00 00:00:00 PDT";

  return (
    <div className="sticky top-0 z-50 w-full border-b border-hairline bg-[var(--background)]/80 backdrop-blur-md">
      {/* Ticker / status ribbon */}
      <div className="grid grid-cols-12 items-center gap-2 border-b border-hairline px-4 py-1.5 text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
        <span className="col-span-3 flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-blink" />
          Issue No. 003 / On Press
        </span>
        <span className="col-span-3 hidden md:block">
          One Plus One Equals Three
        </span>
        <span className="col-span-3 hidden md:block">
          Print · Pixel · In-Between
        </span>
        <span className="col-span-12 md:col-span-3 text-right tabular-nums">
          {stamp}
        </span>
      </div>

      {/* Nav row */}
      <div className="flex items-center justify-between px-4 py-3 text-[11px] uppercase tracking-[0.2em]">
        <nav className="flex items-center gap-5">
          <a href="#index" className="link-underline">
            Index
          </a>
          <a href="#work" className="link-underline">
            Issues
          </a>
          <a href="#about" className="link-underline">
            About
          </a>
          <a href="#blog" className="hidden sm:inline link-underline">
            Field Notes
          </a>
          <a href="#contact" className="hidden sm:inline link-underline">
            Contact
          </a>
        </nav>
        <div className="hidden md:flex items-center gap-3 text-[var(--muted)]">
          <span>Dark.Mode</span>
          <span className="opacity-50">|</span>
          <span className="opacity-50">Bright.Mode</span>
          <span className="opacity-50">|</span>
          <span className="opacity-50">System.Mode</span>
        </div>
        <a
          href="#listen"
          className="flex items-center gap-2 text-[var(--foreground)]"
        >
          <span>Play Audio</span>
          <span aria-hidden>▸</span>
        </a>
      </div>
    </div>
  );
}
