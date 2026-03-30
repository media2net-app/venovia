"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { routes } from "@/lib/routes";
import { setDemoSessionCookie } from "@/lib/demo-auth-client";

/** Alleen voor UI/demo — later vervangen door Supabase Auth. */
export const DUMMY_LOGIN = {
  email: "demo@venovia.nl",
  password: "VenoviaDemo2026!",
} as const;

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState<string>(DUMMY_LOGIN.email);
  const [password, setPassword] = useState<string>(DUMMY_LOGIN.password);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDemoSessionCookie();
    router.push(`${routes.dashboard}?demo=1`);
    router.refresh();
  }

  return (
    <Card className="w-full max-w-md rounded-2xl border-border/80 bg-card/80 venovia-glow-sm backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold tracking-tight">Inloggen</CardTitle>
        <CardDescription>
          Demo: vooringevulde gegevens — nog geen echte serverlogin.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <p className="rounded-lg border border-venovia-accent/25 bg-venovia-accent/10 px-3 py-2 text-xs text-muted-foreground leading-relaxed">
            <span className="font-medium text-foreground">Testaccount:</span>{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-[0.7rem] text-foreground">
              {DUMMY_LOGIN.email}
            </code>{" "}
            · wachtwoord staat al in het veld.
          </p>

          <div className="space-y-2">
            <Label htmlFor="login-email">E-mailadres</Label>
            <Input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="naam@voorbeeld.nl"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="login-password">Wachtwoord</Label>
              <Link
                href={routes.forgotPassword}
                className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Vergeten?
              </Link>
            </div>
            <Input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 pt-2">
          <Button type="submit" className="w-full venovia-glow-sm">
            Inloggen (demo)
          </Button>
          <p className="text-left text-sm text-muted-foreground">
            Nog geen account?{" "}
            <Link
              href={routes.register}
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Registreren
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
