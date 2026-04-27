import { IssueHeader } from "../../components/issue-header";
import { MarqueeStrip } from "../../components/marquee-strip";
import { AboutStrip } from "../../components/about-strip";
import { MagazineGrid } from "../../components/magazine-grid";
import { SiteFooter } from "../../components/site-footer";

export default function IssuesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <IssueHeader />
      <MarqueeStrip />
      <main className="flex-1">
        <AboutStrip />
        <MagazineGrid />
      </main>
      <SiteFooter />
    </div>
  );
}
