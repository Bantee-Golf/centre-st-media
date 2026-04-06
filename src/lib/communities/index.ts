import byu from "./byu";
import psu from "./psu";
import { Community } from "./types";

export type { Community, Video, Product } from "./types";

export const COMMUNITIES: Record<string, Community> = {
  byu,
  psu,
};

export const DEFAULT_COMMUNITY = byu;

export function getCommunity(slug: string): Community | undefined {
  return COMMUNITIES[slug];
}

export function getAllCommunities(): Community[] {
  return Object.values(COMMUNITIES);
}
