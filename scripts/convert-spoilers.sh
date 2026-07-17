#!/usr/bin/env bash
# Convert PNG spoiler images to WebP (SVG spoilers are left unchanged).
set -euo pipefail

GRAPHS_DIR="$(cd "$(dirname "$0")/../src/assets/graphs" && pwd)"
QUALITY="${WEBP_QUALITY:-85}"

if ! command -v cwebp >/dev/null 2>&1; then
  echo "Error: cwebp not found. Install with: brew install webp" >&2
  exit 1
fi

cd "$GRAPHS_DIR"

for png in *.png; do
  [ -f "$png" ] || continue
  webp="${png%.png}.webp"
  cwebp -q "$QUALITY" "$png" -o "$webp"
  echo "Converted $png -> $webp"
done

echo "Done. Update projects.json spoiler filenames to .webp if needed."
