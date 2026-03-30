import type { Metadata } from "next";
import Link from "next/link";

import { BrowseFiltersSidebar } from "@/components/browse/browse-filters-sidebar";
import { DemoStrip, ProfileBrowseCard } from "@/components/dummy";
import { buttonVariants } from "@/components/ui/button-variants";
import { getBrowseProfiles, type BrowseSort } from "@/lib/dummy";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Ontdekken",
  description: "Browse profielen (demo).",
};

const SORTS: { key: BrowseSort; label: string }[] = [
  { key: "recent", label: "Recent" },
  { key: "dichtbij", label: "Dichtbij" },
  { key: "populair", label: "Populair" },
];

const TABS: { id: string; label: string }[] = [
  { id: "distance", label: "Dichtbij" },
  { id: "online", label: "Laatst online" },
  { id: "photos", label: "Nieuwste foto's" },
  { id: "new", label: "Nieuwe deelnemers" },
];

function isSort(v: string | undefined): v is BrowseSort {
  return v === "recent" || v === "dichtbij" || v === "populair";
}

type Props = {
  searchParams: Promise<{ sort?: string }>;
};

export default async function BrowsePage({ searchParams }: Props) {
  const sp = await searchParams;
  const sort: BrowseSort = isSort(sp.sort) ? sp.sort : "recent";
  const profiles = getBrowseProfiles(sort);

  return (
    <div className="site-container py-10">
      <div className="text-left">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Profielen</h1>
        <p className="mt-2 max-w-3xl text-muted-foreground leading-relaxed">
          Grid in de stijl van een klassieke dating-browse: foto, online-indicator, naam en afstand (demo).
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(240px,280px)_minmax(0,1fr)] lg:items-start">
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <BrowseFiltersSidebar activeSort={sort} />
        </aside>

        <div className="min-w-0 space-y-6 text-left">
          <DemoStrip />

          <div className="flex flex-wrap items-center gap-2 border-b border-border/60 pb-3">
            {TABS.map((tab, idx) => {
              const active = idx === TABS.length - 1;
              return (
                <span
                  key={tab.id}
                  className={cn(
                    "cursor-default rounded-full px-3 py-1 text-sm font-medium",
                    active
                      ? "bg-venovia-accent/15 text-foreground ring-1 ring-venovia-accent/40"
                      : "text-muted-foreground"
                  )}
                >
                  {tab.label}
                </span>
              );
            })}
            <span className="ml-auto text-xs text-muted-foreground">Tabs zijn demo (nog geen filters)</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {SORTS.map((s) => {
              const active = s.key === sort;
              return (
                <Link
                  key={s.key}
                  href={s.key === "recent" ? "/browse" : `/browse?sort=${s.key}`}
                  className={cn(
                    buttonVariants({ variant: active ? "default" : "outline", size: "sm" }),
                    active && "venovia-glow-sm"
                  )}
                >
                  {s.label}
                </Link>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {profiles.map((p) => (
              <ProfileBrowseCard key={p.id} profile={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
