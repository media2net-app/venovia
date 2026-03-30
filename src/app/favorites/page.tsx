import type { Metadata } from "next";

import { DemoStrip, ProfileCard } from "@/components/dummy";
import { DUMMY_FAVORITE_USER_IDS } from "@/lib/dummy/likes";
import { getProfileById } from "@/lib/dummy/users";

export const metadata: Metadata = {
  title: "Favorieten",
  description: "Favoriete profielen (demo).",
};

export default function FavoritesPage() {
  const profiles = DUMMY_FAVORITE_USER_IDS.map((id) => getProfileById(id)).filter(Boolean);

  return (
    <div className="site-container py-10">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">Favorieten</h1>
      <p className="mt-2 text-muted-foreground leading-relaxed">
        Profielen die je hebt opgeslagen — demo-data.
      </p>

      <div className="mt-6">
        <DemoStrip />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {profiles.map((p) => (
          <ProfileCard key={p!.id} profile={p!} />
        ))}
      </div>
    </div>
  );
}
