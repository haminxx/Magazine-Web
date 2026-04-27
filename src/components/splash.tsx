"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useCallback, useEffect, useState } from "react";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function Splash() {
  const router = useRouter();
  const [exiting, setExiting] = useState(false);
  const [now, setNow] = useState<Date | null>(null);

  // Mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.8 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.8 });

  const portraitX = useTransform(sx, [-1, 1], [-22, 22]);
  const portraitY = useTransform(sy, [-1, 1], [-14, 14]);
  const portraitRot = useTransform(sx, [-1, 1], [-2.2, 2.2]);
  const labelLeftX = useTransform(sx, [-1, 1], [10, -10]);
  const labelRightX = useTransform(sx, [-1, 1], [-10, 10]);

  useEffect(() => {
    router.prefetch("/issues");
  }, [router]);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

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

  const enter = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    window.setTimeout(() => router.push("/issues"), 650);
  }, [exiting, router]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        enter();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enter]);

  const stamp = now
    ? `${now.getFullYear()}.${pad(now.getMonth() + 1)}.${pad(
        now.getDate()
      )} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(
        now.getSeconds()
      )} PDT`
    : "0000.00.00 00:00:00 PDT";

  return (
    <AnimatePresence mode="wait">
      {!exiting && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          role="link"
          tabIndex={0}
          aria-label="Click anywhere to enter the magazine"
          onClick={enter}
          className="relative flex min-h-screen w-full cursor-pointer flex-col items-center justify-center overflow-hidden bg-[var(--background)] px-6"
        >
          {/* Top status row */}
          <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-4 p-4 text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">
            <span className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-blink" />
              Issue No. 003 / On Press
            </span>
            <span className="hidden text-right tabular-nums sm:block">
              {stamp}
            </span>
          </div>

          {/* Registration corners */}
          <Corner className="absolute left-4 top-4" />
          <Corner className="absolute right-4 top-4 rotate-90" />
          <Corner className="absolute left-4 bottom-4 -rotate-90" />
          <Corner className="absolute right-4 bottom-4 rotate-180" />

          {/* Editorial wordmark */}
          <h1
            className="select-none whitespace-nowrap text-center font-display leading-[0.9] tracking-tight text-[var(--accent)]"
            style={{ fontSize: "clamp(56px, 13vw, 200px)" }}
          >
            One+One=Three
          </h1>
          <p className="mt-2 text-center text-[10px] uppercase tracking-[0.32em] text-[var(--muted)]">
            (AKA the *unhinged* magazine of design, type & image — Issue 003)
          </p>

          {/* Floating portrait stage */}
          <div className="relative mt-8 flex w-full max-w-5xl items-center justify-center">
            {/* Side caption left */}
            <motion.div
              style={{ x: labelLeftX }}
              className="absolute left-0 top-1/2 hidden -translate-y-1/2 text-[10px] uppercase tracking-[0.28em] text-[var(--muted)] sm:block"
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
              className="absolute right-0 top-1/2 hidden -translate-y-1/2 text-right text-[10px] uppercase tracking-[0.28em] text-[var(--muted)] sm:block"
            >
              <div>Meta : Portrait.obj</div>
              <div className="opacity-70">// designer, never decoder</div>
              <div className="mt-2">
                <span className="text-[var(--foreground)]">
                  &ldquo;1+1=3&rdquo;
                </span>
              </div>
              <div className="opacity-70">— V. Abloh</div>
            </motion.div>

            {/* Portrait — parallax + bob + halftone */}
            <motion.div
              style={{
                x: portraitX,
                y: portraitY,
                rotate: portraitRot,
              }}
              className="relative h-[44vh] min-h-[300px] w-[min(360px,70vw)]"
            >
              <div className="animate-bob absolute inset-0">
                <div className="absolute inset-0 -z-10 rounded-sm border border-hairline" />
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
                    sizes="(max-width: 768px) 70vw, 360px"
                    className="object-cover object-center grayscale contrast-125"
                  />
                  {/* dot halftone overlays */}
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
                  <div className="grain" />
                  <div className="scanlines absolute inset-0" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom CTA / hint */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">
            <span className="hidden sm:block">
              Meta : Portrait.obj // designer never decoder
            </span>
            <span className="ml-auto flex items-center gap-2 text-[var(--foreground)]">
              <span className="animate-blink">●</span>
              Click anywhere to enter
              <span aria-hidden>↘</span>
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Corner({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={
        "h-3 w-3 border-l border-t border-[var(--foreground)]/60 " + className
      }
    />
  );
}
