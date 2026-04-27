export function MarqueeStrip() {
  return (
    <div className="relative w-full overflow-hidden border-b border-hairline py-3">
      <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap text-[12px] uppercase tracking-[0.28em] text-[var(--muted)]">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className="flex items-center gap-10">
            <span>One Plus One Equals Three</span>
            <span aria-hidden>✦</span>
            <span>A Magazine of Design Excess</span>
            <span aria-hidden>✦</span>
            <span>Issue 003 / 2026</span>
            <span aria-hidden>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
