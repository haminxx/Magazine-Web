"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Mouse position relative to viewport center, used for subtle parallax.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.8 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.8 });

  // Translate ranges per layer
  const portraitX = useTransform(sx, [-1, 1], [-22, 22]);
  const portraitY = useTransform(sy, [-1, 1], [-14, 14]);
  const portraitRot = useTransform(sx, [-1, 1], [-2.2, 2.2]);

  const labelLeftX = useTransform(sx, [-1, 1], [10, -10]);
  const labelRightX = useTransform(sx, [-1, 1], [-10, 10]);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mx.set((e.clientX / w) * 2 - 1);
      my.set((e.clientY / h) * 2 - 1);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [mx, my]);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden border-b border-hairline"
    >
      {/* huge editorial title strip */}
      <div className="relative pt-10 pb-2">
        <h1
          className="select-none whitespace-nowrap text-center font-display leading-none tracking-tight text-[var(--accent)]"
          style={{
            fontSize: "clamp(64px, 16vw, 240px)",
          }}
        >
          One+One=Three
        </h1>
        <p className="mt-2 text-center text-[11px] uppercase tracking-[0.32em] text-[var(--muted)]">
          (AKA the *unhinged* magazine of design, type & image — Issue 003)
        </p>
      </div>

      {/* Floating portrait stage */}
      <div className="relative mx-auto flex h-[58vh] min-h-[420px] w-full max-w-6xl items-center justify-center px-6">
        {/* registration corners */}
        <Corner className="absolute left-6 top-6" />
        <Corner className="absolute right-6 top-6 rotate-90" />
        <Corner className="absolute left-6 bottom-6 -rotate-90" />
        <Corner className="absolute right-6 bottom-6 rotate-180" />

        {/* Side caption left */}
        <motion.div
          style={{ x: labelLeftX }}
          className="absolute left-6 top-1/2 hidden -translate-y-1/2 text-[10px] uppercase tracking-[0.28em] text-[var(--muted)] sm:block"
        >
          <div className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 bg-[var(--foreground)]" />
            Figure 01
          </div>
          <div className="mt-1 opacity-70">Figure02.scan</div>
          <div className="opacity-70">theydomov3inherds.anim</div>
        </motion.div>

        {/* Side caption right */}
        <motion.div
          style={{ x: labelRightX }}
          className="absolute right-6 top-1/2 hidden -translate-y-1/2 text-right text-[10px] uppercase tracking-[0.28em] text-[var(--muted)] sm:block"
        >
          <div>Meta : Portrait.obj</div>
          <div className="opacity-70">// designer, never decoder</div>
          <div className="mt-2">
            <span className="text-[var(--foreground)]">&ldquo;1+1=3&rdquo;</span>
          </div>
          <div className="opacity-70">— V. Abloh</div>
        </motion.div>

        {/* The portrait itself — floats, parallaxes, halftone dot mask */}
        <motion.div
          style={{
            x: portraitX,
            y: portraitY,
            rotate: portraitRot,
          }}
          className="relative h-[80%] w-[min(420px,70vw)]"
        >
          <div className="animate-bob absolute inset-0">
            {/* underlying dim frame */}
            <div className="absolute inset-0 -z-10 rounded-sm border border-hairline" />

            {/* halftone-rendered portrait */}
            <div
              className="relative h-full w-full overflow-hidden"
              style={{
                WebkitMaskImage:
                  "radial-gradient(circle at center, #000 95%, transparent 100%)",
                maskImage:
                  "radial-gradient(circle at center, #000 95%, transparent 100%)",
              }}
            >
              <Image
                src="/hero-portrait.png"
                alt="Hero portrait"
                fill
                priority
                sizes="(max-width: 768px) 70vw, 420px"
                className="object-cover object-center grayscale contrast-125"
              />
              {/* dot halftone overlay */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 mix-blend-screen"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(255,255,255,0.85) 0.6px, transparent 1.2px)",
                  backgroundSize: "4px 4px",
                  opacity: 0.35,
                }}
              />
              {/* darkening dots — adds a punched/stippled feel */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 mix-blend-multiply"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(0,0,0,0.85) 0.6px, transparent 1.2px)",
                  backgroundSize: "4px 4px",
                  backgroundPosition: "2px 2px",
                  opacity: 0.55,
                }}
              />
              {/* film grain */}
              <div className="grain" />
              {/* scanlines layer (using ::after) */}
              <div className="scanlines absolute inset-0" />
            </div>
          </div>

          {/* small floating tag below portrait */}
          <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.32em] text-[var(--muted)]">
            <span className="inline-block h-1 w-1 align-middle bg-[var(--foreground)] mr-2" />
            Hover. Move. They do move in herds.
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="flex justify-center pb-10 pt-6 text-[10px] uppercase tracking-[0.32em] text-[var(--muted)]">
        Scroll Down ↓
      </div>

      {/* Marquee strip */}
      <div className="relative w-full overflow-hidden border-y border-hairline py-3">
        <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap text-[12px] uppercase tracking-[0.28em] text-[var(--muted)]">
          {Array.from({ length: 8 }).map((_, i) => (
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
    </section>
  );
}

function Corner({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={
        "h-4 w-4 border-l border-t border-[var(--foreground)]/60 " + className
      }
    />
  );
}
