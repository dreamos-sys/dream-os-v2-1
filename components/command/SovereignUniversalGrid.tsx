"use client";

import React, { useEffect, useState, useRef } from 'react';
import { 
  LayoutDashboard, FileEdit, Warehouse, 
  Boxes, ShieldCheck, Camera, 
  Fingerprint, ClipboardList, History, CloudSync, Settings, MonitorPlay, Mic
} from 'lucide-react';
import { NeuralCoordinator } from '../../lib/neural/NeuralCoordinator';
import { VoiceEngine } from '../../lib/neural/VoiceEngine';

export const SovereignUniversalGrid = () => {
  const [isTV, setIsTV] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [systemState, setSystemState] = useState<any>(null);
  const idleTimer = useRef<any>(null);

  const modules = [
    { id: 1, name: 'Dashboard', icon: LayoutDashboard, color: 'text-gold' },
    { id: 2, name: 'Form Mgmt', icon: FileEdit, color: 'text-gold' },
    { id: 3, name: 'Inventory', icon: Warehouse, color: 'text-gold' },
    { id: 4, name: 'Stock', icon: Boxes, color: 'text-gold' },
    { id: 5, name: 'Approval', icon: ShieldCheck, color: 'text-emerald-400' },
    { id: 6, name: 'Surveillance', icon: Camera, color: 'text-gold' },
    { id: 7, name: 'Security', icon: Fingerprint, color: 'text-gold' },
    { id: 8, name: 'Reports', icon: ClipboardList, color: 'text-gold' },
    { id: 9, name: 'Audit', icon: History, color: 'text-gold' },
    { id: 10, name: 'Backup', icon: CloudSync, color: 'text-gold' },
    { id: 11, name: 'Config', icon: Settings, color: 'text-gold' },
    { id: 12, name: 'Idle View', icon: MonitorPlay, color: 'text-gold' },
  ];

  const slides = ["Bismillah", "Neural Core v3.0", "Ghost Architect", "Sovereign Power"];

  useEffect(() => {
    const runSync = () => {
      setIsTV(window.innerWidth / window.innerHeight > 1.3);
      if (NeuralCoordinator) NeuralCoordinator.syncProcess((data: any) => setSystemState(data));
    };
    runSync();
    const slideInt = setInterval(() => setCurrentSlide((p) => (p + 1) % slides.length), 7000);
    return () => clearInterval(slideInt);
  }, []);

  if (isIdle) return <div className="bg-black fixed inset-0 z-50 flex items-center justify-center text-gold text-4xl">{slides[currentSlide]}</div>;

  return (
    <div className="w-full min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="absolute top-0 left-0 w-full h-full bg-gold/5 blur-[120px] pointer-events-none"></div>
      <header className="mb-12 text-center z-10">
        <h2 className="text-4xl font-black tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-b from-white to-gold/40 uppercase">Dream OS</h2>
        <div className="h-1 w-24 bg-gold mx-auto mt-2 rounded-full shadow-[0_0_15px_#FFD700]"></div>
      </header>

      <div className={`grid gap-6 w-full max-w-7xl perspective-[1200px] ${isTV ? 'grid-cols-6' : 'grid-cols-3'}`}>
        {modules.map((m) => (
          <button key={m.id} className="group relative aspect-square flex flex-col items-center justify-center bg-white/[0.03] backdrop-blur-2xl rounded-[30px] border border-white/10 transition-all duration-500 hover:rotate-x-12 hover:scale-110 hover:border-gold/40 hover:shadow-[0_0_30px_rgba(255,215,0,0.2)] outline-none focus:ring-2 focus:ring-gold">
            <m.icon className={`w-10 h-10 mb-3 ${m.color} drop-shadow-gold`} />
            <span className="text-[8px] font-bold text-white/40 group-hover:text-gold uppercase tracking-widest">{m.name}</span>
          </button>
        ))}
      </div>

      <style jsx global>{`
        .text-gold { color: #FFD700; }
        .drop-shadow-gold { filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.4)); }
        .rotate-x-12 { transform: rotateX(12deg); }
      `}</style>
    </div>
  );
};
