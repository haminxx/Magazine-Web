import { ThemeToggle } from "../../components/theme-toggle";
import { MagazineGrid } from "../../components/magazine-grid";

export default function IssuesPage() {
  return (
    <div className="relative min-h-screen w-full bg-[var(--background)] text-[var(--foreground)]">
      <div className="fixed right-4 top-4 z-50">
        <ThemeToggle />
      </div>
      <main className="px-4 pb-24 pt-20">
        <MagazineGrid />
      </main>
    </div>
  );
}
