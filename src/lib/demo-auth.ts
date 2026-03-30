/** Demo-inloggen zonder backend: cookie die de shell (layout) en header lezen. */
export const VENOVIA_DEMO_SESSION_COOKIE = "venovia_demo_session";
export const VENOVIA_DEMO_SESSION_VALUE = "1";

type CookieGetter = {
  get(name: string): { value: string } | undefined;
};

export function isDemoSessionCookie(cookieStore: CookieGetter): boolean {
  return cookieStore.get(VENOVIA_DEMO_SESSION_COOKIE)?.value === VENOVIA_DEMO_SESSION_VALUE;
}
