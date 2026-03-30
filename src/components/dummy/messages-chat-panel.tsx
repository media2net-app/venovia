
import { MoreVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { DummyConversation } from "@/lib/dummy/types";
import type { DummyProfile } from "@/lib/dummy/types";
import { formatGenderAgeLine } from "@/lib/messages-ui";
import { cn } from "@/lib/utils";

import { MessageThread } from "./message-thread";
import { ProfileAvatar } from "./profile-avatar";

type Props = {
  conversation: DummyConversation;
  other: DummyProfile;
  me: DummyProfile;
  imageSrc: string | null;
};

export function MessagesChatPanel({ conversation, other, me, imageSrc }: Props) {
  return (
    <div className="flex h-full min-h-[420px] flex-col">
      <header className="flex items-start gap-3 border-b border-border/60 bg-card/70 px-4 py-3">
        <span className="relative shrink-0">
          <ProfileAvatar
            displayName={other.displayName}
            username={other.username}
            size="md"
            imageSrc={imageSrc}
          />
          <span
            className={cn(
              "absolute bottom-0.5 right-0.5 size-3 rounded-full ring-2 ring-card",
              other.online ? "bg-emerald-400" : "bg-amber-500"
            )}
            aria-hidden
          />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-foreground">{other.username}</p>
          <p className="text-[0.8rem] text-muted-foreground">
            {formatGenderAgeLine(other)} · {other.city} ± {other.distanceKm} km
          </p>
        </div>
        <Button type="button" size="icon" variant="ghost" className="shrink-0 text-muted-foreground" aria-label="Meer opties (demo)" disabled>
          <MoreVertical className="size-5" />
        </Button>
      </header>

      <MessageThread key={conversation.id} conversation={conversation} meProfile={me} otherProfile={other} />
    </div>
  );
}
