"use client"
import { useState } from "react"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [accessKey, setAccessKey] = useState("")

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-slate-800/80 backdrop-blur-xl p-8 rounded-3xl border border-emerald-500/20 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎯</div>
          <p className="text-2xl font-bold text-emerald-400 mb-2" dir="rtl">بِسْمِ اللَّهِ</p>
          <h1 className="text-3xl font-black text-white mb-1">DREAM OS</h1>
          <p className="text-emerald-400/80 text-sm mb-6">v2.1 Sovereign</p>
          
          <input
            type="password"
            value={accessKey}
            onChange={(e) => setAccessKey(e.target.value)}            placeholder="Enter Access Key"
            className="w-full bg-slate-900/80 border border-slate-600 rounded-xl p-3 text-white mb-4"
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />
          
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-3 rounded-xl"
          >
            🔐 Login
          </button>
          
          <p className="text-slate-400 text-xs mt-4">Try: Mr.M_Architect_2025</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="p-6 text-center border-b border-white/10">
        <p className="text-2xl text-emerald-400 mb-2" dir="rtl">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
        <h1 className="text-4xl font-black text-[#FFD700]">DREAM OS</h1>
        <p className="text-slate-400 text-sm">v2.1 Sovereign • Neural Stable</p>
      </header>

      {/* 9-Grid Modules */}
      <div className="p-4 max-w-4xl mx-auto">
        {/* 2 Large Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="md:col-span-2 bg-gradient-to-br from-violet-600 to-emerald-600 p-8 rounded-3xl min-h-[200px]">
            <div className="text-5xl mb-3">🎯</div>
            <h2 className="text-2xl font-bold text-white">Command Center</h2>
            <p className="text-white/60">Main System Neural Hub</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-600 to-teal-600 p-6 rounded-3xl flex flex-col items-center justify-center">
            <div className="text-5xl mb-3">🛡️</div>
            <span className="text-white font-bold text-center">Security Core</span>
          </div>
        </div>

        {/* 7 Small Cards */}
        <div className="grid grid-cols-3 gap-3">
          {["📅 Booking", "⚠️ K3", "🧹 Janitor", "📦 Stock", "🔧 Service", "🏢 Asset", "⚙️ Settings"].map((m, i) => (
            <button key={i} className="bg-slate-800/80 backdrop-blur p-4 rounded-2xl border border-white/10 hover:border-emerald-500/50 transition">
              <div className="text-3xl mb-2">{m.split(' ')[0]}</div>
              <div className="text-xs text-slate-300">{m.split(' ')[1]}</div>
            </button>
          ))}        </div>
      </div>

      {/* Bottom Nav - 5 Buttons */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-800/95 backdrop-blur-xl border-t border-emerald-500/20">
        <div className="flex justify-around items-center p-3 max-w-md mx-auto">
          <button className="flex flex-col items-center text-emerald-400">
            <span className="text-2xl">🏠</span>
            <span className="text-[10px]">Home</span>
          </button>
          <button className="flex flex-col items-center text-slate-400">
            <span className="text-2xl">👤</span>
            <span className="text-[10px]">Profile</span>
          </button>
          <button className="flex flex-col items-center -mt-4 bg-gradient-to-r from-emerald-500 to-teal-600 p-3 rounded-2xl shadow-xl">
            <span className="text-3xl">📷</span>
            <span className="text-[10px] text-white font-bold">QR</span>
          </button>
          <button className="flex flex-col items-center text-slate-400">
            <span className="text-2xl">ℹ️</span>
            <span className="text-[10px]">About</span>
          </button>
          <button className="flex flex-col items-center text-slate-400">
            <span className="text-2xl">⚙️</span>
            <span className="text-[10px]">Settings</span>
          </button>
        </div>
      </nav>
    </div>
  )

  function handleLogin() {
    if (accessKey.trim()) {
      setIsLoggedIn(true)
    }
  }
}
