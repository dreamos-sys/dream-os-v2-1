"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function DashboardTV() {
  const router = useRouter();
  const [focusedIndex, setFocusedIndex] = useState(0);

  const modules = [
    { id: 1, name: '🎛️ Command', path: '/modules/command', color: 'from-emerald-500 to-teal-600', icon: '🎛️' },
    { id: 2, name: '🛡️ Security', path: '/modules/security', color: 'from-red-500 to-rose-600', icon: '🛡️' },
    { id: 3, name: '📅 Booking', path: '/modules/booking', color: 'from-blue-500 to-indigo-600', icon: '📅' },
    { id: 4, name: '⚠️ K3', path: '/modules/k3', color: 'from-amber-500 to-orange-600', icon: '⚠️' },
    { id: 5, name: '🧹 Janitor', path: '/modules/janitor', color: 'from-lime-500 to-green-600', icon: '🧹' },
    { id: 6, name: '📦 Stock', path: '/modules/stock', color: 'from-purple-500 to-violet-600', icon: '📦' },
    { id: 7, name: '🔧 Service', path: '/modules/service', color: 'from-cyan-500 to-sky-600', icon: '🔧' },
    { id: 8, name: '🏢 Asset', path: '/modules/asset', color: 'from-pink-500 to-fuchsia-600', icon: '🏢' },
    { id: 9, name: '📺 Media', path: '/modules/media', color: 'from-yellow-500 to-amber-600', icon: '📺' },
    { id: 10, name: '🌐 IoT', path: '/modules/iot', color: 'from-emerald-400 to-cyan-500', icon: '🌐' },
    { id: 11, name: '📊 Analytics', path: '/modules/analytics', color: 'from-indigo-400 to-purple-500', icon: '📊' },
    { id: 12, name: '⚙️ Settings', path: '/settings', color: 'from-gray-500 to-slate-600', icon: '⚙️' },
  ];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const cols = 4;
      if (e.key === 'ArrowRight') setFocusedIndex(i => Math.min(i + 1, modules.length - 1));
      if (e.key === 'ArrowLeft') setFocusedIndex(i => Math.max(i - 1, 0));
      if (e.key === 'ArrowDown') setFocusedIndex(i => Math.min(i + cols, modules.length - 1));
      if (e.key === 'ArrowUp') setFocusedIndex(i => Math.max(i - cols, 0));
      if (e.key === 'Enter') router.push(modules[focusedIndex].path);
      if (e.key === 'Backspace') router.back();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [focusedIndex, router, modules.length]);

  useEffect(() => {
    const el = document.getElementById('module-' + focusedIndex);
    el?.focus();
  }, [focusedIndex]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 md:p-8">
      <header className="text-center mb-8">
        <div className="text-2xl md:text-3xl font-arabic text-emerald-400 mb-2">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </div>
        <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          🎛️ Dream OS TV Edition
        </h1>
        <p className="text-slate-400 text-sm md:text-base mt-2">
          Navigate: Arrow Keys • Select: ENTER
        </p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
        {modules.map((mod, idx) => (
          <button
            key={mod.id}
            id={'module-' + idx}
            tabIndex={0}
            onClick={() => router.push(mod.path)}
            className={
              'group relative overflow-hidden rounded-3xl p-6 md:p-8 ' +
              'bg-gradient-to-br ' + mod.color + ' ' +
              'border-2 border-white/20 ' +
              'transition-all duration-300 ease-out ' +
              'hover:scale-105 hover:border-yellow-400 ' +
              'focus:scale-105 focus:border-yellow-400 focus:shadow-[0_0_40px_rgba(255,215,0,0.6)] ' +
              'focus:outline-none focus:ring-4 focus:ring-yellow-400/50 ' +
              'min-h-[140px] md:min-h-[180px] ' +
              'flex flex-col items-center justify-center gap-3 md:gap-4'
            }
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity" />
            <span className="text-4xl md:text-6xl drop-shadow-lg transform group-hover:scale-110 transition-transform">
              {mod.icon}
            </span>
            <span className="text-sm md:text-lg font-semibold text-white drop-shadow-md text-center">
              {mod.name}
            </span>
            <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-yellow-400 opacity-0 group-focus:opacity-100 transition-opacity animate-pulse" />
          </button>
        ))}
      </div>

      <footer className="text-center mt-12 text-slate-500 text-xs md:text-sm">
        <p>Dream OS v2.1 • Next.js • Termux Powered 📱</p>
        <p className="mt-1 text-emerald-400/80">Bismillah • Bi Idznillah</p>
      </footer>
    </main>
  );
}
