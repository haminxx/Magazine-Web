"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ProgressiveBlur } from "./progressive-blur";

export type MagazineItem = {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  year: string;
  category: string;
  cover: {
    bg: string;
    accent: string;
    text: string;
    pattern?: "lines" | "grid" | "dots" | "halftone" | "blob";
    label?: string;
  };
};

export function MagazineCard({ item, index }: { item: MagazineItem; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.04, ease: "easeOut" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative flex flex-col"
    >
      {/* Cover */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-hairline bg-neutral-900">
        <CoverArt item={item} />

        {/* Index number */}
        <div className="absolute left-2 top-2 z-10 text-[10px] uppercase tracking-[0.28em] text-white/70 mix-blend-difference">
          № {String(index + 1).padStart(3, "0")}
        </div>

        {/* Category pill */}
        <div className="absolute right-2 top-2 z-10 border border-white/30 bg-black/30 px-1.5 py-[2px] text-[9px] uppercase tracking-[0.22em] text-white/90 backdrop-blur-sm">
          {item.category}
        </div>

        {/* Progressive blur reveal — appears from bottom on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="blur"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute inset-x-0 bottom-0 z-20 h-3/5"
            >
              <ProgressiveBlur
                direction="bottom"
                blurLayers={8}
                blurIntensity={0.5}
                className="absolute inset-0"
              />
              {/* Dim overlay so text is legible on light covers */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              <div className="relative z-10 flex h-full flex-col justify-end gap-2 p-4 text-white">
                <div className="text-[9px] uppercase tracking-[0.32em] opacity-80">
                  Read · {item.year}
                </div>
                <h3 className="font-serif text-2xl leading-[1.05]">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="text-[11px] uppercase tracking-[0.2em] opacity-80">
                    {item.subtitle}
                  </p>
                )}
                <div className="mt-1 flex items-center justify-between text-[10px] uppercase tracking-[0.24em]">
                  <span>{item.author}</span>
                  <span className="inline-flex items-center gap-1">
                    Open
                    <span aria-hidden>↗</span>
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Caption */}
      <div className="mt-3 flex flex-col gap-0.5">
        <h4 className="font-serif text-[15px] leading-tight text-[var(--foreground)]">
          {item.title}
        </h4>
        <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
          {item.author}
        </p>
      </div>
    </motion.article>
  );
}

function CoverArt({ item }: { item: MagazineItem }) {
  const { bg, accent, text, pattern = "lines", label } = item.cover;

  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundColor: bg,
        color: text,
      }}
    >
      {/* pattern layer */}
      {pattern === "lines" && (
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `repeating-linear-gradient(135deg, ${accent} 0 1px, transparent 1px 8px)`,
          }}
        />
      )}
      {pattern === "grid" && (
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `linear-gradient(${accent} 1px, transparent 1px), linear-gradient(90deg, ${accent} 1px, transparent 1px)`,
            backgroundSize: "16px 16px",
          }}
        />
      )}
      {pattern === "dots" && (
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `radial-gradient(${accent} 1px, transparent 1.4px)`,
            backgroundSize: "10px 10px",
          }}
        />
      )}
      {pattern === "halftone" && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(${accent} 1px, transparent 1.6px), radial-gradient(${accent} 1px, transparent 1.6px)`,
            backgroundSize: "8px 8px, 8px 8px",
            backgroundPosition: "0 0, 4px 4px",
            opacity: 0.55,
          }}
        />
      )}
      {pattern === "blob" && (
        <>
          <div
            className="absolute -left-10 -top-10 h-56 w-56 rounded-full blur-3xl"
            style={{ background: accent, opacity: 0.55 }}
          />
          <div
            className="absolute -right-12 bottom-0 h-72 w-72 rounded-full blur-3xl"
            style={{ background: accent, opacity: 0.35 }}
          />
        </>
      )}

      {/* Frame text — title on cover */}
      <div className="absolute inset-0 flex flex-col justify-between p-4">
        <div className="flex items-start justify-between text-[10px] uppercase tracking-[0.28em] opacity-80">
          <span>{label ?? "1+1=3"}</span>
          <span>{item.year}</span>
        </div>
        <div>
          <div className="font-serif text-[26px] leading-[0.95]">
            {item.title}
          </div>
          {item.subtitle && (
            <div className="mt-1 text-[10px] uppercase tracking-[0.24em] opacity-80">
              {item.subtitle}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
