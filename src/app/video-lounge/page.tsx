import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, Users, Video } from "lucide-react";

import { DemoStrip } from "@/components/dummy";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button-variants";
import { listVideoLoungeRooms } from "@/lib/dummy/video-lounge";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Video Lounge",
  description: "Chatrooms voor tekst en video — demo.",
};

export default function VideoLoungePage() {
  const rooms = listVideoLoungeRooms();

  return (
    <div className="site-container py-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">Video Lounge</h1>
            <Badge className="border-venovia-accent/40 bg-venovia-accent/15 text-[0.65rem] font-semibold uppercase tracking-wide text-venovia-accent">
              Nieuw
            </Badge>
          </div>
          <p className="mt-2 max-w-2xl text-muted-foreground leading-relaxed">
            Verschillende chatrooms waar je kunt meepraten — open een ruimte om de demo-chat en tegels te zien.
            Straks volgt live (video) chat; moderatie en rapportage blijven centraal.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <DemoStrip />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {rooms.map((room) => (
          <Card
            key={room.id}
            className="rounded-2xl border-border/80 bg-card/80 backdrop-blur-sm transition-shadow hover:venovia-glow-sm"
          >
            <CardHeader className="space-y-2 pb-2">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-lg leading-tight">{room.name}</CardTitle>
                <div className="flex shrink-0 items-center gap-1 text-muted-foreground">
                  {room.hasVideo ? (
                    <Video className="size-4 text-venovia-accent" aria-hidden />
                  ) : (
                    <MessageCircle className="size-4 text-venovia-accent" aria-hidden />
                  )}
                </div>
              </div>
              <CardDescription className="leading-relaxed">{room.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1 rounded-full bg-muted/60 px-2 py-1">
                  <Users className="size-3.5" aria-hidden />
                  {room.participantCount} online (demo)
                </span>
                {room.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border/60 bg-background/40 px-2 py-1 text-[0.7rem] text-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={routes.videoLoungeRoom(room.id)}
                  className={cn(buttonVariants(), "venovia-glow-sm inline-flex")}
                >
                  {room.hasVideo ? "Deelnemen (demo)" : "Deelnemen — chat (demo)"}
                </Link>
                <Button variant="outline" type="button" disabled title="Later: huisregels">
                  Bekijk regels
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="mt-10 text-left text-xs text-muted-foreground">
        Video Lounge: demo met vaste chatgeschiedenis en lokale berichten. WebRTC / Supabase Realtime en
        moderatie-tools worden later gekoppeld.
      </p>
    </div>
  );
}
