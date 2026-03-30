"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { NeuralCore } from '@/lib/neural-core';

export default function ModulePage() {
  const params = useParams();
  const moduleId = params.id as string;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🧠 Baby Agent: Log module access
    NeuralCore.brain.learn('module_open', moduleId);
    NeuralCore.tiny.vibrate(20);
    setLoading(false);
  }, [moduleId]);

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#F2F2F7'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '4px solid #34C759',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p style={{ color: '#8E8E93' }}>Loading {moduleId}...</p>
        </div>
      </div>
    );
  }
  return (
    <div style={{ minHeight: '100vh', background: '#F2F2F7', padding: '20px', paddingBottom: '100px' }}>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1 style={{ color: '#34C759', marginBottom: '20px', textTransform: 'uppercase' }}>
          {moduleId}
        </h1>
        <p style={{ color: '#8E8E93', marginBottom: '20px' }}>
          Module loaded successfully!
        </p>
        <button 
          onClick={() => window.history.back()}
          style={{ 
            background: '#34C759',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '12px',
            cursor: 'pointer',
            fontWeight: '700'
          }}
        >
          ← Back to Dashboard
        </button>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
