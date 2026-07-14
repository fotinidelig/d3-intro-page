import * as d3 from 'd3';
import { fontType } from './theme/typography';
import { fontSize } from './theme/typography';

export const Legend = ({ x, y, height, labels, colors, hoveredType }) => {
    const yScale = d3.scaleBand().domain(labels).range([0, height]);
    return (
        <g>
            {labels.map((label, i) => {
                const opacity = hoveredType === label ? 1 : hoveredType ? .4 : .8;
                return (
                <g key={i} transform={`translate(${x}, ${yScale(label)})`}>
                    <circle cx={0} cy={yScale(label)} r={5} fill={colors[i]} opacity={opacity} />
                    <text 
                    x={-6} 
                    y={yScale(label)} 
                    textAnchor="end" 
                    dominantBaseline="middle" 
                    fontSize={fontSize.annotation}
                    fill='currentColor'
                    opacity={opacity}
                    style={{ fontFamily: fontType.monospace }}
                    >{label}</text>
                </g>
            );
            })}
        </g>
    )
}