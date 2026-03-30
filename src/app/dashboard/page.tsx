import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { DashboardDemoCookieSync } from "./demo-cookie-sync";

import { ActivityFeedList, DemoStrip, ProfileCard } from "@/components/dummy";
import { buttonVariants } from "@/components/ui/button-variants";
import { getActivityFeed, getRecommendedProfiles } from "@/lib/dummy";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Je thuisbasis met feed en aanbevelingen (demo).",
};

type Props = {
  searchParams: Promise<{ demo?: string }>;
};

export default async function DashboardPage({ searchParams }: Props) {
  const { demo } = await searchParams;
  const isDemoLogin = demo === "1";
  const recommended = getRecommendedProfiles(6);
  const activity = getActivityFeed(8);

  return (
    <div className="site-container py-10">
      <Suspense fallback={null}>
        <DashboardDemoCookieSync />
      </Suspense>
      {isDemoLogin ? (
        <p
          className="mb-6 rounded-xl border border-venovia-accent/30 bg-venovia-accent/10 px-4 py-3 text-sm text-muted-foreground"
          role="status"
        >
          <span className="font-medium text-foreground">Demo-login actief.</span> Geen echte sessie —
          Supabase Auth volgt later.
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Dashboard</h1>
          <p className="mt-2 text-muted-foreground leading-relaxed">
            Welkom terug — hier zie je straks je persoonlijke feed. Nu: fictieve content om de lay-out te
            testen.
          </p>
        </div>
        <Link href={routes.browse} className={cn(buttonVariants({ variant: "outline" }), "shrink-0")}>
          Ontdek profielen
        </Link>
      </div>

      <div className="mt-8">
        <DemoStrip />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold tracking-tight">Activiteit</h2>
          <ActivityFeedList items={activity} />
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold tracking-tight">Aanbevolen</h2>
          <div className="space-y-2">
            {recommended.map((p) => (
              <ProfileCard key={p.id} profile={p} compact />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
