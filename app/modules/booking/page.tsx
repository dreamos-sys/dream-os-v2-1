"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { store } from '@/lib/data/global-store';

export default function BookingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const booking = {
      id: Date.now(),
      ...formData,
      status: 'pending' as const,
      user: sessionStorage.getItem('dream_user') || 'UNKNOWN',
      timestamp: new Date().toISOString(),
    };
    
    // Save to global store (shared with dashboard)
    store.add('bookings', booking);
    
    alert('✅ Booking Submitted! Data synced to dashboard.');
    router.push('/dashboard');  };

  return (
    <div style={{ minHeight: '100vh', background: '#F2F2F7', padding: '24px' }}>
      <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: '#10b981', fontSize: '16px', cursor: 'pointer', marginBottom: '20px' }}>← Back</button>
      <h1 style={{ color: '#10b981', marginBottom: '24px', fontSize: '24px' }}>📅 Form Booking</h1>
      
      <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: '24px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '13px', color: '#64748b', marginBottom: '8px', fontWeight: '600' }}>Title</label>
          <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required style={{ width: '100%', padding: '14px', borderRadius: '16px', border: '1px solid #e2e8f0', fontSize: '15px' }} />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '13px', color: '#64748b', marginBottom: '8px', fontWeight: '600' }}>Date</label>
          <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} required style={{ width: '100%', padding: '14px', borderRadius: '16px', border: '1px solid #e2e8f0', fontSize: '15px' }} />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '13px', color: '#64748b', marginBottom: '8px', fontWeight: '600' }}>Time</label>
          <input type="time" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} required style={{ width: '100%', padding: '14px', borderRadius: '16px', border: '1px solid #e2e8f0', fontSize: '15px' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '13px', color: '#64748b', marginBottom: '8px', fontWeight: '600' }}>Location</label>
          <select value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} required style={{ width: '100%', padding: '14px', borderRadius: '16px', border: '1px solid #e2e8f0', fontSize: '15px' }}>
            <option value="">Select Location</option>
            <option value="Room A">Room A</option>
            <option value="Room B">Room B</option>
            <option value="R. Serbaguna">R. Serbaguna</option>
            <option value="Lapangan">Lapangan</option>
          </select>
        </div>
        <button type="submit" style={{ width: '100%', background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', padding: '16px', borderRadius: '20px', color: 'white', fontWeight: '700', fontSize: '15px', cursor: 'pointer' }}>Submit Booking</button>
      </form>
    </div>
  );
}
