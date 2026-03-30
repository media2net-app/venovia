import type { DummyProfile } from "@/lib/dummy/types";

export function profileHasCoupleSpeakers(profile: DummyProfile | null | undefined): profile is DummyProfile & {
  couplePartnerNames: [string, string];
} {
  const n = profile?.couplePartnerNames;
  return Boolean(n && n.length === 2 && n[0].trim() && n[1].trim());
}

export function otherSideIsCouple(other: DummyProfile | null | undefined): boolean {
  if (!other) return false;
  if (other.gender === "koppel") return true;
  return profileHasCoupleSpeakers(other);
}
