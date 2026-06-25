/**
 * Typography theme — single source of truth for fonts, sizes, and weights.
 * CSS consumes values via applyTypographyTheme() (called from main.jsx).
 * SVG/chart components import fontType, fontSize, and fontWeight directly.
 */
export const fontSize = {
  axis: 11,
  annotation: 14,
  body: 16,
  subheader: 20,
  header: 28,
}

export const fontWeight = {
  annotation: 400,
  body: 400,
  subheader: 600,
  header: 600,
}

export const fontType = {
  main: 'Offside, sans-serif',
  monospace: '"Noto Sans Mono", monospace',
}

export const fontFamilyVar = {
  main: '--font-family-main',
  monospace: '--font-family-monospace',
}

const fontSizeVar = {
  axis: '--font-size-axis',
  annotation: '--font-size-annotation',
  body: '--font-size-body',
  subheader: '--font-size-subheader',
  header: '--font-size-header',
}

/** Apply theme tokens as CSS custom properties on :root */
export function applyTypographyTheme() {
  const root = document.documentElement

  root.style.setProperty(fontFamilyVar.main, fontType.main)
  root.style.setProperty(fontFamilyVar.monospace, fontType.monospace)

  for (const [key, value] of Object.entries(fontSize)) {
    root.style.setProperty(fontSizeVar[key], `${value}px`)
  }
}

export function fontSizePx(key) {
  return `${fontSize[key]}px`
}
