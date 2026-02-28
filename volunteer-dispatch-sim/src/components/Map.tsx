import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"; // link to topojson (world map)

const Map: React.FC = () => {
  return (
    <div className="w-full h-full">
      <ComposableMap>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#888"   // country fill color
                stroke="#000" // country border
                style={{
                  default: { outline: "none" },
                  hover: { fill: "#555", outline: "none" },
                  pressed: { fill: "#0c0000", outline: "none" },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default Map;