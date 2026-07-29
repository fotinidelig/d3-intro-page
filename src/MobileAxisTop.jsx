import { fontSize, fontType } from './theme/typography.js';
import * as d3 from 'd3';

export const MobileAxisTop = ({ xScale, xTickLabels, xTickValues, margin, height, width }) => {
    const tickHeight = xScale(1) - xScale(0);
      const midpoints = xTickValues.slice(0, -1).map((value, i) => {  
          return (value+tickHeight/2);
      });
  
      return (
      <g className="portfolio-y-axis" aria-hidden="true" style={{ pointerEvents: 'none' }}>
        {xTickLabels.map((label, i) => {
            const value = xTickValues[i];
            const x = xScale(value);
            return (
            <g key={label} transform={`translate(${x}, ${margin.top})`}>
                <text
                    x={0}
                    y={-10}
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fill="currentColor"
                    opacity={1}
                    style={{ fontFamily: fontType.monospace, fontSize: fontSize.axis }}
                >
                    {label}
                </text>
                <line 
                    x1={0} 
                    x2={0} 
                    y1={0} 
                    y2={height - margin.top - margin.bottom} 
                    stroke="currentColor" 
                    strokeWidth={1} 
                    strokeDasharray="6 4"
                    opacity={0.3} 
                />
            </g>
            );
        })}
        <text x={width/2} y={margin.top - 28} textAnchor="middle" fill="currentColor" opacity={0.65} fontSize={fontSize.annotation}>
          tool
        </text>
      </g>
    );
  };
  
  export default MobileAxisTop;