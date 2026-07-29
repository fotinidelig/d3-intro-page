import { fontSize, fontType } from './theme/typography.js';
import * as d3 from 'd3';

export const MobileAxisLeft = ({ dateScale, mobileDateTicks, margin, height }) => {
    const formatMonth = d3.timeFormat("%b");
    const formatYear = d3.timeFormat("%Y");
    return (
    <g aria-hidden="true" style={{ pointerEvents: 'none' }}>
    {mobileDateTicks.map((date) => {
      const y = dateScale(date);
      return (
        <g key={date.toISOString()} transform={`translate(${margin.left}, ${y})`}>
          <line
            x1={-6}
            x2={0}
            y1={0}
            y2={0}
            stroke="currentColor"
            strokeWidth={1}
            opacity={0.5}
          />
          <text
            x={-25}
            y={0}
            textAnchor="end"
            dominantBaseline="middle"
            fill="currentColor"
            style={{ fontFamily: fontType.monospace, fontSize: fontSize.axis }}
          >
            <tspan x={-25} dy="-0.4em">{formatMonth(date)}</tspan>
            <tspan x={-25} dy="1.2em">{formatYear(date)}</tspan>
          </text>
        </g>
      );
    })}
    <text
      x={-height / 2}
      y={10}
      textAnchor="middle"
      fill="currentColor"
      opacity={0.65}
      fontFamily={fontType.monospace}
      fontSize={fontSize.annotation}
      transform={`rotate(-90)`}
    >
      date
    </text>
  </g>
  );
};

export default MobileAxisLeft;