"use client";
import React, { useEffect, useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { SovereignHub } from '../../lib/neural/SovereignHub';

export const SovereignUniversalGrid = () => {
  const [isTV, setIsTV] = useState(false);
  const [netStatus, setNetStatus] = useState('Online');

  const modules = [
    { id: 1, name: 'Dashboard', icon: 'LayoutDashboard' },
    { id: 2, name: 'Form Mgmt', icon: 'FileEdit' },
    { id: 3, name: 'Inventory', icon: 'Warehouse' },
    { id: 4, name: 'Stock', icon: 'Boxes' },
    { id: 5, name: 'Approval', icon: 'ShieldCheck' },
    { id: 6, name: 'CCTV', icon: 'Camera' },
    { id: 7, name: 'Security', icon: 'Fingerprint' },
    { id: 8, name: 'Reports', icon: 'ClipboardList' },
    { id: 9, name: 'Audit', icon: 'History' },
    { id: 10, name: 'Backup', icon: 'CloudSync' },
    { id: 11, name: 'Config', icon: 'Settings' },
    { id: 12, name: 'Idle', icon: 'MonitorPlay' },
  ];

  useEffect(() => {
    setIsTV(window.innerWidth / window.innerHeight > 1.3);
    const sync = async () => {
      const net = await SovereignHub.detectNetwork();
      setNetStatus(net.online ? 'Online' : 'Offline');
    };
    sync();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6 font-sans">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-black tracking-widest text-gold uppercase drop-shadow-[0_0_10px_#FFD700]">Dream OS v2.5</h1>
        <p className="text-[10px] text-white/30 tracking-[0.3em] mt-2 uppercase">Sovereign Universal Grid</p>
      </header>

      <div className={`grid gap-4 w-full max-w-6xl ${isTV ? 'grid-cols-6' : 'grid-cols-3'}`}>
        {modules.map((m) => {
          const Icon = (LucideIcons as any)[m.icon] || LucideIcons.HelpCircle;
          return (
            <button key={m.id} className="aspect-square flex flex-col items-center justify-center bg-white/5 rounded-[25px] border border-white/10 hover:scale-110 hover:border-gold/50 transition-all duration-500 shadow-xl">
              <Icon className="w-10 h-10 mb-2 text-[#FFD700]" />
              <span className="text-[8px] font-bold opacity-60 uppercase">{m.name}</span>
            </button>
          );
        })}
      </div>
      <style jsx global>{` .text-gold { color: #FFD700; } `}</style>
    </div>
  );
};
