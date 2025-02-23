import { Bounds } from "@/type/bounds";

export function roundBounds(bounds: Bounds): Bounds {
  return {
    minLatitude: roundCoordinate(bounds.minLatitude),
    maxLatitude: roundCoordinate(bounds.maxLatitude),
    minLongitude: roundCoordinate(bounds.minLongitude),
    maxLongitude: roundCoordinate(bounds.maxLongitude),
  };
}

function roundCoordinate(coordinate: number): number {
  const precision = 1;
  const factor = Math.pow(10, precision);
  return Math.round(coordinate * factor) / factor;
}

export function boundsToGeoJSON(bounds: Bounds): GeoJSON.Feature {
  return {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [bounds.minLongitude, bounds.minLatitude],
          [bounds.minLongitude, bounds.maxLatitude],
          [bounds.maxLongitude, bounds.maxLatitude],
          [bounds.maxLongitude, bounds.minLatitude],
          [bounds.minLongitude, bounds.minLatitude],
        ],
      ],
    },
  };
}
