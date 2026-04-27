import { TopBar } from "../components/top-bar";
import { Hero } from "../components/hero";
import { AboutStrip } from "../components/about-strip";
import { MagazineGrid } from "../components/magazine-grid";
import { SiteFooter } from "../components/site-footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <main className="flex-1">
        <Hero />
        <AboutStrip />
        <MagazineGrid />
      </main>
      <SiteFooter />
    </div>
  );
}
