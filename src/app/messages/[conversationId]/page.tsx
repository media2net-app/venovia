import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MessagesChatPanel, MessagesInboxShell } from "@/components/dummy";
import { getConversationById, listConversationsForSession } from "@/lib/dummy/conversations";
import { getNewMembers, getOnlineNow } from "@/lib/dummy";
import type { DummyConversation, DummyProfile } from "@/lib/dummy/types";
import { getSessionProfile } from "@/lib/dummy/session";
import { getProfileById } from "@/lib/dummy/users";
import { getProfielFotoUrlForUser } from "@/lib/profiel-fotos";

type Props = { params: Promise<{ conversationId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { conversationId } = await params;
  const c = getConversationById(conversationId);
  const other = c ? getProfileById(c.otherUserId) : undefined;
  return {
    title: other ? `Chat met @${other.username}` : "Gesprek",
    description: "Privégesprek (demo).",
  };
}

export default async function ConversationPage({ params }: Props) {
  const { conversationId } = await params;
  const conversation = getConversationById(conversationId);
  if (!conversation) notFound();

  const other = getProfileById(conversation.otherUserId);
  if (!other) notFound();

  const me = getSessionProfile();
  if (!me) notFound();

  const fotoUrl = getProfielFotoUrlForUser(other.username);

  const convos: { conversation: DummyConversation; other: DummyProfile }[] = listConversationsForSession()
    .map((c) => {
      const o = getProfileById(c.otherUserId);
      return o ? { conversation: c, other: o } : null;
    })
    .filter((x): x is { conversation: DummyConversation; other: DummyProfile } => x !== null);

  const online = getOnlineNow(12);
  const newestPhotos = getNewMembers(8);

  return (
    <MessagesInboxShell
      conversations={convos}
      activeConversationId={conversation.id}
      online={online}
      newestPhotos={newestPhotos}
      right={<MessagesChatPanel conversation={conversation} other={other} me={me} imageSrc={fotoUrl} />}
    />
  );
}
