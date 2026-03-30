"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface GirangatiState {
  tiny: { status: string; battery: number | null; network: string };
  babyAgent: { status: string; intelligence: string; context: Record<string, any> };
  brain: { status: string };
  status: string;
}

interface GirangatiContextType {
  state: GirangatiState;
  vibrate: (pattern: number[]) => void;
  learn: (input: string, output: string) => void;
  emit: (signal: string, data: any) => void;
}

const GirangatiContext = createContext<GirangatiContextType | undefined>(undefined);

export function GirangatiProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GirangatiState>({
    tiny: { status: 'INITIALIZING', battery: null, network: 'ONLINE' },
    babyAgent: { status: 'INITIALIZING', intelligence: 'SUPER_AGENT', context: {} },
    brain: { status: 'INITIALIZING' },
    status: 'INITIALIZING'
  });

  useEffect(() => {
    initGirangati();
  }, []);

  async function initGirangati() {
    console.log('🧬 Girangati Neural Core Initializing...');
        // Tiny init
    let battery = null;
    if ('getBattery' in navigator) {
      try {
        const bat = await (navigator as any).getBattery();
        battery = Math.round(bat.level * 100);
      } catch (e) {}
    }

    // Baby Agent init
    const context = {
      user: localStorage.getItem('dream_user') || 'GUEST',
      session: localStorage.getItem('dream_session') || 'INACTIVE',
      timestamp: new Date().toISOString()
    };

    setState({
      tiny: { status: 'ACTIVE', battery, network: navigator.onLine ? 'ONLINE' : 'OFFLINE' },
      babyAgent: { status: 'ACTIVE', intelligence: 'SUPER_AGENT', context },
      brain: { status: 'ACTIVE' },
      status: 'FULLY_OPERATIONAL'
    });

    console.log('✅ Girangati Ready!');
  }

  function vibrate(pattern: number[]) {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  }

  function learn(input: string, output: string) {
    const logs = JSON.parse(localStorage.getItem('dream_ai_learning') || '[]');
    logs.push({ input, output, timestamp: Date.now() });
    localStorage.setItem('dream_ai_learning', JSON.stringify(logs.slice(-1000)));
    console.log('🧠 Baby Agent: Learning saved');
  }

  function emit(signal: string, data: any) {
    console.log(`✨ [Girangati] Signal: ${signal}`, data);
    
    // Audit log
    const audits = JSON.parse(localStorage.getItem('girangati_audit') || '[]');
    audits.push({ signal, data, timestamp: new Date().toISOString() });
    localStorage.setItem('girangati_audit', JSON.stringify(audits.slice(-100)));
  }

  return (
    <GirangatiContext.Provider value={{ state, vibrate, learn, emit }}>      {children}
    </GirangatiContext.Provider>
  );
}

export function useGirangati() {
  const context = useContext(GirangatiContext);
  if (context === undefined) {
    throw new Error('useGirangati must be used within a GirangatiProvider');
  }
  return context;
}
