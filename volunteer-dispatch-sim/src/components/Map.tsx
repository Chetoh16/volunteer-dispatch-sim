import React from "react";
import { useState } from "react";
import type { CountryState } from "../data/countries";


import { ComposableMap, Geographies, Geography} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"; // link to world map with names

interface MapProps {
    countries: CountryState[];

    
    // setCountries is a function that updates the countries state
    // Can call it either with a new array of countries or a function that transforms the previous array into a new array
    setCountries: React.Dispatch<React.SetStateAction<CountryState[]>>;

    onCountryClick: (iso: string) => void;
}

const Map: React.FC<MapProps> = ({ countries, onCountryClick }) => {
    const [tooltipContent, setTooltipContent] = useState<string>("");

    // Render
    return (
    <div className="relative w-full h-full">
        {tooltipContent && (
        <div className="absolute top-0 left-0 bg-white p-1 rounded shadow text-sm pointer-events-none" style={{ transform: "translate(10px, 10px)" }}>
            {tooltipContent}
        </div>
        )}

      <ComposableMap width={1200} height={500} style={{ width: "100%", height: "auto" }}>
        <Geographies geography={geoUrl}>
          {({ geographies }) => 
            geographies.map((geo) => {
              const country = countries.find(c => c.iso === geo.id);
              const name = geo.properties.name;
              

              let fillColor = "#f6f8e3";
              if(country?.status === "alert") fillColor = "red";
              if(country?.status === "active") fillColor = "green";

              return (
                <Geography  
                  key={geo.rsmKey}
                  geography={geo}
                  fill={fillColor}
                  stroke="#000"
                  style={{
                    default: { outline: "none" },
                    hover: { fill: "#555", outline: "none" },
                    pressed: { outline: "none" },
                  }}
                  onMouseEnter={() => setTooltipContent(name)}
                  onMouseLeave={() => setTooltipContent("")}
                  onClick={() => {
                    const country = countries.find(c => c.iso === geo.id);
                    if(country?.status === "alert" || country?.status === "active"){
                      onCountryClick(geo.id);
                    }
                  }}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
    );
};

export default Map;