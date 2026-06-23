
export const AxisBottom = ({ xScale, xTicks, axisY, formatMonth, margin, width }) => {
    return (
    <g className="portfolio-x-axis" aria-hidden="true">
        <line
          x1={margin.left}
          x2={width - margin.right}
          y1={axisY}
          y2={axisY}
          stroke="currentColor"
          strokeWidth={1}
          opacity={0.35}
        />
        {xTicks.map((d) => {
          const x = xScale(d);
          return (
            <g key={d.toISOString()} transform={`translate(${x}, ${axisY})`}>
              <line y2={5} stroke="currentColor" strokeWidth={1} opacity={0.35} />
              <text
                y={18}
                textAnchor="middle"
                fill="currentColor"
                opacity={0.65}
                fontSize={12}
              >
                {formatMonth(d)}
              </text>
            </g>
          );
        })}
      </g>
    );
};

export default AxisBottom;