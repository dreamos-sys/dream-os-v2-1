"use client";
import React, { useEffect } from 'react';
import { initWasmEngine } from '@/lib/neural-core';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Jalankan Mesin Jet TinyGo pas Aplikasi Terbuka!
    initWasmEngine();
  }, []);

  return (
    <html lang="id">
      <body className="bg-black text-emerald-400 font-inter selection:bg-emerald-500/30">
        {/* Futuristic Background Overlay */}
        <div className="fixed inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-emerald-900/10 via-transparent to-black"></div>
        
        {/* Glow Effect Samping */}
        <div className="fixed -left-20 top-0 w-40 h-screen bg-emerald-500/5 blur-[100px]"></div>
        <div className="fixed -right-20 top-0 w-40 h-screen bg-emerald-500/5 blur-[100px]"></div>

        <main className="relative z-10 min-h-screen">
          {children}
        </main>

        {/* Footer Identitas Global */}
        <footer className="relative z-10 p-6 text-center text-[8px] tracking-[0.3em] uppercase opacity-40">
          Dream OS v2.1 PRO • Global Architecture • Standard ISO 27001
        </footer>
      </body>
    </html>
  );
}
