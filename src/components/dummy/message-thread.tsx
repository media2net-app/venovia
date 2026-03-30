"use client";

import { useEffect, useState } from "react";
import { Camera, CheckCheck, Send, Smile } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { otherSideIsCouple, profileHasCoupleSpeakers } from "@/lib/couple-chat";
import type { DummyConversation, DummyMessage, DummyProfile } from "@/lib/dummy/types";
import { dayKeyFromSentLabel } from "@/lib/messages-ui";
import { DUMMY_SESSION_USER_ID } from "@/lib/dummy/users";
import { cn } from "@/lib/utils";

type Props = {
  conversation: DummyConversation;
  meProfile: DummyProfile;
  otherProfile: DummyProfile;
};

export function MessageThread({ conversation, meProfile, otherProfile }: Props) {
  const [messages, setMessages] = useState<DummyMessage[]>(() => conversation.messages);
  const [draft, setDraft] = useState("");
  const [speakerIdx, setSpeakerIdx] = useState(0);

  useEffect(() => {
    setMessages(conversation.messages);
    setDraft("");
    setSpeakerIdx(0);
  }, [conversation.id]);

  const showSpeakerPicker = profileHasCoupleSpeakers(meProfile);
  const partnerNames = showSpeakerPicker ? meProfile.couplePartnerNames : null;
  const showCoupleHint =
    otherSideIsCouple(otherProfile) && !showSpeakerPicker;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;

    const now = new Date();
    const time = now.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" });
    const label =
      showSpeakerPicker && partnerNames ? partnerNames[speakerIdx] ?? partnerNames[0] : undefined;

    const msg: DummyMessage = {
      id: `local-${now.getTime()}`,
      conversationId: conversation.id,
      senderId: DUMMY_SESSION_USER_ID,
      body: text,
      sentAtLabel: `vandaag · ${time}`,
      ...(label ? { coupleSpeakerLabel: label } : {}),
    };

    setMessages((prev) => [...prev, msg]);
    setDraft("");
  }

  let lastDay: string | null = null;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div
        className="relative min-h-0 flex-1 overflow-y-auto px-3 py-4"
        style={{
          backgroundColor: "oklch(0.16 0.02 285)",
          backgroundImage:
            "radial-gradient(circle at 1px 1px, oklch(1 0 0 / 0.05) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      >
        <div className="mx-auto max-w-[560px] space-y-4">
          {messages.map((m) => {
            const mine = m.senderId === DUMMY_SESSION_USER_ID;
            const day = dayKeyFromSentLabel(m.sentAtLabel);
            const showDay = day !== lastDay;
            lastDay = day;

            const speaker = m.coupleSpeakerLabel;
            const showSpeaker =
              Boolean(speaker) &&
              ((mine && showSpeakerPicker) || (!mine && otherSideIsCouple(otherProfile)));

            return (
              <div key={m.id}>
                {showDay ? (
                  <div className="flex justify-center py-2">
                    <span className="rounded-full bg-muted/80 px-3 py-1 text-[0.7rem] font-medium text-muted-foreground">
                      {day}
                    </span>
                  </div>
                ) : null}

                <div className={cn("flex", mine ? "justify-start" : "justify-end")}>
                  <div
                    className={cn(
                      "max-w-[min(100%,85%)] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-sm",
                      mine
                        ? "border border-zinc-700 bg-zinc-950 text-zinc-50"
                        : "bg-zinc-600/90 text-white"
                    )}
                  >
                    {showSpeaker ? (
                      <p
                        className={cn(
                          "mb-1 text-[0.65rem] font-semibold tracking-wide",
                          mine ? "text-venovia-accent" : "text-venovia-accent"
                        )}
                      >
                        {speaker}
                      </p>
                    ) : null}
                    <p>{m.body}</p>
                    <div
                      className={cn(
                        "mt-1 flex items-center justify-end gap-1 text-[0.65rem]",
                        mine ? "text-zinc-400" : "text-white/75"
                      )}
                    >
                      {!mine ? (
                        <CheckCheck className="size-3.5 text-venovia-accent" aria-hidden />
                      ) : null}
                      <span>
                        {m.sentAtLabel.includes("·")
                          ? m.sentAtLabel.split("·")[1]?.trim() ?? m.sentAtLabel
                          : m.sentAtLabel}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <form
        className="border-t border-border/60 bg-card/80 px-3 py-3 backdrop-blur-sm"
        onSubmit={handleSubmit}
      >
        <div className="mx-auto max-w-[560px]">
          {showSpeakerPicker && partnerNames ? (
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="text-[0.7rem] font-medium text-muted-foreground">Spreker</span>
              <div className="flex flex-wrap gap-1.5">
                {partnerNames.map((name, i) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setSpeakerIdx(i)}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                      speakerIdx === i
                        ? "border-venovia-accent bg-venovia-accent/15 text-venovia-accent"
                        : "border-border/70 bg-background/60 text-muted-foreground hover:border-border hover:text-foreground"
                    )}
                  >
                    {name}
                  </button>
                ))}
              </div>
              <span className="text-[0.65rem] text-muted-foreground">
                Zo weet de ander direct wie er typt — geen “wie ben jij?” meer.
              </span>
            </div>
          ) : null}

          {showCoupleHint ? (
            <p className="mb-2 text-[0.65rem] text-muted-foreground">
              Tip: als jullie ook een koppelaccount met twee namen hebben, verschijnt hier automatisch dezelfde
              sprekerkeuze.
            </p>
          ) : null}

          <div className="flex items-end gap-2">
            <div className="flex shrink-0 gap-1 pb-1 text-muted-foreground">
              <button
                type="button"
                className="rounded-md p-2 hover:bg-muted/60 hover:text-foreground"
                aria-label="Camera (demo)"
                disabled
              >
                <Camera className="size-5" />
              </button>
              <button
                type="button"
                className="rounded-md p-2 hover:bg-muted/60 hover:text-foreground"
                aria-label="Emoji (demo)"
                disabled
              >
                <Smile className="size-5" />
              </button>
            </div>
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Schrijf een bericht"
              className="min-h-11 flex-1 rounded-xl border-border/70 bg-background/80"
            />
            <Button
              type="submit"
              className="shrink-0 rounded-xl border-2 border-venovia-accent bg-transparent text-venovia-accent hover:bg-venovia-accent/10"
            >
              <Send className="mr-2 size-4" aria-hidden />
              Versturen
            </Button>
          </div>
        </div>
        <p className="mx-auto mt-2 max-w-[560px] text-center text-[0.65rem] text-muted-foreground">
          Demo — berichten blijven in deze sessie tot je de pagina ververst.
        </p>
      </form>
    </div>
  );
}
