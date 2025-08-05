import React from "react";

export const RunningAnimal = () => (
  <svg
    width="64"
    height="40"
    viewBox="0 0 64 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="animate-running"
    style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.18))" }}
  >
    {/* Simple stylized running cheetah */}
    <g>
      <ellipse cx="32" cy="32" rx="18" ry="5" fill="#eab308" opacity="0.18" />
      <path
        d="M10 32 Q18 18 32 28 Q46 38 54 24"
        stroke="#eab308"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="14" cy="30" r="3" fill="#eab308" />
      <circle cx="50" cy="28" r="3" fill="#eab308" />
      <circle
        cx="32"
        cy="28"
        r="7"
        fill="#fde68a"
        stroke="#eab308"
        strokeWidth="2"
      />
      <ellipse cx="36" cy="25" rx="1.5" ry="1" fill="#000" />
      <ellipse cx="28" cy="25" rx="1.5" ry="1" fill="#000" />
      <ellipse cx="32" cy="30" rx="2" ry="1.2" fill="#000" opacity=".4" />
    </g>
  </svg>
);

export default RunningAnimal;
