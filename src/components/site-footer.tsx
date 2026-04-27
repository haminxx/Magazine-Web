export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="border-t border-hairline px-4 py-16"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-7">
          <div className="text-[10px] uppercase tracking-[0.32em] text-[var(--muted)]">
            Get in touch
          </div>
          <h3 className="mt-3 font-serif text-4xl leading-[0.95] sm:text-6xl">
            Coffee, beer, or a folded letter — say hi.
          </h3>
          <a
            href="mailto:hello@oneplusoneequalsthree.press"
            className="mt-6 inline-flex items-center gap-3 border-b border-[var(--foreground)] pb-1 text-[12px] uppercase tracking-[0.28em]"
          >
            hello@oneplusoneequalsthree.press
            <span aria-hidden>↗</span>
          </a>
        </div>

        <div className="col-span-6 md:col-span-3">
          <div className="text-[10px] uppercase tracking-[0.32em] text-[var(--muted)]">
            Elsewhere
          </div>
          <ul className="mt-4 space-y-2 text-[12px] uppercase tracking-[0.22em]">
            <li>
              <a href="#" className="link-underline">Bluesky</a>
            </li>
            <li>
              <a href="#" className="link-underline">Threads</a>
            </li>
            <li>
              <a href="#" className="link-underline">Are.na</a>
            </li>
            <li>
              <a href="#" className="link-underline">RSS</a>
            </li>
          </ul>
        </div>

        <div className="col-span-6 md:col-span-2">
          <div className="text-[10px] uppercase tracking-[0.32em] text-[var(--muted)]">
            Colophon
          </div>
          <ul className="mt-4 space-y-2 text-[12px] uppercase tracking-[0.22em] text-[var(--muted)]">
            <li>Set in JetBrains Mono</li>
            <li>Display: UnifrakturMaguntia</li>
            <li>Body serif: Instrument</li>
            <li>Built with Next.js</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-7xl items-center justify-between border-t border-hairline pt-6 text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">
        <span>1 + 1 = 3 — A magazine of design excess</span>
        <span>© 2026 — All wrongs reserved</span>
      </div>
    </footer>
  );
}
