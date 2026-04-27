"use client";

import { useMemo, useState } from "react";
import { MagazineCard, type MagazineItem } from "./magazine-card";

const ITEMS: MagazineItem[] = [
  {
    id: "001",
    title: "Mirror Corridor",
    subtitle: "Volumes that refract",
    author: "Jang Jongwan",
    year: "2026",
    category: "Solo",
    cover: { bg: "#dee5d8", accent: "#3a4a3a", text: "#1c2a1c", pattern: "lines", label: "Vol. 39" },
  },
  {
    id: "002",
    title: "Hep",
    subtitle: "On rhythm and surface",
    author: "Son Donghyun",
    year: "2026",
    category: "Project",
    cover: { bg: "#7fa9d6", accent: "#ffffff", text: "#0a1f33", pattern: "blob", label: "Hep" },
  },
  {
    id: "003",
    title: "Glossary for the Wild Tongues",
    subtitle: "Field notes on language",
    author: "V. T. Lee · E. Bang",
    year: "2025",
    category: "Essay",
    cover: { bg: "#cdb59a", accent: "#3b2a1a", text: "#2a1d10", pattern: "halftone", label: "GFTWT" },
  },
  {
    id: "004",
    title: "Mapo Layers",
    subtitle: "Index of a neighborhood",
    author: "Mapo Layers Collective",
    year: "2025",
    category: "Group",
    cover: { bg: "#ededed", accent: "#101010", text: "#101010", pattern: "grid", label: "ML 2025" },
  },
  {
    id: "005",
    title: "Be Coming Home",
    subtitle: "Notes on returning",
    author: "CoAB",
    year: "2025",
    category: "Project",
    cover: { bg: "#cfe1ee", accent: "#7da7c4", text: "#0c2333", pattern: "blob", label: "BCH" },
  },
  {
    id: "006",
    title: "Field / Fragments",
    subtitle: "전 / 언들",
    author: "Kang Subin · Kim Miryu",
    year: "2025",
    category: "Solo",
    cover: { bg: "#f2efe8", accent: "#9a9a9a", text: "#1a1a1a", pattern: "lines", label: "F/F" },
  },
  {
    id: "007",
    title: "To Gayoung",
    subtitle: "Letters in colour",
    author: "Goyoson × Oh Gayoung",
    year: "2025",
    category: "Duo",
    cover: { bg: "#f0c39a", accent: "#cf5b3b", text: "#3a1a08", pattern: "halftone", label: "TG" },
  },
  {
    id: "008",
    title: "Half and Half",
    subtitle: "On halves & wholes",
    author: "Chung Yukyung",
    year: "2025",
    category: "Solo",
    cover: { bg: "#f5f5f5", accent: "#222", text: "#101010", pattern: "grid", label: "H/H" },
  },
  {
    id: "009",
    title: "North-Northwest",
    subtitle: "Re-routing the route",
    author: "Kim Minhoon",
    year: "2024",
    category: "Project",
    cover: { bg: "#cfd8e0", accent: "#22324a", text: "#0c1a2a", pattern: "lines", label: "NNW" },
  },
  {
    id: "010",
    title: "Ghost Frame",
    subtitle: "Between exposures",
    author: "Han Dongseok",
    year: "2024",
    category: "Photo",
    cover: { bg: "#1a1a1a", accent: "#cfcfcf", text: "#ededed", pattern: "halftone", label: "GF" },
  },
  {
    id: "011",
    title: "Take It Out",
    subtitle: "Refusing to ignore",
    author: "Kwon Hoechan",
    year: "2024",
    category: "Essay",
    cover: { bg: "#f4ecd6", accent: "#a78a3a", text: "#3a2a08", pattern: "dots", label: "TIO" },
  },
  {
    id: "012",
    title: "Post-Memory: After War?",
    subtitle: "An anthology",
    author: "Epoché Reté",
    year: "2024",
    category: "Anthology",
    cover: { bg: "#1c1d33", accent: "#5b6cff", text: "#e8eaff", pattern: "blob", label: "PMW" },
  },
  {
    id: "013",
    title: "Handmade Paint Zine v.2",
    subtitle: "From the studio floor",
    author: "Cho Hwikyung",
    year: "2024",
    category: "Zine",
    cover: { bg: "#f3eadd", accent: "#9b1d1d", text: "#3a0e0e", pattern: "halftone", label: "HMPZ" },
  },
  {
    id: "014",
    title: "Handmade Paint Zine v.1",
    subtitle: "From the studio floor",
    author: "Cho Hwikyung",
    year: "2023",
    category: "Zine",
    cover: { bg: "#e9eed8", accent: "#3a5a1a", text: "#1c2a08", pattern: "halftone", label: "HMPZ" },
  },
  {
    id: "015",
    title: "Stollen²",
    subtitle: "A double pour",
    author: "fuuri",
    year: "2024",
    category: "Project",
    cover: { bg: "#3a2a1a", accent: "#e3a86b", text: "#f4e4d0", pattern: "dots", label: "S²" },
  },
  {
    id: "016",
    title: "Sites Crossing",
    subtitle: "A research on de-centered practice",
    author: "Valerie T. Lee",
    year: "2024",
    category: "Research",
    cover: { bg: "#dfe6df", accent: "#3a5a4a", text: "#1c2a22", pattern: "grid", label: "SC" },
  },
  {
    id: "017",
    title: "Support and Gesture",
    subtitle: "지탱과 제스처",
    author: "Shin Jongchan · Im Chaehong",
    year: "2024",
    category: "Duo",
    cover: { bg: "#101010", accent: "#cfcfcf", text: "#ededed", pattern: "lines", label: "S+G" },
  },
  {
    id: "018",
    title: "Light Sleep",
    subtitle: "선잠",
    author: "Kim Younghyun",
    year: "2024",
    category: "Solo",
    cover: { bg: "#cfd8d0", accent: "#3a4a3a", text: "#1c2a1c", pattern: "halftone", label: "LS" },
  },
  {
    id: "019",
    title: "Catnap",
    subtitle: "On rest as practice",
    author: "Joo Kibum",
    year: "2024",
    category: "Project",
    cover: { bg: "#f4d6c8", accent: "#a4513a", text: "#3a1a08", pattern: "dots", label: "CN" },
  },
  {
    id: "020",
    title: "A Whale on the Hill",
    subtitle: "난곡동의 고래",
    author: "Jeong Woomi",
    year: "2024",
    category: "Photo",
    cover: { bg: "#a7c0d4", accent: "#102a3a", text: "#0c1a2a", pattern: "blob", label: "AWH" },
  },
];

