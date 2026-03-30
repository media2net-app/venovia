import type { DummyProfile } from "@/lib/dummy/types";

/** Regel zoals in Novamora: "stel (m/v), 39" / "vrouw, 31" */
export function formatGenderAgeLine(p: DummyProfile): string {
  const g =
    p.gender === "man" ? "man" : p.gender === "vrouw" ? "vrouw" : "stel (m/v)";
  return `${g}, ${p.age}`;
}

export function dayKeyFromSentLabel(label: string): string {
  const part = label.split("·")[0]?.trim() ?? label;
  return part || label;
}
