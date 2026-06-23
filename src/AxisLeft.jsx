export const AxisLeft = ({ yScale, yTickLabels, yTickValues, margin, axisY }) => {
    return (
    <g className="portfolio-y-axis" aria-hidden="true">
      <line
        x1={margin.left}
        x2={margin.left}
        y1={axisY}
        y2={margin.top}
        stroke="currentColor"
        strokeWidth={1}
        opacity={0.35}
      />
      {yTickLabels.map((label, i) => {
        const y = yScale(yTickValues[i]);
        return (
          <g key={label} transform={`translate(${margin.left}, ${y}) rotate(-90)`}>
            <text
              x={0}
              y={-10} // Group is already at tick y; local text y must be 0.
              dominantBaseline="middle"
              textAnchor="start"
              fill="currentColor"
              opacity={0.65}
              fontSize={12}
            >
              {label}
            </text>
          </g>
        );
      })}
      <text x={margin.left} y={margin.top-10} textAnchor="start" fill="currentColor" opacity={0.65} fontSize={12}>
        difficulty
      </text>
    </g>
  );
};

export default AxisLeft;