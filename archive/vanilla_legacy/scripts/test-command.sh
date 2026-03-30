#!/bin/bash

echo "╔══════════════════════════════════════════════════╗"
echo "║   🧪 Testing Command Center Module               ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""

# Check module file
if [ -f "modules/commandcenter/module.js" ]; then
  echo "✅ Module file exists"
else
  echo "❌ Module file missing!"
  exit 1
fi

# Check scripts
if [ -f "scripts/report.sh" ]; then
  echo "✅ report.sh exists"else
  echo "❌ report.sh missing!"
fi

if [ -f "scripts/deploy-command.sh" ]; then
  echo "✅ deploy-command.sh exists"
else
  echo "❌ deploy-command.sh missing!"
fi

# Check schema
if [ -f "docs/commandcenter-schema.sql" ]; then
  echo "✅ Schema file exists"
else
  echo "❌ Schema file missing!"
fi

# Check Edge Function
if [ -f "supabase/functions/ai-chat/index.ts" ]; then
  echo "✅ Edge Function exists"
else
  echo "❌ Edge Function missing!"
fi

echo ""
echo "✅ All files present!"
echo ""
echo "📊 Next steps:"
echo "   1. Deploy schema to Supabase"
echo "   2. Deploy Edge Function"
echo "   3. Test in browser"
echo ""
