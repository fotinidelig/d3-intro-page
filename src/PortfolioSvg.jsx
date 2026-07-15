import React, { useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import ProjectBubble from './ProjectBubble';
import projects from './assets/projects.json';
import { typesCategoriesColors, toolCategories } from './assets/categories';
import { Tooltip } from './Tooltip';
import { ProjectCard } from './ProjectCard';
import { useDimensions } from './use-dimensions';
import { fontSize } from './theme/typography';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Legend } from './Legend';

const JITTER_WIDTH = .3;

function extractToolCategory(tool) {
  return toolCategories.find(category => tool.includes(category));
}

export const PortfolioSvg = ({ width, height }) => {
  if (!width || !height) return null;

  const [interactionData, setInteractionData] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [hoveredType, setHoveredType] = useState(null);

  const margin = { top: 50, right: 30, bottom: 60, left: 30 };

  const minDate = new Date(d3.min(projects.projects, project => project.date));

  const domainStart = new Date(minDate.setMonth((minDate.getMonth() - 1) % 12));
  const domainEnd = new Date();

  const projectsWithJitter = useMemo(() => projects.projects.map((project) => {
    return {
      ...project,
      y: toolCategories.indexOf(extractToolCategory(project.tool)) + (Math.random()-0.5) * JITTER_WIDTH,
    };
  }), [projects.projects]);

  // x-scale: time → horizontal position
  const xScale = d3
    .scaleTime()
    .domain([domainStart, domainEnd])
    .range([margin.left, width - margin.right]);

  const pixelsPerTick = 140;
  const numberOfTicksTarget = Math.floor(width / pixelsPerTick);
  const xTicks = xScale.ticks(numberOfTicksTarget).slice(1);
  const formatMonth = d3.timeFormat('%b %Y');

  // y-scale expresses project difficulty/complexity
  const yScale = d3.scaleLinear()
    .domain([0, toolCategories.length - 1])
    .range([height - margin.bottom, margin.top + 50]);

  const yTickLabels = toolCategories;
  const yTickValues = toolCategories.map((category, index) => index);

  const axisY = height - margin.bottom + 20;

  const xAxis = 
  <AxisBottom 
    xScale={xScale} 
    xTicks={xTicks} 
    axisY={axisY} 
    formatMonth={formatMonth} 
    margin={margin} 
    width={width} 
    height={height}
  />;

  const yAxis = 
  <AxisLeft 
  yScale={yScale} 
  yTickLabels={yTickLabels} 
  yTickValues={yTickValues} 
  margin={margin} 
  width={width} 
  height={height}
  />;

  const projectData = projectsWithJitter;
  const legendLabels = Object.keys(typesCategoriesColors);
  const legendHeight = legendLabels.length * fontSize.annotation * 0.65;
  const legend = 
  <Legend 
    x={width-margin.right} 
    y={margin.top+20} 
    height={legendHeight}
    labels={legendLabels} 
    colors={Object.values(typesCategoriesColors)}
    hoveredType={hoveredType}
    />;

  return (
    <div style={{ position: "relative" }}>
      <svg
        className="app-svg"
        width={width} height={height}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Project canvas"
        overflow="visible"
      >
        {legend}
        <rect
          className="app-svg__background"
          x={0}
          y={0}
          width={width}
          height={height}
        />
        {xAxis}
        {yAxis}
        <text x={0} y={-30} fontSize={fontSize.subheader} fontWeight="bold" fill='#128c65'>
          Project exploration </text>
        <text x={0} y={-10} fontSize={fontSize.annotation} fill='#128c65'>
          learn more by clicking on the bubbles!
        </text>
        
        {projectData.map((project) => {
          const y = yScale(project.y);
          
          return <ProjectBubble 
            x={xScale(new Date(project.date))} 
            y={y} 
            radius={15} 
            color={typesCategoriesColors[project.category]} 
            project={project} 
            onMouseEnter={() => {
              setHoveredType(project.category);
              setHoveredProject(project);
              setInteractionData({
                xPos: xScale(new Date(project.date)),
                yPos: y,
                name: project.name,
                date: new Date(project.date).toLocaleDateString(),
                data: project.data,
                tool: project.tool,
                demo: project.demo,
                category: project.category,
                color: typesCategoriesColors[project.category],
                width,
              })
            }}
            onMouseLeave={
              () => {
                setHoveredProject(null);
                setInteractionData(null);
                setHoveredType(null);
              }
            }
            onClick={() => setSelectedProject(project)}
            hoveredProject={hoveredProject}
            highlighted={ hoveredProject === project}
            />;
        })}
      </svg>
      <div
        style={{
          position: "absolute",
          width,
          height,
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
      >
        <Tooltip interactionData={interactionData} />
      </div>
      {selectedProject ? (
        <ProjectCard
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      ) : null}
    </div>
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
