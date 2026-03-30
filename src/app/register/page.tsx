import type { Metadata } from "next";
import Link from "next/link";

import { DemoStrip } from "@/components/dummy";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Account aanmaken",
  description: "Registratie (demo).",
};

export default function RegisterPage() {
  return (
    <div className="site-container py-10">
      <div className="max-w-md">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">Account aanmaken</h1>
      <p className="mt-2 text-muted-foreground leading-relaxed">
        Demo-formulier met voorbeeldwaarden — nog geen echte registratie.
      </p>

      <div className="mt-6">
        <DemoStrip />
      </div>

      <form className="mt-8 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" name="email" type="email" defaultValue="nieuw@venovia.nl" autoComplete="email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="user">Gebruikersnaam</Label>
          <Input id="user" name="user" defaultValue="jouw_gebruikersnaam" autoComplete="username" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pass">Wachtwoord</Label>
          <Input id="pass" name="pass" type="password" defaultValue="Voorbeeld123!" autoComplete="new-password" />
        </div>

        <Button type="button" className="w-full venovia-glow-sm" disabled>
          Account aanmaken (demo)
        </Button>

        <p className="text-left text-sm text-muted-foreground">
          Heb je al een account?{" "}
          <Link className="font-medium text-foreground underline-offset-4 hover:underline" href={routes.login}>
            Inloggen
          </Link>
        </p>
      </form>

      <p className="mt-8 text-left text-xs text-muted-foreground">
        Door te registreren ga je akkoord met de toekomstige voorwaarden (nog niet actief).
      </p>
      </div>
    </div>
  );
}
