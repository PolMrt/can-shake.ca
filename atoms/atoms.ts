import { Bounds } from "@/type/bounds";
import { atom } from "jotai";
import { Settings } from "@/type/settings";
import { EarthquakeEvent } from "@/type/_earthquakeEvent";

export const activeEventPublicIDAtom = atom<string | null>(null);
export const eventsAtom = atom<EarthquakeEvent[]>([]);
export const currentBoundsAtom = atom<Bounds | null>({
  minLatitude: 48.0,
  maxLatitude: 51.0,
  minLongitude: -126.0,
  maxLongitude: -121.0,
});
export const settingsAtom = atom<Settings>({
  startTime: "2024-01-01T00:00:00",
  endTime: "2025-12-01T00:00:00",
  minMagnitude: 3,
});
export const showSettingsModalAtom = atom(false);
