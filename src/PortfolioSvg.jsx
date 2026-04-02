import React from 'react';
import * as d3 from 'd3';
import ProjectBubble from './ProjectBubble';
import projects from './assets/projects.json';

export default function PortfolioSvg({ width, height }) {
  const margin = { top: 30, right: 30, bottom: 40, left: 30 };

  const domainStart = new Date('2026-02-28');
  const domainEnd = new Date('2026-07-2');

  // x-scale: time → horizontal position
  const xScale = d3
    .scaleTime()
    .domain([domainStart, domainEnd])
    .range([margin.left, width - margin.right]);

  const xTicks = xScale.ticks(d3.timeMonth.every(1));
  const formatMonth = d3.timeFormat('%b %Y');

  // y-scale expresses project difficulty/complexity
  const yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([height - margin.bottom, margin.top]);

  const yTickLabels = ['easy', 'hard'];
  const yTickValues = [0, 98];

  // const yTicks = Object.keys(yTickLabels).map((key) => yScale(parseInt(key)));
  const axisY = height - margin.bottom + 20;

  const maxDuration = d3.max(projects.projects, (project) => parseInt(project.duration));
  const minDuration = d3.min(projects.projects, (project) => parseInt(project.duration));
  const durationScale = d3.scaleSqrt()
    .domain([minDuration, maxDuration])
    .range([25, 60]);

  const maxLines = d3.max(projects.projects, (project) => parseInt(project.lines));
  const minLines = d3.min(projects.projects, (project) => parseInt(project.lines));
  const linesScale = d3.scaleSqrt()
    .domain([minLines, maxLines])
    .range([0.3, 0.8]);

  const xAxis = (
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
  )

  const yAxis = (
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
          <g key={label} transform={`translate(${margin.left}, ${y})`}>
            <text
              x={-27}
              y={0} // Group is already at tick y; local text y must be 0.
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
  )

  const projectData = projects.projects;

  return (
    <svg
      className="app-svg"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Project canvas"
      overflow="visible"
    >
      <title>Portfolio Projects</title>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill="#f9c6c6"
        opacity={0.2}
      />
      <text 
      x={width-margin.right} 
      y={yScale(100)} 
      fill="currentColor" 
      opacity="0.5" 
      fontSize="20" 
      fontWeight="bold"
      textAnchor="end"
      >
        Projects by chronology &amp; difficulty
      </text>
      {xAxis}
      {yAxis}
      {projectData.map((project) => (
        <ProjectBubble 
          x={xScale(new Date(project.date))} 
          y={yScale(project.difficulty)} 
          radius={durationScale(parseInt(project.duration))} 
          color="#128c65" 
          opacity={linesScale(parseInt(project.lines))} 
          project={project} />
      ))}
    </svg>
  )
}