const FILTERS = [
  "All",
  "Solo",
  "Group",
  "Project",
  "Essay",
  "Photo",
  "Zine",
  "Anthology",
  "Research",
] as const;

type Filter = (typeof FILTERS)[number];

export function MagazineGrid() {
  const [filter, setFilter] = useState<Filter>("All");

  const filtered = useMemo(
    () => (filter === "All" ? ITEMS : ITEMS.filter((i) => i.category === filter)),
    [filter]
  );

  return (
    <section id="index" className="border-b border-hairline">
      {/* Section header */}
      <div className="border-b border-hairline px-4 py-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-4">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="text-[10px] uppercase tracking-[0.32em] text-[var(--muted)]">
                Section 02 — The Index
              </div>
              <h2 className="mt-2 font-serif text-4xl leading-[0.95] sm:text-5xl">
                A library of issues, zines & loose pages.
              </h2>
            </div>
            <div className="hidden text-right text-[10px] uppercase tracking-[0.28em] text-[var(--muted)] sm:block">
              <div>{filtered.length} entries</div>
              <div className="opacity-70">Sorted by recency</div>
            </div>
          </div>

          {/* Filter row */}
          <div className="mt-2 flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const active = f === filter;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={
                    "border px-3 py-1 text-[10px] uppercase tracking-[0.24em] transition-colors " +
                    (active
                      ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
                      : "border-hairline text-[var(--muted)] hover:text-[var(--foreground)]")
                  }
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filtered.map((item, idx) => (
            <MagazineCard key={item.id} item={item} index={idx} />
          ))}
        </div>
      </div>

      {/* Pagination footer (decorative) */}
      <div className="flex items-center justify-between border-t border-hairline px-4 py-4 text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">
        <span>Page 01 of 12</span>
        <div className="flex items-center gap-3">
          <button className="link-underline">Prev</button>
          <span className="text-[var(--foreground)]">01</span>
          <span>02</span>
          <span>03</span>
          <span className="opacity-50">...</span>
          <span>12</span>
          <button className="link-underline">Next</button>
        </div>
      </div>
    </section>
  );
}
