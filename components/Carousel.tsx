"use client";
import { useState, useEffect } from 'react';

const slides = [
  { t: "Monitoring SIF Al-Fikri", d: "Real-time Operations Tracking" },
  { t: "Booking System", d: "Aula & Ruang Meeting Management" },
  { t: "K3 Safety Pulse", d: "Zero Incident Environment" },
  { t: "Security Shield", d: "24/7 Security Operations" },
  { t: "Janitor Workflow", d: "Indoor & Outdoor Cleaning Logs" },
  { t: "Stock Intelligence", d: "Predictive Inventory Levels" },
  { t: "Asset Tracking", d: "ISO 55001 Standard Management" }
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000); // ⏱️ TEPAT 7 DETIK
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ width: '92%', height: '150px', margin: '0 auto 20px', background: '#fff', borderRadius: '28px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 8px 25px rgba(0,0,0,0.05)', border: '0.5px solid #E5E5EA', textAlign: 'center' }}>
      <span style={{ fontSize: '10px', color: '#34C759', fontWeight: '800' }}>SLIDE {current + 1} / 7</span>
      <h3 style={{ margin: '10px 0 5px', color: '#1C1C1E' }}>{slides[current].t}</h3>
      <p style={{ fontSize: '12px', color: '#8E8E93' }}>{slides[current].d}</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', marginTop: '15px' }}>
        {slides.map((_, i) => (
          <div key={i} style={{ width: i === current ? '20px' : '6px', height: '6px', borderRadius: '3px', background: i === current ? '#34C759' : '#E5E5EA', transition: '0.3s' }}></div>
        ))}
      </div>
    </div>
  );
}
