import React from 'react';
import { X, Cpu, Zap, ShieldCheck, BarChart3, Download, Layers } from 'lucide-react';

export default function OptimizationModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.3s ease-out'
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '85vh',
          overflowY: 'auto',
          padding: '28px',
          pointerEvents: 'auto',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(6,182,212,0.2), rgba(139,92,246,0.2))',
                border: '1px solid rgba(6,182,212,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Zap size={22} color="#06b6d4" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Performance & Optimization Report</h2>
              <p style={{ fontSize: '0.84rem', color: '#94a3b8' }}>Techniques & Metrics Summary for Task 2</p>
            </div>
          </div>
          <button className="glass-btn" onClick={onClose} style={{ padding: '8px' }}>
            <X size={18} />
          </button>
        </div>

        {/* Key Metrics Comparison Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat( auto-fit, minmax(180px, 1fr) )', gap: '12px', marginBottom: '24px' }}>
          <div className="glass-panel" style={{ padding: '16px', background: 'rgba(255,255,255,0.03)' }}>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '4px' }}>Original File Size</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ef4444' }}>519.4 MB</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Raw GLB Asset</div>
          </div>

          <div className="glass-panel" style={{ padding: '16px', background: 'rgba(6,182,212,0.08)', borderColor: 'rgba(6,182,212,0.3)' }}>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '4px' }}>Optimized File Size</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#10b981' }}>16.94 MB</div>
            <div style={{ fontSize: '0.75rem', color: '#06b6d4', fontWeight: 600 }}>96.7% Reduction</div>
          </div>

          <div className="glass-panel" style={{ padding: '16px', background: 'rgba(255,255,255,0.03)' }}>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '4px' }}>Target Framerate</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#8b5cf6' }}>60 FPS</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Smooth Orbit Rendering</div>
          </div>
        </div>

        {/* Implemented Techniques List */}
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Layers size={18} color="#06b6d4" /> Implemented Optimization Techniques
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px' }}>
            <Cpu size={20} color="#06b6d4" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ fontSize: '0.9rem', color: '#f8fafc' }}>Draco Mesh Geometry Compression</strong>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '2px' }}>
                Applied Google Draco quantization to compress vertex positions, normals, and UVs, reducing payload from 519MB to 16.9MB.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px' }}>
            <BarChart3 size={20} color="#8b5cf6" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ fontSize: '0.9rem', color: '#f8fafc' }}>Device Pixel Ratio (DPR) Scaling</strong>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '2px' }}>
                Capped canvas DPR to <code style={{ color: '#06b6d4' }}>[1, 1.5]</code> to avoid rendering bottleneck on high-res Retina and 4K displays.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px' }}>
            <ShieldCheck size={20} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ fontSize: '0.9rem', color: '#f8fafc' }}>Frustum Culling & WebGL Tone Mapping</strong>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '2px' }}>
                Enabled automatic camera frustum culling and ACESFilmic tone mapping for maximum visual fidelity at high framerates.
              </p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div style={{ textAlign: 'right' }}>
          <button className="glass-btn active" onClick={onClose}>
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
}
