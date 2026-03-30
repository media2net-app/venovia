import type { DummyLike } from "./types";

export const DUMMY_LIKES: DummyLike[] = [
  {
    id: "lk-1",
    direction: "ontvangen",
    otherUserId: "u1",
    createdAtLabel: "vandaag · 10:02",
  },
  {
    id: "lk-2",
    direction: "ontvangen",
    otherUserId: "u3",
    createdAtLabel: "gisteren · 19:30",
  },
  {
    id: "lk-3",
    direction: "ontvangen",
    otherUserId: "u13",
    createdAtLabel: "3 dagen geleden",
  },
  {
    id: "lk-4",
    direction: "gegeven",
    otherUserId: "u9",
    createdAtLabel: "vandaag · 08:55",
  },
  {
    id: "lk-5",
    direction: "gegeven",
    otherUserId: "u6",
    createdAtLabel: "gisteren · 17:10",
  },
  {
    id: "lk-6",
    direction: "gegeven",
    otherUserId: "u14",
    createdAtLabel: "ma · 12:22",
  },
];

export const DUMMY_FAVORITE_USER_IDS = ["u1", "u9", "u3", "u6"] as const;
