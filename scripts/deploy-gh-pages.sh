#!/usr/bin/env bash
set -euo pipefail

# Deploy unified Astro docs site (React + Vue) to a GitHub Pages repository.
# Final structure on gh-pages:
#   /          → unified docs (Astro + Starlight)
#   /skills/   → downloadable skill packages
#
# The internal deployment keeps the default base path. For the personal Pages
# repository, pass DOCS_SITE_URL and DOCS_BASE_PATH explicitly, for example:
#   DOCS_SITE_URL=https://nink1992.github.io \
#   DOCS_BASE_PATH=/Starbucks-Design-main \
#   PUBLIC_DOCS_REPOSITORY_URL=https://github.com/Nink1992/Starbucks-Design-main \
#   DOCS_DEPLOY_REPO=https://github.com/Nink1992/Starbucks-Design-main.git \
#   bash scripts/deploy-gh-pages.sh

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SITE_DIR="$ROOT_DIR/packages/docs/site"
DEPLOY_REPO="${DOCS_DEPLOY_REPO:-git@scm.starbucks.com:kning/starbucks-design-main.git}"

echo "🔨 Building unified docs site..."
echo "   site: ${DOCS_SITE_URL:-https://pages.scm.starbucks.com}"
echo "   base: ${DOCS_BASE_PATH:-/kning/starbucks-design-main/}"
pnpm -C "$SITE_DIR" build

touch "$SITE_DIR/dist/.nojekyll"

echo "🚀 Deploying to gh-pages..."
npx gh-pages -d "$SITE_DIR/dist" -t -r "$DEPLOY_REPO" -m "docs: deploy unified docs site [skip ci]"

echo "🎉 Done!"
