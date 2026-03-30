"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { NeuralCore } from '@/lib/neural-core';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [ghostTaps, setGhostTaps] = useState(0);
  const router = useRouter();

  // CREDENTIALS (Encrypted in production)
  const CREDENTIALS: Record<string, string> = {
    'developer': 'b15m1ll4h_012443410',
    'master': 'Mr.M_Architect_2025',
    'admin': '4dm1n_AF6969@00',
    'sekuriti': 'LHPSsec_AF2025',
    'janitor': 'CHCS_AF_@003',
    'stok': 'SACS_AF@004',
    'maintenance': 'M41n_4F@234',
    'asset': '4553Tumum_AF@1112',
    'gudang': '4dm1n_9696@02',
    'booking': 'user_@1234',
    'k3': 'user_@2345'
  };

  useEffect(() => {
    // 🧠 Baby Agent: Log page load
    NeuralCore.brain.learn('login_page_load', { timestamp: Date.now() });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // 🦾 Tiny: Processing vibration
    NeuralCore.tiny.vibrate(20);

    const userLower = username.toLowerCase().trim();
    const expectedPass = CREDENTIALS[userLower];

    // 🛡️ Ghost Security: Check password
    const ghostVerify = NeuralCore.ghost.verify(password);
    
    if ((expectedPass && expectedPass === password) || ghostVerify) {
      // Success
      sessionStorage.setItem('dream_session', 'ACTIVE');
      sessionStorage.setItem('dream_user', userLower.toUpperCase());

      // 🧠 Baby Agent: Learn successful login
      NeuralCore.brain.learn('login_success', { 
        user: userLower,
        method: ghostVerify ? 'ghost' : 'standard',
        timestamp: Date.now()
      });

      // 🦾 Tiny: Success vibration
      NeuralCore.tiny.vibrate([30, 50, 30]);

      // Show Ghost mode message if used
      if (ghostVerify) {
        alert('👻 GHOST MODE ACTIVATED\n\nWelcome, Architect!');
      }

      router.push('/dream/');
    } else {
      // Failed
      setError('⚠️ ACCESS DENIED');
      
      // 🧠 Baby Agent: Log failed attempt
      NeuralCore.brain.learn('login_failed', { 
        user: userLower,
        timestamp: Date.now()
      });

      // 🦾 Tiny: Error vibration
      NeuralCore.tiny.vibrate([100, 50, 100]);
    }

    setLoading(false);
  };

  // Ghost Mode: Tap logo 5 times
  const handleLogoTap = () => {
    const now = Date.now();    const newTaps = ghostTaps + 1;
    setGhostTaps(newTaps);

    setTimeout(() => setGhostTaps(0), 3000);

    if (newTaps === 5) {
      const pwd = prompt('👻 GHOST MODE\n\nEnter Password:');
      if (pwd && NeuralCore.ghost.verify(pwd)) {
        sessionStorage.setItem('dream_session', 'ACTIVE');
        sessionStorage.setItem('dream_user', 'GHOST_ARCHITECT');
        NeuralCore.brain.learn('ghost_login', { timestamp: Date.now() });
        NeuralCore.tiny.vibrate([30, 50, 30, 50, 30]);
        alert('👻 GHOST MODE ACTIVATED\n\nPrayer-based authentication successful!');
        router.push('/dream/');
      } else {
        alert('❌ WRONG PASSWORD\n\nTry prayer-based password based on current time.');
      }
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #064e3b, #059669)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{ 
        background: '#FFFFFF',
        padding: '40px 30px',
        borderRadius: '28px',
        boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
        textAlign: 'center',
        maxWidth: '360px',
        width: '100%'
      }}>
        {/* Logo with Ghost Tap */}
        <img 
          src="/dream/assets/img/icon-512.png" 
          alt="Dream OS" 
          onClick={handleLogoTap}
          style={{ 
            width: '80px', 
            height: '80px', 
            margin: '0 auto 15px',
            borderRadius: '18px',
            boxShadow: '0 4px 15px rgba(212,175,55,0.3)',
            cursor: 'pointer'          }} 
        />
        
        {/* Bismillah */}
        <div style={{ 
          fontSize: '24px', 
          color: '#064e3b', 
          fontFamily: 'serif', 
          marginBottom: '10px' 
        }}>بِسْمِ اللَّهِ</div>
        
        {/* App Name */}
        <div style={{ 
          fontSize: '12px', 
          color: '#34C759', 
          fontWeight: '800', 
          letterSpacing: '2px',
          marginBottom: '25px'
        }}>DREAM OS v2.1 PRO</div>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '15px' }}>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username" 
              required
              style={{ 
                width: '100%', 
                padding: '14px', 
                border: '1px solid #E5E5EA',
                borderRadius: '12px', 
                background: '#F2F2F7',
                fontSize: '14px',
                outline: 'none'
              }} 
            />
          </div>
          
          <div style={{ marginBottom: '20px', position: 'relative' }}>
            <input 
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password" 
              required
              style={{ 
                width: '100%',                 padding: '14px 45px 14px 14px', 
                border: '1px solid #E5E5EA',
                borderRadius: '12px', 
                background: '#F2F2F7',
                fontSize: '14px',
                outline: 'none'
              }} 
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ 
                position: 'absolute',
                right: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '18px',
                color: '#8E8E93'
              }}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '16px', 
              background: loading ? '#8E8E93' : '#34C759',
              color: '#fff', 
              border: 'none', 
              borderRadius: '15px', 
              fontWeight: 'bold',
              fontSize: '14px',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 10px 20px rgba(52,199,89,0.3)',
              transition: 'all 0.3s'
            }}
          >
            {loading ? '⏳ Authenticating...' : '🔐 LOGIN'}
          </button>

          {error && (
            <div style={{ 
              color: '#FF3B30',               fontSize: '11px', 
              marginTop: '15px' 
            }}>{error}</div>
          )}
        </form>

        {/* Ghost Mode Hint */}
        <div style={{ 
          marginTop: '20px', 
          padding: '12px', 
          background: 'rgba(139,92,246,0.1)',
          borderRadius: '12px',
          fontSize: '10px',
          color: '#8B5CF6'
        }}>
          👻 Tap logo 5x for Ghost Mode
        </div>
      </div>
    </div>
  );
}
