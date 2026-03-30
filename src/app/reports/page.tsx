import type { Metadata } from "next";

import { DemoStrip } from "@/components/dummy";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { listReportsForSession, reportWithUsernames } from "@/lib/dummy/reports";

export const metadata: Metadata = {
  title: "Meldingen",
  description: "Jouw meldingen (demo).",
};

const statusLabel: Record<string, string> = {
  open: "Open",
  in_behandeling: "In behandeling",
  gesloten: "Gesloten",
};

export default function ReportsPage() {
  const mine = listReportsForSession().map(reportWithUsernames);

  return (
    <div className="site-container py-10">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">Meldingen</h1>
      <p className="mt-2 text-muted-foreground leading-relaxed">
        Jouw ingediende rapportages — demo-data.
      </p>

      <div className="mt-6">
        <DemoStrip />
      </div>

      <div className="mt-8 space-y-3">
        {mine.length === 0 ? (
          <p className="text-sm text-muted-foreground">Geen meldingen in deze demo.</p>
        ) : (
          mine.map((r) => (
            <Card key={r.id} className="rounded-2xl border-border/80 bg-card/70">
              <CardContent className="space-y-2 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-medium text-foreground">@{r.reportedUsername}</p>
                  <Badge variant="secondary">{statusLabel[r.status] ?? r.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.reason}</p>
                <p className="text-xs text-muted-foreground">{r.createdAtLabel}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
