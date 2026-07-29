import { motion } from 'motion/react';

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
  hoveredType,
}) {


  const style = {
    fill: color,
    cursor: 'pointer',
    stroke: 'white',
    strokeWidth: 4,
    transition: 'filter 0.05s ease',
    filter: highlighted ? 'saturate(1)' : hoveredProject || hoveredType ? 'saturate(.3)' : 'saturate(.8)',
  };

  return (
    <motion.circle
      cx={x}
      cy={y}
      style={style}
      animate={{ r: highlighted ? radius * 1.2 : radius }}
      transition={{ type: 'spring', stiffness: 100, damping: 10 }}
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
