import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { DemoStrip, VideoLoungeRoomView } from "@/components/dummy";
import type { VideoLoungeMessageVM, VideoLoungeParticipantVM } from "@/components/dummy/video-lounge-room-view";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { getVideoLoungeMessages, getVideoLoungeRoom, VIDEO_LOUNGE_ROOMS } from "@/lib/dummy/video-lounge";
import { getSessionProfile } from "@/lib/dummy/session";
import { getProfileById } from "@/lib/dummy/users";
import type { DummyVideoLoungeChatMessage } from "@/lib/dummy/types";
import { getProfielFotoUrlForUser } from "@/lib/profiel-fotos";
import { routes } from "@/lib/routes";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ roomId: string }> };

function buildMessageVm(
  m: DummyVideoLoungeChatMessage,
  sessionId: string | undefined
): VideoLoungeMessageVM {
  if (m.senderUserId === "system") {
    return {
      id: m.id,
      body: m.body,
      sentAtLabel: m.sentAtLabel,
      variant: "system",
      senderLabel: "",
    };
  }
  if (sessionId && m.senderUserId === sessionId) {
    return {
      id: m.id,
      body: m.body,
      sentAtLabel: m.sentAtLabel,
      variant: "me",
      senderLabel: "Jij",
    };
  }
  const profile = getProfileById(m.senderUserId);
  return {
    id: m.id,
    body: m.body,
    sentAtLabel: m.sentAtLabel,
    variant: "peer",
    senderLabel: profile?.displayName ?? "Lid",
  };
}

function buildParticipants(roomId: string): VideoLoungeParticipantVM[] {
  const room = getVideoLoungeRoom(roomId);
  if (!room) return [];

  const me = getSessionProfile();
  const out: VideoLoungeParticipantVM[] = [];

  if (me) {
    out.push({
      username: me.username,
      displayName: me.displayName,
      imageSrc: getProfielFotoUrlForUser(me.username),
      isSelf: true,
    });
  }

  for (const id of room.spotlightUserIds) {
    if (me && id === me.id) continue;
    const p = getProfileById(id);
    if (!p) continue;
    out.push({
      username: p.username,
      displayName: p.displayName,
      imageSrc: getProfielFotoUrlForUser(p.username),
    });
  }

  return out;
}

export function generateStaticParams() {
  return VIDEO_LOUNGE_ROOMS.map((r) => ({ roomId: r.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { roomId } = await params;
  const room = getVideoLoungeRoom(roomId);
  return {
    title: room ? `${room.name} · Video Lounge` : "Video Lounge",
    description: room?.description ?? "Chatroom (demo).",
  };
}

export default async function VideoLoungeRoomPage({ params }: Props) {
  const { roomId } = await params;
  const room = getVideoLoungeRoom(roomId);
  if (!room) notFound();

  const me = getSessionProfile();
  const raw = getVideoLoungeMessages(roomId);
  const initialMessages = raw.map((m) => buildMessageVm(m, me?.id));
  const participants = buildParticipants(roomId);

  return (
    <div className="site-container py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <Link
            href={routes.videoLounge}
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "-ml-2 inline-flex w-fit items-center gap-2 text-muted-foreground hover:text-foreground"
            )}
          >
            <ArrowLeft className="size-4" aria-hidden />
            Video Lounge
          </Link>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">{room.name}</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground leading-relaxed">{room.description}</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <DemoStrip />
      </div>

      <div className="mt-8">
        <VideoLoungeRoomView
          room={room}
          initialMessages={initialMessages}
          participants={participants}
        />
      </div>

      <p className="mt-10 text-left text-xs text-muted-foreground">
        Demo: geen live video of realtime — later WebRTC / Supabase Realtime en moderatie.
      </p>
    </div>
  );
}
