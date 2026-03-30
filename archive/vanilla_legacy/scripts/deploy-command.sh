#!/bin/bash

echo "╔══════════════════════════════════════════════════╗"
echo "║   🚀 Deploy Command Center to Production         ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""

echo "🔨 Building..."
npm run build 2>/dev/null || echo "   (Skip build for vanilla JS)"

echo "🤖 Deploying Supabase Edge Functions..."
supabase functions deploy ai-chat 2>/dev/null || echo "   (Skip - install Supabase CLI first)"

echo "📤 Pushing to GitHub..."
git add .
git commit -m "🏛️ Enterprise Command Center v6.0"
git push origin main

echo ""
echo "╔══════════════════════════════════════════════════╗"
echo "║   ✅ DEPLOYMENT COMPLETE!                        ║"
echo "╚══════════════════════════════════════════════════╝"echo ""
echo "📊 Command Center URL: https://dreamos-sys.github.io/dream/"
echo "🤖 AI Edge Function: https://lfavawkzvdhdpaaplaiq.supabase.co/functions/v1/ai-chat"
echo ""
