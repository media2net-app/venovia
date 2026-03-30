"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { setDemoSessionCookie } from "@/lib/demo-auth-client";

/** Zet demo-sessie-cookie als iemand met ?demo=1 op het dashboard landt (zonder via login te gaan). */
export function DashboardDemoCookieSync() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("demo") !== "1") return;
    setDemoSessionCookie();
    router.refresh();
  }, [searchParams, router]);

  return null;
}
