import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { xml2js } from "xml-js";
import { EarthquakeEvent } from "../models/EarthquakeEvent";
import { currentBoundsAtom, eventsAtom } from "@/atoms/atoms";

const fetchEarthquakeData = async (bounds: any) => {
  const { minLatitude, maxLatitude, minLongitude, maxLongitude } = bounds;
  const data = await fetch(
    `https://www.earthquakescanada.nrcan.gc.ca/fdsnws/event/1/query?starttime=2024-01-01T00:00:00&endtime=2025-12-01T00:00:00&minlatitude=${minLatitude}&maxlatitude=${maxLatitude}&minlongitude=${minLongitude}&maxlongitude=${maxLongitude}&minmagnitude=3`
  );
  const rawText = await data.text();
  const json = xml2js(rawText, { compact: true });

  // @ts-ignore
  let rawEvents = json?.["q:quakeml"]?.eventParameters?.event;

  let earthquakesEvents: EarthquakeEvent[] = [];

  if (!rawEvents) return earthquakesEvents;

  // rawEvents can be an array or an object
  if (!Array.isArray(rawEvents)) {
    rawEvents = [rawEvents];
  }

  // @ts-ignore
  rawEvents.forEach((event) => {
    const publicID = event._attributes.publicID;
    const type = event.type._text;
    const description = event.description.text._text.split("/")[0];
    const origin = event.origin;
    const magnitude = +event.magnitude.mag.value._text;

    if (type !== "earthquake") return;

    earthquakesEvents.push({
      publicID,
      isoDate: origin.time.value._text,
      description,
      origin: {
        latitude: +origin.latitude.value._text,
        longitude: +origin.longitude.value._text,
        depth: +origin.depth.value._text,
      },
      magnitude,
    });
  });

  return earthquakesEvents;
};

export const useParseFile = () => {
  const [currentBounds] = useAtom(currentBoundsAtom);
  const [, setEvents] = useAtom(eventsAtom);

  return useQuery(
    ["earthquakeData", currentBounds],
    () => fetchEarthquakeData(currentBounds),
    {
      keepPreviousData: true,
      onSuccess: (data) => {
        setEvents(data);
      },
    }
  );
};
