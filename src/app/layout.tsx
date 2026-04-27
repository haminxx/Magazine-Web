import type { Metadata } from "next";
import { JetBrains_Mono, Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "1+1=3 — A Magazine",
  description: "A magazine.",
};

const ANTI_FLASH = `
  (function () {
    try {
      var t = localStorage.getItem("theme");
      if (t !== "light" && t !== "dark") t = "dark";
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(t);
    } catch (e) {
      document.documentElement.classList.add("dark");
    }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrains.variable} ${inter.variable} ${serif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: ANTI_FLASH }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
