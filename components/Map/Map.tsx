"use client";

import { useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getMagnitudeColor } from "../MagnitudeBadge/MagnitudeBadge";
import { Bounds } from "@/type/bounds";
import { boundsToGeoJSON, roundBounds } from "@/util/bounds";
import { useAtom } from "jotai";
import {
  activeEventPublicIDAtom,
  currentBoundsAtom,
  eventsAtom,
} from "@/atoms/atoms";
import { INITIAL_CENTER, INITIAL_ZOOM, MAX_ZOOM, MIN_ZOOM } from "@/constants";

export function Map() {
  const [activeFocus] = useAtom(activeEventPublicIDAtom);
  const [currentBounds, setCurrentBounds] = useAtom(currentBoundsAtom);
  const [events] = useAtom(eventsAtom);

  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const markers = useRef<{ id: string; el: L.Marker }[]>([]);

  useEffect(() => {
    mapRef.current = L.map(mapContainerRef.current!).setView(
      {
        lat: INITIAL_CENTER.lat,
        lng: INITIAL_CENTER.lng,
      },
      INITIAL_ZOOM
    );

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: MAX_ZOOM,
      minZoom: MIN_ZOOM,
    }).addTo(mapRef.current);

    mapRef.current.on("moveend", () => {
      updateBound(mapRef, setCurrentBounds);
    });

    mapRef.current.on("load", () => {
      updateBound(mapRef, setCurrentBounds);
    });

    return () => {
      mapRef.current?.remove();
      markers.current.forEach((marker) => {
        marker.el.remove();
      });
      markers.current = [];
    };
  }, []);

  // MARKER
  useEffect(() => {
    if (!mapRef.current) return;

    // Remove existing markers
    markers.current.forEach((marker) => {
      marker.el.remove();
    });
    markers.current = [];

    // Add new markers for each event
    events.forEach((event) => {
      const el = L.divIcon({
        className: "custom-marker",
        html: `<div style="background-color: ${getMagnitudeColor(
          event.magnitude
        )}; width: 20px; height: 20px; border-radius: 50%; opacity: 0.5; box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.5);"></div>`,
      });

      const newMarker = L.marker(
        [event.origin.latitude, event.origin.longitude],
        { icon: el }
      )
        .bindPopup(
          `<h3>${event.description}</h3><p>Magnitude: ${event.magnitude}</p>`,
          { autoPan: false }
        )
        .addTo(mapRef.current!);

      markers.current.push({ id: event.publicID, el: newMarker });
    });
  }, [events]);

  // ACTIVE FOCUS
  useEffect(() => {
    if (!mapRef.current || !activeFocus) return;

    for (const marker of markers.current) {
      if (marker.id === activeFocus) {
        marker.el.openPopup();
      } else {
        marker.el.closePopup();
      }
    }
  }, [activeFocus]);

  // BOUNDS
  // Use to see bounds in development
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    if (!mapRef.current || !currentBounds) return;

    // Remove existing bounds layer if it exists
    let existingBoundsLayer: L.Layer | null = null;
    mapRef.current.eachLayer((layer) => {
      if ((layer as any).options.id === "bounds-layer") {
        existingBoundsLayer = layer;
      }
    });

    if (existingBoundsLayer) {
      mapRef.current.removeLayer(existingBoundsLayer);
    }

    // Add new bounds layer
    const boundsLayer = L.geoJSON(boundsToGeoJSON(currentBounds), {
      style: {
        color: "#ff0000",
        weight: 2,
      },
    });

    (boundsLayer as any).options.id = "bounds-layer";
    boundsLayer.addTo(mapRef.current);
  }, [currentBounds]);

  return (
    <>
      <div id="map-container" className="h-full" ref={mapContainerRef} />
    </>
  );
}

function updateBound(
  mapRef: React.RefObject<L.Map | null>,
  setCurrentBounds: (bounds: Bounds) => void
) {
  const mapBounds = mapRef.current!.getBounds();
  if (!mapBounds) return;

  const bounds: Bounds = roundBounds({
    maxLatitude: mapBounds.getNorthEast().lat,
    minLatitude: mapBounds.getSouthWest().lat,
    maxLongitude: mapBounds.getNorthEast().lng,
    minLongitude: mapBounds.getSouthWest().lng,
  });

  setCurrentBounds(bounds);
}
