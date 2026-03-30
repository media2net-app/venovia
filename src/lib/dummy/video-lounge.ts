import type { DummyVideoLoungeChatMessage, DummyVideoLoungeRoom } from "./types";

export const VIDEO_LOUNGE_ROOMS: DummyVideoLoungeRoom[] = [
  {
    id: "vl-1",
    name: "Algemene lounge",
    description:
      "Kennismaken in een relaxte sfeer — tekst én optioneel video.",
    participantCount: 24,
    hasVideo: true,
    tags: ["Iedereen", "Rustig tempo"],
    spotlightUserIds: ["u1", "u2", "u4", "u5"],
  },
  {
    id: "vl-2",
    name: "30+ hoek",
    description: "Voor volwassen gesprekken en echte interesse, zonder haast.",
    participantCount: 18,
    hasVideo: true,
    tags: ["30+", "Diepgang"],
    spotlightUserIds: ["u3", "u6", "u7", "u8"],
  },
  {
    id: "vl-3",
    name: "Koppels lounge",
    description:
      "Exclusief voor koppels die anderen willen ontmoeten — met duidelijke afspraken.",
    participantCount: 9,
    hasVideo: true,
    tags: ["Koppels", "Discreet"],
    spotlightUserIds: ["u3", "u9", "u10"],
  },
  {
    id: "vl-4",
    name: "Alleen tekst",
    description: "Geen camera nodig: chat op je eigen tempo in een veilige ruimte.",
    participantCount: 31,
    hasVideo: false,
    tags: ["Tekst", "Privacy"],
    spotlightUserIds: ["u1", "u11", "u12", "u13"],
  },
  {
    id: "vl-5",
    name: "Avondborrel (NL)",
    description: "Informeel en gezellig — vaak ’s avonds het meest actief.",
    participantCount: 42,
    hasVideo: true,
    tags: ["Live", "Gezellig"],
    spotlightUserIds: ["u4", "u5", "u6", "u14"],
  },
  {
    id: "vl-6",
    name: "Nieuwe leden",
    description: "Speciaal voor wie net start: extra moderatie en korte rondleiding.",
    participantCount: 14,
    hasVideo: true,
    tags: ["Onboarding", "Veilig"],
    spotlightUserIds: ["u2", "u8", "u11"],
  },
];

