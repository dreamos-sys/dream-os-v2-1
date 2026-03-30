"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { store } from '@/lib/data/global-store';

export default function K3Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({    type: '',
    location: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const report = {
      id: Date.now(),
      ...formData,
      status: 'pending' as const,
      timestamp: new Date().toISOString(),
      assignedTo: 'maintenance',
    };
    
    // Save to global store (shared with dashboard)
    store.add('k3Reports', report);
    
    alert('✅ K3 Report Submitted! Progress tracked in dashboard.');
    router.push('/dashboard');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F2F2F7', padding: '24px' }}>
      <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: '#10b981', fontSize: '16px', cursor: 'pointer', marginBottom: '20px' }}>← Back</button>
      <h1 style={{ color: '#f59e0b', marginBottom: '24px', fontSize: '24px' }}>⚠️ K3 & Safety Report</h1>
      
      <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: '24px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '13px', color: '#64748b', marginBottom: '8px', fontWeight: '600' }}>Incident Type</label>
          <input type="text" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} required placeholder="e.g., Slip Hazard, Equipment Failure" style={{ width: '100%', padding: '14px', borderRadius: '16px', border: '1px solid #e2e8f0', fontSize: '15px' }} />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '13px', color: '#64748b', marginBottom: '8px', fontWeight: '600' }}>Location</label>
          <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} required placeholder="e.g., Warehouse, Lobby" style={{ width: '100%', padding: '14px', borderRadius: '16px', border: '1px solid #e2e8f0', fontSize: '15px' }} />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '13px', color: '#64748b', marginBottom: '8px', fontWeight: '600' }}>Priority</label>
          <select value={formData.priority} onChange={(e) => setFormData({...formData, priority: e.target.value as any})} style={{ width: '100%', padding: '14px', borderRadius: '16px', border: '1px solid #e2e8f0', fontSize: '15px' }}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '13px', color: '#64748b', marginBottom: '8px', fontWeight: '600' }}>Description</label>
          <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required rows={4} style={{ width: '100%', padding: '14px', borderRadius: '16px', border: '1px solid #e2e8f0', fontSize: '15px' }} />
        </div>
        <button type="submit" style={{ width: '100%', background: 'linear-gradient(135deg, #f59e0b, #d97706)', border: 'none', padding: '16px', borderRadius: '20px', color: 'white', fontWeight: '700', fontSize: '15px', cursor: 'pointer' }}>Submit K3 Report</button>      </form>
    </div>
  );
}
