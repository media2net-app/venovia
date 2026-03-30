import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import type { DummyConversation } from "@/lib/dummy/types";
import type { DummyProfile } from "@/lib/dummy/types";
import { formatGenderAgeLine } from "@/lib/messages-ui";
import { getProfielFotoUrlForUser } from "@/lib/profiel-fotos";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

import { ProfileAvatar } from "./profile-avatar";

type Props = {
  conversation: DummyConversation;
  other: DummyProfile;
  active?: boolean;
};

export function ConversationRow({ conversation, other, active }: Props) {
  const fotoUrl = getProfielFotoUrlForUser(other.username);

  return (
    <Link
      href={routes.conversation(conversation.id)}
      className={cn(
        "relative flex gap-3 border-b border-border/50 px-3 py-3 transition-colors",
        active
          ? "bg-venovia-accent/10 before:absolute before:left-0 before:top-2 before:h-[calc(100%-1rem)] before:w-1 before:rounded-full before:bg-venovia-accent"
          : "hover:bg-muted/30"
      )}
    >
      <span className="relative shrink-0">
        <ProfileAvatar
          displayName={other.displayName}
          username={other.username}
          size="md"
          imageSrc={fotoUrl}
        />
        <span
          className={cn(
            "absolute bottom-0.5 right-0.5 size-3 rounded-full ring-2 ring-card",
            other.online ? "bg-emerald-400" : "bg-amber-500"
          )}
          title={other.online ? "Online" : "Afwezig"}
          aria-hidden
        />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="truncate font-semibold text-foreground">{other.username}</p>
          <span className="shrink-0 text-[0.7rem] text-muted-foreground">{conversation.lastMessageAtLabel}</span>
        </div>
        <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">{conversation.lastMessagePreview}</p>
        <p className="mt-1 flex flex-wrap items-center gap-x-2 text-[0.7rem] text-muted-foreground">
          <span>{formatGenderAgeLine(other)}</span>
          <span className="text-muted-foreground/60">·</span>
          <span>
            {other.city} ± {other.distanceKm} km
          </span>
        </p>
      </div>

      {conversation.unreadCount > 0 ? (
        <Badge className="h-6 min-w-6 shrink-0 justify-center rounded-full border-venovia-accent/40 bg-venovia-accent/15 px-1 text-[0.7rem] text-venovia-accent">
          {conversation.unreadCount}
        </Badge>
      ) : null}
    </Link>
  );
}
