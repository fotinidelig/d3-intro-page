import { fontSize, fontType } from './theme/typography.js';

export const AxisBottom = ({ xScale, xTicks, axisY, formatMonth, margin, width, height }) => {

    const labelsPadding = 18;
    return (
    <g className="portfolio-x-axis" aria-hidden="true" style={{ pointerEvents: 'none' }}>
        {/* <line
          x1={margin.left}
          x2={width - margin.right}
          y1={axisY}
          y2={axisY}
          stroke="currentColor"
          strokeWidth={2}
          opacity={0.8}
        /> */}
        {xTicks.map((d) => {
          const x = xScale(d);
          return (
            <g key={d.toISOString()} transform={`translate(${x}, ${axisY})`}>        
              <line x1={0} x2={0} y1={0} y2={50-height+margin.top} 
                stroke="currentColor"
                strokeWidth={1} 
                strokeDasharray="6 4"
                opacity={0.3} 
              />
              {/* <line y2={5} stroke="currentColor" strokeWidth={2} opacity={0.8} /> */}
              <text
                y={labelsPadding}
                textAnchor="middle"
                fill="currentColor"
                opacity={1}
                style={{ fontFamily: fontType.monospace, fontSize: fontSize.axis }}

              >
                {formatMonth(d)}
              </text>
            </g>
          );
        })}
        <text x={width} y={axisY+labelsPadding} 
        textAnchor="end" fill="currentColor" opacity={0.65} fontSize={fontSize.annotation}>
            date
        </text>
      </g>
    );
};

export default AxisBottom;