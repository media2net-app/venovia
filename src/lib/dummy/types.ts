export type Gender = "man" | "vrouw" | "koppel";

export type DummyProfile = {
  id: string;
  username: string;
  displayName: string;
  age: number;
  city: string;
  postalCode: string;
  distanceKm: number;
  gender: Gender;
  lookingFor: string[];
  bio: string;
  tags: string[];
  online: boolean;
  lastActiveLabel: string;
  verified: boolean;
  isNew: boolean;
  profileCompleteness: number;
  popularity: number;
  createdAt: string;
  blurredPhotos: boolean;
  /** Aantal zichtbare foto's op profielkaart (demo) */
  photoCount?: number;
  /** Namen voor koppel-chat: wie spreekt er (demo). */
  couplePartnerNames?: [string, string];
};

export type ActivityType =
  | "new_user_joined"
  | "new_like_received"
  | "new_profile_photo_uploaded"
  | "profile_verified";

export type DummyActivityItem = {
  id: string;
  type: ActivityType;
  title: string;
  subtitle: string;
  createdAt: string;
  actorUsername: string;
};

export type DummyMessage = {
  id: string;
  conversationId: string;
  senderId: string;
  body: string;
  sentAtLabel: string;
  /** Wie in het koppel dit bericht stuurde (zichtbaar voor de ander). */
  coupleSpeakerLabel?: string;
};

export type DummyConversation = {
  id: string;
  participantIds: string[];
  otherUserId: string;
  lastMessagePreview: string;
  lastMessageAtLabel: string;
  unreadCount: number;
  messages: DummyMessage[];
};

export type ReportStatus = "open" | "in_behandeling" | "gesloten";

export type DummyReport = {
  id: string;
  reporterUserId: string;
  reportedUserId: string;
  reason: string;
  status: ReportStatus;
  createdAtLabel: string;
};

export type LikeDirection = "ontvangen" | "gegeven";

export type DummyLike = {
  id: string;
  direction: LikeDirection;
  otherUserId: string;
  createdAtLabel: string;
};

export type DummyVideoLoungeRoom = {
  id: string;
  name: string;
  description: string;
  /** Getoonde 'online' teller (demo) */
  participantCount: number;
  hasVideo: boolean;
  tags: string[];
  /** Profiel-ids voor tegels in de room (demo) */
  spotlightUserIds: string[];
};

export type DummyVideoLoungeChatMessage = {
  id: string;
  roomId: string;
  senderUserId: string | "system";
  body: string;
  sentAtLabel: string;
  /** Wie in het koppel dit bericht stuurde (zichtbaar voor de ander). */
  coupleSpeakerLabel?: string;
};

