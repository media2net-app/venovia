import type { Metadata } from "next";
import Link from "next/link";

import { DemoStrip, ProfileAvatar } from "@/components/dummy";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { DUMMY_SESSION_EMAIL } from "@/lib/dummy/session";
import { getSessionProfile } from "@/lib/dummy/session";
import { getProfielFotoUrlForUser } from "@/lib/profiel-fotos";
import { profileHasCoupleSpeakers } from "@/lib/couple-chat";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Instellingen",
  description: "Accountinstellingen (demo).",
};

export default function SettingsPage() {
  const me = getSessionProfile();
  const fotoUrl = me ? getProfielFotoUrlForUser(me.username) : null;

  return (
    <div className="site-container py-10">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">Instellingen</h1>
      <p className="mt-2 text-muted-foreground leading-relaxed">
        Voorbeeldinstellingen — opslaan volgt later.
      </p>

      <div className="mt-6">
        <DemoStrip />
      </div>

      {me ? (
        <div className="mt-8 flex items-center gap-4">
          <ProfileAvatar displayName={me.displayName} username={me.username} imageSrc={fotoUrl} />
          <div>
            <p className="font-medium text-foreground">@{me.username}</p>
            <p className="text-sm text-muted-foreground">{DUMMY_SESSION_EMAIL}</p>
            <Link href={routes.profileEdit} className="text-sm font-medium text-primary underline-offset-4 hover:underline">
              Profiel bewerken
            </Link>
          </div>
        </div>
      ) : null}

      <div className="mt-10 space-y-6">
        <Card className="rounded-2xl border-border/80 bg-card/70">
          <CardHeader>
            <CardTitle className="text-base">Privacy</CardTitle>
            <CardDescription>Wie mag je profiel zien (demo).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="vis" className="text-sm font-normal text-muted-foreground">
                Profiel zichtbaar voor ingelogde leden
              </Label>
              <Input id="vis" type="checkbox" defaultChecked disabled className="size-4" />
            </div>
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="blur" className="text-sm font-normal text-muted-foreground">
                Foto’s standaard blurred
              </Label>
              <Input id="blur" type="checkbox" className="size-4" disabled />
            </div>
          </CardContent>
        </Card>


        {me && profileHasCoupleSpeakers(me) ? (
          <Card className="rounded-2xl border-border/80 bg-card/70">
            <CardHeader>
              <CardTitle className="text-base">Berichten · koppel</CardTitle>
              <CardDescription>
                Jullie chatnamen: <span className="font-medium text-foreground">{me.couplePartnerNames[0]}</span> en{" "}
                <span className="font-medium text-foreground">{me.couplePartnerNames[1]}</span>.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              In gesprekken kies je bovenaan wie er spreekt. Zo ziet de ander per bericht wie typt — handig voor
              stellen, zonder steeds &quot;wie ben jij?&quot; te hoeven vragen. Later koppel je dit aan jullie
              echte profielen.
            </CardContent>
          </Card>
        ) : null}

        <Card className="rounded-2xl border-border/80 bg-card/70">
          <CardHeader>
            <CardTitle className="text-base">Notificaties</CardTitle>
            <CardDescription>In-app meldingen (demo).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="n1" className="text-sm font-normal text-muted-foreground">
                Nieuwe likes
              </Label>
              <Input id="n1" type="checkbox" defaultChecked disabled className="size-4" />
            </div>
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="n2" className="text-sm font-normal text-muted-foreground">
                Nieuwe berichten
              </Label>
              <Input id="n2" type="checkbox" defaultChecked disabled className="size-4" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-10 bg-border/60" />

      <p className="text-sm text-muted-foreground">
        Geblokkeerde accounts en export van data volgen in een latere versie.
      </p>
    </div>
  );
}
