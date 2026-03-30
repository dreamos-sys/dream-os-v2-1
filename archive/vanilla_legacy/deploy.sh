#!/bin/bash

echo "🚀 Deploying Dream OS to GitHub Pages..."

# Build
npm run build

# Create .nojekyll file
touch out/.nojekyll

# Deploy to gh-pages branch
git add out/
git commit -m "🚀 Deploy to GitHub Pages"
git subtree push --prefix out origin gh-pages

echo "✅ Deployed! Check: https://dreamos-sys.github.io/dream/"
