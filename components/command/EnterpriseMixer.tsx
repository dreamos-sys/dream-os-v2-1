"use client";
import React, { useState, useEffect } from 'react';
// import { store } from '@/lib/data/global-store'; // TEMP DISABLED

export const EnterpriseMixer = () => {
  const [levels, setLevels] = useState([50, 50, 50, 50]);

  useEffect(() => {
    const calculateLevels = () => {
      const bookings = // store.get('bookings')?.length || 0;
      const k3 = // store.get('k3Reports')?.length || 0;
      const maintenance = 10; // Placeholder
      
      // Map data ke 0-100%
      setLevels([
        Math.min(k3 * 20, 100),       // OPS (Janitor/Maint)
        Math.min(maintenance * 10, 100), // SEC
        Math.min(bookings * 10, 100),    // AST
        95 // ADM (Stable)
      ]);
    };
    calculateLevels();
    const interval = setInterval(calculateLevels, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ios-card bg-slate-950 p-6 rounded-[35px] border border-emerald-500/30">
      <div className="flex justify-around h-40 mb-8 items-end gap-2">
        {['OPS', 'SEC', 'AST', 'ADM'].map((name, i) => (
          <div key={name} className="flex flex-col items-center w-full">
            <div className="w-4 bg-slate-900 rounded-full h-full relative border border-white/5">
              <div className="absolute bottom-0 w-full bg-emerald-500 shadow-[0_0_15px_#10b981] transition-all duration-1000" style={{ height: `${levels[i]}%` }} />
            </div>
            <span className="text-[8px] mt-3 font-bold text-emerald-500/50">{name}</span>
          </div>
        ))}
      </div>
      <div className="text-[10px] text-center font-bold text-emerald-500 animate-pulse tracking-widest">REAL-TIME NEURAL FEED</div>
    </div>
  );
};
