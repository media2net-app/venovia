import { DUMMY_SESSION_USER_ID } from "./users";
import type { DummyConversation } from "./types";

const self = DUMMY_SESSION_USER_ID;

export const DUMMY_CONVERSATIONS: DummyConversation[] = [
  {
    id: "conv-lotte",
    participantIds: [self, "u1"],
    otherUserId: "u1",
    lastMessagePreview: "Haha, precies — laten we een keer afspreken als het uitkomt.",
    lastMessageAtLabel: "zojuist",
    unreadCount: 1,
    messages: [
      {
        id: "m1",
        conversationId: "conv-lotte",
        senderId: self,
        body: "Hey Lotte, leuk profiel — vooral je smaak in kunst.",
        sentAtLabel: "gisteren · 21:12",
        coupleSpeakerLabel: "Sam",
      },
      {
        id: "m2",
        conversationId: "conv-lotte",
        senderId: "u1",
        body: "Dank je! Ik zie dat jij ook van stedentrips houdt. Favoriete plek?",
        sentAtLabel: "gisteren · 21:18",
      },
      {
        id: "m3",
        conversationId: "conv-lotte",
        senderId: self,
        body: "Lissabon en Valencia. Jij?",
        sentAtLabel: "gisteren · 21:22",
        coupleSpeakerLabel: "Robin",
      },
      {
        id: "m4",
        conversationId: "conv-lotte",
        senderId: "u1",
        body: "Barcelona — maar ik wil dit jaar weer naar Italië.",
        sentAtLabel: "vandaag · 09:40",
      },
      {
        id: "m5",
        conversationId: "conv-lotte",
        senderId: self,
        body: "Top. Als je zin hebt, kunnen we koffie doen in Utrecht eens.",
        sentAtLabel: "vandaag · 10:05",
        coupleSpeakerLabel: "Sam",
      },
      {
        id: "m6",
        conversationId: "conv-lotte",
        senderId: "u1",
        body: "Haha, precies — laten we een keer afspreken als het uitkomt.",
        sentAtLabel: "zojuist",
      },
    ],
  },
  {
    id: "conv-iris",
    participantIds: [self, "u3"],
    otherUserId: "u3",
    lastMessagePreview: "Klinkt goed — stuur maar een voorstel voor een avond.",
    lastMessageAtLabel: "2 uur geleden",
    unreadCount: 0,
    messages: [
      {
        id: "m7",
        conversationId: "conv-iris",
        senderId: "u3",
        body: "Hi! Fijn dat je reageerde. We zoeken vooral warmte en duidelijke afspraken.",
        sentAtLabel: "ma · 19:02",
        coupleSpeakerLabel: "Iris",
      },
      {
        id: "m8",
        conversationId: "conv-iris",
        senderId: self,
        body: "Helemaal mee eens. Wat voor avonden vinden jullie fijn?",
        sentAtLabel: "ma · 19:40",
        coupleSpeakerLabel: "Robin",
      },
      {
        id: "m9",
        conversationId: "conv-iris",
        senderId: "u3",
        body: "Rustig thuis, goede wijn, geen haast.",
        sentAtLabel: "di · 20:11",
        coupleSpeakerLabel: "Tom",
      },
      {
        id: "m10",
        conversationId: "conv-iris",
        senderId: self,
        body: "Perfect. Zullen we eerst een korte videocall doen?",
        sentAtLabel: "wo · 18:55",
        coupleSpeakerLabel: "Sam",
      },
      {
        id: "m11",
        conversationId: "conv-iris",
        senderId: "u3",
        body: "Klinkt goed — stuur maar een voorstel voor een avond.",
        sentAtLabel: "2 uur geleden",
        coupleSpeakerLabel: "Iris",
      },
    ],
  },
  {
    id: "conv-kai",
    participantIds: [self, "u6"],
    otherUserId: "u6",
    lastMessagePreview: "Ik werk late dienst op vrijdag — zaterdag beter?",
    lastMessageAtLabel: "gisteren",
    unreadCount: 0,
    messages: [
      {
        id: "m12",
        conversationId: "conv-kai",
        senderId: self,
        body: "Die risotto op je profiel zag er gevaarlijk lekker uit 😄",
        sentAtLabel: "do · 17:08",
      },
      {
        id: "m13",
        conversationId: "conv-kai",
        senderId: "u6",
        body: "Haha thanks — geheim: veel boter en geduld.",
        sentAtLabel: "do · 17:21",
      },
      {
        id: "m14",
        conversationId: "conv-kai",
        senderId: self,
        body: "Respect. Heb je een favoriet restaurant in de buurt van Maastricht?",
        sentAtLabel: "do · 17:33",
      },
      {
        id: "m15",
        conversationId: "conv-kai",
        senderId: "u6",
        body: "Ik werk late dienst op vrijdag — zaterdag beter?",
        sentAtLabel: "gisteren",
      },
    ],
  },
  {
    id: "conv-vera",
    participantIds: [self, "u13"],
    otherUserId: "u13",
    lastMessagePreview: "Top — ik stuur je straks een voorstel!",
    lastMessageAtLabel: "3 dagen geleden",
    unreadCount: 0,
    messages: [
      {
        id: "m16",
        conversationId: "conv-vera",
        senderId: "u13",
        body: "Hoi! Zin om eens te padellen?",
        sentAtLabel: "vorige week · 11:20",
      },
      {
        id: "m17",
        conversationId: "conv-vera",
        senderId: self,
        body: "Yes — beginner niveau hier, maar ik leer snel.",
        sentAtLabel: "vorige week · 11:45",
      },
      {
        id: "m18",
        conversationId: "conv-vera",
        senderId: "u13",
        body: "Top — ik stuur je straks een voorstel!",
        sentAtLabel: "3 dagen geleden",
      },
    ],
  },
  {
    id: "conv-quinn",
    participantIds: [self, "u14"],
    otherUserId: "u14",
    lastMessagePreview: "Deal — ik zoek rust en goede energie. Tot snel?",
    lastMessageAtLabel: "30 min geleden",
    unreadCount: 2,
    messages: [
      {
        id: "m19",
        conversationId: "conv-quinn",
        senderId: "u14",
        body: "Hey! Je profiel voelde oprecht — dat waardeer ik.",
        sentAtLabel: "vandaag · 08:12",
      },
      {
        id: "m20",
        conversationId: "conv-quinn",
        senderId: self,
        body: "Thanks Quinn. Wat zoek jij nu echt?",
        sentAtLabel: "vandaag · 08:30",
      },
      {
        id: "m21",
        conversationId: "conv-quinn",
        senderId: "u14",
        body: "Verbinding zonder druk. En af en toe iets nieuws proberen.",
        sentAtLabel: "vandaag · 09:05",
      },
      {
        id: "m22",
        conversationId: "conv-quinn",
        senderId: self,
        body: "Same. Laten we rustig kennismaken.",
        sentAtLabel: "vandaag · 09:40",
      },
      {
        id: "m23",
        conversationId: "conv-quinn",
        senderId: "u14",
        body: "Deal — ik zoek rust en goede energie. Tot snel?",
        sentAtLabel: "30 min geleden",
      },
    ],
  },
];

export function getConversationById(id: string): DummyConversation | undefined {
  return DUMMY_CONVERSATIONS.find((c) => c.id === id);
}

export function listConversationsForSession(): DummyConversation[] {
  return [...DUMMY_CONVERSATIONS];
}

export function getTotalUnreadMessageCountForSession(): number {
  return listConversationsForSession().reduce((sum, c) => sum + c.unreadCount, 0);
}

