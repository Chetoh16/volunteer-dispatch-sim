import React, { useEffect, useState } from 'react';
import { Emergency, Volunteer } from '../types';
import { ReactComponent as WorldSVG } from '../assets/world.svg'; // Vite supports svg as component with vite-plugin-svgr

type MapProps = {
  emergencies: Emergency[];
  volunteers: Volunteer[];
  assignVolunteer: (volunteerId: string, emergencyId: string) => void;
};

const Map: React.FC<MapProps> = ({ emergencies, volunteers, assignVolunteer }) => {
  const [flashing, setFlashing] = useState<Record<string, boolean>>({});

  // Make countries flash red
  useEffect(() => {
    const ids = emergencies.map(e => e.country);
    const newFlash: Record<string, boolean> = {};
    ids.forEach(id => (newFlash[id] = true));
    setFlashing(newFlash);

    const timer = setTimeout(() => {
      setFlashing({});
    }, 1000); // flash for 1 second

    return () => clearTimeout(timer);
  }, [emergencies]);

  const handleClick = (countryId: string) => {
    // pick first unassigned emergency in this country
    const emergency = emergencies.find(e => e.country === countryId && !e.assignedVolunteer);
    const volunteer = volunteers.find(v => !v.isBusy);
    if (emergency && volunteer) {
      assignVolunteer(volunteer.id, emergency.id);
    }
  };

  return (
    <div className="w-full h-full">
      <WorldSVG className="w-full h-full">
        {/*
          The SVG paths already have IDs (ISO codes). 
          We'll add event listeners dynamically
        */}
      </WorldSVG>

      {/* Overlay for clicks */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {emergencies.map(e => (
          <path
            key={e.id}
            d="" // optional if you want to overlay or highlight
            className={`fill-red-500 ${flashing[e.country] ? 'opacity-100 animate-pulse' : 'opacity-0'}`}
          />
        ))}
      </svg>
    </div>
  );
};

export default Map;