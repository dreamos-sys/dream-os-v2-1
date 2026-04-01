'use client';

import { useState, useEffect } from 'react';

export default function CommandCenterPage() {
  const [clock, setClock] = useState('');
  
  useEffect(() => {
    const timer = setInterval(() => setClock(new Date().toLocaleTimeString('id-ID')), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">{clock}</p>
            <h1 className="text-lg font-bold text-gray-900">🚀 Command Center</h1>
          </div>
          <span className="flex items-center gap-1 px-2 py-1 bg-red-100 border border-red-200 rounded-full text-xs font-bold text-red-600">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> LIVE
          </span>
        </div>
      </header>

      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-6 text-white shadow-lg mx-4 mt-4">
        <p className="text-blue-100 text-sm">Welcome</p>
        <h2 className="text-2xl font-bold">Dream OS v2.1</h2>
        <p className="text-blue-100 text-sm">Master Control Panel</p>
      </div>

      <div className="grid grid-cols-3 gap-3 p-4">
        {['🎯 Command', '📅 Booking', '⚠️ K3', '🛡️ Security', '🧹 Janitor', '📦 Stok'].map((item, i) => (
          <div key={i} className="bg-white rounded-2xl p-3 border border-gray-200 shadow-sm flex flex-col items-center gap-2 active:scale-95 transition-transform">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xl">{item.split(' ')[0]}</div>
            <span className="text-xs font-semibold text-gray-700 text-center">{item.split(' ')[1]}</span>
          </div>
        ))}
      </div>

      <nav className="bg-white/90 backdrop-blur-xl border-t border-gray-200 fixed bottom-0 left-0 right-0 z-50 px-4 py-2">
        <div className="flex items-center justify-around">
          {['🏠 Home', '👤 Profile', '🔳 QR', '🔔 Alerts', '⚙️ Settings'].map(([icon, label]) => (
            <button key={label} className="flex flex-col items-center gap-1 p-2 text-gray-400">
              <span className="text-xl">{icon}</span>
              <span className="text-[10px] font-semibold">{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </main>
  );
}
