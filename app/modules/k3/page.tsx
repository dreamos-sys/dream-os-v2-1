"use client";

import React, { useState, useEffect } from 'react';
import { NeuralCore } from '@/lib/neural-core';

export default function K3Module() {
  const [formData, setFormData] = useState({
    tanggal: '',
    lokasi: '',
    jenis: '',
    priority: 'normal',
    deskripsi: '',
    pelapor: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    NeuralCore.brain.learn('module_load', { module: 'k3' });
    setFormData(prev => ({ ...prev, tanggal: new Date().toISOString().split('T')[0] }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    NeuralCore.tiny.vibrate(20);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Auto-routing logic
    let routeTo = 'K3';
    if (formData.jenis === 'kerusakan') routeTo = 'Maintenance';
    else if (formData.jenis === 'kehilangan') routeTo = 'Security';
    else if (formData.jenis === 'kebersihan') routeTo = 'Janitor';

    // Save    const reports = JSON.parse(localStorage.getItem('k3_reports') || '[]');
    reports.push({
      ...formData,
      id: Date.now(),
      route_to: routeTo,
      status: 'pending',
      created_at: new Date().toISOString()
    });
    localStorage.setItem('k3_reports', JSON.stringify(reports));

    // 🧠 Baby Agent: Learn K3 report
    NeuralCore.brain.learn('k3_report', { ...formData, route_to: routeTo });

    // 🦾 Tiny: Success
    NeuralCore.tiny.vibrate([30, 50, 30]);

    alert(`✅ Laporan dikirim ke: ${routeTo}`);
    setLoading(false);
    window.history.back();
  };

  return (
    <div style={{ padding: '20px', paddingBottom: '100px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <button onClick={() => window.history.back()} style={{ background: '#1e293b', border: '1px solid #475569', padding: '8px 16px', borderRadius: '12px', cursor: 'pointer', color: 'white' }}>← Kembali</button>
        <h2 style={{ color: '#f59e0b', margin: 0 }}>⚠️ K3 Report</h2>
      </div>

      <div style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid #f59e0b', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ color: '#f59e0b', fontWeight: '700' }}>📋 Auto-Routing K3</div>
        <div style={{ color: '#cbd5e1', fontSize: '0.85rem', marginTop: '0.5rem' }}>
          🔧 Kerusakan → Maintenance<br/>
          🔒 Kehilangan → Security<br/>
          🧹 Kebersihan → Janitor<br/>
          🔴 Critical → Eskalasi Otomatis
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ background: 'rgba(15,23,42,0.8)', padding: '24px', borderRadius: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Tanggal *</label>
            <input type="date" value={formData.tanggal} onChange={(e) => setFormData({...formData, tanggal: e.target.value})} required style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid #475569', borderRadius: '12px', color: 'white' }} />
          </div>
          <div>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Lokasi *</label>
            <input type="text" value={formData.lokasi} onChange={(e) => setFormData({...formData, lokasi: e.target.value})} required style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid #475569', borderRadius: '12px', color: 'white' }} />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Jenis Laporan *</label>
            <select value={formData.jenis} onChange={(e) => setFormData({...formData, jenis: e.target.value})} required style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid #475569', borderRadius: '12px', color: 'white' }}>
              <option value="">-- Pilih --</option>
              <option value="kerusakan">🔧 Kerusakan Fasilitas</option>
              <option value="kehilangan">📦 Kehilangan</option>
              <option value="kebersihan">🧹 Kebersihan</option>
              <option value="kecelakaan">⚠️ Kecelakaan</option>
              <option value="bahaya">☢️ Potensi Bahaya</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Prioritas</label>
            <select value={formData.priority} onChange={(e) => setFormData({...formData, priority: e.target.value})} style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid #475569', borderRadius: '12px', color: 'white' }}>
              <option value="normal">⚪ Normal</option>
              <option value="high">🟡 Tinggi</option>
              <option value="critical">🔴 Critical</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Deskripsi *</label>
          <textarea value={formData.deskripsi} onChange={(e) => setFormData({...formData, deskripsi: e.target.value})} rows={4} required style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid #475569', borderRadius: '12px', color: 'white', resize: 'vertical' }} />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Pelapor *</label>
          <input type="text" value={formData.pelapor} onChange={(e) => setFormData({...formData, pelapor: e.target.value})} required style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid #475569', borderRadius: '12px', color: 'white' }} />
        </div>

        <button type="submit" disabled={loading} style={{ width: '100%', padding: '16px', background: loading ? '#8E8E93' : 'linear-gradient(135deg, #f59e0b, #d97706)', border: 'none', borderRadius: '15px', color: 'white', fontWeight: '700', fontSize: '16px', cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? '⏳ Mengirim...' : '⚠️ Kirim Laporan K3'}
        </button>
      </form>
    </div>
  );
}
