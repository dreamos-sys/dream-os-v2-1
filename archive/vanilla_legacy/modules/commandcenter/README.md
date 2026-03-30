# 🏛️ Enterprise Command Center v6.0

## Features

- ✅ 5 Real-time KPI Cards
- ✅ AI Predictive Analytics
- ✅ 5 Tab System (Monitor/Approval/Analytics/Reports/AI)
- ✅ Approval Workflow
- ✅ Chart.js Analytics
- ✅ AI Chat Assistant
- ✅ Bash Report Export
- ✅ Auto-refresh (30s)

## Tables Required

- stok
- permintaan_barang
- janitor_logs
- maintenance
- approval_requests
- audit_logs

## Usage

```javascript
// In your main app
import CommandCenter from './modules/commandcenter/module.js';

// Render
CommandCenter.render({ supabase, user });
CommandCenter.afterRender({ supabase, user });
```

## AI Edge Function

Deploy to Supabase:```bash
supabase functions deploy ai-chat
```

## Report Generation

```bash
./scripts/report.sh
```

---

**Dream OS Team © 2026**
