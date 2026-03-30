"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useRef, useState } from "react";
import { Heart, MapPin, X } from "lucide-react";

import { ProfileAvatar } from "./profile-avatar";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import { initialsFromDisplayName } from "@/lib/avatar-utils";
import type { DummyProfile } from "@/lib/dummy/types";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

export type SwipeDeckEntry = {
  profile: DummyProfile;
  imageSrc: string | null;
};

type SessionVm = {
  displayName: string;
  username: string;
  imageSrc: string | null;
};

type Props = {
  deck: SwipeDeckEntry[];
  preLikedUserIds: string[];
  session: SessionVm | null;
};

const SWIPE_THRESHOLD = 96;

export function SwipeDeck({ deck, preLikedUserIds, session }: Props) {
  const preLiked = useMemo(() => new Set(preLikedUserIds), [preLikedUserIds]);
  const [index, setIndex] = useState(0);
  const [exit, setExit] = useState<"left" | "right" | null>(null);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const pointerActive = useRef(false);
  const dragXRef = useRef(0);

  const [matchProfile, setMatchProfile] = useState<DummyProfile | null>(null);
  const [toast, setToast] = useState<{ title: string; body: string } | null>(null);

  const current = deck[index];
  const next = deck[index + 1];

  const dismissToast = useCallback(() => setToast(null), []);

  const goNext = useCallback(() => {
    setIndex((i) => i + 1);
    setExit(null);
    dragXRef.current = 0;
    setDragX(0);
  }, []);

  const showToast = useCallback((title: string, body: string) => {
    setToast({ title, body });
    window.setTimeout(() => setToast(null), 5200);
  }, []);

  const commitPass = useCallback(() => {
    if (!current) return;
    setExit("left");
    window.setTimeout(goNext, 240);
  }, [current, goNext]);

  const commitLike = useCallback(() => {
    if (!current) return;
    const p = current.profile;
    const isMatch = preLiked.has(p.id);
    setExit("right");
    window.setTimeout(() => {
      if (isMatch) {
        setMatchProfile(p);
        showToast("Nieuwe match", `Jij en ${p.displayName} vinden elkaar leuk.`);
      } else {
        showToast("Like verstuurd", `${p.displayName} krijgt een seintje (demo).`);
      }
      goNext();
    }, 240);
  }, [current, goNext, preLiked, showToast]);

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (!current || exit) return;
    pointerActive.current = true;
    setIsDragging(true);
    dragXRef.current = dragX;
    startX.current = e.clientX - dragX;
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!pointerActive.current || !current || exit) return;
    const x = e.clientX - startX.current;
    const clamped = Math.max(-220, Math.min(220, x));
    dragXRef.current = clamped;
    setDragX(clamped);
  }

  function onPointerEnd(e: React.PointerEvent<HTMLDivElement>) {
    if (!pointerActive.current || !current || exit) return;
    pointerActive.current = false;
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    const dx = dragXRef.current;
    if (dx > SWIPE_THRESHOLD) {
      commitLike();
      return;
    }
    if (dx < -SWIPE_THRESHOLD) {
      commitPass();
      return;
    }
    dragXRef.current = 0;
    setDragX(0);
  }

  const rot = dragX * 0.06;
  const likeOpacity = Math.min(1, Math.max(0, dragX / 140));
  const nopeOpacity = Math.min(1, Math.max(0, -dragX / 140));

  if (!current) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-border/80 bg-card/70 px-6 py-12 text-center backdrop-blur-sm">
        <p className="text-lg font-semibold tracking-tight">Dat was het voor nu</p>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          In deze demo zijn er geen profielen meer in je stack. Later komen er weer nieuwe voorstellen.
        </p>
        <Link href={routes.browse} className={cn(buttonVariants({ variant: "secondary" }), "mt-6 inline-flex")}>
          Naar Ontdekken
        </Link>
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="relative aspect-[3/4] w-full select-none">
        {next ? (
          <div className="absolute inset-0 scale-[0.96] rounded-2xl opacity-70 shadow-lg ring-1 ring-white/10" aria-hidden>
            <SwipeCardInner entry={next} />
          </div>
        ) : null}

        <div
          className={cn(
            "absolute inset-0 touch-none rounded-2xl shadow-2xl ring-1 ring-white/10 will-change-transform",
            exit === "left" && "-translate-x-[140%] rotate-[-18deg] opacity-0 transition duration-200",
            exit === "right" && "translate-x-[140%] rotate-[18deg] opacity-0 transition duration-200",
            !exit && !isDragging && "transition-[transform,opacity] duration-200 ease-out"
          )}
          style={
            exit
              ? undefined
              : {
                  transform: `translateX(${dragX}px) rotate(${rot}deg)`,
                }
          }
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerEnd}
          onPointerCancel={onPointerEnd}
          role="application"
          aria-label="Swipe kaart"
        >
          <SwipeCardInner entry={current} />
          <div
            className="pointer-events-none absolute left-4 top-4 rounded-md border-4 border-emerald-400/90 px-2 py-1 text-2xl font-black uppercase tracking-widest text-emerald-100 shadow-sm"
            style={{ opacity: likeOpacity }}
          >
            LIKE
          </div>
          <div
            className="pointer-events-none absolute right-4 top-4 rounded-md border-4 border-rose-400/90 px-2 py-1 text-2xl font-black uppercase tracking-widest text-rose-100 shadow-sm"
            style={{ opacity: nopeOpacity }}
          >
            NOPE
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-6">
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="size-14 rounded-full border-rose-500/50 text-rose-500 hover:bg-rose-500/10"
          aria-label="Pass"
          onClick={commitPass}
          disabled={!!exit}
        >
          <X className="size-7" />
        </Button>
        <Button
          type="button"
          size="icon"
          className="size-16 rounded-full venovia-glow-sm"
          aria-label="Like"
          onClick={commitLike}
          disabled={!!exit}
        >
          <Heart className="size-8 fill-current" />
        </Button>
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        Sleep naar links om te passen, naar rechts om te liken — of gebruik de knoppen.
      </p>

      {matchProfile ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="match-title"
        >
          <div className="w-full max-w-sm rounded-3xl border border-venovia-accent/30 bg-gradient-to-b from-card to-background p-6 text-center shadow-2xl">
            <p id="match-title" className="text-3xl font-black uppercase tracking-tight text-venovia-accent">
              Het is een Match!
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Jullie vinden elkaar allebei leuk — in de echte app zouden jullie nu kunnen chatten.
            </p>
            <div className="mt-6 flex items-center justify-center gap-4">
              <div className="flex flex-col items-center gap-2">
                <ProfileAvatar
                  displayName={session?.displayName ?? "Jij"}
                  username={session?.username ?? "jij"}
                  size="lg"
                  imageSrc={session?.imageSrc ?? null}
                />
                <span className="text-xs font-medium text-foreground">{session?.displayName ?? "Jij"}</span>
              </div>
              <span className="text-2xl text-venovia-accent" aria-hidden>
                ♥
              </span>
              <div className="flex flex-col items-center gap-2">
                <ProfileAvatar
                  displayName={matchProfile.displayName}
                  username={matchProfile.username}
                  size="lg"
                  imageSrc={deck.find((e) => e.profile.id === matchProfile.id)?.imageSrc ?? null}
                />
                <span className="text-xs font-medium text-foreground">{matchProfile.displayName}</span>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
              <Link href={routes.messages} className={cn(buttonVariants(), "venovia-glow-sm inline-flex justify-center")}>
                Open berichten (demo)
              </Link>
              <Button type="button" variant="outline" onClick={() => setMatchProfile(null)}>
                Sluiten
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      {toast ? (
        <div className="fixed bottom-6 left-1/2 z-40 w-[min(92vw,22rem)] -translate-x-1/2 rounded-xl border border-border/80 bg-card/95 px-4 py-3 shadow-xl backdrop-blur-md">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-foreground">{toast.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{toast.body}</p>
            </div>
            <button
              type="button"
              className="shrink-0 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
              onClick={dismissToast}
            >
              OK
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function SwipeCardInner({ entry }: { entry: SwipeDeckEntry }) {
  const { profile: p, imageSrc } = entry;
  const photos = p.photoCount ?? 3;
  const initials = initialsFromDisplayName(p.displayName);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl">
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={`Profiel ${p.username}`}
          fill
          sizes="(max-width: 768px) 100vw, 420px"
          className={cn("object-cover", p.blurredPhotos && "blur-xl scale-105")}
          draggable={false}
        />
      ) : (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-700 to-zinc-900 text-4xl font-semibold text-white/90",
            p.blurredPhotos && "blur-xl"
          )}
          aria-hidden
        >
          {initials}
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
      <div className="pointer-events-none absolute right-2 top-2 rounded-full bg-black/55 px-2 py-0.5 text-[0.7rem] text-white">
        {photos} foto&apos;s
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 px-4 pb-4 pt-12 text-left text-white">
        <div className="flex items-center gap-2">
          {p.online ? (
            <span
              className="inline-flex size-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_0_2px_rgba(0,0,0,0.35)]"
              title="Online"
            />
          ) : (
            <span className="inline-flex size-2 shrink-0 rounded-full bg-zinc-500" title="Offline" />
          )}
          <p className="truncate text-lg font-semibold tracking-tight">
            {p.displayName}, {p.age}
          </p>
        </div>
        <p className="mt-1 flex items-center gap-1 text-sm text-white/85">
          <MapPin className="size-3.5 shrink-0" aria-hidden />
          <span>{p.city}</span>
          <span className="text-white/60">·</span>
          <span>± {p.distanceKm} km</span>
        </p>
        <p className="mt-2 line-clamp-3 text-sm text-white/80">{p.bio}</p>
      </div>
    </div>
  );
}
