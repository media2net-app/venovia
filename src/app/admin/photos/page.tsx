import type { Metadata } from "next";
import Link from "next/link";

import { DemoStrip, ProfileAvatar } from "@/components/dummy";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProfileById } from "@/lib/dummy/users";
import { getProfielFotoUrlForUser } from "@/lib/profiel-fotos";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Foto-moderatie (admin)",
  description: "Foto-wachtrij (demo).",
};

const QUEUE = [
  { id: "ph-1", userId: "u12", submittedAtLabel: "vandaag · 11:02" },
  { id: "ph-2", userId: "u7", submittedAtLabel: "gisteren · 18:40" },
  { id: "ph-3", userId: "u4", submittedAtLabel: "ma · 09:12" },
] as const;

export default function AdminPhotosPage() {
  return (
    <div className="site-container py-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Foto-moderatie</h1>
          <p className="mt-2 text-muted-foreground leading-relaxed">Wachtrij (demo) — knoppen doen nog niets.</p>
        </div>
        <Link href={routes.admin} className="text-sm text-muted-foreground hover:text-foreground">
          ← Admin
        </Link>
      </div>

      <div className="mt-6">
        <DemoStrip />
      </div>

      <div className="mt-8 space-y-3">
        {QUEUE.map((q) => {
          const p = getProfileById(q.userId);
          if (!p) return null;
          const fotoUrl = getProfielFotoUrlForUser(p.username);
          return (
            <Card key={q.id} className="rounded-2xl border-border/80 bg-card/70">
              <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <ProfileAvatar displayName={p.displayName} username={p.username} blurred imageSrc={fotoUrl} />
                  <div>
                    <p className="font-medium text-foreground">@{p.username}</p>
                    <p className="text-xs text-muted-foreground">{q.submittedAtLabel}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="secondary" disabled>
                    Goedkeuren
                  </Button>
                  <Button size="sm" variant="outline" disabled>
                    Afkeuren
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
