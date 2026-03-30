import type { DummyActivityItem } from "./types";

export const DUMMY_ACTIVITY: DummyActivityItem[] = [
  {
    id: "a1",
    type: "new_user_joined",
    title: "Nieuw lid",
    subtitle: "@milan_r is net lid geworden",
    createdAt: "2026-03-29T08:40:00.000Z",
    actorUsername: "milan_r",
  },
  {
    id: "a2",
    type: "new_like_received",
    title: "Like ontvangen",
    subtitle: "@lotte_v heeft jou een like gestuurd",
    createdAt: "2026-03-29T10:02:00.000Z",
    actorUsername: "lotte_v",
  },
  {
    id: "a3",
    type: "new_profile_photo_uploaded",
    title: "Nieuwe foto",
    subtitle: "@nina_l heeft een foto toegevoegd",
    createdAt: "2026-03-29T09:18:00.000Z",
    actorUsername: "nina_l",
  },
  {
    id: "a4",
    type: "profile_verified",
    title: "Profiel geverifieerd",
    subtitle: "@kai_m is geverifieerd",
    createdAt: "2026-03-28T21:45:00.000Z",
    actorUsername: "kai_m",
  },
  {
    id: "a5",
    type: "new_like_received",
    title: "Like ontvangen",
    subtitle: "@iris_s heeft interesse getoond",
    createdAt: "2026-03-28T19:30:00.000Z",
    actorUsername: "iris_s",
  },
  {
    id: "a6",
    type: "new_user_joined",
    title: "Nieuw lid",
    subtitle: "@quinn_p is net lid geworden",
    createdAt: "2026-03-29T11:05:00.000Z",
    actorUsername: "quinn_p",
  },
];

export function getActivityFeed(limit = 8): DummyActivityItem[] {
  return [...DUMMY_ACTIVITY]
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .slice(0, limit);
}
