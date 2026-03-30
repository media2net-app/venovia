"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { clearDemoSessionCookie } from "@/lib/demo-auth-client";

export function DemoLogoutButton({ className }: { className?: string }) {
  const router = useRouter();

  function handleLogout() {
    clearDemoSessionCookie();
    router.push("/");
    router.refresh();
  }

  return (
    <Button type="button" variant="ghost" size="sm" className={className} onClick={handleLogout}>
      Uitloggen
    </Button>
  );
}
