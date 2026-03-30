import type { DummyProfile } from "./types";
import { listProfilesExcludingSession } from "./users";

/**
 * Profielen die jou al geliket hebben (demo).
 * Swipe/like jij ook rechts → wederzijdse match + notificatie in UI.
 */
const PRE_LIKED_ME_IDS = ["u1", "u4", "u7"] as const;

export function getSwipeDeckProfiles(): DummyProfile[] {
  const list = listProfilesExcludingSession();
  return [...list].sort((a, b) => b.popularity - a.popularity);
}

export function getSwipePreLikedMeIds(): string[] {
  return [...PRE_LIKED_ME_IDS];
}
