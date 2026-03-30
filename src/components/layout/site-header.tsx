"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Menu } from "lucide-react";

import { DemoLogoutButton } from "@/components/layout/demo-logout-button";
import { ProfileAvatar } from "@/components/dummy/profile-avatar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

export type SiteHeaderSession = {
  displayName: string;
  username: string;
  imageSrc: string | null;
};

type SiteHeaderProps = {
  isDemoLoggedIn: boolean;
  session: SiteHeaderSession | null;
  unreadMessagesCount: number;
};

const navGuest: { href: string; label: string; isNew?: boolean }[] = [
  { href: routes.home, label: "Start" },
  { href: routes.browse, label: "Ontdekken" },
  { href: routes.swipe, label: "Swipe & Like" },
  { href: routes.videoLounge, label: "Video Lounge", isNew: true },
];

const navUser: { href: string; label: string; isNew?: boolean }[] = [
  { href: routes.home, label: "Start" },
  { href: routes.browse, label: "Ontdekken" },
  { href: routes.swipe, label: "Swipe & Like" },
  { href: routes.dashboard, label: "Dashboard" },
  { href: routes.messages, label: "Berichten" },
  { href: routes.videoLounge, label: "Video Lounge", isNew: true },
  { href: routes.likes, label: "Mijn likes" },
  { href: routes.favorites, label: "Favorieten" },
  { href: routes.settings, label: "Instellingen" },
  { href: routes.reports, label: "Meldingen" },
];

function formatUnreadCount(count: number): string {
  if (count > 99) return "99+";
  return String(count);
}

function NavLinks({
  items,
  className,
  onNavigate,
  messageUnreadCount = 0,
}: {
  items: { href: string; label: string; isNew?: boolean }[];
  className?: string;
  onNavigate?: () => void;
  messageUnreadCount?: number;
}) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex flex-col gap-1 lg:flex-row lg:flex-nowrap lg:items-center lg:gap-0.5",
        className
      )}
      aria-label="Hoofdnavigatie"
    >
      {items.map((item) => {
        const active =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
        const isMessages = item.href === routes.messages;
        const showUnread = isMessages && messageUnreadCount > 0;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-2 py-2 text-xs font-medium transition-colors sm:gap-2 sm:px-2.5 sm:py-1.5 sm:text-sm lg:px-2 lg:py-1.5",
              active
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
            )}
          >
            <span>{item.label}</span>
            {showUnread ? (
              <span
                className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-venovia-accent px-1 text-[0.65rem] font-semibold leading-none text-venovia-accent-foreground"
                aria-hidden
              >
                {formatUnreadCount(messageUnreadCount)}
              </span>
            ) : null}
            {item.isNew ? (
              <Badge className="h-[1.125rem] shrink-0 border-venovia-accent/40 bg-venovia-accent/15 px-1 text-[0.55rem] font-semibold uppercase leading-none tracking-wide text-venovia-accent">
                NIEUW
              </Badge>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}

function MessagesNotificationBell({ count }: { count: number }) {
  const label =
    count > 0
      ? `${formatUnreadCount(count)} ongelezen berichten — naar Berichten`
      : "Berichten — geen ongelezen berichten";

  return (
    <Link
      href={routes.messages}
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon" }),
        "relative shrink-0 text-muted-foreground hover:text-foreground"
      )}
      aria-label={label}
    >
      <Bell className="size-5" aria-hidden />
      {count > 0 ? (
        <span className="absolute -right-0.5 -top-0.5 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-venovia-accent px-1 text-[0.6rem] font-bold leading-none text-venovia-accent-foreground">
          {formatUnreadCount(count)}
        </span>
      ) : null}
    </Link>
  );
}

export function SiteHeader({ isDemoLoggedIn, session, unreadMessagesCount }: SiteHeaderProps) {
  const navItems = isDemoLoggedIn ? navUser : navGuest;
  const messageUnread = isDemoLoggedIn && session ? unreadMessagesCount : 0;

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="site-container flex h-16 items-center justify-between gap-3">
        <div className="flex min-h-0 min-w-0 flex-1 items-center gap-4 lg:gap-5">
          <Link
            href={routes.home}
            className="group flex shrink-0 items-center gap-2 font-semibold tracking-tight"
          >
            <span className="relative text-lg">
              <span className="text-foreground">Venovia</span>
              <span
                className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-venovia-accent transition-transform group-hover:scale-x-100"
                aria-hidden
              />
            </span>
          </Link>

          <div className="hidden min-w-0 overflow-x-auto overflow-y-hidden lg:block [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <NavLinks items={navItems} messageUnreadCount={messageUnread} />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {isDemoLoggedIn && session ? <MessagesNotificationBell count={messageUnread} /> : null}

          {isDemoLoggedIn && session ? (
            <div className="hidden items-center gap-2 sm:flex">
              <Link
                href={routes.profile(session.username)}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "max-w-[12rem] gap-2 px-2"
                )}
              >
                <ProfileAvatar
                  displayName={session.displayName}
                  username={session.username}
                  size="sm"
                  imageSrc={session.imageSrc}
                />
                <span className="truncate text-sm font-medium">{session.displayName}</span>
              </Link>
              <Link href={routes.profileEdit} className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
                Profiel
              </Link>
              <DemoLogoutButton />
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link href={routes.login} className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
                Inloggen
              </Link>
              <Link href={routes.register} className={cn(buttonVariants({ size: "sm" }), "venovia-glow-sm")}>
                Account aanmaken
              </Link>
            </div>
          )}

          <Sheet>
            <SheetTrigger
              className={cn(buttonVariants({ variant: "outline", size: "icon" }), "lg:hidden")}
              aria-label="Menu openen"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100%,20rem)]">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-6">
                {isDemoLoggedIn && session ? (
                  <Link
                    href={routes.profile(session.username)}
                    className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/50 p-3"
                  >
                    <ProfileAvatar
                      displayName={session.displayName}
                      username={session.username}
                      size="md"
                      imageSrc={session.imageSrc}
                    />
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-foreground">{session.displayName}</p>
                      <p className="truncate text-xs text-muted-foreground">@{session.username}</p>
                    </div>
                  </Link>
                ) : null}
                <NavLinks items={navItems} messageUnreadCount={messageUnread} />
                <div className="flex flex-col gap-2 border-t border-border pt-4 sm:hidden">
                  {isDemoLoggedIn && session ? (
                    <>
                      <Link
                        href={routes.profileEdit}
                        className={cn(buttonVariants({ variant: "outline" }), "w-full justify-center")}
                      >
                        Profiel bewerken
                      </Link>
                      <DemoLogoutButton className="w-full justify-center" />
                    </>
                  ) : (
                    <>
                      <Link
                        href={routes.login}
                        className={cn(buttonVariants({ variant: "outline" }), "w-full justify-center")}
                      >
                        Inloggen
                      </Link>
                      <Link href={routes.register} className={cn(buttonVariants(), "w-full justify-center")}>
                        Account aanmaken
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
