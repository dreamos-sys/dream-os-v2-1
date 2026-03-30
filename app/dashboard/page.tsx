"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { store } from '@/lib/data/global-store';
import initTinyGo, { getSystemPerformance } from '@/lib/wasm/wasm-loader';
import GhostShield from '@/lib/security/ghost-shield';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState('DEVELOPER');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeNav, setActiveNav] = useState('home');
  const [tinyGoReady, setTinyGoReady] = useState(false);
  const [systemStats, setSystemStats] = useState<any>(null);
  const [slideData, setSlideData] = useState<any[]>([]);

  // 7 Integrated Slides
  const slides = [
    { 
      id: 1, 
      title: '👋 Ucapan Salam', 
      icon: '🌅', 
      getData: () => store.getGreeting(),
      render: (data: any) => ({
        title: data.text,
        subtitle: data.subtext,
        icon: data.icon,
      })
    },
    { 
      id: 2, 
      title: '📅 Booking Realtime', 
      icon: '📅', 
      getData: () => ({
        today: (store.get('bookings') || []).filter((b: any) => b.date === new Date().toISOString().split('T')[0]).length,
        tomorrow: (store.get('bookings') || []).filter((b: any) => b.date === new Date(Date.now() + 86400000).toISOString().split('T')[0]).length,
      }),
      render: (data: any) => ({
        title: 'Booking Hari Ini',
        subtitle: `${data.today} Bookings · ${data.tomorrow} Besok`,
        icon: '📅',
      })
    },
    { 
      id: 3, 
      title: '⚠️ K3 & Safety', 
      icon: '⚠️',       getData: () => store.getK3Progress(),
      render: (data: any) => ({
        title: 'K3 Reports',
        subtitle: `${data.pending} Pending · ${data.inProgress} Action · ${data.resolved} Resolved`,
        icon: '⚠️',
      })
    },
    { 
      id: 4, 
      title: '🌤️ Weather & Mitigation', 
      icon: '🌤️', 
      getData: () => store.getWeatherMitigations(),
      render: (data: any) => ({
        title: data.warning || 'Weather Update',
        subtitle: `${data.temperature}°C · ${data.condition.toUpperCase()}`,
        icon: data.condition === 'rain' ? '🌧️' : data.condition === 'storm' ? '⛈️' : '☀️',
        alert: data.mitigations,
      })
    },
    { 
      id: 5, 
      title: '👔 Command Center Info', 
      icon: '👔', 
      getData: () => ({
        title: 'Info Management',
        items: [
          '📌 CEO Meeting with Investors - Room A (14:00)',
          '📌 Foundation Visit - Lobby (10:00)',
          '📌 Board Meeting - Room B (16:00)',
        ],
      }),
      render: (data: any) => ({
        title: data.title,
        subtitle: `${data.items.length} Active Events`,
        icon: '👔',
        list: data.items,
      })
    },
    { 
      id: 6, 
      title: '🏢 Info Umum', 
      icon: '🏢', 
      getData: () => ({
        title: 'Info Umum',
        items: [
          '📌 Rapat Mingguan - R. Serbaguna (08:00)',
          '📌 Koordinasi Departemen - Lobby (13:00)',
          '📌 Training K3 - Aula (15:00)',
        ],
      }),      render: (data: any) => ({
        title: data.title,
        subtitle: `${data.items.length} Tasks Today`,
        icon: '🏢',
        list: data.items,
      })
    },
    { 
      id: 7, 
      title: '💬 Ucapan Kabar', 
      icon: '💬', 
      getData: () => ({
        title: 'Ucapan Kabar',
        items: [
          '🎂 Birthday: Bapak Hanung (Today)',
          '🎉 Anniversary: PT. Dream OS (Tomorrow)',
          '🏥 Get Well: Staff Maintenance',
        ],
      }),
      render: (data: any) => ({
        title: data.title,
        subtitle: `${data.items.length} Announcements`,
        icon: '💬',
        list: data.items,
      })
    },
  ];

  const modules = [
    { name: 'Command Center', icon: '⚡', path: '/modules/command' },
    { name: 'Form Booking', icon: '📅', path: '/modules/booking' },
    { name: 'K3', icon: '⚠️', path: '/modules/k3' },
    { name: 'Sekuriti', icon: '🛡️', path: '/modules/security' },
    { name: 'Janitor Indoor', icon: '🧹', path: '/modules/janitor' },
    { name: 'Janitor Outdoor', icon: '🌳', path: '/modules/janitor' },
    { name: 'Stok', icon: '📦', path: '/modules/stok' },
    { name: 'Maintenance', icon: '🔧', path: '/modules/maintenance' },
    { name: 'Asset', icon: '🗄️', path: '/modules/inventaris' },
  ];

  // Initialize
  useEffect(() => {
    const init = async () => {
      // Initialize TinyGo
      const ready = await initTinyGo();
      setTinyGoReady(ready);
      
      if (ready) {
        const stats = await getSystemPerformance();
        setSystemStats(stats);      }

      // Log audit
      GhostShield.logAudit('DASHBOARD_LOAD', { user });

      // Load slide data
      updateSlideData();
    };

    init();
  }, []);

  // Update slide data every 10 seconds
  useEffect(() => {
    const updateInterval = setInterval(updateSlideData, 10000);
    return () => clearInterval(updateInterval);
  }, []);

  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const updateSlideData = () => {
    const data = slides.map((slide) => ({
      ...slide,
      data: slide.getData(),
      rendered: slide.render(slide.getData()),
    }));
    setSlideData(data);
  };

  useEffect(() => {
    const session = sessionStorage.getItem('dream_session');
    const sessionUser = sessionStorage.getItem('dream_user');
    if (!session) router.push('/login');
    else if (sessionUser) setUser(sessionUser);
  }, [router]);

  const handleNav = (page: string) => {
    setActiveNav(page);
    const routes: Record<string, string> = {
      home: '/dashboard',
      profile: '/profile',
      qr: '/qr',
      alerts: '/alerts',
      settings: '/settings',    };
    if (page !== 'home') router.push(routes[page]);
  };

  const handleModuleClick = (path: string) => router.push(path);

  const currentSlideData = slideData[currentSlide]?.rendered || { title: 'Loading...', subtitle: '', icon: '⏳' };

  return (
    <div style={{ minHeight: '100vh', background: '#F2F2F7', paddingBottom: '120px' }}>
      {/* Header */}
      <header style={{ background: 'white', padding: '30px 20px 20px', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img src="/assets/img/icon-192.png" alt="Dream OS" style={{ width: '80px', height: '80px', borderRadius: '22px', boxShadow: '0 8px 30px rgba(0,0,0,0.15)', marginBottom: '15px' }} />
          <div style={{ fontFamily: 'Amiri, serif', fontSize: '32px', color: '#10b981', marginBottom: '8px' }}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>
          <div style={{ fontFamily: 'Amiri, serif', fontSize: '18px', color: 'rgba(16,185,129,0.8)', marginBottom: '15px' }}>اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ</div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1c1c1e', marginBottom: '5px' }}>DREAM OS v14.0 PRO</h1>
          <p style={{ fontSize: '14px', color: '#10b981', fontWeight: '600', marginBottom: '5px' }}>
            Global Immunity System Active {tinyGoReady && '🐹'}
          </p>
          <p style={{ fontSize: '12px', color: '#8e8e93' }}>
            🧬 Girangati: FULLY_OPERATIONAL
            {tinyGoReady && <span style={{ color: '#10b981', marginLeft: '8px' }}>· 🐹 WASM ACTIVE</span>}
          </p>
        </div>
        
        {/* Welcome */}
        <div style={{ textAlign: 'center', marginTop: '15px', padding: '12px', background: '#f8f8fa', borderRadius: '16px' }}>
          <span style={{ color: '#8e8e93', fontSize: '13px' }}>Welcome, </span>
          <span style={{ color: '#10b981', fontWeight: '700', fontSize: '15px' }}>{user}</span>
        </div>
      </header>

      {/* 7 Integrated Slides Carousel */}
      <div style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.95), rgba(2,6,23,0.9))', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '28px', padding: '24px', margin: '24px 15px', boxShadow: '0 12px 48px rgba(16,185,129,0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div style={{ color: '#10b981', fontSize: '15px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {currentSlideData.icon} {slideData[currentSlide]?.title || 'Loading...'}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)} style={{ background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', padding: '10px 16px', borderRadius: '12px', fontSize: '13px', cursor: 'pointer' }}>◀</button>
            <button onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)} style={{ background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', padding: '10px 16px', borderRadius: '12px', fontSize: '13px', cursor: 'pointer' }}>▶</button>
          </div>
        </div>
        <div style={{ minHeight: '240px', background: 'linear-gradient(135deg, rgba(2,6,23,0.95), rgba(15,23,42,0.9))', borderRadius: '22px', padding: '30px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(16,185,129,0.15)' }}>
          <div style={{ fontSize: '72px', marginBottom: '18px' }}>{currentSlideData.icon}</div>
          <div style={{ color: '#10b981', fontSize: '22px', fontWeight: '700', marginBottom: '10px' }}>{currentSlideData.title}</div>
          <div style={{ color: 'rgba(148,163,184,0.85)', fontSize: '15px' }}>{currentSlideData.subtitle}</div>
          {currentSlideData.alert && (
            <div style={{ marginTop: '20px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '16px', padding: '15px', width: '100%' }}>              <div style={{ color: '#ef4444', fontSize: '11px', fontWeight: '700', marginBottom: '10px' }}>⚠️ MITIGATION ALERT</div>
              {currentSlideData.alert.map((item: string, i: number) => (
                <div key={i} style={{ color: '#fca5a5', fontSize: '10px', marginBottom: '5px', textAlign: 'left' }}>{item}</div>
              ))}
            </div>
          )}
          {currentSlideData.list && (
            <div style={{ marginTop: '20px', width: '100%' }}>
              {currentSlideData.list.map((item: string, i: number) => (
                <div key={i} style={{ color: 'rgba(148,163,184,0.85)', fontSize: '11px', marginBottom: '8px', textAlign: 'left', padding: '8px', background: 'rgba(16,185,129,0.05)', borderRadius: '8px' }}>{item}</div>
              ))}
            </div>
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrentSlide(i)} style={{ width: '12px', height: '12px', borderRadius: '50%', border: '2px solid rgba(16,185,129,0.4)', background: i === currentSlide ? '#10b981' : 'transparent', cursor: 'pointer', transition: 'all 0.3s' }} />
          ))}
        </div>
      </div>

      {/* Module Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', padding: '16px' }}>
        {modules.map((mod) => (
          <div key={mod.name} onClick={() => handleModuleClick(mod.path)} className="module-card">
            <div className="module-icon">{mod.icon}</div>
            <div className="module-label">{mod.name}</div>
          </div>
        ))}
      </div>

      {/* iOS Dock Navigation */}
      <nav className="ios-dock">
        <div onClick={() => { setActiveNav('home'); router.push('/dashboard'); }} className={`dock-item ${activeNav === 'home' ? 'active' : ''}`}>
          <span className="dock-icon">🏠</span>
          <span>HOME</span>
        </div>
        <div onClick={() => { setActiveNav('profile'); router.push('/profile'); }} className={`dock-item ${activeNav === 'profile' ? 'active' : ''}`}>
          <span className="dock-icon">👤</span>
          <span>PROFILE</span>
        </div>
        <div className="dock-center">
          <span style={{ fontSize: '28px' }}>📷</span>
        </div>
        <div onClick={() => { setActiveNav('about'); router.push('/about'); }} className={`dock-item ${activeNav === 'about' ? 'active' : ''}`}>
          <span className="dock-icon">ℹ️</span>
          <span>ABOUT</span>
        </div>
        <div onClick={() => { setActiveNav('setting'); router.push('/settings'); }} className={`dock-item ${activeNav === 'setting' ? 'active' : ''}`}>
          <span className="dock-icon">⚙️</span>          <span>SETTING</span>
        </div>
      </nav>
    </div>
  );
}
