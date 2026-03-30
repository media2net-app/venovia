import type { Metadata } from "next";

import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Inloggen",
  description: "Inloggen bij Venovia (demo met vooringevulde gegevens).",
};

export default function LoginPage() {
  return (
    <div className="site-container py-14">
      <LoginForm />
    </div>
  );
}
