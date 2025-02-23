import { EarthquakeEvent } from "@/models/EarthquakeEvent";
import { Bounds } from "@/type/bounds";
import { atom } from "jotai";

export const activeEventPublicIDAtom = atom<string | null>(null);
export const eventsAtom = atom<EarthquakeEvent[]>([]);
export const currentBoundsAtom = atom<Bounds | null>({
  minLatitude: 48.0,
  maxLatitude: 51.0,
  minLongitude: -126.0,
  maxLongitude: -121.0,
});
