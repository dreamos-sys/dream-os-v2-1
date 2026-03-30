"use client";

import React, { useState } from 'react';import { useRouter } from 'next/navigation';
import { authenticateUser } from '@/lib/auth/credentials';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const user = authenticateUser(username, password);
    
    if (user) {
      sessionStorage.setItem('dream_session', 'ACTIVE');
      sessionStorage.setItem('dream_user', user.role.toUpperCase());
      sessionStorage.setItem('dream_access', user.access);
      router.push('/dashboard');
    } else {
      setError('⚠️ ACCESS DENIED - Check credentials!');
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #F2F2F7 0%, #ffffff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: 'white', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '36px', padding: '45px 35px', width: '100%', maxWidth: '380px', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <img src="/assets/img/icon-192.png" alt="Dream OS" style={{ width: '90px', height: '90px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.15)', marginBottom: '20px' }} />
          <div style={{ fontFamily: 'Amiri, serif', fontSize: '36px', color: '#10b981', marginBottom: '10px', textAlign: 'center' }}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>
          <div style={{ fontFamily: 'Amiri, serif', fontSize: '16px', color: 'rgba(16,185,129,0.8)', textAlign: 'center', marginBottom: '5px' }}>اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</div>
          <div style={{ fontSize: '10px', color: '#8e8e93', letterSpacing: '2px', textTransform: 'uppercase', textAlign: 'center' }}>Kekuatan Jiwa Shalawat</div>
        </div>
        
        <div style={{ fontSize: '13px', color: '#10b981', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '25px', textAlign: 'center', fontWeight: '700' }}>🔐 Authorize Access</div>
        
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '16px' }}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}              disabled={loading}
              className="ios-input"
              style={{ width: '100%' }}
            />
          </div>
          
          <div style={{ marginBottom: '20px', position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="ios-input"
              style={{ width: '100%', paddingRight: '50px' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={loading}
              style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          
          <button type="submit" disabled={loading} className="ios-btn" style={{ width: '100%', marginBottom: '15px' }}>
            {loading ? '⏳ Authenticating...' : '🔓 UNLOCK SYSTEM'}
          </button>
          
          {error && (
            <div style={{ color: '#ef4444', fontSize: '12px', textAlign: 'center', padding: '14px', background: 'rgba(239,68,68,0.1)', borderRadius: '16px', border: '1px solid rgba(239,68,68,0.2)', marginBottom: '15px' }}>
              {error}
            </div>
          )}
          
          <button
            type="button"
            onClick={() => router.push('/')}
            disabled={loading}
            style={{ width: '100%', background: 'transparent', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', padding: '16px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
          >
            ← Back
          </button>
        </form>
        
        <div style={{ marginTop: '25px', textAlign: 'center', padding: '15px', background: '#f8f8fa', borderRadius: '16px' }}>
          <p style={{ fontSize: '11px', color: '#8e8e93', marginBottom: '8px' }}>💡 Ghost Stealth Mode</p>
          <p style={{ fontSize: '10px', color: '#8e8e93' }}>Password: dreamos2026+(prayer rakaat)</p>
        </div>      </div>
    </div>
  );
}
