export * from "./types";
export * from "./users";
export * from "./activity";
export * from "./conversations";
export * from "./reports";
export * from "./likes";
export * from "./session";
export * from "./video-lounge";

import { listProfilesExcludingSession } from "./users";
import type { DummyProfile } from "./types";

export type BrowseSort = "recent" | "dichtbij" | "populair";

export function sortProfiles(profiles: DummyProfile[], sort: BrowseSort): DummyProfile[] {
  const copy = [...profiles];
  if (sort === "recent") {
    copy.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  } else if (sort === "dichtbij") {
    copy.sort((a, b) => a.distanceKm - b.distanceKm);
  } else {
    copy.sort((a, b) => b.popularity - a.popularity);
  }
  return copy;
}

export function getBrowseProfiles(sort: BrowseSort = "recent"): DummyProfile[] {
  return sortProfiles(listProfilesExcludingSession(), sort);
}

export function getRecommendedProfiles(limit = 6): DummyProfile[] {
  return sortProfiles(listProfilesExcludingSession(), "populair").slice(0, limit);
}

export function getNewMembers(limit = 4): DummyProfile[] {
  return sortProfiles(listProfilesExcludingSession(), "recent").filter((p) => p.isNew).slice(0, limit);
}

export function getOnlineNow(limit = 6): DummyProfile[] {
  return listProfilesExcludingSession()
    .filter((p) => p.online)
    .slice(0, limit);
}

export function getHomeSpotlight(): {
  nieuweLeden: DummyProfile[];
  onlineNu: DummyProfile[];
  aanbevolen: DummyProfile[];
} {
  return {
    nieuweLeden: getNewMembers(4),
    onlineNu: getOnlineNow(4),
    aanbevolen: getRecommendedProfiles(4),
  };
}

export * from "./swipe";
