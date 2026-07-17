const spoilerImages = import.meta.glob('./assets/**/*.{png,svg,jpg,jpeg,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const aspectRatioBySpoiler = new Map();
const loadPromises = new Map();

export function getSpoilerUrl(filename) {
  if (!filename) return null;
  const match = Object.entries(spoilerImages).find(([path]) =>
    path.endsWith(`/${filename}`),
  );
  return match?.[1] ?? `/spoilers/${filename}`;
}

export function clampAspectRatio(ratio) {
  const min = 0.7;
  const max = 2.4;
  return Math.min(max, Math.max(min, ratio));
}

export function getSpoilerAspectRatio(spoiler) {
  if (!spoiler) return 16 / 10;
  return aspectRatioBySpoiler.get(spoiler) ?? 16 / 10;
}

function cacheAspectRatio(spoiler, width, height) {
  if (!spoiler || !width || !height) return;
  aspectRatioBySpoiler.set(
    spoiler,
    clampAspectRatio(width / height),
  );
}

export function preloadSpoiler(url, spoiler) {
  if (!url || !spoiler) return Promise.resolve();
  if (aspectRatioBySpoiler.has(spoiler)) return Promise.resolve();
  if (loadPromises.has(spoiler)) return loadPromises.get(spoiler);

  const promise = new Promise((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => {
      cacheAspectRatio(spoiler, img.naturalWidth, img.naturalHeight);
      resolve();
    };
    img.onerror = () => resolve();
    img.src = url;
  });

  loadPromises.set(spoiler, promise);
  return promise;
}

export function preloadAllSpoilers(projects) {
  projects.forEach((project) => {
    const url = getSpoilerUrl(project.spoiler);
    if (url) preloadSpoiler(url, project.spoiler);
  });
}
