"use client";
import React, { useEffect, useState } from 'react';
import { 
  LayoutDashboard, FileEdit, AlertTriangle, Shield, 
  Brush, TreeDeciduous, Box, Wrench, Database, 
  CloudSync, Settings, MonitorPlay 
} from 'lucide-react';
import { motion } from 'framer-motion';

export const SovereignUniversalGrid = () => {
  const [isTV, setIsTV] = useState(false);

  // 12 Modul (9 dari gambar lo + 3 Tambahan TV Box)
  const modules = [
    { name: 'COMMAND CENTER', icon: LayoutDashboard },
    { name: 'FORM BOOKING', icon: FileEdit },
    { name: 'K3', icon: AlertTriangle },
    { name: 'SEKURITI', icon: Shield },
    { name: 'JANITOR INDOOR', icon: Brush },
    { name: 'JANITOR OUTDOOR', icon: TreeDeciduous },
    { name: 'STOK', icon: Box },
    { name: 'MAINTENANCE', icon: Wrench },
    { name: 'ASSET', icon: Database },
    { name: 'BACKUP', icon: CloudSync },
    { name: 'CONFIG', icon: Settings },
    { name: 'SMART HUB', icon: MonitorPlay },
  ];

  useEffect(() => {
    setIsTV(window.innerWidth / window.innerHeight > 1.3);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6 font-sans overflow-hidden">
      {/* Aura Hologram */}
      <div className="absolute top-0 left-0 w-full h-full bg-gold/5 blur-[120px] pointer-events-none opacity-50"></div>
      
      <header className="mb-12 text-center z-10">
        <h1 className="text-3xl md:text-5xl font-black tracking-[0.3em] text-[#FFD700] uppercase drop-shadow-[0_0_15px_#FFD700]">Dream OS</h1>
        <p className="text-[10px] text-white/30 tracking-[0.4em] mt-3 uppercase italic">Sovereign Neural Grid v3.0</p>
      </header>

      {/* Grid 6x2 untuk TV / 3x4 untuk HP */}
      <div className={`grid gap-5 w-full max-w-7xl perspective-[1200px] ${isTV ? 'grid-cols-6' : 'grid-cols-3'}`}>
        {modules.map((m, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.1, rotateX: 10, rotateY: 10 }}
            whileTap={{ scale: 0.95 }}
            className="group relative aspect-square flex flex-col items-center justify-center bg-white/5 backdrop-blur-xl rounded-[30px] border border-white/10 transition-all hover:border-[#FFD700]/50 hover:bg-[#FFD700]/5 shadow-2xl"
          >
            <m.icon className="w-10 h-10 md:w-14 md:h-14 mb-3 text-[#FFD700] drop-shadow-[0_0_8px_#FFD700]" />
            <span className="text-[8px] md:text-[10px] font-bold text-white/60 group-hover:text-[#FFD700] uppercase tracking-tighter text-center px-2">
              {m.name}
            </span>
          </button>
        ))}
      </div>
      
      <footer className="mt-16 text-[9px] text-white/20 tracking-[0.5em] uppercase">
        Bismillah bi idznillah • Neural Core Connected
      </footer>
    </div>
  );
};
