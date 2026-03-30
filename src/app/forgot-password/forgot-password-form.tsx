"use client";

import Link from "next/link";
import { useState } from "react";

import { buttonVariants } from "@/components/ui/button-variants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

export function ForgotPasswordForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-2xl border border-border/80 bg-card/70 p-6">
        <h2 className="text-lg font-semibold tracking-tight">Check je inbox (demo)</h2>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          Als dit een echte omgeving was, hadden we een resetlink gestuurd naar{" "}
          <span className="text-foreground">demo@venovia.nl</span>.
        </p>
        <Link
          href={routes.login}
          className={cn(buttonVariants({ variant: "secondary" }), "mt-6 inline-flex")}
        >
          Terug naar inloggen
        </Link>
      </div>
    );
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" name="email" type="email" defaultValue="demo@venovia.nl" required />
      </div>
      <Button type="submit" className="w-full">
        Verstuur resetlink (demo)
      </Button>
    </form>
  );
}
