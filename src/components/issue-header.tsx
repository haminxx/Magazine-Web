"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function IssueHeader() {
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
    <div className="flex items-center justify-between border-b border-hairline px-4 py-3 text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">
      <Link
        href="/"
        className="link-underline text-[var(--foreground)]"
        aria-label="Back to splash"
      >
        ← 1 + 1 = 3 / Issue 003
      </Link>

      <span className="hidden items-center gap-2 sm:flex">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-blink" />
        On Press
      </span>

      <span className="tabular-nums">{stamp}</span>
    </div>
  );
}
