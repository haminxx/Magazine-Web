"use client";

import { useState, type MouseEvent } from "react";
import type { DuotoneVariant } from "../lib/duotone";

type Props = {
  variants: DuotoneVariant[];
  size?: number;
};

export function DuotoneGallery({ variants, size = 550 }: Props) {
  const [idx, setIdx] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPos({ x, y });
    const i = Math.floor((x / rect.width) * variants.length);
    setIdx(Math.max(0, Math.min(variants.length - 1, i)));
  };

  if (variants.length === 0) return null;
  const current = variants[idx];

  return (
    <div className="relative">
      <div
        className="relative aspect-square overflow-hidden border border-[var(--line)] bg-[var(--background)] shadow-sm cursor-none"
        style={{ width: `min(${size}px, 86vw)` }}
        onMouseMove={onMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current.url}
          alt={current.label}
          className="h-full w-full object-cover transition-opacity duration-150 ease-out"
          draggable={false}
        />

        {hover && (
          <div
            className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2"
            style={{ left: pos.x, top: pos.y }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/20 shadow-lg backdrop-blur-md">
              <div className="flex items-center space-x-1 text-white">
                <svg
                  className="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <svg
                  className="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Variant label */}
        <div className="pointer-events-none absolute bottom-3 left-3 z-10 helv text-[10px] uppercase tracking-[0.28em] text-white mix-blend-difference">
          &ldquo;{current.label.toUpperCase()}&rdquo;{" "}
          <span className="opacity-70">
            — {String(idx + 1).padStart(2, "0")} / {String(variants.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}
