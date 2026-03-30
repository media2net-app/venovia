import Image from "next/image";

import { cn } from "@/lib/utils";
import { hueFromString, initialsFromDisplayName } from "@/lib/avatar-utils";

type Props = {
  displayName: string;
  username: string;
  blurred?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  /** Pad onder public, bv. `/profielen/foto.jpg` */
  imageSrc?: string | null;
};

const sizeMap = {
  sm: "size-10 text-xs",
  md: "size-14 text-sm",
  lg: "size-24 text-lg",
} as const;

const sizePixels = { sm: 40, md: 56, lg: 96 } as const;

export function ProfileAvatar({
  displayName,
  username,
  blurred = false,
  size = "md",
  className,
  imageSrc,
}: Props) {
  const hue = hueFromString(username);
  const initials = initialsFromDisplayName(displayName);
  const px = sizePixels[size];

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-2xl font-semibold tracking-tight text-white ring-1 ring-white/10",
        sizeMap[size],
        blurred && "blur-sm contrast-75",
        className
      )}
      style={
        imageSrc
          ? undefined
          : {
              background: `linear-gradient(135deg, oklch(0.55 0.12 ${hue}) 0%, oklch(0.35 0.08 ${hue}) 100%)`,
            }
      }
      aria-hidden={blurred}
    >
      {imageSrc ? (
        <Image src={imageSrc} alt="" width={px} height={px} className="size-full object-cover" />
      ) : null}
      {!imageSrc ? <span className={cn(blurred && "select-none")}>{initials}</span> : null}
    </div>
  );
}
