import React from "react";
import { useState } from "react";
import type { CountryState } from "../data/countries";

import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"; // link to world map with names

const Map: React.FC = () => {
  const [tooltipContent, setTooltipContent] = useState<string>("");
  const [countries, setCountries] = useState<CountryState[]>([]);

  return (
    <div className="relative w-full h-full">
      {tooltipContent && (
        <div
          className="absolute top-0 left-0 bg-white p-1 rounded shadow text-sm pointer-events-none"
          style={{ transform: "translate(10px, 10px)" }}
        >
          {tooltipContent}
        </div>
      )}

      <ComposableMap
        width={1050}
        height={500}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) => {
            
            // Initialise country state once
            if (countries.length === 0 && geographies.length > 0) {
              const initialCountries: CountryState[] = geographies.map(
                (geo) => ({
                  name: geo.properties.name,
                  iso: geo.id,
                  status: "idle",
                })
              );

              setCountries(initialCountries);
            }

            return geographies.map((geo) => {
              const name = geo.properties.name;
              const country = countries.find(c => c.iso === geo.id);

              let fillColor = "#ccc"; // country fill colour
              if (country?.status === "alert") fillColor = "red";       // red indicates there's an opportunity chance
              if (country?.status === "active") fillColor = "green";    // green indicates there's an opportunity taking place

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={fillColor} // country fill colour
                  stroke="#000" // country border colour
                  style={{
                    default: { outline: "none" },
                    hover: { fill: "#555", outline: "none" }, 
                    pressed: { outline: "none" },
                  }}
                  onMouseEnter={() => setTooltipContent(name)}
                  onMouseLeave={() => setTooltipContent("")}
                />
              );
            });
          }}
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default Map;