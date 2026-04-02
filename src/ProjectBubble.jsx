import React from 'react';
import * as d3 from 'd3';

export default function ProjectBubble({x, y, radius, color, opacity, name}) {

  const style = {
    fill: color,
    opacity: opacity,
    cursor: 'pointer',
    stroke: 'white',
    strokeWidth: '5',
  }

  return (
    <g>
        <circle style={style} key={name} cx={x} cy={y} r={radius}/>
        <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="12" fill="white">
            {name}
        </text>
    </g>
  );
}