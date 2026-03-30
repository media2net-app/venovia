import type { Metadata } from "next";
import Link from "next/link";

import { DemoStrip } from "@/components/dummy";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { listReportsAdmin, reportWithUsernames } from "@/lib/dummy/reports";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Meldingen (admin)",
  description: "Admin meldingen (demo).",
};

const statusLabel: Record<string, string> = {
  open: "Open",
  in_behandeling: "In behandeling",
  gesloten: "Gesloten",
};

export default function AdminReportsPage() {
  const rows = listReportsAdmin().map(reportWithUsernames);

  return (
    <div className="site-container py-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Meldingen</h1>
          <p className="mt-2 text-muted-foreground leading-relaxed">Alle rapportages (demo).</p>
        </div>
        <Link href={routes.admin} className="text-sm text-muted-foreground hover:text-foreground">
          ← Admin
        </Link>
      </div>

      <div className="mt-6">
        <DemoStrip />
      </div>

      <div className="mt-8 space-y-3">
        {rows.map((r) => (
          <Card key={r.id} className="rounded-2xl border-border/80 bg-card/70">
            <CardContent className="space-y-2 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">@{r.reporterUsername}</span> →{" "}
                  <span className="font-medium text-foreground">@{r.reportedUsername}</span>
                </p>
                <Badge variant="secondary">{statusLabel[r.status] ?? r.status}</Badge>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.reason}</p>
              <p className="text-xs text-muted-foreground">{r.createdAtLabel}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
