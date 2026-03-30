"use client";

import React, { useEffect, useState } from 'react';
import { NeuralCore } from '@/lib/neural-core';
import { useRouter } from 'next/navigation';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export default function AuthGuard({ children, requireAuth = true }: AuthGuardProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    // 🧠 Baby Agent: Log auth check
    NeuralCore.brain.learn('auth_check', { 
      timestamp: Date.now(),
      path: window.location.pathname 
    });

    // Check session
    const session = sessionStorage.getItem('dream_session');
    const user = sessionStorage.getItem('dream_user');

    if (session === 'ACTIVE' && user) {
      setAuthenticated(true);      
      // 🦾 Tiny: Success vibration
      NeuralCore.tiny.vibrate([30, 50, 30]);
    } else {
      if (requireAuth) {
        router.push('/dream/login');
      } else {
        setAuthenticated(true);
      }
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #064e3b, #059669)'
      }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div style={{ 
            width: '50px', 
            height: '50px', 
            border: '5px solid rgba(255,255,255,0.3)',
            borderTopColor: 'white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <div style={{ fontSize: '20px', fontFamily: 'serif', marginBottom: '10px' }}>بِسْمِ اللَّهِ</div>
          <p style={{ fontSize: '14px', opacity: 0.8 }}>Loading Dream OS...</p>
        </div>
      </div>
    );
  }

  if (!authenticated && requireAuth) {
    return null;
  }

  return <>{children}</>;
}
