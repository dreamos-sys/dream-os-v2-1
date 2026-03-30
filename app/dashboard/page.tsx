"use client";

import React, { useEffect, useState } from 'react';
import { NeuralCore } from '@/lib/neural-core';

export default function Dashboard() {
  const [health, setHealth] = useState(100);
  const [activeModules, setActiveModules] = useState(12);

  // 🧪 Logic Imunitas: Jika ada error, kirim 'antibodi'
  useEffect(() => {
    const checkSystem = setInterval(() => {
      // Simulasi Monitoring Saraf
      const randomStress = Math.random() * 5;
      if (randomStress > 4) {
        console.log("🛡️ IMMUNITY SYSTEM: Detecting stress... Sending Antibodies!");
        setHealth(prev => Math.min(prev + 1, 100)); // Auto-healing
      }
    }, 5000);
    return () => clearInterval(checkSystem);
  }, []);

  const modules = [
    { id: 'k3', icon: '👷', name: 'K3 & Safety' },
    { id: 'asset', icon: '📦', name: 'Asset Management' },
    { id: 'security', icon: '🛡️', name: 'Ghost Security' },
    { id: 'warehouse', icon: '🏗️', name: 'Stok Gudang' },
    { id: 'admin', icon: '📋', name: 'Admin ISO' },
    { id: 'report', icon: '📊', name: 'Laporan SPJ' },
    { id: 'approval', icon: '✍️', name: 'Approval System' },
    { id: 'monitoring', icon: '🖥️', name: 'Real-time Mon' },
    { id: 'backup', icon: '💾', name: 'Cloud Backup' }
  ];

  return (
    <div style={{ background: '#F2F2F7', minHeight: '100vh', padding: '20px' }}>
      {/* Header Imun */}
      <div style={{ background: '#064e3b', color: 'white', padding: '20px', borderRadius: '20px', marginBottom: '20px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
        <div style={{ fontSize: '24px', fontFamily: 'serif' }}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>
        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
          <span>Immunity Level: <b>{health}%</b> 🛡️</span>
          <span>Status: <b>Active</b> 🟢</span>
        </div>
      </div>

      {/* Grid 9 Modul Mewah */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
        {modules.map((m) => (
          <div key={m.id} style={{ background: 'white', padding: '20px', borderRadius: '24px', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>{m.icon}</div>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#333' }}>{m.name}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', textAlign: 'center', opacity: 0.5, fontSize: '12px' }}>
        Dream OS v2.1 PRO | The Power Soul of Shalawat
      </div>
    </div>
  );
}
