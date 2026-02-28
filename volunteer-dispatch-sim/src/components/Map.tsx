import React from "react";
import { useState } from "react";

import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"; // link to world map with names

const Map: React.FC = () => {
    const [tooltipContent, setTooltipContent] = useState<string>("");
    return (
        <div className="w-full h-full">
            {/* Tooltip to show country names */}
            <div className="absolute top-0 left-0 bg-white p-1 rounded shadow text-sm pointer-events-none" style={{ transform: "translate(10px, 10px)" }}>
                {tooltipContent}
            </div>

            <ComposableMap
                width={1050}
                height={500}
                style={{ width: "100%", height: "auto" }}
            >

                <Geographies geography={geoUrl}>
                {({ geographies }) =>
                    geographies.map((geo) => {
                    
                    // get the name of the country
                    const name = geo.properties.name

                    return (
                        <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill="#888"   // country fill colour
                            stroke="#000" // country border colour
                            style={{
                                default: { outline: "none" }, 
                                hover: { fill: "#555", outline: "none" },
                                pressed: { fill: "#0c0000", outline: "none" }, 
                            }}
                            onMouseEnter={() => setTooltipContent(name)}
                            onMouseLeave={() => setTooltipContent("")}
                            onMouseDown={() => setTooltipContent(name)}
                            onMouseUp={() => setTooltipContent("")}
                        />
                    );
                })
                }
                </Geographies>
            </ComposableMap>
        </div>

    
  );
};

export default Map;