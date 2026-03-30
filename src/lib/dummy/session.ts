import { getProfileById } from "./users";
import { DUMMY_SESSION_USER_ID } from "./users";

export const DUMMY_SESSION_EMAIL = "demo@venovia.nl";

export function getSessionProfile() {
  return getProfileById(DUMMY_SESSION_USER_ID);
}
