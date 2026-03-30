import {
  VENOVIA_DEMO_SESSION_COOKIE,
  VENOVIA_DEMO_SESSION_VALUE,
} from "@/lib/demo-auth";

const MAX_AGE_S = 60 * 60 * 24 * 30;

export function setDemoSessionCookie(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${VENOVIA_DEMO_SESSION_COOKIE}=${VENOVIA_DEMO_SESSION_VALUE}; Path=/; Max-Age=${MAX_AGE_S}; SameSite=Lax`;
}

export function clearDemoSessionCookie(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${VENOVIA_DEMO_SESSION_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
}
