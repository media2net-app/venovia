import Link from "next/link";

import { ProfileAvatar } from "./profile-avatar";
import type { DummyProfile } from "@/lib/dummy/types";
import { getProfielFotoUrlForUser } from "@/lib/profiel-fotos";
import { routes } from "@/lib/routes";
import { formatGenderAgeLine } from "@/lib/messages-ui";
import { cn } from "@/lib/utils";

type Props = {
  online: DummyProfile[];
  newestPhotos: DummyProfile[];
};

export function MessagesLeftSidebar({ online, newestPhotos }: Props) {
  return (
    <aside className="flex w-full min-w-0 flex-col gap-6 border-border/60 bg-black/20 p-4 lg:w-[220px] lg:shrink-0 lg:border-r">
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Laatst online</h2>
        <ul className="mt-3 space-y-3">
          {online.slice(0, 8).map((p) => (
            <li key={p.id}>
              <Link
                href={routes.profile(p.username)}
                className="group flex items-start gap-2 rounded-lg p-1 transition-colors hover:bg-muted/40"
              >
                <span className="relative shrink-0">
                  <ProfileAvatar
                    displayName={p.displayName}
                    username={p.username}
                    size="sm"
                    imageSrc={getProfielFotoUrlForUser(p.username)}
                  />
                  <span
                    className={cn(
                      "absolute bottom-0 right-0 size-2.5 rounded-full ring-2 ring-background",
                      p.online ? "bg-emerald-400" : "bg-amber-500"
                    )}
                    aria-hidden
                  />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-foreground group-hover:underline">
                    {p.username}
                  </span>
                  <span className="block truncate text-[0.7rem] text-muted-foreground">
                    {formatGenderAgeLine(p)}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={routes.browse}
          className="mt-2 inline-block text-xs font-medium text-venovia-accent hover:underline"
        >
          meer…
        </Link>
      </section>

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Nieuwste foto&apos;s</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {newestPhotos.slice(0, 4).map((p) => (
            <Link
              key={p.id}
              href={routes.profile(p.username)}
              className="relative block overflow-hidden rounded-full ring-2 ring-transparent transition hover:ring-venovia-accent/50"
            >
              <ProfileAvatar
                displayName={p.displayName}
                username={p.username}
                size="md"
                imageSrc={getProfielFotoUrlForUser(p.username)}
              />
            </Link>
          ))}
        </div>
        <Link
          href={routes.browse}
          className="mt-2 inline-block text-xs font-medium text-venovia-accent hover:underline"
        >
          meer…
        </Link>
      </section>
    </aside>
  );
}
