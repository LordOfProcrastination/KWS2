import { Map, View } from "ol";
import Layer from "ol/layer/Layer";
import { useGeographic } from "ol/proj";
import React, { Dispatch, SetStateAction } from "react";

useGeographic();

export const map = new Map({
  view: new View({ center: [10, 59], zoom: 8 }),
});

export const MapContext = React.createContext<{
  map: Map;
  setLayers: Dispatch<SetStateAction<Layer[]>>;
  layers: Layer[];
}>({
  map,
  setLayers: () => {},
  layers: [],
});
