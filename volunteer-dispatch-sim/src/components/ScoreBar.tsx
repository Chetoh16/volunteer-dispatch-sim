// src/components/ScoreBar.tsx
import React from "react";

interface ScoreBarProps {
  score: number;
}

const ScoreBar: React.FC<ScoreBarProps> = ({ score }) => {
  // Small width proportional to score (optional scaling)
  const width = Math.min(score * 2, 200); // max 200px for example

  return (
    <div className="relative w-[200px] h-4 bg-gray-300 rounded-full border border-black/20 overflow-hidden">
      <div
        className="bg-green-500 h-full transition-all duration-500"
        style={{ width: `${width}px` }}
      />
    </div>
  );
};

export default ScoreBar;