"use client";

import { View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import React, { useEffect, useState } from "react";
import { Map as OlMap } from "ol";
import { fromLonLat, toLonLat } from "ol/proj";
import { Icon, Style } from "ol/style";
import Feature from "ol/Feature";
import { Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

function Map() {
  const [map, setMap] = useState<OlMap | null>(null);
  const [vectorSource, setVectorSource] = useState<VectorSource>(new VectorSource());
  const [pinFeature, setPinFeature] = useState<Feature | null>(null);

  useEffect(() => {
    const osmLayer = new TileLayer({
      source: new OSM({
        attributions: [], // Menghilangkan copyright OpenStreetMap
      }),
    });

    // Inisialisasi vector layer
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    // Inisialisasi peta
    const olMap = new OlMap({
      target: "map-container",
      layers: [osmLayer, vectorLayer],
      view: new View({
        center: fromLonLat([106.8456, -6.2088]), // Koordinat Jakarta
        zoom: 15,
      }),
    });

    olMap.on("click", (event) => {
      const coords = toLonLat(event.coordinate); // Mendapatkan koordinat lon, lat
      console.log("Koordinat yang diklik: ", coords);

      // Jika pin belum ada, buat pin baru
      if (!pinFeature) {
        const newPinFeature = new Feature({
          geometry: new Point(event.coordinate),
        });

        newPinFeature.setStyle(
          new Style({
            image: new Icon({
              src: "https://cdn-icons-png.flaticon.com/512/252/252025.png", // Ganti dengan URL pin merah Anda
              scale: 0.07, // Ukuran pin
            }),
          })
        );

        vectorSource.addFeature(newPinFeature);
        setPinFeature(newPinFeature);
      } else {
        // Jika pin sudah ada, pindahkan ke lokasi baru
        const geometry = pinFeature.getGeometry();
        if (geometry instanceof Point) {
          geometry.setCoordinates(event.coordinate); // Set koordinat baru hanya jika geometry adalah Point
        }
      }
    });

    setMap(olMap);

    return () => {
      olMap.setTarget(null!); // Bersihkan peta saat komponen unmount
    };
  }, [pinFeature, vectorSource]);

  return <div className="w-[450px] h-[450px]" id="map-container" />;
}

export default Map;
