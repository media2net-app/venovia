import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { DummyProfile } from "@/lib/dummy/types";
import { getProfielFotoUrlForUser } from "@/lib/profiel-fotos";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

import { ProfileAvatar } from "./profile-avatar";

type Props = {
  profile: DummyProfile;
  className?: string;
  showDistance?: boolean;
  compact?: boolean;
};

export function ProfileCard({ profile, className, showDistance = true, compact = false }: Props) {
  const fotoUrl = getProfielFotoUrlForUser(profile.username);

  return (
    <Card
      className={cn(
        "overflow-hidden rounded-2xl border-border/80 bg-card/80 transition-shadow hover:venovia-glow-sm",
        className
      )}
    >
      <CardContent className={cn("p-4", compact && "p-3")}>
        <div className="flex gap-3">
          <ProfileAvatar
            displayName={profile.displayName}
            username={profile.username}
            blurred={profile.blurredPhotos}
            size={compact ? "sm" : "md"}
            imageSrc={fotoUrl}
          />
          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <Link
                href={routes.profile(profile.username)}
                className="truncate font-medium text-foreground hover:text-venovia-accent hover:underline"
              >
                @{profile.username}
              </Link>
              {profile.verified ? (
                <Badge variant="secondary" className="text-[0.65rem]">
                  Geverifieerd
                </Badge>
              ) : null}
              {profile.isNew ? (
                <Badge variant="outline" className="text-[0.65rem]">
                  Nieuw
                </Badge>
              ) : null}
              {profile.online ? (
                <Badge className="bg-emerald-500/15 text-[0.65rem] text-emerald-200 hover:bg-emerald-500/20">
                  Online
                </Badge>
              ) : null}
            </div>
            <p className="text-xs text-muted-foreground">
              {profile.displayName} · {profile.age} · {profile.city}
              {showDistance ? ` · ${profile.distanceKm} km` : null}
            </p>
            {!compact ? (
              <p className="line-clamp-2 text-sm text-muted-foreground leading-snug">{profile.bio}</p>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
