import React, { useRef, useState, useMemo, useEffect } from "react";
import * as d3 from "d3";
import ProjectBubble from "./ProjectBubble";
import projects from "./assets/projects.json";
import { typesCategoriesColors, toolCategories } from "./assets/categories";
import { getSpoilerUrl, preloadSpoiler, preloadAllSpoilers } from "./spoilerImages";
import { Tooltip } from "./Tooltip";
import { ProjectCard } from "./ProjectCard";
import { useDimensions } from "./use-dimensions";
import { fontSize } from "./theme/typography";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Legend } from "./Legend";
import { useMediaQuery } from './use-media-query';
import { MobileAxisTop } from "./MobileAxisTop";
import { MobileAxisLeft } from "./MobileAxisLeft";

const JITTER_WIDTH = 0.3;
const BUBBLE_RADIUS = 15;

function extractToolCategory(tool) {
  return toolCategories.find((category) => tool.includes(category));
}

function projectBubble({
  project,
  isMobile,
  bubbleXScale,
  bubbleYScale,
  width,
  hoveredType,
  hoveredProject,
  setHoveredType,
  setHoveredProject,
  setInteractionData,
  setSelectedProject,
}) {

  const x = isMobile
    ? bubbleXScale(project.y)
    : bubbleXScale(new Date(project.date));
  const y = isMobile
    ? bubbleYScale(new Date(project.date))
    : bubbleYScale(project.y); 

  const color = typesCategoriesColors[project.category];
  const highlighted =
    hoveredProject === project ||
    (!hoveredProject && hoveredType === project.category);

  return (
    <ProjectBubble
      key={project.id}
      x={x}
      y={y}
      radius={BUBBLE_RADIUS}
      color={color}
      project={project}
      hoveredType={hoveredType}
      hoveredProject={hoveredProject}
      highlighted={highlighted}
      onMouseEnter={() => {
        preloadSpoiler(getSpoilerUrl(project.spoiler), project.spoiler);
        setHoveredType(project.category);
        setHoveredProject(project);
        setInteractionData({
          xPos: x,
          yPos: y,
          name: project.name,
          date: new Date(project.date).toLocaleDateString(),
          data: project.data,
          tool: project.tool,
          demo: project.demo,
          category: project.category,
          color,
          width,
        });
      }}
      onMouseLeave={() => {
        setHoveredProject(null);
        setInteractionData(null);
        setHoveredType(null);
      }}
      onClick={() => setSelectedProject(project)}
    />
  );
}

export const PortfolioSvg = ({ width, height }) => {
  if (!width || !height) return null;
  const isMobile = useMediaQuery('(max-width: 768px)');
  console.log('isMobile:', isMobile);
  const [interactionData, setInteractionData] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [hoveredType, setHoveredType] = useState(null);

  useEffect(() => {
    const schedule = window.requestIdleCallback
      ? (cb) => window.requestIdleCallback(cb, { timeout: 2000 })
      : (cb) => window.setTimeout(cb, 300);

    const cancel = window.requestIdleCallback
      ? (id) => window.cancelIdleCallback(id)
      : (id) => window.clearTimeout(id);

    const id = schedule(() => preloadAllSpoilers(projects.projects));
    return () => cancel(id);
  }, []);

  const margin = isMobile
    ? { top: 80, right: 60, bottom: 40, left: 80 }
    : { top: 50, right: 30, bottom: 60, left: 30 };

  const minDate = new Date(d3.min(projects.projects, (project) => project.date));

  const domainStart = new Date(minDate.setMonth((minDate.getMonth() - 1) % 12));
  const domainEnd = new Date();

  const dateScale = d3.scaleTime()
    .domain([domainStart, domainEnd])
    .range(isMobile ? 
      [height - margin.bottom, margin.top] :
      [margin.left, width - margin.right]
    );

  const toolScale = d3.scaleLinear()
    .domain([0, toolCategories.length - 1])
    .range(isMobile ?
      [margin.left, width - margin.right] :
      [height - margin.bottom, margin.top + 50]
    );

  const projectsWithJitter = useMemo(
    () =>
      projects.projects.map((project) => ({
        ...project,
        y:
          toolCategories.indexOf(extractToolCategory(project.tool)) +
          (Math.random() - 0.5) * JITTER_WIDTH,
      })),
    [projects.projects],
  );

  const bubbleXScale = isMobile ? toolScale : dateScale;
  const bubbleYScale = isMobile ? dateScale : toolScale;

  const bubbleProps = {
    isMobile,
    bubbleXScale,
    bubbleYScale,
    width,
    hoveredType,
    hoveredProject,
    setHoveredType,
    setHoveredProject,
    setInteractionData,
    setSelectedProject,
  };

  // xAxis for desktop
  const pixelsPerTick = 120;
  const numberOfTicksTarget = Math.floor(width / pixelsPerTick);
  const xTicks = dateScale.ticks(numberOfTicksTarget);
  const formatMonth = d3.timeFormat("%b %Y");

  const xAxis = isMobile ? 
    <MobileAxisTop
      xScale={toolScale}
      xTickLabels={toolCategories}
      xTickValues={toolCategories.map((category, index) => index)}
      margin={margin}
      height={height}
      width={width}
    />
    : <AxisBottom
        xScale={dateScale}
        xTicks={xTicks}
        axisY={height - margin.bottom + 20}
        formatMonth={formatMonth}
        margin={margin}
        width={width}
        height={height}
      />;

  const mobileDateTicks = dateScale.ticks(5);
  const yAxis = isMobile ? 
    <MobileAxisLeft
      dateScale={dateScale}
      mobileDateTicks={mobileDateTicks}
      margin={margin}
      formatMonth={formatMonth}
      height={height}
    />
    : (
    <AxisLeft
      yScale={toolScale}
      yTickLabels={toolCategories}
      yTickValues={toolCategories.map((category, index) => index)}
      margin={margin}
      width={width}
      height={height}
    />
  );

  const projectData = projectsWithJitter;
  const sortedProjects = hoveredProject
    ? [
        ...projectData.filter((project) => project !== hoveredProject),
        hoveredProject,
      ]
    : projectData;
  const legendLabels = Object.keys(typesCategoriesColors);
  const legendHeight = legendLabels.length * fontSize.annotation * 1;
  const legend = (
    <Legend
      x={width - margin.right}
      y={20}
      height={legendHeight}
      labels={legendLabels}
      colors={Object.values(typesCategoriesColors)}
      hoveredType={hoveredType}
      setHoveredType={setHoveredType}
    />
  );

  return (
    <div style={{ position: "relative" }}>
      <svg
        className="app-svg"
        width={width}
        height={height}
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
          style={{ pointerEvents: "none" }}
        />
        {xAxis}
        {yAxis}
        <text
          x={isMobile ? width / 2 : 0}
          y={-30}
          textAnchor={isMobile ? "middle" : "start"}
          fontSize={fontSize.subheader}
          fontWeight="bold"
          fill="#128c65"
        >
          Project exploration{" "}
        </text>
        <text x={isMobile ? width / 2 : 0} y={-10} 
          textAnchor={isMobile ? "middle" : "start"} 
          fontSize={fontSize.annotation} 
          fill="#128c65"
        >
          learn more by clicking on the bubbles!
        </text>

        {sortedProjects.map((project) =>
          projectBubble({ project, ...bubbleProps }),
        )}
        {/* {legend} */}
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
  );
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
