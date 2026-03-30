-- ⚠️ K3 Reports - Supabase Tables

-- Main K3 Reports Table
CREATE TABLE IF NOT EXISTS k3_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),    updated_at TIMESTAMPTZ,
    tanggal DATE NOT NULL,
    lokasi TEXT NOT NULL,
    jenis_laporan TEXT NOT NULL,
    deskripsi TEXT NOT NULL,
    pelapor TEXT NOT NULL,
    priority TEXT DEFAULT 'normal',
    status TEXT DEFAULT 'pending',
    foto_url TEXT[],
    route_refs JSONB DEFAULT '[]',
    created_by TEXT,
    verified_by TEXT,
    verified_at TIMESTAMPTZ
);

-- Maintenance Tasks (for auto-routing)
CREATE TABLE IF NOT EXISTS maintenance_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    judul TEXT NOT NULL,
    deskripsi TEXT,
    lokasi TEXT,
    priority TEXT DEFAULT 'normal',
    status TEXT DEFAULT 'pending',
    source TEXT,
    k3_ref_id TEXT,
    assigned_to TEXT,
    created_by TEXT
);

-- Security Reports (for auto-routing)
CREATE TABLE IF NOT EXISTS security_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    judul TEXT NOT NULL,
    deskripsi TEXT,
    lokasi TEXT,
    priority TEXT DEFAULT 'normal',
    status TEXT DEFAULT 'pending',
    source TEXT,
    k3_ref_id TEXT,
    dilaporkan_oleh TEXT,
    tanggal DATE
);

-- Janitor Tasks (for auto-routing)
CREATE TABLE IF NOT EXISTS janitor_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    judul TEXT NOT NULL,    deskripsi TEXT,
    lokasi TEXT,
    area_type TEXT DEFAULT 'indoor',
    priority TEXT DEFAULT 'normal',
    status TEXT DEFAULT 'pending',
    source TEXT,
    k3_ref_id TEXT,
    assigned_to TEXT,
    created_by TEXT
);

-- Enable RLS
ALTER TABLE k3_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE janitor_tasks ENABLE ROW LEVEL SECURITY;

-- Create storage bucket for photos
INSERT INTO storage.buckets (id, name, public) VALUES ('k3-foto', 'k3-foto', true)
ON CONFLICT (id) DO NOTHING;
