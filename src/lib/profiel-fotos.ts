import fs from "node:fs";
import path from "node:path";

const IMAGE_EXT = /\.(jpe?g|png|webp|gif|avif)$/i;

let cachedFiles: string[] | null = null;

function listProfielBestanden(): string[] {
  if (cachedFiles) return cachedFiles;
  const dir = path.join(process.cwd(), "public", "profielen");
  try {
    if (!fs.existsSync(dir)) {
      cachedFiles = [];
      return cachedFiles;
    }
    cachedFiles = fs
      .readdirSync(dir)
      .filter((f) => !f.startsWith(".") && IMAGE_EXT.test(f));
  } catch {
    cachedFiles = [];
  }
  return cachedFiles;
}

function hashUsername(username: string): number {
  const s = username.toLowerCase();
  let h = 2166136261;
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

/**
 * Stabiele pseudo-willekeurige foto per gebruikersnaam uit `public/profielen`.
 */
export function getProfielFotoUrlForUser(username: string): string | null {
  const files = listProfielBestanden();
  if (files.length === 0) return null;
  const idx = hashUsername(username) % files.length;
  return `/profielen/${files[idx]}`;
}

export function getProfielFotoAantal(): number {
  return listProfielBestanden().length;
}
