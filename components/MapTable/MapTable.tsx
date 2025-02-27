"use client";

import dynamic from "next/dynamic";
import { EventTable } from "../EventTable/EventTable";
import { SettingsModal } from "../SettingsModal/SettingsModal";

const Map = dynamic(
  () => import("@/components/Map/Map").then((mod) => mod.Map),
  { ssr: false }
);

export function MapTable() {
  return (
    <div className="flex flex-col [--map-height:theme(size.96)] h-screen relative">
      <div className="w-full h-[--map-height] flex-none">
        <Map />
      </div>
      <div className="overflow-x-scroll">
        <EventTable />
      </div>
      <SettingsModal />
    </div>
  );
}
