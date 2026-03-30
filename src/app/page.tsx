import Link from "next/link";
import { cookies } from "next/headers";
import {
  ChevronRight,
  Heart,
  LayoutDashboard,
  LogIn,
  MessageCircle,
  Sparkles,
  UserPlus,
  Users,
  Video,
} from "lucide-react";

import { DemoStrip, ActivityFeedList, ProfileCard } from "@/components/dummy";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getActivityFeed,
  getHomeSpotlight,
  getPopularVideoLoungeRooms,
  getTotalUnreadMessageCountForSession,
} from "@/lib/dummy";
import { isDemoSessionCookie } from "@/lib/demo-auth";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

export default async function HomePage() {
  const cookieStore = await cookies();
  const demoLoggedIn = isDemoSessionCookie(cookieStore);
  const unreadMessagesCount = demoLoggedIn ? getTotalUnreadMessageCountForSession() : 0;

  const { nieuweLeden, onlineNu, aanbevolen } = getHomeSpotlight();
  const activity = getActivityFeed(6);
  const popularRooms = getPopularVideoLoungeRooms(4);

  const shortcuts = demoLoggedIn
    ? [
        { href: routes.browse, label: "Ontdekken", description: "Profielen en filters", icon: Users },
        { href: routes.swipe, label: "Swipe & Like", description: "Snel matchen", icon: Heart },
        { href: routes.messages, label: "Berichten", description: "Je gesprekken", icon: MessageCircle },
        {
          href: routes.videoLounge,
          label: "Video Lounge",
          description: "Chatrooms (demo)",
          icon: Video,
          isNew: true,
        },
        { href: routes.dashboard, label: "Dashboard", description: "Je overzicht", icon: LayoutDashboard },
      ]
    : [
        { href: routes.browse, label: "Ontdekken", description: "Bekijk profielen", icon: Users },
        { href: routes.swipe, label: "Swipe & Like", description: "Probeer de stack", icon: Heart },
        {
          href: routes.videoLounge,
          label: "Video Lounge",
          description: "Populaire rooms",
          icon: Video,
          isNew: true,
        },
        { href: routes.login, label: "Inloggen", description: "Demo-account", icon: LogIn },
        { href: routes.register, label: "Registreren", description: "Account starten", icon: UserPlus },
      ];

  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        aria-hidden
      >
        <div className="absolute left-1/2 top-0 h-[28rem] w-[48rem] -translate-x-1/2 rounded-full bg-venovia-accent/20 blur-3xl" />
      </div>

      <section className="site-container pb-16 pt-14 sm:pt-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-venovia-accent">Nederland · Discreet · Premium</p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Ontmoet elkaar op jouw voorwaarden
          </h1>
          <p className="mt-4 text-pretty text-lg text-muted-foreground leading-relaxed">
            Venovia is een moderne plek voor singles en koppels die waarde hechten aan privacy,
            veiligheid en echte gesprekken — zonder drukte.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={routes.register}
              className={cn(
                buttonVariants({ size: "lg" }),
                "venovia-glow w-full min-w-[11rem] justify-center sm:w-auto"
              )}
            >
              Start gratis
            </Link>
            <Link
              href={routes.browse}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-full min-w-[11rem] justify-center sm:w-auto"
              )}
            >
              Ontdek profielen
            </Link>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Fase 1: vrijwel alle functies gratis. Geen verborgen kosten om te groeien.
          </p>
        </div>
      </section>

      <section className="site-container border-t border-border/40 pb-12 pt-10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">Snelkoppelingen</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {demoLoggedIn
                ? "Waar je het meest op zit te wachten — meteen verder."
                : "Verken Venovia zonder omwegen. Inloggen opent o.a. berichten en dashboard."}
            </p>
          </div>
        </div>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {shortcuts.map((item) => {
            const Icon = item.icon;
            const isMessages = item.href === routes.messages;
            const showUnread = isMessages && unreadMessagesCount > 0;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex h-full items-start gap-3 rounded-2xl border border-border/70 bg-card/60 p-4 shadow-sm transition-colors hover:border-venovia-accent/35 hover:bg-card/90"
                  aria-label={
                    showUnread
                      ? `Berichten — ${unreadMessagesCount > 99 ? "99+" : unreadMessagesCount} ongelezen`
                      : undefined
                  }
                >
                  <span className="relative flex size-10 shrink-0 items-center justify-center rounded-xl bg-venovia-accent/15 text-venovia-accent">
                    <Icon className="size-5" aria-hidden />
                    {showUnread ? (
                      <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-venovia-accent px-1 text-[0.6rem] font-bold leading-none text-venovia-accent-foreground">
                        {unreadMessagesCount > 99 ? "99+" : unreadMessagesCount}
                      </span>
                    ) : null}
                  </span>
                  <span className="min-w-0 flex-1 text-left">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-foreground">{item.label}</span>
                      {"isNew" in item && item.isNew ? (
                        <Badge className="h-5 border-venovia-accent/40 bg-venovia-accent/15 px-1.5 text-[0.55rem] font-semibold uppercase text-venovia-accent">
                          Nieuw
                        </Badge>
                      ) : null}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">{item.description}</span>
                    <span className="mt-2 inline-flex items-center gap-0.5 text-xs font-medium text-venovia-accent">
                      Openen
                      <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="site-container pb-20">
        <div className="mb-6 space-y-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Levendig vanaf dag één</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Voorbeeldprofielen en activiteit — zo voelt Venovia straks ook met echte leden.
              </p>
            </div>
          </div>
          <DemoStrip />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="rounded-2xl border-border/80 bg-card/80 venovia-glow-sm backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-3">
              <CardTitle className="text-base">Nieuwe leden</CardTitle>
              <CardDescription>Wie er net bij is gekomen.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {nieuweLeden.map((p) => (
                <ProfileCard key={p.id} profile={p} compact />
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border/80 bg-card/80 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-3">
              <CardTitle className="text-base">Online nu</CardTitle>
              <CardDescription>Direct beschikbaar voor een chat.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {onlineNu.map((p) => (
                <ProfileCard key={p.id} profile={p} compact />
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border/80 bg-card/80 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-3">
              <CardTitle className="text-base">Aanbevolen voor jou</CardTitle>
              <CardDescription>Op basis van populariteit (demo).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {aanbevolen.map((p) => (
                <ProfileCard key={p.id} profile={p} compact />
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="mt-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Populaire chatrooms</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Video Lounge — de drukst bezochte ruimtes nu (demo-aantallen).{" "}
                <Link href={routes.videoLounge} className="font-medium text-venovia-accent underline-offset-4 hover:underline">
                  Alle rooms
                </Link>
              </p>
            </div>
          </div>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {popularRooms.map((room, idx) => (
              <li key={room.id}>
                <Link
                  href={routes.videoLoungeRoom(room.id)}
                  className="flex h-full flex-col rounded-2xl border border-border/80 bg-card/70 p-4 transition-colors hover:border-venovia-accent/40 hover:bg-card/90"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm font-semibold leading-snug text-foreground">{room.name}</span>
                    {idx === 0 ? (
                      <Badge className="shrink-0 border-amber-500/40 bg-amber-500/15 text-[0.6rem] font-semibold uppercase text-amber-200">
                        Top
                      </Badge>
                    ) : null}
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs text-muted-foreground leading-relaxed">
                    {room.description}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-[0.7rem] text-muted-foreground">
                    <span className="inline-flex items-center gap-1 rounded-full bg-muted/50 px-2 py-0.5">
                      <Users className="size-3" aria-hidden />
                      {room.participantCount} online
                    </span>
                    {room.hasVideo ? (
                      <span className="inline-flex items-center gap-1 text-venovia-accent">
                        <Video className="size-3" aria-hidden />
                        Video
                      </span>
                    ) : (
                      <span className="text-muted-foreground">Alleen tekst</span>
                    )}
                  </div>
                  <span className="mt-3 text-xs font-medium text-venovia-accent">Deelnemen →</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Card className="mt-10 rounded-2xl border-border/80 bg-card/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-3">
            <CardTitle className="text-base">Activiteitenfeed</CardTitle>
            <CardDescription>Likes, nieuwe leden en verificaties (demo-events).</CardDescription>
          </CardHeader>
          <CardContent>
            <ActivityFeedList items={activity} />
          </CardContent>
        </Card>

        <Card
          id="veiligheid"
          className="mt-8 rounded-2xl border-border/80 bg-card/60 p-6 sm:p-8"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex gap-3">
              <Sparkles className="mt-0.5 size-5 shrink-0 text-venovia-accent" aria-hidden />
              <div>
                <h3 className="font-semibold tracking-tight">Veiligheid voorop</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  Rapporteren, blokkeren en moderatie horen standaard bij het platform. Later koppelen
                  we Supabase Auth, RLS en admin-tools.
                </p>
              </div>
            </div>
            <Link
              href={routes.register}
              className={cn(buttonVariants({ variant: "secondary" }), "shrink-0")}
            >
              Maak een account
            </Link>
          </div>
        </Card>

        <p id="privacy" className="mt-10 text-left text-xs text-muted-foreground">
          Privacybeleid en voorwaarden volgen — voor nu: jouw data hoort bij jou; geen verkoop aan
          derden (ontwerpprincipe).
        </p>
      </section>
    </div>
  );
}
