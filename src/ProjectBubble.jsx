import { useState } from 'react';

export default function ProjectBubble({
  x,
  y,
  radius,
  color,
  onMouseEnter,
  onMouseLeave,
  onClick,
  hoveredProject,
  highlighted,
}) {

  const style = {
    fill: color,
    cursor: 'pointer',
    stroke: 'white',
    strokeWidth: 4,
    transition: 'all 0.05s ease',
    // fillOpacity: highlighted ? 1 : hoveredProject ? .6 : .8,
    filter: highlighted ? 'saturate(1)' : hoveredProject ? 'saturate(.4)' : 'saturate(.8)',
  };

  return (
    <circle
      key={name}
      cx={x}
      cy={y}
      r={highlighted ? radius * 1.15 : radius}
      style={style}
      onMouseEnter={(e) => {
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        onMouseLeave?.(e);
      }}
      onClick={onClick}
    />
  );
}
