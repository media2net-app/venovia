import type { Metadata } from "next";

import { DemoStrip, ProfileCard } from "@/components/dummy";
import { DUMMY_LIKES } from "@/lib/dummy/likes";
import { getProfileById } from "@/lib/dummy/users";

export const metadata: Metadata = {
  title: "Mijn likes",
  description: "Likes (demo).",
};

export default function LikesPage() {
  const ontvangen = DUMMY_LIKES.filter((l) => l.direction === "ontvangen");
  const gegeven = DUMMY_LIKES.filter((l) => l.direction === "gegeven");

  return (
    <div className="site-container py-10">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">Mijn likes</h1>
      <p className="mt-2 text-muted-foreground leading-relaxed">
        Overzicht van likes in het demo-account — later gekoppeld aan echte interacties.
      </p>

      <div className="mt-6">
        <DemoStrip />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <section className="space-y-4">
          <h2 className="text-lg font-semibold tracking-tight">Ontvangen</h2>
          <div className="space-y-3">
            {ontvangen.map((l) => {
              const p = getProfileById(l.otherUserId);
              if (!p) return null;
              return (
                <div key={l.id} className="space-y-2">
                  <p className="text-xs text-muted-foreground">{l.createdAtLabel}</p>
                  <ProfileCard profile={p} compact />
                </div>
              );
            })}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold tracking-tight">Gegeven</h2>
          <div className="space-y-3">
            {gegeven.map((l) => {
              const p = getProfileById(l.otherUserId);
              if (!p) return null;
              return (
                <div key={l.id} className="space-y-2">
                  <p className="text-xs text-muted-foreground">{l.createdAtLabel}</p>
                  <ProfileCard profile={p} compact />
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
