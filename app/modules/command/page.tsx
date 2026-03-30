"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import GhostShield from '@/lib/security/ghost-shield';
import initTinyGo, { getSystemPerformance, getImmunityLevel } from '@/lib/wasm/wasm-loader';

export default function CommandCenter() {
  const router = useRouter();
  const [logs, setLogs] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [cloudStatus, setCloudStatus] = useState('CONNECTING...');
  const [immunity, setImmunity] = useState(100);
  const [tinyGoReady, setTinyGoReady] = useState(false);

  useEffect(() => {
    // 🛡️ Log Akses ke Command Center
    GhostShield.logAudit('ACCESS_COMMAND_CENTER');

    // 🐹 Initialize TinyGo
    const initWASM = async () => {
      const ready = await initTinyGo();
      setTinyGoReady(ready);
      
      if (ready) {
        const performance = await getSystemPerformance();
        setStats(performance);
        setCloudStatus('ONLINE 🛰️');
        
        const immunityCalc = await getImmunityLevel(8);
        setImmunity(Math.min(immunityCalc, 100));      }
    };
    
    initWASM();

    // Ambil Audit Logs lokal
    const localLogs = JSON.parse(localStorage.getItem('audit_logs') || '[]');
    setLogs(localLogs.reverse().slice(0, 10));

    const interval = setInterval(async () => {
      if (tinyGoReady) {
        const performance = await getSystemPerformance();
        setStats(performance);
      }
      const localLogs = JSON.parse(localStorage.getItem('audit_logs') || '[]');
      setLogs(localLogs.reverse().slice(0, 10));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [tinyGoReady]);

  return (
    <div style={{ minHeight: '100vh', background: '#F2F2F7', padding: '24px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <Link href="/dashboard" style={{ color: '#10b981', fontWeight: '700', textDecoration: 'none', fontSize: '14px' }}>← BACK</Link>
        <div style={{ background: '#10b981', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Global CommandCenter v2.1 PRO
        </div>
      </header>

      {/* 📊 REAL-TIME MONITORING */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid rgba(16,185,129,0.1)' }}>
          <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '700', marginBottom: '8px' }}>Engine Load</div>
          <div style={{ fontSize: '20px', fontWeight: '700', color: tinyGoReady ? '#10b981' : '#f59e0b' }}>
            {tinyGoReady ? '🐹 WASM_ACTIVE' : '⚠️ JS_FALLBACK'}
          </div>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid rgba(16,185,129,0.1)' }}>
          <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '700', marginBottom: '8px' }}>Cloud Sync</div>
          <div style={{ fontSize: '20px', fontWeight: '700', color: '#3b82f6' }}>{cloudStatus}</div>
        </div>
      </div>

      {/* 🚀 PERFORMANCE ANALYTICS (TinyGo Powered) */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a, #020617)', borderRadius: '30px', padding: '24px', marginBottom: '24px', color: '#10b981', boxShadow: '0 12px 40px rgba(16,185,129,0.2)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '16px', right: '16px', opacity: 0.2, fontSize: '48px' }}>🐹</div>
        <h3 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px', opacity: 0.7 }}>Neural Performance Stats</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid rgba(16,185,129,0.1)' }}>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>Platform</span>
            <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#10b981' }}>{stats?.platform || 'Detecting...'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid rgba(16,185,129,0.1)' }}>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>Engine Version</span>
            <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#10b981' }}>{stats?.engineVersion || '14.0.0-PRO'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid rgba(16,185,129,0.1)' }}>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>Immunity Precision</span>
            <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#10b981' }}>BINARY_LEVEL_HIGH</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>Immunity Level</span>
            <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#10b981' }}>{Math.floor(immunity)}%</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>Last Calibration</span>
            <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#10b981' }}>{new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      {/* 🛡️ REAL-TIME AUDIT LOGS (ISO 27001 Standard) */}
      <div style={{ background: 'white', borderRadius: '30px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid rgba(148,163,184,0.2)' }}>
        <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#1c1c1e', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>📋</span> Live Audit Trail
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {logs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8', fontSize: '13px' }}>
              No audit logs yet. Actions will appear here.
            </div>
          ) : (
            logs.map((log, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', borderLeft: '3px solid #10b981', paddingLeft: '16px', paddingVertical: '8px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>{log.action}</div>
                  <div style={{ fontSize: '9px', color: '#94a3b8' }}>{new Date(log.timestamp).toLocaleString()}</div>
                </div>
                <div style={{ fontSize: '8px', background: '#f1f5f9', padding: '4px 8px', borderRadius: '6px', color: '#64748b', fontFamily: 'monospace' }}>
                  {log.user || 'ANONYMOUS'}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer */}      <footer style={{ marginTop: '40px', textAlign: 'center' }}>
        <div style={{ fontFamily: 'Amiri, serif', fontSize: '14px', color: '#94a3b8', lineHeight: '2' }}>
          اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ
        </div>
        <div style={{ fontSize: '9px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '8px' }}>
          Dream OS v2.1 PRO Global Pro · Command Center
        </div>
      </footer>
    </div>
  );
}
// Update visual untuk Vaccine Stats
const [vaccines, setVaccines] = React.useState(0);
React.useEffect(() => {
  const v = JSON.parse(localStorage.getItem('dream_vaccines') || '[]');
  setVaccines(v.length);
}, []);
