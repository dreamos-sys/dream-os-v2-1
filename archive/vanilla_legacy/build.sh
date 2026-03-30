#!/bin/bash

echo "🔨 Building Dream OS..."

# Install if needed
if [ ! -d "node_modules" ]; then
  npm install
fi

# Build
npm run build

echo "✅ Build complete! Check out/ folder"
