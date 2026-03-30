"use client";

import React, { useEffect, useState } from 'react';
import { NeuralCore } from '@/lib/neural-core';

export default function DashboardPage() {  const [battery, setBattery] = useState('--%');
  const [time, setTime] = useState('--:--');
  const [immunity, setImmunity] = useState({ level: 0, count: 0 });

  useEffect(() => {
    // 🧠 Baby Agent: Log dashboard load
    NeuralCore.brain.learn('dashboard_load', { timestamp: Date.now() });
    
    // 🦾 Tiny: Get battery
    NeuralCore.tiny.getBattery().then(bat => {
      if (bat) setBattery(bat.level + '%');
    });

    // ⏰ Live time
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }));
    }, 1000);

    // 🛡️ Load immunity
    const vaccines = JSON.parse(localStorage.getItem('dream_vaccines') || '{}');
    setImmunity({
      level: vaccines.immunityLevel || 0,
      count: vaccines.count || 0
    });

    return () => clearInterval(timer);
  }, []);

  const modules = [
    { id: 'commandcenter', name: 'COMMAND CENTER', icon: '⚡' },
    { id: 'booking', name: 'FORM BOOKING', icon: '📅' },
    { id: 'k3', name: 'K3', icon: '⚠️' },
    { id: 'sekuriti', name: 'SEKURITI', icon: '🛡️' },
    { id: 'janitor-in', name: 'JANITOR INDOOR', icon: '🧹' },
    { id: 'janitor-out', name: 'JANITOR OUTDOOR', icon: '🌳' },
    { id: 'stok', name: 'STOK', icon: '📦' },
    { id: 'maintenance', name: 'MAINTENANCE', icon: '🔧' },
    { id: 'asset', name: 'ASSET', icon: '🏛️' },
    { id: 'gudang', name: 'GUDANG', icon: '🏭' },
    { id: 'profile', name: 'PROFILE', icon: '👤' },
    { id: 'settings', name: 'SETTINGS', icon: '⚙️' }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#F2F2F7', paddingBottom: '100px' }}>
      
      {/* 📊 PRO UTILITY BAR */}      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        padding: '15px 20px', 
        background: '#fff', 
        borderBottom: '0.5px solid #E5E5EA' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/dream/assets/img/icon-512.png" style={{ width: '32px', borderRadius: '8px' }} />
          <span style={{ fontWeight: '700', color: '#1C1C1E' }}>{time}</span>
        </div>
        <div style={{ display: 'flex', gap: '15px', color: '#34C759', fontWeight: '800', fontSize: '13px' }}>
          <span>🌙</span>
          <span>🇮🇩</span>
          <span>{battery}</span>
        </div>
      </div>

      {/* 🕋 SPIRITUAL HEADER */}
      <div style={{ 
        textAlign: 'center', 
        padding: '30px 20px', 
        background: 'linear-gradient(135deg, #064e3b, #059669)',
        borderRadius: '0 0 30px 30px',
        marginBottom: '20px',
        color: 'white'
      }}>
        <img src="/dream/assets/img/icon-512.png" style={{ 
          width: '80px', 
          height: '80px', 
          borderRadius: '18px',
          marginBottom: '15px',
          boxShadow: '0 4px 15px rgba(212,175,55,0.3)'
        }} />
        <h1 style={{ 
          fontSize: '26px', 
          fontFamily: 'serif', 
          margin: '0 0 8px',
          textAlign: 'right',
          direction: 'rtl'
        }}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</h1>
        <h2 style={{ 
          fontSize: '18px', 
          fontFamily: 'serif', 
          margin: '0 0 15px',
          textAlign: 'right',
          direction: 'rtl'
        }}>اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</h2>
        <div style={{ fontSize: '12px', fontWeight: '700', color: '#34C759' }}>
          DREAM OS v2.1 PRO        </div>
      </div>

      {/* 🛡️ IMMUNITY BADGE */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ 
          display: 'inline-block',
          background: 'linear-gradient(135deg, #34C759, #30B350)',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '25px',
          fontSize: '12px',
          fontWeight: '800',
          boxShadow: '0 4px 15px rgba(52,199,89,0.3)'
        }}>
          🛡️ IMMUNITY: {immunity.level}% ({immunity.count} Vaccines)
        </div>
      </div>

      {/* 📱 MODULE GRID */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '15px',
        width: '92%',
        maxWidth: '500px',
        margin: '0 auto',
        padding: '15px'
      }}>
        {modules.map(mod => (
          <div 
            key={mod.id}
            onClick={() => {
              NeuralCore.tiny.vibrate(20);
              NeuralCore.brain.learn('module_open', mod.id);
              window.location.href = `/dream/modules/${mod.id}`;
            }}
            style={{ 
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '20px',
              textAlign: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{ fontSize: '40px', marginBottom: '8px' }}>{mod.icon}</div>            <div style={{ 
              fontSize: '10px', 
              fontWeight: '700', 
              color: '#1C1C1E',
              textTransform: 'uppercase'
            }}>{mod.name}</div>
          </div>
        ))}
      </div>

      {/* 🧭 iOS NAVIGATION DOCK */}
      <nav style={{ 
        position: 'fixed', 
        bottom: '25px', 
        left: '50%', 
        transform: 'translateX(-50%)',
        width: '92%', 
        maxWidth: '420px', 
        height: '75px', 
        background: 'rgba(28,28,30,0.95)', 
        backdropFilter: 'blur(20px)',
        borderRadius: '38px',
        display: 'flex', 
        justifyContent: 'space-around', 
        alignItems: 'center',
        zIndex: 9999,
        boxShadow: '0 20px 45px rgba(0,0,0,0.3)'
      }}>
        <div style={{ textAlign: 'center', flex: 1, cursor: 'pointer' }}>
          <span style={{ fontSize: '24px' }}>🏠</span>
          <p style={{ fontSize: '7px', color: '#34C759', fontWeight: '700', margin: '4px 0 0' }}>HOME</p>
        </div>
        <div style={{ textAlign: 'center', flex: 1, cursor: 'pointer' }}>
          <span style={{ fontSize: '24px' }}>👤</span>
          <p style={{ fontSize: '7px', color: '#8E8E93', fontWeight: '700', margin: '4px 0 0' }}>PROFILE</p>
        </div>
        <div style={{ 
          background: '#34C759',
          width: '60px', 
          height: '60px', 
          borderRadius: '22px', 
          marginTop: '-42px',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          border: '4px solid #F2F2F7',
          fontSize: '28px',
          color: '#fff',
          boxShadow: '0 10px 25px rgba(52,199,89,0.4)',
          cursor: 'pointer'        }}>🔳</div>
        <div style={{ textAlign: 'center', flex: 1, cursor: 'pointer' }}>
          <span style={{ fontSize: '24px' }}>ℹ️</span>
          <p style={{ fontSize: '7px', color: '#8E8E93', fontWeight: '700', margin: '4px 0 0' }}>ABOUT</p>
        </div>
        <div style={{ textAlign: 'center', flex: 1, cursor: 'pointer' }}>
          <span style={{ fontSize: '24px' }}>⚙️</span>
          <p style={{ fontSize: '7px', color: '#8E8E93', fontWeight: '700', margin: '4px 0 0' }}>SETTING</p>
        </div>
      </nav>
    </div>
  );
}
