type Origin = {
  longitude: number;
  latitude: number;
  depth: number;
};

export type EarthquakeEvent = {
  publicID: string;
  isoDate: string;
  description: string;
  origin: Origin;
  magnitude: number;
};
