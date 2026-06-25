import { fontSize, fontType } from './theme/typography.js';

export const AxisBottom = ({ xScale, xTicks, axisY, formatMonth, margin, width }) => {
    return (
    <g className="portfolio-x-axis" aria-hidden="true">
        <line
          x1={margin.left}
          x2={width - margin.right}
          y1={axisY}
          y2={axisY}
          stroke="currentColor"
          strokeWidth={2}
          opacity={0.8}
        />
        {xTicks.map((d) => {
          const x = xScale(d);
          return (
            <g key={d.toISOString()} transform={`translate(${x}, ${axisY})`}>
              <line y2={5} stroke="currentColor" strokeWidth={2} opacity={0.8} />
              <text
                y={18}
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
        <text x={width+10} y={axisY} dominantBaseline="middle" textAnchor="end" fill="currentColor" opacity={0.65} fontSize={fontSize.annotation}>
            date
        </text>
      </g>
    );
};

export default AxisBottom;