"use client";

import { motion } from "motion/react";

export function AboutStrip() {
  return (
    <section
      id="about"
      className="relative border-b border-hairline px-4 py-24"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-3">
          <div className="text-[10px] uppercase tracking-[0.32em] text-[var(--muted)]">
            Section 01 — Manifesto
          </div>
          <p className="mt-4 font-serif italic text-[var(--muted)]">
            This is the story of a designer with a bent towards systems and
            print. Not a girl. Maybe a magazine.
          </p>
        </div>

        <div className="col-span-12 md:col-span-9">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-serif text-3xl leading-[1.05] sm:text-5xl"
          >
            One plus one equals three. The third is the thing you didn&apos;t plan
            for — a glance, a misprint, a margin, a gesture.{" "}
            <span className="text-[var(--muted)]">
              We collect those, set them in type, and call it an issue.
            </span>
          </motion.h2>

          <div className="mt-10 grid grid-cols-1 gap-6 text-sm leading-7 text-[var(--foreground)]/80 sm:grid-cols-2">
            <p>
              We make a magazine for people who like the smell of risograph ink
              and the click of a tracking dial. There is harmony in the balance
              of creativity and structure and we are right at home in the
              middle.
            </p>
            <p>
              Whether the contributor is using the pen tool, a flatbed scanner,
              or a Javascript prototype to argue with the grid, we publish it.
              We just like to make stuff.{" "}
              <a href="#index" className="link-underline text-[var(--foreground)]">
                Read on ↘
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
