"use client";
import React, { useEffect, useState } from 'react';
import { 
  LayoutDashboard, FileEdit, AlertTriangle, Shield, 
  Brush, TreeDeciduous, Box, Wrench, Database, 
  CloudSync, Settings, MonitorPlay, Mic
} from 'lucide-react';
import { motion } from 'framer-motion';
import { NeuralCore } from '../../lib/neural-core';

export const SovereignUniversalGrid = () => {
  const [isTV, setIsTV] = useState(false);
  const [coreStatus, setCoreStatus] = useState({ msg: "Booting...", load: "0%" });

  useEffect(() => {
    setIsTV(window.innerWidth / window.innerHeight > 1.2);
    const pulse = setInterval(() => {
      setCoreStatus(NeuralCore.getAnalysis());
    }, 5000);
    return () => clearInterval(pulse);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#020617] text-white p-4 md:p-10 font-sans relative overflow-hidden">
      {/* Golden Aura Pulse */}
      <div className="absolute inset-0 bg-gold/5 blur-[120px] pointer-events-none animate-pulse" />
      
      <header className="mb-8 flex justify-between items-end z-10 relative">
        <div>
          <h1 className="text-3xl md:text-6xl font-black text-[#FFD700] uppercase tracking-tighter drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]">Dream OS</h1>
          <p className="text-[10px] text-white/40 tracking-[0.4em] uppercase">v2.1 Sovereign • {coreStatus.msg}</p>
        </div>
        <div className="hidden md:block text-right text-[8px] text-emerald-400 font-mono tracking-widest uppercase">
          Neural Load: {coreStatus.load}
        </div>
      </header>

      {/* APPLE GRID MODEL (BENTO BOX) */}
      <div className="grid grid-cols-3 md:grid-cols-6 grid-rows-4 md:grid-rows-2 gap-4 h-[70vh] z-10 relative">
        
        {/* Large Bento: Command Center */}
        <motion.div whileHover={{ scale: 1.02 }} className="col-span-2 row-span-2 bg-white/5 backdrop-blur-3xl rounded-[40px] border border-white/10 p-8 flex flex-col justify-between group hover:border-gold/50 transition-all shadow-2xl">
          <LayoutDashboard className="w-16 h-16 text-[#FFD700] drop-shadow-[0_0_15px_#FFD700]" />
          <div>
            <h3 className="text-2xl font-black text-white group-hover:text-gold uppercase">Command Center</h3>
            <p className="text-[10px] text-white/30 mt-1 uppercase italic">Main System Neural Hub</p>
          </div>
        </motion.div>

        {/* Highlight: Security Status */}
        <motion.div whileHover={{ scale: 1.02 }} className="col-span-1 row-span-2 bg-emerald-500/10 backdrop-blur-3xl rounded-[40px] border border-emerald-500/20 p-6 flex flex-col items-center justify-center group hover:border-emerald-400 transition-all">
          <Shield className="w-12 h-12 text-emerald-400 mb-4" />
          <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest text-center">Security Core</span>
        </motion.div>

        {/* Standard Bento Items */}
        {[
          { name: 'Form', icon: FileEdit }, { name: 'K3 System', icon: AlertTriangle },
          { name: 'Janitor', icon: Brush }, { name: 'Stock', icon: Box },
          { name: 'Service', icon: Wrench }, { name: 'Asset', icon: Database },
          { name: 'Backup', icon: CloudSync }, { name: 'TV Box', icon: MonitorPlay },
          { name: 'Settings', icon: Settings },
        ].map((m, i) => (
          <motion.div key={i} whileHover={{ scale: 1.05 }} className="bg-white/5 backdrop-blur-xl rounded-[30px] border border-white/10 flex flex-col items-center justify-center group hover:bg-gold/5 transition-all cursor-pointer">
            <m.icon className="w-8 h-8 text-[#FFD700]/60 group-hover:text-[#FFD700] transition-colors" />
            <span className="text-[8px] mt-2 font-bold text-white/20 group-hover:text-gold uppercase tracking-tighter text-center px-1">{m.name}</span>
          </motion.div>
        ))}
      </div>

      <footer className="mt-10 flex justify-center z-10 relative">
        <motion.button whileTap={{ scale: 0.9 }} className="p-5 bg-gold/10 rounded-full border border-gold/20 shadow-[0_0_15px_rgba(255,215,0,0.1)]">
          <Mic className="text-[#FFD700] w-8 h-8 animate-pulse" />
        </motion.button>
      </footer>

      <style jsx global>{`
        .drop-shadow-gold { filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.5)); }
      `}</style>
    </div>
  );
};
