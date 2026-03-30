import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { isDemoSessionCookie } from "@/lib/demo-auth";
import { getTotalUnreadMessageCountForSession } from "@/lib/dummy/conversations";
import { getSessionProfile } from "@/lib/dummy/session";
import { getProfielFotoUrlForUser } from "@/lib/profiel-fotos";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Venovia — Discreet verbinden",
    template: "%s | Venovia",
  },
  description:
    "Nederlands freemium platform voor singles en koppels. Discreet, veilig en modern — ontdek Venovia.",
  keywords: ["Venovia", "dating", "Nederland", "discreet", "connect"],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const isDemoLoggedIn = isDemoSessionCookie(cookieStore);
  const me = isDemoLoggedIn ? getSessionProfile() : null;
  const session =
    me != null
      ? {
          displayName: me.displayName,
          username: me.username,
          imageSrc: getProfielFotoUrlForUser(me.username),
        }
      : null;

  const unreadMessagesCount = session != null ? getTotalUnreadMessageCountForSession() : 0;

  return (
    <html
      lang="nl"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col font-sans">
        <SiteHeader isDemoLoggedIn={isDemoLoggedIn} session={session} unreadMessagesCount={unreadMessagesCount} />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
