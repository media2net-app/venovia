import { MessageCircle } from "lucide-react";

export function MessagesEmptyChat() {
  return (
    <div className="flex h-full min-h-[420px] flex-col items-center justify-center gap-2 px-6 text-center">
      <MessageCircle className="size-10 text-muted-foreground/60" aria-hidden />
      <p className="text-sm font-medium text-foreground">Selecteer een gesprek</p>
      <p className="max-w-sm text-xs text-muted-foreground leading-relaxed">
        Kies links een gesprek om berichten te bekijken — met een vaste lijst, detailpaneel en zijbalk.
      </p>
    </div>
  );
}
