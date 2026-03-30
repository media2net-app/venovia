import type { ReactNode } from "react";

import type { DummyConversation } from "@/lib/dummy/types";
import type { DummyProfile } from "@/lib/dummy/types";

import { ConversationRow } from "./conversation-row";
import { MessagesLeftSidebar } from "./messages-left-sidebar";

type Entry = { conversation: DummyConversation; other: DummyProfile };

type Props = {
  conversations: Entry[];
  activeConversationId: string | null;
  online: DummyProfile[];
  newestPhotos: DummyProfile[];
  right: ReactNode;
};

export function MessagesInboxShell({
  conversations,
  activeConversationId,
  online,
  newestPhotos,
  right,
}: Props) {
  const total = conversations.length;
  const shown = total;

  return (
    <div className="site-container py-6 sm:py-8">
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/40 shadow-sm ring-1 ring-white/5">
        <div className="flex min-h-[min(720px,calc(100vh-8rem))] flex-col lg:flex-row">
          <MessagesLeftSidebar online={online} newestPhotos={newestPhotos} />

          <div className="flex min-h-0 min-w-0 flex-1 flex-col border-border/60 lg:max-w-[min(100%,420px)] lg:border-r">
            <div className="border-b border-border/60 px-3 pt-3">
              <div className="flex gap-4 text-sm font-medium">
                <button
                  type="button"
                  className="border-b-2 border-transparent pb-2 text-muted-foreground opacity-60"
                  disabled
                >
                  Verzoeken
                </button>
                <span className="border-b-2 border-venovia-accent pb-2 text-venovia-accent">Gesprekken</span>
                <button
                  type="button"
                  className="border-b-2 border-transparent pb-2 text-muted-foreground opacity-60"
                  disabled
                >
                  Genegeerd
                </button>
              </div>
              <p className="pb-2 pt-2 text-[0.7rem] text-muted-foreground">
                {total === 0 ? "Geen gesprekken" : `1 t/m ${shown} van ${total}`}
              </p>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto">
              {conversations.length === 0 ? (
                <p className="p-4 text-sm text-muted-foreground">Nog geen gesprekken (demo).</p>
              ) : (
                conversations.map(({ conversation, other }) => (
                  <ConversationRow
                    key={conversation.id}
                    conversation={conversation}
                    other={other}
                    active={conversation.id === activeConversationId}
                  />
                ))
              )}
            </div>
          </div>

          <section className="flex min-h-[320px] min-w-0 flex-1 flex-col bg-background/40 lg:min-h-0">
            {right}
          </section>
        </div>
      </div>
    </div>
  );
}
