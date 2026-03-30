import type { Metadata } from "next";
import Link from "next/link";

import { DemoStrip } from "@/components/dummy";
import { buttonVariants } from "@/components/ui/button-variants";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DUMMY_PROFILES } from "@/lib/dummy/users";
import { listReportsAdmin } from "@/lib/dummy/reports";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin overzicht (demo).",
};

export default function AdminHomePage() {
  const members = DUMMY_PROFILES.length;
  const openReports = listReportsAdmin().filter((r) => r.status === "open").length;
  const photoQueue = 3;

  const tiles = [
    { title: "Leden", value: String(members), hint: "inclusief demo-accounts" },
    { title: "Open meldingen", value: String(openReports), hint: "rapportages" },
    { title: "Foto-wachtrij", value: String(photoQueue), hint: "te beoordelen" },
  ] as const;

  return (
    <div className="site-container py-10">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">Admin</h1>
      <p className="mt-2 text-muted-foreground leading-relaxed">
        Overzicht — demo-cijfers, geen echte productiedata.
      </p>

      <div className="mt-6">
        <DemoStrip />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {tiles.map((t) => (
          <Card key={t.title} className="rounded-2xl border-border/80 bg-card/70">
            <CardHeader className="pb-2">
              <CardDescription>{t.hint}</CardDescription>
              <CardTitle className="text-3xl font-semibold tabular-nums">{t.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium text-muted-foreground">{t.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-2">
        <Link className={cn(buttonVariants({ variant: "outline", size: "sm" }))} href={routes.adminUsers}>
          Gebruikers
        </Link>
        <Link className={cn(buttonVariants({ variant: "outline", size: "sm" }))} href={routes.adminReports}>
          Meldingen
        </Link>
        <Link className={cn(buttonVariants({ variant: "outline", size: "sm" }))} href={routes.adminPhotos}>
          Foto’s
        </Link>
      </div>
    </div>
  );
}
