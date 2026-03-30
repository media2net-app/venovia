"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Mic, Send, Video } from "lucide-react";

import { ProfileAvatar } from "./profile-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { DummyVideoLoungeRoom } from "@/lib/dummy/types";
import { cn } from "@/lib/utils";

export type VideoLoungeMessageVM = {
  id: string;
  body: string;
  sentAtLabel: string;
  variant: "system" | "me" | "peer";
  senderLabel: string;
};

export type VideoLoungeParticipantVM = {
  username: string;
  displayName: string;
  imageSrc: string | null;
  isSelf?: boolean;
};

type Props = {
  room: DummyVideoLoungeRoom;
  initialMessages: VideoLoungeMessageVM[];
  participants: VideoLoungeParticipantVM[];
};

export function VideoLoungeRoomView({ room, initialMessages, participants }: Props) {
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    const now = new Date();
    const sentAtLabel = now.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [
      ...prev,
      {
        id: `local-${now.getTime()}`,
        body: text,
        sentAtLabel,
        variant: "me",
        senderLabel: "Jij",
      },
    ]);
    setDraft("");
  }

  return (
    <div className="flex flex-col gap-6 lg:min-h-[calc(100vh-8rem)] lg:flex-row lg:gap-8">
      <section className="flex min-h-[240px] flex-1 flex-col rounded-2xl border border-border/80 bg-card/50 p-4 backdrop-blur-sm sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-sm font-semibold tracking-tight text-foreground">Ruimte</h2>
            {room.hasVideo ? (
              <Badge variant="outline" className="border-venovia-accent/40 text-[0.65rem] text-venovia-accent">
                <Video className="mr-1 size-3" aria-hidden />
                Video beschikbaar (demo)
              </Badge>
            ) : (
              <Badge variant="outline" className="border-border text-[0.65rem] text-muted-foreground">
                <MessageCircle className="mr-1 size-3" aria-hidden />
                Alleen tekst
              </Badge>
            )}
          </div>
          <span className="text-xs text-muted-foreground">
            {room.participantCount} verbonden (voorbeeld)
          </span>
        </div>

        <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
          Geen echte WebRTC — dit zijn vaste tegels om de UI te tonen. Camera/mic knoppen zijn puur visueel.
        </p>

        <div className="mt-4 grid flex-1 grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
          {participants.map((p) => (
            <div
              key={p.username}
              className={cn(
                "flex flex-col items-center gap-2 rounded-xl border border-border/70 bg-background/40 p-3 text-center",
                p.isSelf && "border-venovia-accent/40 ring-1 ring-venovia-accent/25"
              )}
            >
              <ProfileAvatar
                displayName={p.displayName}
                username={p.username}
                size="lg"
                imageSrc={p.imageSrc}
              />
              <div className="w-full space-y-1">
                <p className="truncate text-xs font-medium text-foreground">{p.displayName}</p>
                <div className="flex items-center justify-center gap-1 text-[0.65rem] text-muted-foreground">
                  <Mic className="size-3" aria-hidden />
                  <span>{p.isSelf ? "Mic aan (demo)" : "Mic uit (demo)"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex w-full flex-col rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm lg:w-[min(100%,380px)] lg:shrink-0">
        <div className="border-b border-border/70 px-4 py-3">
          <h2 className="text-sm font-semibold tracking-tight">Chat (demo)</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Berichten worden alleen lokaal toegevoegd — geen server.
          </p>
        </div>

        <div className="flex max-h-[min(52vh,420px)] flex-1 flex-col overflow-hidden">
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {messages.map((m) => {
              if (m.variant === "system") {
                return (
                  <div
                    key={m.id}
                    className="rounded-lg border border-border/60 bg-muted/30 px-3 py-2 text-center text-xs text-muted-foreground leading-relaxed"
                  >
                    <span className="text-[0.65rem] text-muted-foreground/80">{m.sentAtLabel}</span>
                    <p className="mt-1">{m.body}</p>
                  </div>
                );
              }

              const mine = m.variant === "me";
              return (
                <div key={m.id} className={cn("flex flex-col gap-0.5", mine ? "items-end" : "items-start")}>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[0.65rem] font-medium text-foreground">{m.senderLabel}</span>
                    <span className="text-[0.65rem] text-muted-foreground">{m.sentAtLabel}</span>
                  </div>
                  <div
                    className={cn(
                      "max-w-[92%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
                      mine
                        ? "bg-venovia-accent/20 text-foreground"
                        : "bg-muted/60 text-foreground"
                    )}
                  >
                    {m.body}
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          <form
            onSubmit={handleSend}
            className="border-t border-border/70 bg-background/30 p-3"
          >
            <div className="flex gap-2">
              <Input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Schrijf een bericht… (demo)"
                autoComplete="off"
                className="flex-1"
              />
              <Button type="submit" size="icon" className="shrink-0 venovia-glow-sm" aria-label="Verstuur">
                <Send className="size-4" />
              </Button>
            </div>
          </form>
        </div>
      </section>

    </div>
  );
}
