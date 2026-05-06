import React from 'react';

export default function ProjectBubble({x, y, radius, color, opacity, project}) {

  const style = {
    fill: color,
    opacity: opacity,
    cursor: 'pointer',
    stroke: 'white',
    strokeWidth: '5',
  }

  return (
    <a href={project.demo} target="_blank" rel="noopener noreferrer">
      <g>
          <circle style={style} key={project.name} cx={x} cy={y} r={radius}/>
      </g>
    </a>
  );
}