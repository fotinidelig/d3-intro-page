import { fontSize, fontType } from './theme/typography.js';

export const AxisLeft = ({ yScale, yTickLabels, yTickValues, margin, width }) => {
  const tickHeight = yScale(1) - yScale(0);
    const midpoints = yTickValues.slice(0, -1).map((value, i) => {  
        return (value+tickHeight/2);
    });

    return (
    <g className="portfolio-y-axis" aria-hidden="true" style={{ pointerEvents: 'none' }}>
      {/* <line
        x1={margin.left}
        x2={margin.left}
        y1={axisY}
        y2={margin.top}
        stroke="currentColor"
        strokeWidth={2}
        opacity={0.8}
      /> */}
      {yTickLabels.map((label, i) => {
        const y = yScale(yTickValues[i]);
        return (
          <g key={label} transform={`translate(${margin.left}, ${y})`}>
            <text
              x={0}
              y={0} // Group is already at tick y; local text y must be 0.
              dominantBaseline="middle"
              textAnchor="end"
              fill="currentColor"
              opacity={1}
              style={{ fontFamily: fontType.monospace, fontSize: fontSize.axis }}
            >
              {label}
            </text>
          </g>
        );
      })}
      {yTickValues.map((value, i) => {
        return (
          <g key={i} transform={`translate(${margin.left}, ${yScale(value)})`}>
            <line 
            x1={10} 
            x2={width-margin.right-margin.left} 
            y1={0} 
            y2={0} 
            stroke="currentColor" 
            strokeWidth={1} 
            strokeDasharray="6 4"
            opacity={0.3} 
            />
          </g>
        );
      })}
      <text x={0} y={margin.top} textAnchor="start" fill="currentColor" opacity={0.65} fontSize={fontSize.annotation}>
        tool
      </text>
    </g>
  );
};

export default AxisLeft;