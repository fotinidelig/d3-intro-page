import React, { useRef } from 'react';
import * as d3 from 'd3';
import ProjectBubble from './ProjectBubble';
import projects from './assets/projects.json';
import { useDimensions } from './use-dimensions';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';

export const PortfolioSvg = ({ width, height }) => {
  if (!width || !height) return null;
  const margin = { top: 30, right: 30, bottom: 45, left: 30 };

  const domainStart = new Date('2026-02-28');
  const domainEnd = new Date('2026-07-2');

  // x-scale: time → horizontal position
  const xScale = d3
    .scaleTime()
    .domain([domainStart, domainEnd])
    .range([margin.left, width - margin.right]);

  const pixelsPerTick = 150;
  const numberOfTicksTarget = Math.floor(width / pixelsPerTick);
  const xTicks = xScale.ticks(numberOfTicksTarget);
  const formatMonth = d3.timeFormat('%b %Y');

  // y-scale expresses project difficulty/complexity
  const yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([height - margin.bottom, margin.top]);

  const yTickLabels = ['easy', 'ok', 'hard'];
  const yTickValues = [0, 49,93];

  // const yTicks = Object.keys(yTickLabels).map((key) => yScale(parseInt(key)));
  const axisY = height - margin.bottom + 20;

  const maxDuration = d3.max(projects.projects, (project) => parseInt(project.duration));
  const minDuration = d3.min(projects.projects, (project) => parseInt(project.duration));

  // Make bubble radii responsive: current values are the max at "full" size,
  // and scale down proportionally on smaller viewports.
  const BASE_W = 1100;
  const BASE_H = 700;
  const scale = Math.max(0.55, Math.min(1, Math.min(width / BASE_W, height / BASE_H)));

  const durationScale = d3.scaleSqrt()
    .domain([minDuration, maxDuration])
    .range([20 * scale, 50 * scale]);

  const maxLines = d3.max(projects.projects, (project) => parseInt(project.lines));
  const minLines = d3.min(projects.projects, (project) => parseInt(project.lines));
  // const linesScale = d3.scaleSqrt()
  //   .domain([minLines, maxLines])
  //   .range([0.3, 0.8]);

  const xAxis = 
  <AxisBottom 
    xScale={xScale} 
    xTicks={xTicks} 
    axisY={axisY} 
    formatMonth={formatMonth} 
    margin={margin} 
    width={width} 
  />;

  const yAxis = <AxisLeft yScale={yScale} yTickLabels={yTickLabels} yTickValues={yTickValues} margin={margin} axisY={axisY} />;

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
          // opacity={linesScale(parseInt(project.lines))} 
          opacity={0.9}
          project={project} />
      ))}
    </svg>
  )
};

export const ResponsivePortfolioSvg = () => {
  const chartRef = useRef(null);
  const chartSize = useDimensions(chartRef);
  return (
    <div ref={chartRef} style={{ width: "100%", height: "100%" }}>
      <PortfolioSvg width={chartSize.width} height={chartSize.height} />
    </div>
  );
};
