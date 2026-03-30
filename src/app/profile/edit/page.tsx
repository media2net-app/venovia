import type { Metadata } from "next";
import Link from "next/link";

import { DemoStrip, ProfileAvatar } from "@/components/dummy";
import { buttonVariants } from "@/components/ui/button-variants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getSessionProfile } from "@/lib/dummy/session";
import { getProfielFotoUrlForUser } from "@/lib/profiel-fotos";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Profiel bewerken",
  description: "Profiel bewerken (demo).",
};

export default function ProfileEditPage() {
  const me = getSessionProfile();
  const fotoUrl = me ? getProfielFotoUrlForUser(me.username) : null;
  if (!me) {
    return (
      <div className="site-container py-14">
        <p className="text-muted-foreground">Geen sessie-profiel gevonden (demo).</p>
      </div>
    );
  }

  return (
    <div className="site-container py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Profiel bewerken</h1>
          <p className="mt-2 text-muted-foreground leading-relaxed">
            Voorbeeldvelden — later opslaan via server actions + Supabase.
          </p>
        </div>
        <ProfileAvatar displayName={me.displayName} username={me.username} size="lg" imageSrc={fotoUrl} />
      </div>

      <div className="mt-6">
        <DemoStrip />
      </div>

      <form className="mt-8 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="username">Gebruikersnaam</Label>
            <Input id="username" name="username" defaultValue={me.username} readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">Stad</Label>
            <Input id="city" name="city" defaultValue={me.city} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" name="bio" rows={5} defaultValue={me.bio} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="postal">Postcode</Label>
            <Input id="postal" name="postal" defaultValue={me.postalCode} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (komma)</Label>
            <Input id="tags" name="tags" defaultValue={me.tags.join(", ")} />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button type="submit" disabled>
            Opslaan (demo)
          </Button>
          <Link
            href={routes.profile(me.username)}
            className={cn(buttonVariants({ variant: "outline" }), "inline-flex items-center justify-center")}
          >
            Profiel bekijken
          </Link>
        </div>
      </form>
    </div>
  );
}
