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
  const [isListening, setIsListening] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [systemState, setSystemState] = useState<any>(null);
  const idleTimer = useRef<any>(null);

  const modules = [
    { id: 1, name: 'Dashboard', icon: LayoutDashboard, color: 'text-gold', key: 'net' },
    { id: 2, name: 'Form Mgmt', icon: FileEdit, color: 'text-gold', key: 'form' },
    { id: 3, name: 'Inventory', icon: Warehouse, color: 'text-gold', key: 'inv' },
    { id: 4, name: 'Stock', icon: Boxes, color: 'text-gold', key: 'stock' },
    { id: 5, name: 'Approval', icon: ShieldCheck, color: 'text-emerald-400', key: 'ptr' },
    { id: 6, name: 'Surveillance', icon: Camera, color: 'text-gold', key: 'cam' },
    { id: 7, name: 'Security', icon: Fingerprint, color: 'text-gold', key: 'nfc' },
    { id: 8, name: 'Reports', icon: ClipboardList, color: 'text-gold', key: 'rep' },
    { id: 9, name: 'Audit', icon: History, color: 'text-gold', key: 'bt' },
    { id: 10, name: 'Backup', icon: CloudSync, color: 'text-gold', key: 'cloud' },
    { id: 11, name: 'Config', icon: Settings, color: 'text-gold', key: 'sys' },
    { id: 12, name: 'Idle View', icon: MonitorPlay, color: 'text-gold', key: 'idle' },
  ];

  const slides = ["Bismillah bi idznillah", "Neural Core v3.1", "Ghost Architect Depok", "Power of Shalawat"];

  const resetIdle = () => {
    setIsIdle(false);
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setIsIdle(true), 60000);
  };

  const getStatus = (id: number) => {
    if (!systemState) return '...';
    const s = systemState.sensors;
    if (id === 1) return s.net.online ? 'ON' : 'OFF';
    if (id === 5) return s.ptr;
    if (id === 7) return s.nfc;
    if (id === 9) return s.bt;
    return 'READY';
  };

  useEffect(() => {
    const runSync = () => {
      setIsTV(window.innerWidth / window.innerHeight > 1.3);
      NeuralCoordinator.syncProcess((data: any) => setSystemState(data));
    };
    runSync();
    resetIdle();
    const hBeat = setInterval(runSync, 5000);
    const sInt = setInterval(() => setCurrentSlide((p) => (p + 1) % slides.length), 7000);
    window.addEventListener('mousemove', resetIdle);
    window.addEventListener('touchstart', resetIdle);
    return () => { clearInterval(hBeat); clearInterval(sInt); };
  }, []);

  if (isIdle) return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 animate-fade-in" onClick={resetIdle}>
      <h1 className="text-gold text-5xl font-black uppercase tracking-widest text-center drop-shadow-[0_0_20px_#FFD700]">{slides[currentSlide]}</h1>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* 🧬 Hologram Aura Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gold/10 blur-[120px] animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] animate-blob animation-delay-2000"></div>

      <header className="mb-12 text-center z-10">
        <h2 className="text-4xl md:text-6xl font-black tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-b from-white to-gold/40 uppercase">Dream OS</h2>
        <div className="h-1 w-24 bg-gold mx-auto mt-2 rounded-full shadow-[0_0_15px_#FFD700]"></div>
      </header>

      <div className={`grid gap-4 md:gap-8 w-full max-w-7xl perspective-[1200px] ${isTV ? 'grid-cols-6' : 'grid-cols-3'}`}>
        {modules.map((m) => (
          <button key={m.id} className="group relative aspect-square flex flex-col items-center justify-center bg-white/[0.03] backdrop-blur-2xl rounded-[35px] border border-white/10 transition-all duration-700 hover:rotate-x-12 hover:scale-110 hover:border-gold/40 hover:shadow-[0_0_40px_rgba(255,215,0,0.2)] focus:outline-none focus:ring-2 focus:ring-gold">
            <span className="absolute top-3 right-4 text-[7px] font-bold text-emerald-500/80 uppercase tracking-widest">{getStatus(m.id)}</span>
            <m.icon className={`w-10 h-10 md:w-16 md:h-16 mb-3 ${m.color} drop-shadow-gold`} />
            <span className="text-[9px] font-black text-white/40 group-hover:text-gold uppercase tracking-[0.2em]">{m.name}</span>
          </button>
        ))}
      </div>

      <footer className="mt-16 z-10 flex flex-col items-center gap-4">
        <button 
          onClick={() => { setIsListening(true); VoiceEngine.speak("Sovereign Siap, My Bro."); VoiceEngine.listen((c) => { setIsListening(false); VoiceEngine.speak("Perintah " + c + " sedang diproses."); }).start(); }}
          className={`p-4 rounded-full border-2 transition-all ${isListening ? 'border-red-500 animate-ping' : 'border-gold/20'}`}
        >
          <Mic className={isListening ? 'text-red-500' : 'text-gold'} />
        </button>
        <div className="text-[9px] font-mono text-white/20 tracking-[0.5em] uppercase flex gap-4">
          <span>{systemState?.analysis?.msg || 'Neural Stable'}</span>
        </div>
      </footer>

      <style jsx global>{`
        .text-gold { color: #FFD700; }
        .drop-shadow-gold { filter: drop-shadow(0_0_10px_rgba(255,215,0,0.5)); }
        .rotate-x-12 { transform: rotateX(12deg) rotateY(10deg); }
        @keyframes blob {
          0% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px,-50px) scale(1.1); }
          100% { transform: translate(0,0) scale(1); }
        }
        .animate-blob { animation: blob 10s infinite alternate; }
      `}</style>
    </div>
  );
};
