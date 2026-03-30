"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login');
    }, 3500);
    
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 5;
      });
    }, 150);
    
    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
    };
  }, [router]);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #F2F2F7 0%, #ffffff 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <img src="/assets/img/icon-192.png" alt="Dream OS" style={{ width: '120px', height: '120px', borderRadius: '28px', boxShadow: '0 15px 50px rgba(0,0,0,0.2)', marginBottom: '30px' }} />      
      <div style={{ fontFamily: 'Amiri, serif', fontSize: '42px', color: '#10b981', marginBottom: '15px', textAlign: 'center' }}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>
      <div style={{ fontFamily: 'Amiri, serif', fontSize: '18px', color: 'rgba(16,185,129,0.8)', textAlign: 'center', marginBottom: '30px' }}>اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</div>
      
      <div className="ios-loader" style={{ marginBottom: '25px' }}></div>
      
      <p style={{ fontSize: '13px', color: '#10b981', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: '600', marginBottom: '10px' }}>🤖 AI Agent Loading...</p>
      <p style={{ fontSize: '11px', color: '#8e8e93', letterSpacing: '2px', textTransform: 'uppercase' }}>Neural Sovereignty v14.0</p>
      
      {/* Progress Bar */}
      <div style={{ width: '200px', height: '6px', background: '#e5e5ea', borderRadius: '3px', marginTop: '25px', overflow: 'hidden' }}>
        <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #10b981, #059669)', borderRadius: '3px', transition: 'width 0.2s' }}></div>
      </div>
      <p style={{ fontSize: '10px', color: '#8e8e93', marginTop: '8px' }}>{progress}%</p>
    </div>
  );
}
