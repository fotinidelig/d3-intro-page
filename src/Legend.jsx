import * as d3 from 'd3';
import { fontType } from './theme/typography';
import { fontSize } from './theme/typography';

export const Legend = ({ x, y, height, labels, colors, hoveredType, setHoveredType }) => {
    const yScale = d3.scaleBand().domain(labels).range([y, y + height]);

    return (
        <g>
            {labels.map((label, i) => {
                const opacity = hoveredType === label ? 1 : hoveredType ? .4 : .8;
                const bandY = yScale(label) + yScale.bandwidth() / 2;

                return (
                <g
                    key={label}
                    transform={`translate(${x}, ${bandY})`}
                    onMouseEnter={() => setHoveredType(label)}
                    onMouseLeave={() => setHoveredType(null)}
                    style={{ cursor: 'pointer' }}
                >
                    <rect
                      x={-90}
                      y={-yScale.bandwidth() / 2}
                      width={90}
                      height={yScale.bandwidth()}
                      fill="transparent"
                    />
                    <circle cx={0} cy={0} r={5} fill={colors[i]} opacity={opacity} />
                    <text
                    x={-10}
                    y={0}
                    textAnchor="end"
                    dominantBaseline="middle"
                    fontSize={fontSize.axis}
                    fill='currentColor'
                    opacity={opacity}
                    style={{ fontFamily: fontType.monospace, pointerEvents: 'none' }}
                    >{label}</text>
                </g>
            );
            })}
        </g>
    )
}