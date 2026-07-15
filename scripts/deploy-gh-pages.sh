#!/usr/bin/env bash
set -euo pipefail

# ============================================================
# Deploy both React (Docusaurus) and Vue (VitePress) docs
# to GitHub Pages in a single site.
#
# Final structure on gh-pages:
#   /          → React Docusaurus docs
#   /vue/      → Vue VitePress docs
#   /skills/   → Downloadable skill packages
# ============================================================

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
REACT_DIR="$ROOT_DIR/packages/docs/react"
VUE_DIR="$ROOT_DIR/packages/docs/vue"
SKILLS_DIR="$ROOT_DIR/skills"
REACT_BUILD="$REACT_DIR/build"
VUE_BUILD="$VUE_DIR/.vitepress/dist"

echo "📦 Step 1: Packaging skills for download..."

# Create skills zip for React
mkdir -p "$REACT_DIR/static/skills"
(cd "$SKILLS_DIR" && zip -r "$REACT_DIR/static/skills/starbucks-design-react.zip" starbucks-design-react/)
(cd "$SKILLS_DIR" && zip -r "$REACT_DIR/static/skills/starbucks-design-react-preview.zip" starbucks-design-react-preview/)

# Create skills zip for Vue
mkdir -p "$VUE_DIR/public/skills"
(cd "$SKILLS_DIR" && zip -r "$VUE_DIR/public/skills/starbucks-design-vue.zip" starbucks-design-vue/)
(cd "$SKILLS_DIR" && zip -r "$VUE_DIR/public/skills/starbucks-design-vue-preview.zip" starbucks-design-vue-preview/)

echo "✅ Skills packages created"

echo "🔨 Step 2: Building React docs (Docusaurus)..."
pnpm -C "$REACT_DIR" build

echo "🔨 Step 3: Building Vue docs (VitePress)..."
pnpm -C "$VUE_DIR" build

echo "📁 Step 4: Merging Vue docs into React build under /vue/..."
rm -rf "$REACT_BUILD/vue"
cp -r "$VUE_BUILD" "$REACT_BUILD/vue"

echo "✅ Vue docs copied to /vue/"

echo "🚀 Step 5: Deploying to gh-pages..."
npx gh-pages -d "$REACT_BUILD" -m "docs: deploy React + Vue docs to gh-pages [skip ci]"

echo "🎉 Done! Both React and Vue docs deployed to gh-pages."
