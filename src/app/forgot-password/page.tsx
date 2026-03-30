import type { Metadata } from "next";
import Link from "next/link";

import { DemoStrip } from "@/components/dummy";
import { ForgotPasswordForm } from "./forgot-password-form";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Wachtwoord vergeten",
  description: "Wachtwoord resetten (demo).",
};

export default function ForgotPasswordPage() {
  return (
    <div className="site-container py-10">
      <div className="max-w-md">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">Wachtwoord vergeten</h1>
      <p className="mt-2 text-muted-foreground leading-relaxed">
        Voer je e-mail in — in deze demo is er geen echte mail.
      </p>

      <div className="mt-6">
        <DemoStrip />
      </div>

      <div className="mt-8">
        <ForgotPasswordForm />
      </div>

      <p className="mt-8 text-left text-sm text-muted-foreground">
        <Link href={routes.login} className="font-medium text-foreground underline-offset-4 hover:underline">
          Terug naar inloggen
        </Link>
      </p>
      </div>
    </div>
  );
}
