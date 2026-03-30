import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Heart, MessageCircle, Star } from "lucide-react";

import { DemoStrip, ProfileAvatar } from "@/components/dummy";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getProfileByUsername } from "@/lib/dummy/users";
import { getProfielFotoUrlForUser } from "@/lib/profiel-fotos";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ username: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const p = getProfileByUsername(username);
  return {
    title: p ? `Profiel @${p.username}` : "Profiel",
    description: p ? p.bio.slice(0, 140) : "Profiel niet gevonden.",
  };
}

export default async function ProfilePage({ params }: Props) {
  const { username } = await params;
  const profile = getProfileByUsername(username);
  if (!profile) notFound();

  const fotoUrl = getProfielFotoUrlForUser(profile.username);

  return (
    <div className="site-container py-10">
      <DemoStrip />

      <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
        <ProfileAvatar
          displayName={profile.displayName}
          username={profile.username}
          blurred={profile.blurredPhotos}
          size="lg"
          className="mx-auto sm:mx-0"
          imageSrc={fotoUrl}
        />
        <div className="min-w-0 flex-1 space-y-2 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <h1 className="text-2xl font-semibold tracking-tight">@{profile.username}</h1>
            {profile.verified ? <Badge variant="secondary">Geverifieerd</Badge> : null}
            {profile.isNew ? <Badge variant="outline">Nieuw</Badge> : null}
            {profile.online ? (
              <Badge className="bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/20">Online</Badge>
            ) : (
              <Badge variant="outline">Actief: {profile.lastActiveLabel}</Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            {profile.displayName} · {profile.age} · {profile.city} ({profile.postalCode}) ·{" "}
            {profile.distanceKm} km
          </p>
          <p className="text-sm text-muted-foreground">
            Zoekt: {profile.lookingFor.join(", ")} · Compleetheid {profile.profileCompleteness}%
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-2 sm:justify-start">
        <Button className="venovia-glow-sm" disabled title="Demo">
          <Heart className="size-4" aria-hidden />
          Like
        </Button>
        <Button variant="outline" disabled title="Demo">
          <Star className="size-4" aria-hidden />
          Favoriet
        </Button>
        <Link
          href={routes.messages}
          className={cn(buttonVariants({ variant: "secondary" }), "inline-flex items-center gap-2")}
        >
          <MessageCircle className="size-4" aria-hidden />
          Berichten
        </Link>
      </div>

      <Separator className="my-8 bg-border/60" />

      <Card className="rounded-2xl border-border/80 bg-card/70">
        <CardContent className="space-y-4 p-6">
          <div>
            <h2 className="text-sm font-medium text-muted-foreground">Over</h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground">{profile.bio}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-muted-foreground">Tags</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {profile.tags.map((t) => (
                <span
                  key={t}
                  className={cn(
                    "rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs text-foreground"
                  )}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
