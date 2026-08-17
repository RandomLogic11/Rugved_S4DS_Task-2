import React from 'react';
import { useProgress } from '@react-three/drei';
import { Building2, Sparkles, Cpu } from 'lucide-react';

export default function LoadingScreen() {
  const { progress, active, item, loaded, total } = useProgress();

  if (!active && progress >= 100) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'radial-gradient(circle at center, #1e1b4b 0%, #090a0f 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        color: '#ffffff',
        transition: 'opacity 0.6s ease-out',
        opacity: active || progress < 100 ? 1 : 0,
        pointerEvents: active || progress < 100 ? 'auto' : 'none'
      }}
    >
      <div
        className="glass-panel animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '460px',
          padding: '36px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}
      >
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(139, 92, 246, 0.2))',
            border: '1px solid rgba(6, 182, 212, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 24px rgba(6, 182, 212, 0.3)',
            animation: 'pulseGlow 2s infinite ease-in-out'
          }}
        >
          <Building2 size={36} color="#06b6d4" />
        </div>

        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '6px' }}>
            Manhattan 3D World
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            Decompressing Draco 3D Meshes & Shaders...
          </p>
        </div>

        {/* Progress Bar */}
        <div style={{ width: '100%' }}>
          <div
            style={{
              width: '100%',
              height: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '999px',
              overflow: 'hidden',
              position: 'relative',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${Math.round(progress)}%`,
                background: 'linear-gradient(90deg, #06b6d4, #8b5cf6)',
                borderRadius: '999px',
                transition: 'width 0.3s ease-out',
                boxShadow: '0 0 12px #06b6d4'
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '10px',
              fontSize: '0.82rem',
              color: '#94a3b8',
              fontFamily: "'JetBrains Mono', monospace"
            }}
          >
            <span>{loaded} / {total || '1'} Assets</span>
            <span style={{ color: '#06b6d4', fontWeight: 600 }}>{Math.round(progress)}%</span>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.78rem',
            color: 'rgba(255, 255, 255, 0.5)',
            background: 'rgba(255, 255, 255, 0.04)',
            padding: '6px 12px',
            borderRadius: '8px'
          }}
        >
          <Cpu size={14} color="#8b5cf6" />
          <span>Draco Geometry Decompression Engine Active</span>
        </div>
      </div>
    </div>
  );
}