const MESSAGES: DummyVideoLoungeChatMessage[] = [
  // vl-1
  {
    id: "m-vl1-0",
    roomId: "vl-1",
    senderUserId: "system",
    body: "Welkom in de Algemene lounge. Wees respectvol — geen druk, geen spam.",
    sentAtLabel: "20:01",
  },
  {
    id: "m-vl1-1",
    roomId: "vl-1",
    senderUserId: "u1",
    body: "Hey! Eerste keer hier — iemand zin om rustig te kletsen?",
    sentAtLabel: "20:03",
  },
  {
    id: "m-vl1-2",
    roomId: "vl-1",
    senderUserId: "u4",
    body: "Hier! Koffie op, camera nog even uit — prima zo?",
    sentAtLabel: "20:04",
  },
  {
    id: "m-vl1-3",
    roomId: "vl-1",
    senderUserId: "u2",
    body: "Prima. Ik vind het fijn als iedereen zelf tempo bepaalt.",
    sentAtLabel: "20:05",
  },
  {
    id: "m-vl1-4",
    roomId: "vl-1",
    senderUserId: "u5",
    body: "Iemand tips voor een eerste date in Utrecht? 😊",
    sentAtLabel: "20:07",
  },
  // vl-2
  {
    id: "m-vl2-0",
    roomId: "vl-2",
    senderUserId: "system",
    body: "30+ hoek: korte berichten, duidelijke bedoelingen — geen gedoe.",
    sentAtLabel: "19:40",
  },
  {
    id: "m-vl2-1",
    roomId: "vl-2",
    senderUserId: "u6",
    body: "Ik zoek vooral inhoud. Humor helpt ook.",
    sentAtLabel: "19:42",
  },
  {
    id: "m-vl2-2",
    roomId: "vl-2",
    senderUserId: "u7",
    body: "Eens. En grenzen expliciet bespreken — scheelt een hoop.",
    sentAtLabel: "19:43",
  },
  {
    id: "m-vl2-3",
    roomId: "vl-2",
    senderUserId: "u3",
    body: "Als koppel: we lezen graag eerst even mee voordat we iets plannen.",
    sentAtLabel: "19:45",
  },
  // vl-3
  {
    id: "m-vl3-0",
    roomId: "vl-3",
    senderUserId: "system",
    body: "Koppels lounge: alleen koppels — respecteer elkaars afspraken.",
    sentAtLabel: "18:55",
  },
  {
    id: "m-vl3-1",
    roomId: "vl-3",
    senderUserId: "u3",
    body: "We zijn nieuw — hoe werkt dit met ‘soft swap’ gesprekken hier?",
    sentAtLabel: "18:57",
  },
  {
    id: "m-vl3-2",
    roomId: "vl-3",
    senderUserId: "u9",
    body: "Meestal eerst kennismaken in tekst, daarna eventueel video als iedereen wil.",
    sentAtLabel: "18:58",
  },
  // vl-4
  {
    id: "m-vl4-0",
    roomId: "vl-4",
    senderUserId: "system",
    body: "Tekst-only ruimte: geen cam-druk — focus op woorden.",
    sentAtLabel: "21:10",
  },
  {
    id: "m-vl4-1",
    roomId: "vl-4",
    senderUserId: "u11",
    body: "Fijn dat dit er is. Ik ben nog wat voorzichtig met beeld.",
    sentAtLabel: "21:12",
  },
  {
    id: "m-vl4-2",
    roomId: "vl-4",
    senderUserId: "u12",
    body: "Zelfde hier. Rustig opstarten werkt het best voor mij.",
    sentAtLabel: "21:13",
  },
  {
    id: "m-vl4-3",
    roomId: "vl-4",
    senderUserId: "u1",
    body: "👍 Hier is de sfeer echt chill.",
    sentAtLabel: "21:14",
  },
  // vl-5
  {
    id: "m-vl5-0",
    roomId: "vl-5",
    senderUserId: "system",
    body: "Avondborrel — gezelligheid voorop, geen verkooppraatjes.",
    sentAtLabel: "22:01",
  },
  {
    id: "m-vl5-1",
    roomId: "vl-5",
    senderUserId: "u5",
    body: "Wie heeft er nog een goede serie-tip (NL ondertiteld)?",
    sentAtLabel: "22:03",
  },
  {
    id: "m-vl5-2",
    roomId: "vl-5",
    senderUserId: "u14",
    body: "Shōgun — maar die is intens. Voor luchtiger: gewoon comedy.",
    sentAtLabel: "22:05",
  },
  {
    id: "m-vl5-3",
    roomId: "vl-5",
    senderUserId: "u4",
    body: "Proost 🥂 (met thee, ik ben morgen vroeg uit de veren)",
    sentAtLabel: "22:06",
  },
  // vl-6
  {
    id: "m-vl6-0",
    roomId: "vl-6",
    senderUserId: "system",
    body: "Welkom nieuwe leden — moderators zijn beschikbaar bij vragen.",
    sentAtLabel: "17:20",
  },
  {
    id: "m-vl6-1",
    roomId: "vl-6",
    senderUserId: "u2",
    body: "Ik ben net gestart — waar vind ik de veiligheidstips?",
    sentAtLabel: "17:22",
  },
  {
    id: "m-vl6-2",
    roomId: "vl-6",
    senderUserId: "u8",
    body: "Onder ‘Instellingen’ → rapportage/blokkeren. En start rustig in tekst.",
    sentAtLabel: "17:23",
  },
];

export function listVideoLoungeRooms(): DummyVideoLoungeRoom[] {
  return VIDEO_LOUNGE_ROOMS;
}

export function getVideoLoungeRoom(roomId: string): DummyVideoLoungeRoom | undefined {
  return VIDEO_LOUNGE_ROOMS.find((r) => r.id === roomId);
}

export function getVideoLoungeMessages(roomId: string): DummyVideoLoungeChatMessage[] {
  return MESSAGES.filter((m) => m.roomId === roomId);
}

export function getPopularVideoLoungeRooms(limit = 4): DummyVideoLoungeRoom[] {
  return [...VIDEO_LOUNGE_ROOMS]
    .sort((a, b) => b.participantCount - a.participantCount)
    .slice(0, Math.max(1, limit));
}

