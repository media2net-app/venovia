import Link from "next/link";

import { routes } from "@/lib/routes";
import { Separator } from "@/components/ui/separator";

const footerLinks = [
  { href: routes.home, label: "Home" },
  { href: routes.browse, label: "Ontdekken" },
  { href: "/#veiligheid", label: "Veiligheid" },
  { href: "/#privacy", label: "Privacy" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-card/30">
      <div className="site-container py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-3">
            <p className="text-sm font-semibold tracking-tight text-foreground">Venovia</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Discreet verbinden in Nederland. Premium uitstraling, focus op veiligheid en echte
              activiteit.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={routes.admin}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Admin
            </Link>
          </div>
        </div>
        <Separator className="my-8 bg-border/60" />
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Venovia. Alle rechten voorbehouden.
        </p>
      </div>
    </footer>
  );
}
