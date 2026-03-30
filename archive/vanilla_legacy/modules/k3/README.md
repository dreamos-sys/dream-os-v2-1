# ⚠️ K3 Report Module v2.1

## Features

- ✅ Auto-Routing Engine (Maintenance/Security/Janitor)
- ✅ Priority System (Normal/High/Critical)
- ✅ Photo Upload (5MB max)
- ✅ History Tab with Filters
- ✅ Detail Modal with Admin Actions
- ✅ Audit Logging
- ✅ Offline Support

## Auto-Routing Logic

| Jenis Laporan | Routes To | Notes |
|--------------|-----------|-------|
| Kerusakan | Maintenance | Auto-create task |
| Kehilangan | Security | Auto-create report |
| Kebersihan | Janitor | Auto-detect indoor/outdoor || Critical | Maintenance | Eskalasi otomatis |

## Tables Required

- k3_reports
- maintenance_tasks
- security_reports
- janitor_tasks
- audit_logs

## Usage

```javascript
// In your main app
import K3Module from './modules/k3/module.js';

// Render
K3Module.render({ supabase, user, toast });
K3Module.afterRender({ supabase, user, toast });
```

---

**Dream OS Team © 2026**
