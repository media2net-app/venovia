import type { Metadata } from "next";

import { DemoStrip, SwipeDeck } from "@/components/dummy";
import { getSwipeDeckProfiles, getSwipePreLikedMeIds } from "@/lib/dummy/swipe";
import { getSessionProfile } from "@/lib/dummy/session";
import { getProfielFotoUrlForUser } from "@/lib/profiel-fotos";

export const metadata: Metadata = {
  title: "Swipe & Like",
  description: "Swipe profielen zoals bij Tinder — demo met matches en notificaties.",
};

export default function SwipePage() {
  const profiles = getSwipeDeckProfiles();
  const preLiked = getSwipePreLikedMeIds();
  const me = getSessionProfile();

  const deck = profiles.map((p) => ({
    profile: p,
    imageSrc: getProfielFotoUrlForUser(p.username),
  }));

  const sessionVm = me
    ? {
        displayName: me.displayName,
        username: me.username,
        imageSrc: getProfielFotoUrlForUser(me.username),
      }
    : null;

  return (
    <div className="site-container py-10">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Swipe & Like</h1>
        <p className="mt-2 text-muted-foreground leading-relaxed">
          Swipe naar links om te passen, naar rechts om te liken. Als iemand jou al geliket heeft en jij
          liket terug, is het een <span className="font-medium text-foreground">match</span> — je ziet een
          melding en een match-scherm (demo, geen echte backend).
        </p>
      </div>

      <div className="mt-6">
        <DemoStrip />
      </div>

      <div className="mt-8">
        <SwipeDeck deck={deck} preLikedUserIds={preLiked} session={sessionVm} />
      </div>

      <p className="mt-10 text-left text-xs text-muted-foreground">
        Demo: likes en matches blijven in deze sessie; later koppelen we realtime notificaties en chat via
        Supabase.
      </p>
    </div>
  );
}
