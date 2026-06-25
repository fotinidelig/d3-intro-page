import { useEffect, useState } from 'react';
import { typesCategoriesColors } from './assets/categories';
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

function clampAspectRatio(ratio) {
  const min = 0.7;
  const max = 2.4;
  return Math.min(max, Math.max(min, ratio));
}

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
      className="project-card-backdrop"
      onClick={onClose}
      role="presentation"
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

          <p className="project-card__description">{project.description}</p>

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
    </div>
  );
}

export default ProjectCard;
