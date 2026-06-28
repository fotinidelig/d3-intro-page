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
    fillOpacity: highlighted ? 1 : hoveredProject ? .4 : .8,
    opacity: highlighted ? 1 : hoveredProject ? .4 : .8,
  };

  return (
    <circle
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
