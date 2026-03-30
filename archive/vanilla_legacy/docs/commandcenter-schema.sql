-- 🏛️ Enterprise Command Center - Supabase Tables

-- Stock Table
CREATE TABLE IF NOT EXISTS stok (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    item_name TEXT NOT NULL,
    category TEXT,
    quantity INTEGER DEFAULT 0,
    unit TEXT DEFAULT 'pcs',
    min_stock INTEGER DEFAULT 5,
    last_update TIMESTAMPTZ DEFAULT NOW()
);

-- Permintaan Barang Table
CREATE TABLE IF NOT EXISTS permintaan_barang (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    nama_peminjam TEXT NOT NULL,
    divisi TEXT,
    no_hp TEXT,
    sarana TEXT,
    tanggal DATE,
    jam_mulai TIME,
    jam_selesai TIME,
    keperluan TEXT,
    peralatan TEXT,
    status TEXT DEFAULT 'pending'
);

-- Janitor Logs Table
CREATE TABLE IF NOT EXISTS janitor_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),    area_name TEXT NOT NULL,
    cleaner_name TEXT NOT NULL,
    task_list JSONB,
    check_time TIMESTAMPTZ DEFAULT NOW(),
    condition TEXT DEFAULT 'clean',
    status TEXT DEFAULT 'active'
);

-- Maintenance Table
CREATE TABLE IF NOT EXISTS maintenance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    asset_id TEXT,
    technician TEXT,
    problem TEXT NOT NULL,
    action_taken TEXT,
    cost DECIMAL(15,2) DEFAULT 0,
    priority TEXT DEFAULT 'medium',
    status TEXT DEFAULT 'pending'
);

-- Approval Requests Table
CREATE TABLE IF NOT EXISTS approval_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    title TEXT,
    description TEXT,
    module_source TEXT,
    ref_id UUID,
    requester TEXT,
    status TEXT DEFAULT 'pending',
    approved_at TIMESTAMPTZ,
    approved_by TEXT
);

-- Audit Logs Table
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    action TEXT,
    detail TEXT,
    user_role TEXT,
    module TEXT,
    created_by TEXT
);

-- Enable RLS
ALTER TABLE stok ENABLE ROW LEVEL SECURITY;
ALTER TABLE permintaan_barang ENABLE ROW LEVEL SECURITY;
ALTER TABLE janitor_logs ENABLE ROW LEVEL SECURITY;ALTER TABLE maintenance ENABLE ROW LEVEL SECURITY;
ALTER TABLE approval_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
