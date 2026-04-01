'use client';

import { useState } from 'react';

export default function DreamPage() {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50 px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-900">🏠 Dream OS</h1>
          <span className="text-xs text-gray-500">v2.1</span>
        </div>
      </header>

      {/* Bismillah Banner - Inline */}
      <div className="bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100 border-b border-amber-200 py-2 px-4 text-center">
        <p className="text-amber-800 text-sm font-semibold">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
        <p className="text-amber-700 text-[10px]">Bismillah · Dream OS</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-200 px-4 py-2 overflow-x-auto">
        {['chat', 'docs', 'settings'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
              activeTab === tab ? 'bg-blue-500 text-white' : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {activeTab === 'chat' && (
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
            <p className="text-gray-700 text-sm mb-3">💬 Dream AI Assistant</p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
              <p className="text-sm text-gray-800">Halo! Ada yang bisa Dream OS bantu hari ini? 🤖✨</p>
            </div>
            <div className="mt-4 flex gap-2">
              <input type="text" placeholder="Tanya ke Dream OS..." className="flex-1 px-4 py-3 rounded-xl bg-gray-100 border-0 focus:bg-white focus:ring-2 focus:ring-blue-500/20" />
              <button className="px-4 py-3 rounded-xl bg-blue-500 text-white font-semibold">✨</button>
            </div>
          </div>
        )}
        
        {activeTab === 'docs' && (
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
            <p className="text-gray-700 text-sm mb-3">📄 Generated Documents</p>
            {['Checklist K3', 'Laporan Insiden', 'Template Briefing'].map((doc) => (
              <div key={doc} className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 last:border-b-0">
                <span className="text-lg">📋</span>
                <span className="text-sm text-gray-700 flex-1">{doc}</span>
                <button className="px-3 py-1 rounded-lg bg-gray-100 text-xs font-semibold">Download</button>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
            <p className="text-gray-700 text-sm mb-3">⚙️ Settings</p>
            <div className="space-y-3">
              {[['Bahasa', 'Indonesia'], ['Theme', 'iOS White'], ['Backup', 'Enabled']].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between px-4 py-3 border-b border-gray-100 last:border-b-0">
                  <span className="text-sm text-gray-700">{label}</span>
                  <span className="text-xs text-gray-400">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tab Bar */}
      <nav className="bg-white/90 backdrop-blur-xl border-t border-gray-200 fixed bottom-0 left-0 right-0 z-50 px-4 py-2">
        <div className="flex items-center justify-around">
          {['💬 Chat', '📄 Docs', '⚙️ Settings'].map(([icon, label]) => (
            <button key={label} className="flex flex-col items-center gap-1 p-2 text-gray-400 hover:text-blue-500">
              <span className="text-xl">{icon}</span>
              <span className="text-[10px] font-semibold">{label.split(' ')[1]}</span>
            </button>
          ))}
        </div>
      </nav>
    </main>
  );
}
