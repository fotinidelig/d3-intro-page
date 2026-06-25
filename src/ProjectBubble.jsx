import { useState } from 'react';

export default function ProjectBubble({
  x,
  y,
  radius,
  color,
  opacity,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) {
  const [hovered, setHovered] = useState(false);

  const style = {
    fill: color,
    opacity,
    cursor: 'pointer',
    stroke: 'white',
    strokeWidth: 4,
    transition: 'r 0.05s ease',
  };

  return (
    <circle
      cx={x}
      cy={y}
      r={hovered ? radius * 1.15 : radius}
      style={style}
      onMouseEnter={(e) => {
        setHovered(true);
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setHovered(false);
        onMouseLeave?.(e);
      }}
      onClick={onClick}
    />
  );
}
