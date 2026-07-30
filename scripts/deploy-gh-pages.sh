#!/usr/bin/env bash
set -euo pipefail

# Deploy unified Astro docs site (React + Vue) to the internal SCM Pages repository.
# Final structure on gh-pages:
#   /          → unified docs (Astro + Starlight)
#   /skills/   → downloadable skill packages

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SITE_DIR="$ROOT_DIR/packages/docs/site"
DEPLOY_REPO="${DOCS_DEPLOY_REPO:-git@scm.starbucks.com:kning/starbucks-design-main.git}"

echo "🔨 Building unified docs site..."
pnpm -C "$SITE_DIR" build

touch "$SITE_DIR/dist/.nojekyll"

echo "🚀 Deploying to gh-pages..."
npx gh-pages -d "$SITE_DIR/dist" -t -r "$DEPLOY_REPO" -m "docs: deploy unified docs site [skip ci]"

echo "🎉 Done!"
