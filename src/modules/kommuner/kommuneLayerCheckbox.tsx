import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";

import React, { useState } from "react";
import { useLayer } from "../map/useLayer";

const kommuneLayer = new VectorLayer({
  className: "kommuner",
  source: new VectorSource({
    url: "/api/kommuner",
    format: new GeoJSON(),
  }),
});

export function KommuneLayerCheckbox() {
  const [checked, setChecked] = useState(false);
  useLayer(kommuneLayer, checked);
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        {checked ? "Hide" : "Show"} kommuner
      </label>
    </div>
  );
}
