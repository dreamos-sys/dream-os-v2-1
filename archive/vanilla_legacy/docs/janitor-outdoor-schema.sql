-- 🌿 Janitor Outdoor - Supabase Tables

-- Main Janitor Outdoor Checklist Table
CREATE TABLE IF NOT EXISTS janitor_outdoor (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ,
    tanggal DATE NOT NULL,
    shift TEXT NOT NULL,
    petugas TEXT NOT NULL,
    area TEXT NOT NULL,
    gedung TEXT DEFAULT 'Outdoor',
    lantai TEXT DEFAULT '-',
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

-- Outdoor Plants Monitoring Table
CREATE TABLE IF NOT EXISTS outdoor_plants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),    updated_at TIMESTAMPTZ,
    type TEXT NOT NULL,
    location TEXT NOT NULL,
    condition TEXT DEFAULT 'baik',
    notes TEXT,
    photo_url TEXT,
    last_maintenance TIMESTAMPTZ,
    next_maintenance TIMESTAMPTZ,
    created_by TEXT
);

-- Janitor Outdoor Schedule Table
CREATE TABLE IF NOT EXISTS janitor_outdoor_schedule (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    year INTEGER NOT NULL,
    month INTEGER NOT NULL,
    day INTEGER NOT NULL,
    area TEXT NOT NULL,
    petugas TEXT NOT NULL,
    shifts TEXT[] DEFAULT ARRAY['pagi', 'siang', 'sore'],
    status TEXT DEFAULT 'available',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE janitor_outdoor ENABLE ROW LEVEL SECURITY;
ALTER TABLE outdoor_plants ENABLE ROW LEVEL SECURITY;
ALTER TABLE janitor_outdoor_schedule ENABLE ROW LEVEL SECURITY;

-- Create storage bucket for photos
INSERT INTO storage.buckets (id, name, public) VALUES ('janitor-outdoor-foto', 'janitor-outdoor-foto', true)
ON CONFLICT (id) DO NOTHING;
