import Image from "next/image";
import Link from "next/link";
import { ImageIcon, MapPin } from "lucide-react";

import { initialsFromDisplayName } from "@/lib/avatar-utils";
import type { DummyProfile } from "@/lib/dummy/types";
import { getProfielFotoUrlForUser } from "@/lib/profiel-fotos";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

function formatDistanceKm(km: number): string {
  if (km >= 100) return "> 100 km";
  return `± ${km} km`;
}

type Props = {
  profile: DummyProfile;
  className?: string;
};

export function ProfileBrowseCard({ profile, className }: Props) {
  const photos = profile.photoCount ?? 3;
  const fotoUrl = getProfielFotoUrlForUser(profile.username);
  const initials = initialsFromDisplayName(profile.displayName);

  return (
    <Link
      href={routes.profile(profile.username)}
      className={cn(
        "group relative block aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-lg transition-transform duration-200 hover:-translate-y-0.5 hover:border-venovia-accent/40 hover:shadow-venovia-accent/10",
        className
      )}
    >
      {fotoUrl ? (
        <Image
          src={fotoUrl}
          alt={`Profiel ${profile.username}`}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
          className={cn(
            "object-cover transition duration-300 group-hover:scale-[1.02]",
            profile.blurredPhotos && "blur-xl scale-105"
          )}
          priority={false}
        />
      ) : (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-700 to-zinc-900 text-3xl font-semibold text-white/90",
            profile.blurredPhotos && "blur-xl"
          )}
          aria-hidden
        >
          {initials}
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[0.7rem] font-medium text-white backdrop-blur-sm">
        <ImageIcon className="size-3" aria-hidden />
        {photos}
      </div>

      <div className="absolute inset-x-0 bottom-0 px-3 pb-3 pt-10">
        <div className="flex items-center gap-2 text-white">
          {profile.online ? (
            <span
              className="inline-flex size-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_0_2px_rgba(0,0,0,0.35)]"
              title="Online"
            />
          ) : (
            <span className="inline-flex size-2 shrink-0 rounded-full bg-zinc-500" title="Offline" />
          )}
          <p className="truncate text-sm font-semibold tracking-tight">
            <span className="mr-1">{profile.username}</span>
            <span className="text-white/90">{profile.age}</span>
          </p>
        </div>
        <p className="mt-1 flex items-start gap-1.5 text-xs text-white/85">
          <MapPin className="mt-0.5 size-3.5 shrink-0 text-white/80" aria-hidden />
          <span className="leading-snug">
            {profile.city} · {formatDistanceKm(profile.distanceKm)}
          </span>
        </p>
      </div>
    </Link>
  );
}
