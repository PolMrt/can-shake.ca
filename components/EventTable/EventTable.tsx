"use client";

import { activeEventPublicIDAtom, eventsAtom } from "@/atoms/atoms";
import { useAtom } from "jotai";
import { MagnitudeBadge } from "../MagnitudeBadge/MagnitudeBadge";
import dayjs from "dayjs";
import { useParseFile } from "@/hooks/useParseFile";

export function EventTable() {
  useParseFile();
  const [activeFocus, setActiveFocus] = useAtom(activeEventPublicIDAtom);
  const [events] = useAtom(eventsAtom);

  return (
    <table className="min-w-full divide-y divide-gray-200 relative">
      <thead className="bg-gray-50 sticky top-0 w-full shadow">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Date
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Description
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Latitude
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Longitude
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Depth
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Magnitude
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {events.map((event) => (
          <tr
            key={event.publicID}
            onMouseEnter={() => setActiveFocus(event.publicID)}
            onMouseLeave={() => setActiveFocus(null)}
            className={activeFocus === event.publicID ? "bg-gray-100" : ""}
          >
            <td className="px-6 py-4 whitespace-nowrap">
              {dayjs(event.isoDate).format("YYYY-MM-DD HH:mm:ss")}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{event.description}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              {event.origin.latitude}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {event.origin.longitude}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {event.origin.depth}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <MagnitudeBadge magnitude={event.magnitude} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
