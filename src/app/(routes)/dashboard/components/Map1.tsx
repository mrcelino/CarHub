"use client";

import { useEffect, useRef } from "react";
import { View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { Map as OlMap } from "ol";
import { fromLonLat, toLonLat } from "ol/proj";
import { Icon, Style } from "ol/style";
import Feature from "ol/Feature";
import { Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

// Tambahkan tipe untuk prop
interface MapProps {
  onPinClick: (coords: [number, number]) => void;
}

function Map({ onPinClick }: MapProps) {
  const mapRef = useRef<OlMap | null>(null);
  const vectorSourceRef = useRef<VectorSource>(new VectorSource());
  const pinFeatureRef = useRef<Feature | null>(null);

  useEffect(() => {
    const osmLayer = new TileLayer({
      source: new OSM({
        attributions: [],
      }),
    });

    const vectorLayer = new VectorLayer({
      source: vectorSourceRef.current,
    });

    const olMap = new OlMap({
      target: "map-container",
      layers: [osmLayer, vectorLayer],
      view: new View({
        center: fromLonLat([106.8456, -6.2088]),
        zoom: 15,
      }),
    });

    mapRef.current = olMap;

    // Cleanup saat komponen unmount
    return () => {
      olMap.setTarget(null!);
    };
  }, []);

  useEffect(() => {
    const handleMapClick = (event: any) => {
      const coords = toLonLat(event.coordinate);
      console.log("Koordinat yang diklik: ", coords);

      // Panggil fungsi onPinClick yang diterima melalui props
      onPinClick(coords as [number, number]);

      if (!pinFeatureRef.current) {
        const newPinFeature = new Feature({
          geometry: new Point(event.coordinate),
        });

        newPinFeature.setStyle(
          new Style({
            image: new Icon({
              src: "https://cdn-icons-png.flaticon.com/512/252/252025.png",
              scale: 0.07,
            }),
          })
        );

        vectorSourceRef.current.addFeature(newPinFeature);
        pinFeatureRef.current = newPinFeature;
      } else {
        const geometry = pinFeatureRef.current.getGeometry();
        if (geometry instanceof Point) {
          geometry.setCoordinates(event.coordinate);
        }
      }
    };

    const olMap = mapRef.current;
    if (olMap) {
      olMap.on("click", handleMapClick);
    }

    // Cleanup saat efek ini dihapus
    return () => {
      if (olMap) {
        olMap.un("click", handleMapClick);
      }
    };
  }, [onPinClick]);

  return <div className="w-[450px] h-[450px]" id="map-container" />;
}

export default Map;
