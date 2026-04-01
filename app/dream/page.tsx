'use client';

import { useState } from 'react';
import { BismillahBanner } from '@/components/spiritual/BismillahBanner';

export default function DreamPage() {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      <BismillahBanner className="sticky top-0 z-50" />
      
      {/* Header */}
      <header className="ios-header">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-900">🏠 Dream OS</h1>
          <span className="text-xs text-gray-500">v2.1</span>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-200 px-4 py-2 overflow-x-auto">
        {['chat', 'docs', 'settings'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
              activeTab === tab 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'chat' && (
          <div className="ios-card p-4">
            <p className="text-gray-700 text-sm mb-3">💬 Dream AI Assistant</p>
            <div className="space-y-2">
              <div className="ios-card p-3 bg-blue-50 border-blue-200">
                <p className="text-sm text-gray-800">Halo! Ada yang bisa Dream OS bantu hari ini? 🤖✨</p>              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <input 
                type="text" 
                placeholder="Tanya ke Dream OS..." 
                className="ios-input flex-1"
              />
              <button className="ios-btn ios-btn-primary">✨</button>
            </div>
          </div>
        )}
        
        {activeTab === 'docs' && (
          <div className="ios-card p-4">
            <p className="text-gray-700 text-sm mb-3">📄 Generated Documents</p>
            <div className="space-y-2">
              {['Checklist K3', 'Laporan Insiden', 'Template Briefing'].map((doc) => (
                <div key={doc} className="ios-list-item">
                  <span className="text-lg mr-2">📋</span>
                  <span className="text-sm text-gray-700 flex-1">{doc}</span>
                  <button className="ios-btn ios-btn-secondary text-xs">Download</button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="ios-card p-4">
            <p className="text-gray-700 text-sm mb-3">⚙️ Settings</p>
            <div className="space-y-3">
              <div className="ios-list-item">
                <span className="text-sm text-gray-700 flex-1">Bahasa</span>
                <span className="text-xs text-gray-400">Indonesia</span>
              </div>
              <div className="ios-list-item">
                <span className="text-sm text-gray-700 flex-1">Theme</span>
                <span className="text-xs text-gray-400">iOS White</span>
              </div>
              <div className="ios-list-item">
                <span className="text-sm text-gray-700 flex-1">Backup</span>
                <button className="ios-btn ios-btn-secondary text-xs">Backup Now</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tab Bar */}      <nav className="ios-tab-bar">
        <div className="flex items-center justify-around">
          <button className="flex flex-col items-center gap-1 p-2 text-blue-500">
            <span className="text-xl">💬</span>
            <span className="text-[10px] font-semibold">Chat</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 text-gray-400">
            <span className="text-xl">📄</span>
            <span className="text-[10px] font-semibold">Docs</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 text-gray-400">
            <span className="text-xl">⚙️</span>
            <span className="text-[10px] font-semibold">Settings</span>
          </button>
        </div>
      </nav>
    </main>
  );
}
