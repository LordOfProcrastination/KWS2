import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import "./application.css";
import "ol/ol.css";
import { Map, View } from "ol";
import { MapContext } from "../map/mapContext";
import { useGeographic } from "ol/proj";
import Layer from "ol/layer/Layer";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { KommuneLayerCheckbox } from "../kommuner/kommuneLayerCheckbox";

useGeographic();

const map = new Map({
  view: new View({ center: [10, 59], zoom: 8 }),
});

export function Application() {
  function handleFocusUser(e: React.MouseEvent) {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      map.getView().animate({
        center: [longitude, latitude],
        zoom: 12,
      });
    });
  }

  const [layers, setLayers] = useState<Layer[]>([
    new TileLayer({ source: new OSM() }),
  ]);
  useEffect(() => map.setLayers(layers), [layers]);

  const mapRef = useRef() as MutableRefObject<HTMLDivElement>;
  useEffect(() => map.setTarget(mapRef.current), []);
  return (
    <MapContext.Provider value={{ map, layers, setLayers }}>
      <header>
        <h1>DatabaseKart</h1>
      </header>
      <nav>
        <a href={"#"} onClick={handleFocusUser}>
          Min posisjon
        </a>
        <KommuneLayerCheckbox />
      </nav>
      <main>
        <div ref={mapRef}></div>
      </main>
    </MapContext.Provider>
  );
}
