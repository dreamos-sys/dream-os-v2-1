"use client";
import React, { useEffect, useState } from 'react';
import { 
  LayoutDashboard, FileEdit, AlertTriangle, Shield, 
  Brush, TreeDeciduous, Box, Wrench, Database, 
  CloudSync, Settings, MonitorPlay, Mic
} from 'lucide-react';
import { motion } from 'framer-motion';
import { NeuralCoordinator } from '../../lib/neural/NeuralCoordinator';

const modules = [
  { name: 'COMMAND CENTER', icon: LayoutDashboard },
  { name: 'FORM BOOKING', icon: FileEdit },
  { name: 'K3 SYSTEM', icon: AlertTriangle },
  { name: 'SEKURITI', icon: Shield },
  { name: 'JANITOR IN', icon: Brush },
  { name: 'JANITOR OUT', icon: TreeDeciduous },
  { name: 'STOK GUDANG', icon: Box },
  { name: 'MAINTENANCE', icon: Wrench },
  { name: 'ASSET MGMT', icon: Database },
  { name: 'BACKUP DATA', icon: CloudSync },
  { name: 'SYSTEM CONFIG', icon: Settings },
  { name: 'SMART HUB TV', icon: MonitorPlay },
];

export const SovereignUniversalGrid = () => {
  const [isTV, setIsTV] = useState(false);
  const [data, setData] = useState<any>(null);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    setIsTV(window.innerWidth / window.innerHeight > 1.2);
    return NeuralCoordinator.syncProcess((res: any) => setData(res));
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-4 md:p-10 font-sans overflow-hidden">
      <div className="absolute inset-0 bg-gold/5 blur-[120px] pointer-events-none animate-pulse" />
      
      <header className="mb-10 text-center z-10">
        <h1 className="text-3xl md:text-6xl font-black text-[#FFD700] uppercase tracking-[0.2em] drop-shadow-[0_0_20px_#FFD700]">Dream OS</h1>
        <p className="text-[10px] text-white/40 tracking-[0.5em] mt-3 uppercase italic">
          v2.1 Sovereign • {data?.analysis?.msg || 'Connecting...'}
        </p>
      </header>

      <div className={`grid gap-4 md:gap-8 w-full max-w-7xl z-10 ${isTV ? 'grid-cols-6' : 'grid-cols-3'}`}>
        {modules.map((m, i) => (
          <motion.button key={i} whileHover={{ scale: 1.1, rotateZ: 2 }} whileTap={{ scale: 0.9 }} className="aspect-square flex flex-col items-center justify-center bg-white/5 backdrop-blur-xl rounded-[25px] md:rounded-[45px] border border-white/10 hover:border-[#FFD700]/50 shadow-2xl group transition-all">
            <m.icon className="w-10 h-10 md:w-16 md:h-16 mb-3 text-[#FFD700] group-hover:drop-shadow-[0_0_15px_#FFD700]" />
            <span className="text-[7px] md:text-[10px] font-bold text-white/50 group-hover:text-white uppercase text-center px-1 tracking-tighter">{m.name}</span>
          </motion.button>
        ))}
      </div>

      <footer className="mt-12 z-10 flex flex-col items-center gap-4">
        <button 
          onClick={() => setIsListening(!isListening)}
          className={`p-5 rounded-full border-2 transition-all ${isListening ? 'border-red-500 animate-ping' : 'border-gold/20'}`}
        >
          <Mic className={isListening ? 'text-red-500' : 'text-[#FFD700]'} />
        </button>
        <div className="text-[8px] text-white/20 tracking-[0.5em] uppercase">Bismillah bi idznillah • Baby AI Online</div>
      </footer>
    </div>
  );
};
