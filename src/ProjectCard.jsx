import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "motion/react";

import { twMerge } from "tailwind-merge";

import { useEffect, useState } from 'react';
import { typesCategoriesColors, categoryColorGradients } from './assets/categories';
import './ProjectCard.css';

const spoilerImages = import.meta.glob('./assets/**/*.{png,svg,jpg,jpeg,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
});

export function getSpoilerUrl(filename) {
  if (!filename) return null;
  const match = Object.entries(spoilerImages).find(([path]) =>
    path.endsWith(`/${filename}`),
  );
  return match?.[1] ?? `/spoilers/${filename}`;
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return Number.isNaN(date.getTime())
    ? dateStr
    : date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short'
      });
}

function LinkRow({ label, href }) {
  if (!href) return null;
  return (
    <a
      className="project-card__link"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
    </a>
  );
}

const INLINE_LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

function ProjectDescription({ text }) {
  if (!text) return null;

  const parts = [];
  let lastIndex = 0;

  for (const match of text.matchAll(INLINE_LINK)) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <a
        key={match.index}
        className="project-card__description-link"
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
      >
        {match[1]}
      </a>,
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <p className="project-card__description">{parts}</p>;
}

function clampAspectRatio(ratio) {
  const min = 0.7;
  const max = 2.4;
  return Math.min(max, Math.max(min, ratio));
}

const AIGradientBorder = ({
  children,
  className,
  category,
  borderWidth = 3,
  duration = 8,
}) => {
  const turn = useMotionValue(0);

  useEffect(() => {
    animate(turn, 1, {
      ease: "linear",
      duration,
      repeat: Infinity,
    });
  }, [duration, turn]);

  const [black, dark, primary, light, white] =
    categoryColorGradients[category] ??
    ['#000000', '#49416d', '#9182da', '#c2abde', '#F2D4E1'];

  // Symmetrical stops in ascending order — peaks at white, fades to transparent
  const gradient = useMotionTemplate`conic-gradient(from ${turn}turn,
    transparent 0%,
    ${black} 6%,
    ${dark} 16%,
    ${primary} 28%,
    ${light} 38%,
    ${white} 45%,
    ${light} 52%,
    ${primary} 58%,
    ${dark} 66%,
    ${black} 74%,
    transparent 82%,
    transparent 100%)`;

  return (
    <div
      className={twMerge("relative", className)}
      style={{ padding: borderWidth }}
    >
      <motion.div
        style={{ backgroundImage: gradient }}
        className="absolute inset-0 rounded-[inherit]"
      />

      <div className="relative rounded-[inherit] overflow-hidden">
        <div className="relative">{children}</div>

        <motion.div
          style={{ backgroundImage: gradient }}
          className="ai-glow-spill-mask opacity-70 blur-2xl pointer-events-none absolute inset-[-60%] z-10 overflow-hidden"
        ></motion.div>
      </div>
    </div>
  );
};

export function ProjectCard({ project, onClose }) {
  const [aspectRatio, setAspectRatio] = useState(16 / 10);

  useEffect(() => {
    if (!project) return;
    setAspectRatio(16 / 10);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const accent = typesCategoriesColors[project.category] ?? '#128c65';
  const spoilerUrl = getSpoilerUrl(project.spoiler);

  return (
    <div
      key={project.id}
      className="project-card-backdrop"
      onClick={onClose}
      role="presentation"
    >    
    <AIGradientBorder
      category={project.category}
      borderWidth={5}
      className="mx-auto w-full max-w-lg rounded-4xl"
    >
      <article
        className="project-card"
        style={{ '--project-accent': accent }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-card-title"
      >
        <button
          type="button"
          className="project-card__close"
          onClick={onClose}
          aria-label="Close project card"
        >
          ×
        </button>

        <div
          className="project-card__media"
          style={{ '--spoiler-aspect-ratio': aspectRatio }}
        >
          {spoilerUrl ? (
            <img
              src={spoilerUrl}
              alt={`Preview of ${project.name}`}
              className="project-card__image"
              onLoad={(e) => {
                const { naturalWidth, naturalHeight } = e.currentTarget;
                if (naturalWidth && naturalHeight) {
                  setAspectRatio(clampAspectRatio(naturalWidth / naturalHeight));
                }
              }}
            />
          ) : (
            <div className="project-card__image-placeholder">No preview</div>
          )}
        </div>

        <div className="project-card__body">
          <h2 id="project-card-title" className="project-card__title">
            {project.name}
          </h2>
          <hr className="project-card__rule" />

          <ProjectDescription text={project.description} />

          <dl className="project-card__meta">
            <div className="project-card__meta-row">
              <dt>Date</dt>
              <dd>{formatDate(project.date)}</dd>
            </div>
            <div className="project-card__meta-row">
              <dt>Tool</dt>
              <dd>{project.tool}</dd>
            </div>
            <div className="project-card__meta-row">
              <dt>Category</dt>
              <dd style={{ color: accent }}>{project.category}</dd>
            </div>
          </dl>

          <div className="project-card__links">
            <LinkRow label="Demo" href={project.demo} />
            <LinkRow label="Code" href={project.code} />
            <LinkRow label="Data" href={project.data} />
          </div>
        </div>
      </article>
      </AIGradientBorder>
    </div>
  );
}

export default ProjectCard;
