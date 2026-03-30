# 🏛️ Command Center - Quick Start Guide

## 1. Install Module

The module is already saved at: `modules/commandcenter/module.js`

## 2. Setup Supabase Tables

Run the schema in `docs/commandcenter-schema.sql`

## 3. Deploy AI Edge Function

```bash
cd supabase/functions/ai-chat
supabase functions deploy ai-chat
```

## 4. Test Locally

```bash
npm run dev
# Open: http://localhost:3000/dream/
# Click: Command Center module
```

## 5. Deploy to Production
```bash
./scripts/deploy-command.sh
```

## 6. Generate Reports

```bash
./scripts/report.sh
```

## 7. Test AI Assistant

1. Open Command Center
2. Click "AI Assistant" tab
3. Ask: "How's our stock level?"
4. Get AI response!

---

**Dream OS Team © 2026**
