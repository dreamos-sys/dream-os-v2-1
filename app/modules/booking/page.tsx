"use client";

import React, { useState, useEffect } from 'react';
import { NeuralCore } from '@/lib/neural-core';

export default function BookingModule() {
  const [formData, setFormData] = useState({
    nama: '',
    divisi: '',
    hp: '',
    sarana: '',
    tanggal: '',
    jam_mulai: '',
    jam_selesai: '',
    keperluan: ''  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  useEffect(() => {
    // 🧠 Baby Agent: Log module load
    NeuralCore.brain.learn('module_load', { module: 'booking' });
    
    // Set default date
    setFormData(prev => ({ ...prev, tanggal: new Date().toISOString().split('T')[0] }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult('');

    // 🦾 Tiny: Processing vibration
    NeuralCore.tiny.vibrate(20);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Save to localStorage
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push({
      ...formData,
      id: Date.now(),
      status: 'pending',
      created_at: new Date().toISOString()
    });
    localStorage.setItem('bookings', JSON.stringify(bookings));

    // 🧠 Baby Agent: Learn booking created
    NeuralCore.brain.learn('booking_created', formData);

    // 🦾 Tiny: Success vibration
    NeuralCore.tiny.vibrate([30, 50, 30]);

    setResult('✅ Booking berhasil diajukan! Menunggu approval.');
    setFormData({
      nama: '', divisi: '', hp: '', sarana: '',
      tanggal: new Date().toISOString().split('T')[0],
      jam_mulai: '', jam_selesai: '', keperluan: ''
    });

    setLoading(false);
  };

  return (    <div style={{ padding: '20px', paddingBottom: '100px' }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <button 
          onClick={() => window.history.back()}
          style={{ 
            background: '#1e293b',
            border: '1px solid #475569',
            padding: '8px 16px',
            borderRadius: '12px',
            cursor: 'pointer',
            color: 'white'
          }}
        >
          ← Kembali
        </button>
        <h2 style={{ color: '#34C759', margin: 0 }}>📅 Form Booking Sarana</h2>
      </div>

      {/* Info Box */}
      <div style={{ 
        background: 'rgba(59,130,246,0.1)',
        border: '1px solid rgba(59,130,246,0.3)',
        borderRadius: '12px',
        padding: '1rem',
        marginBottom: '1.5rem'
      }}>
        <h4 style={{ color: '#3b82f6', margin: '0 0 0.5rem' }}>ℹ️ Informasi:</h4>
        <ul style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: '1.8', margin: 0 }}>
          <li>Jam operasional: 07:30 - 16:00 (Senin-Jumat)</li>
          <li>Booking minimal H-1</li>
          <li>Approval required untuk semua booking</li>
        </ul>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ 
        background: 'rgba(15,23,42,0.8)',
        padding: '24px',
        borderRadius: '20px'
      }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '1rem',          marginBottom: '1rem'
        }}>
          <div>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              Nama Pemohon *
            </label>
            <input 
              type="text"
              value={formData.nama}
              onChange={(e) => setFormData({...formData, nama: e.target.value})}
              required
              style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid #475569', borderRadius: '12px', color: 'white' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              Divisi
            </label>
            <input 
              type="text"
              value={formData.divisi}
              onChange={(e) => setFormData({...formData, divisi: e.target.value})}
              style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid #475569', borderRadius: '12px', color: 'white' }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
            No. HP *
          </label>
          <input 
            type="tel"
            value={formData.hp}
            onChange={(e) => setFormData({...formData, hp: e.target.value})}
            required
            style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid #475569', borderRadius: '12px', color: 'white' }}
          />
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '1rem',
          marginBottom: '1rem'
        }}>
          <div>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              Pilih Sarana *
            </label>            <select
              value={formData.sarana}
              onChange={(e) => setFormData({...formData, sarana: e.target.value})}
              required
              style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid #475569', borderRadius: '12px', color: 'white' }}
            >
              <option value="">-- Pilih --</option>
              <option value="Ruang Meeting A">Ruang Meeting A</option>
              <option value="Ruang Meeting B">Ruang Meeting B</option>
              <option value="Aula Utama">Aula Utama</option>
              <option value="Ruang Training">Ruang Training</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              Tanggal *
            </label>
            <input 
              type="date"
              value={formData.tanggal}
              onChange={(e) => setFormData({...formData, tanggal: e.target.value})}
              required
              style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid #475569', borderRadius: '12px', color: 'white' }}
            />
          </div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '1rem',
          marginBottom: '1rem'
        }}>
          <div>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              Jam Mulai *
            </label>
            <input 
              type="time"
              value={formData.jam_mulai}
              onChange={(e) => setFormData({...formData, jam_mulai: e.target.value})}
              required
              style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid #475569', borderRadius: '12px', color: 'white' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              Jam Selesai *
            </label>
            <input               type="time"
              value={formData.jam_selesai}
              onChange={(e) => setFormData({...formData, jam_selesai: e.target.value})}
              required
              style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid #475569', borderRadius: '12px', color: 'white' }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
            Keperluan
          </label>
          <textarea
            value={formData.keperluan}
            onChange={(e) => setFormData({...formData, keperluan: e.target.value})}
            rows={3}
            style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid #475569', borderRadius: '12px', color: 'white', resize: 'vertical' }}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            width: '100%', 
            padding: '16px', 
            background: loading ? '#8E8E93' : 'linear-gradient(135deg, #34C759, #30B350)',
            border: 'none',
            borderRadius: '15px',
            color: 'white',
            fontWeight: '700',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? '⏳ Memproses...' : '📅 Ajukan Booking'}
        </button>

        {result && (
          <div style={{ 
            marginTop: '1rem', 
            textAlign: 'center', 
            color: '#10b981',
            fontWeight: '700'
          }}>{result}</div>
        )}
      </form>
    </div>
  );}
