import { Activity, Heart, ImageIcon, ShieldCheck, UserPlus } from "lucide-react";

import type { DummyActivityItem } from "@/lib/dummy/types";
import { cn } from "@/lib/utils";

function Icon({ type }: { type: DummyActivityItem["type"] }) {
  const cls = "size-4 shrink-0 text-venovia-accent";
  switch (type) {
    case "new_user_joined":
      return <UserPlus className={cls} aria-hidden />;
    case "new_like_received":
      return <Heart className={cls} aria-hidden />;
    case "new_profile_photo_uploaded":
      return <ImageIcon className={cls} aria-hidden />;
    case "profile_verified":
      return <ShieldCheck className={cls} aria-hidden />;
    default:
      return <Activity className={cls} aria-hidden />;
  }
}

export function ActivityFeedList({ items }: { items: DummyActivityItem[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li
          key={item.id}
          className={cn(
            "flex gap-3 rounded-2xl border border-border/60 bg-card/60 px-3 py-3",
            "backdrop-blur-sm"
          )}
        >
          <div className="mt-0.5">
            <Icon type={item.type} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground">{item.title}</p>
            <p className="text-sm text-muted-foreground leading-snug">{item.subtitle}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
