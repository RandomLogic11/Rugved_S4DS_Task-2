import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';

export default function PerformanceMonitor() {
  const [fps, setFps] = useState(60);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId;

    const updateFPS = () => {
      const now = performance.now();
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(updateFPS);
    };

    animId = requestAnimationFrame(updateFPS);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      className="glass-panel ui-interactive"
      style={{
        padding: '8px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '0.8rem',
        fontFamily: "'JetBrains Mono', monospace"
      }}
    >
      <Activity size={16} color={fps >= 50 ? '#10b981' : fps >= 30 ? '#f59e0b' : '#ef4444'} />
      <span style={{ color: '#94a3b8' }}>FPS:</span>
      <span
        style={{
          fontWeight: 700,
          color: fps >= 50 ? '#10b981' : fps >= 30 ? '#f59e0b' : '#ef4444'
        }}
      >
        {fps}
      </span>
      <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
      <span style={{ color: '#06b6d4', fontSize: '0.75rem' }}>16.9MB GLB</span>
    </div>
  );
}
