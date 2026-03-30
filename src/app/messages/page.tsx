import type { Metadata } from "next";

import { MessagesEmptyChat, MessagesInboxShell } from "@/components/dummy";
import { listConversationsForSession } from "@/lib/dummy/conversations";
import { getNewMembers, getOnlineNow } from "@/lib/dummy";
import type { DummyConversation, DummyProfile } from "@/lib/dummy/types";
import { getProfileById } from "@/lib/dummy/users";

export const metadata: Metadata = {
  title: "Berichten",
  description: "Je gesprekken (demo).",
};

export default function MessagesPage() {
  const convos: { conversation: DummyConversation; other: DummyProfile }[] = listConversationsForSession()
    .map((c) => {
      const other = getProfileById(c.otherUserId);
      return other ? { conversation: c, other } : null;
    })
    .filter((x): x is { conversation: DummyConversation; other: DummyProfile } => x !== null);

  const online = getOnlineNow(12);
  const newestPhotos = getNewMembers(8);

  return (
    <MessagesInboxShell
      conversations={convos}
      activeConversationId={null}
      online={online}
      newestPhotos={newestPhotos}
      right={<MessagesEmptyChat />}
    />
  );
}
