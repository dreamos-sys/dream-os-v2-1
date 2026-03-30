-- 🧹 Janitor Indoor - Supabase Tables

-- Main Janitor Indoor Checklist Table
CREATE TABLE IF NOT EXISTS janitor_indoor (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ,
    tanggal DATE NOT NULL,
    shift TEXT NOT NULL,
    petugas TEXT NOT NULL,
    area TEXT NOT NULL,
    gedung TEXT,    lantai TEXT,
    items JSONB DEFAULT '{}',
    catatan TEXT,
    damage_notes TEXT,
    foto_sebelum_url TEXT,
    foto_sesudah_url TEXT,
    status TEXT DEFAULT 'pending',
    verified_by TEXT,
    verified_at TIMESTAMPTZ,
    created_by TEXT
);

-- Janitor Schedule Table
CREATE TABLE IF NOT EXISTS janitor_schedule (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    year INTEGER NOT NULL,
    month INTEGER NOT NULL,
    day INTEGER NOT NULL,
    gedung TEXT NOT NULL,
    petugas TEXT NOT NULL,
    shifts TEXT[] DEFAULT ARRAY['pagi', 'siang', 'sore'],
    status TEXT DEFAULT 'available',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE janitor_indoor ENABLE ROW LEVEL SECURITY;
ALTER TABLE janitor_schedule ENABLE ROW LEVEL SECURITY;

-- Create storage bucket for photos
INSERT INTO storage.buckets (id, name, public) VALUES ('janitor-indoor-foto', 'janitor-indoor-foto', true)
ON CONFLICT (id) DO NOTHING;
