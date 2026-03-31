"use client";

import Link from 'next/link';
import { useEffect } from 'react';
import { NeuralCore } from '@/lib/neural-core';

export default function NotFound() {
  useEffect(() => {
    // 🧠 Baby Agent: Catat kalau ada yang "Nyasar"
    NeuralCore.brain.learn('404_error', { path: window.location.pathname });
    // 🦾 Tiny: Getar peringatan
    NeuralCore.tiny.vibrate([100, 50, 100]);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #064e3b, #059669)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', textAlign: 'center', padding: '20px' }}>
      
      <div style={{ fontSize: '80px', marginBottom: '10px' }}>⚠️</div>
      <div style={{ fontSize: '32px', fontFamily: 'var(--font-amiri)', marginBottom: '10px' }}>بِسْمِ اللَّهِ</div>
      <h1 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 10px' }}>404 - JALUR TIDAK DITEMUKAN</h1>
      <p style={{ fontSize: '14px', opacity: 0.8, maxWidth: '280px', marginBottom: '30px' }}>
        Maaf Master M, saraf sistem tidak menemukan koordinat ini. Kembali ke jalan yang benar (Dashboard).
      </p>

      <Link href="/" style={{ background: '#fff', color: '#064e3b', padding: '15px 40px', borderRadius: '30px', fontWeight: '800', textDecoration: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', transition: '0.3s' }}>
        🏠 KEMBALI KE DASHBOARD
      </Link>

      <div style={{ marginTop: '40px', fontSize: '10px', opacity: 0.6 }}>
        DREAM OS v2.1 PRO | Neural Guard Active
      </div>
    </div>
  );
}
