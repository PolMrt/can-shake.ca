"use client";

import dynamic from "next/dynamic";
import { EventTable } from "../EventTable/EventTable";

const Map = dynamic(
  () => import("@/components/Map/Map").then((mod) => mod.Map),
  { ssr: false }
);

export function MapTable() {
  return (
    <div className="flex flex-col [--map-height:theme(size.96)] h-screen">
      <div className="w-full h-[--map-height] flex-none">
        <Map />
      </div>
      <div className="overflow-x-scroll">
        <EventTable />
      </div>
    </div>
  );
}
