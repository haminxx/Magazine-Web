import type { Metadata } from "next";
import { JetBrains_Mono, Inter, UnifrakturMaguntia, Instrument_Serif } from "next/font/google";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const display = UnifrakturMaguntia({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "1 + 1 = 3 — A Magazine of Design Excess",
  description:
    "An unhinged editorial space for design, type, image and the in-between. Issue No. 003.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrains.variable} ${inter.variable} ${display.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        {children}
      </body>
    </html>
  );
}
