import React, { useRef, useState } from 'react';
import * as d3 from 'd3';
import ProjectBubble from './ProjectBubble';
import projects from './assets/projects.json';
import { typesCategoriesColors, toolCategories } from './assets/categories';
import { Tooltip } from './Tooltip';
import { ProjectCard } from './ProjectCard';
import { useDimensions } from './use-dimensions';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';


function extractToolCategory(tool) {
  return toolCategories.find(category => tool.includes(category));
}

export const PortfolioSvg = ({ width, height }) => {
  if (!width || !height) return null;

  const [interactionData, setInteractionData] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const margin = { top: 50, right: 30, bottom: 60, left: 30 };

  const minDate = new Date(d3.min(projects.projects, project => project.date));

  const domainStart = new Date(minDate.setMonth((minDate.getMonth() - 1) % 12));
  const domainEnd = new Date();

  // x-scale: time → horizontal position
  const xScale = d3
    .scaleTime()
    .domain([domainStart, domainEnd])
    .range([margin.left, width - margin.right]);

  const pixelsPerTick = 140;
  const numberOfTicksTarget = Math.floor(width / pixelsPerTick);
  const xTicks = xScale.ticks(numberOfTicksTarget);
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
  />;

  const yAxis = <AxisLeft yScale={yScale} yTickLabels={yTickLabels} yTickValues={yTickValues} margin={margin} axisY={axisY} />;

  const projectData = projects.projects;

  return (
    <div style={{ position: "relative" }}>
      <svg
        className="app-svg"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Project canvas"
        overflow="visible"
      >
        <rect
          className="app-svg__background"
          x={0}
          y={0}
          width={width}
          height={height}
        />
        {xAxis}
        {yAxis}
        {projectData.map((project) => {
          const y = toolCategories.indexOf(extractToolCategory(project.tool));
          
          return <ProjectBubble 
            x={xScale(new Date(project.date))} 
            y={yScale(y)} 
            radius={15} 
            color={typesCategoriesColors[project.category]} 
            opacity={0.9}
            project={project} 
            onMouseEnter={() =>
              setInteractionData({
                xPos: xScale(new Date(project.date)),
                yPos: yScale(y),
                name: project.name,
                date: new Date(project.date).toLocaleDateString(),
                data: project.data,
                tool: project.tool,
                demo: project.demo,  
                category: project.category,
                width: width,
              })
            }
            onMouseLeave={() => setInteractionData(null)}
            onClick={() => setSelectedProject(project)}
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
