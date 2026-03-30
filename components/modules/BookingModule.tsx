"use client";

import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useGirangati } from '@/context/GirangatiContext';

export default function BookingModule() {
  const [form, setForm] = useState({
    pic_name: '',
    facility_name: '',
    start_time: '',
    end_time: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const supabase = createClient();
  const { vibrate, emit } = useGirangati();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([{
          ...form,
          user_id: localStorage.getItem('dream_user') || 'GUEST',
          status: 'PENDING'
        }]);

      if (error) throw error;

      vibrate([30, 20, 30]);
      emit('BOOKING_CREATED', data);
      setMessage('✅ Booking submitted successfully!');
      setForm({ pic_name: '', facility_name: '', start_time: '', end_time: '', description: '' });
    } catch (error: any) {
      vibrate([100, 50, 100]);      setMessage('❌ Error: ' + error.message);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#34C759', fontSize: '20px', marginBottom: '20px' }}>📅 Form Booking</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="text"
          placeholder="PIC Name"
          value={form.pic_name}
          onChange={(e) => setForm({ ...form, pic_name: e.target.value })}
          required
          style={{ padding: '14px', borderRadius: '12px', border: '1px solid #E5E5EA', background: '#F2F2F7' }}
        />
        <select
          value={form.facility_name}
          onChange={(e) => setForm({ ...form, facility_name: e.target.value })}
          required
          style={{ padding: '14px', borderRadius: '12px', border: '1px solid #E5E5EA', background: '#F2F2F7' }}
        >
          <option value="">Select Facility</option>
          <option value="Ruang Meeting A">Ruang Meeting A</option>
          <option value="Ruang Meeting B">Ruang Meeting B</option>
          <option value="Aula Utama">Aula Utama</option>
          <option value="Ruang Training">Ruang Training</option>
        </select>
        <input
          type="datetime-local"
          value={form.start_time}
          onChange={(e) => setForm({ ...form, start_time: e.target.value })}
          required
          style={{ padding: '14px', borderRadius: '12px', border: '1px solid #E5E5EA', background: '#F2F2F7' }}
        />
        <input
          type="datetime-local"
          value={form.end_time}
          onChange={(e) => setForm({ ...form, end_time: e.target.value })}
          required
          style={{ padding: '14px', borderRadius: '12px', border: '1px solid #E5E5EA', background: '#F2F2F7' }}
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={4}
          style={{ padding: '14px', borderRadius: '12px', border: '1px solid #E5E5EA', background: '#F2F2F7' }}        />
        <button
          type="submit"
          disabled={loading}
          style={{ padding: '16px', background: loading ? '#8E8E93' : '#34C759', color: '#fff', border: 'none', borderRadius: '15px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? '⏳ Submitting...' : '📅 Submit Booking'}
        </button>
        {message && <div style={{ padding: '12px', borderRadius: '12px', background: message.includes('✅') ? 'rgba(52,199,89,0.1)' : 'rgba(255,59,48,0.1)', color: message.includes('✅') ? '#34C759' : '#FF3B30' }}>{message}</div>}
      </form>
    </div>
  );
}
