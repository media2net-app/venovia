import type { Metadata } from "next";
import Link from "next/link";

import { DemoStrip, ProfileAvatar } from "@/components/dummy";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { DUMMY_PROFILES } from "@/lib/dummy/users";
import { getProfielFotoUrlForUser } from "@/lib/profiel-fotos";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Gebruikers (admin)",
  description: "Gebruikerslijst (demo).",
};

export default function AdminUsersPage() {
  return (
    <div className="site-container py-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Gebruikers</h1>
          <p className="mt-2 text-muted-foreground leading-relaxed">Demo-lijst — acties zijn uitgeschakeld.</p>
        </div>
        <Link href={routes.admin} className="text-sm text-muted-foreground hover:text-foreground">
          ← Admin
        </Link>
      </div>

      <div className="mt-6">
        <DemoStrip />
      </div>

      <div className="mt-8 space-y-2">
        {DUMMY_PROFILES.map((u) => (
          <Card key={u.id} className="rounded-2xl border-border/80 bg-card/70">
            <CardContent className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <ProfileAvatar
                  displayName={u.displayName}
                  username={u.username}
                  size="sm"
                  imageSrc={getProfielFotoUrlForUser(u.username)}
                />
                <div>
                <p className="font-medium text-foreground">
                  @{u.username}{" "}
                  <span className="text-sm font-normal text-muted-foreground">· {u.displayName}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  {u.city} · {u.gender} · {u.age} jaar
                </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {u.verified ? <Badge variant="secondary">Geverifieerd</Badge> : <Badge variant="outline">Niet geverifieerd</Badge>}
                {u.online ? <Badge className="bg-emerald-500/15 text-emerald-200">Online</Badge> : null}
                <Badge variant="outline">{u.id === "u-self" ? "admin" : "free"}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
