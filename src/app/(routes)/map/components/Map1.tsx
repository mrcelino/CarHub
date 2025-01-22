"use client";

import { View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import React, { useEffect } from "react";
import { Map as OlMap } from "ol";
import { fromLonLat } from "ol/proj"; // Impor fungsi untuk konversi koordinat

function Map() {
  useEffect(() => {
    const osmLayer = new TileLayer({
      source: new OSM({
        attributions: [] // Menghilangkan copyright OpenStreetMap
      }),
    });

    const map = new OlMap({
      target: "map-container",
      layers: [osmLayer],
      view: new View({
        center: fromLonLat([106.8456, -6.2088]), // Koordinat Jakarta dalam lon, lat
        zoom: 16, // Sesuaikan zoom level sesuai kebutuhan
      }),
    });

    return () => map.setTarget(null!);
  }, []);

  return <div className="w-[450px] h-[450px]" id="map-container" />;
}

export default Map;
