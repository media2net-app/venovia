import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { BrowseSort } from "@/lib/dummy";
import { cn } from "@/lib/utils";

const SORT_LABELS: Record<BrowseSort, string> = {
  recent: "Nieuwe deelnemers",
  dichtbij: "Dichtbij",
  populair: "Populair",
};

type Props = {
  activeSort: BrowseSort;
  className?: string;
};

export function BrowseFiltersSidebar({ activeSort, className }: Props) {
  return (
    <Card
      className={cn(
        "rounded-2xl border-border/80 bg-card/70 text-left shadow-sm",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-4">
        <CardTitle className="text-base font-semibold">Filteren</CardTitle>
        <Button type="button" variant="ghost" size="sm" className="h-8 text-xs" disabled>
          Wis filters
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-xs text-muted-foreground">
          Demo: schakelaars zijn nog niet gekoppeld aan echte data.
        </p>

        <div className="space-y-2">
          <Label htmlFor="browse-sort">Sorteren</Label>
          <Input id="browse-sort" readOnly value={SORT_LABELS[activeSort]} className="bg-muted/50" />
        </div>

        <div className="flex items-center justify-between gap-3">
          <Label htmlFor="browse-photo" className="text-sm font-normal">
            Met foto
          </Label>
          <input
            id="browse-photo"
            type="checkbox"
            defaultChecked
            disabled
            className="size-4 accent-primary"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Leeftijd</Label>
            <span className="text-xs text-muted-foreground">18 – 48</span>
          </div>
          <input type="range" min={18} max={48} defaultValue={48} disabled className="w-full" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="browse-gender">Geslacht</Label>
          <Input id="browse-gender" readOnly defaultValue="vrouw; stel (m/v)" className="bg-muted/50" />
        </div>

        <div className="flex items-center justify-between gap-3">
          <Label htmlFor="browse-online" className="text-sm font-normal">
            Online
          </Label>
          <input
            id="browse-online"
            type="checkbox"
            defaultChecked
            disabled
            className="size-4 accent-primary"
          />
        </div>

        <Separator />

        <details className="group rounded-lg border border-border/60 bg-background/40 px-3 py-2">
          <summary className="cursor-pointer text-sm font-medium">Meer filters</summary>
          <div className="mt-3 space-y-3 text-sm text-muted-foreground">
            <p>Burgerlijke staat, opleiding, postuur, lengte, piercings, tatoeages — volgen later.</p>
          </div>
        </details>
      </CardContent>
    </Card>
  );
}
