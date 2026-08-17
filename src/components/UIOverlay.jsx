import React from 'react';
import {
  Sun,
  Moon,
  Sunset,
  Camera,
  Eye,
  Building,
  RotateCw,
  CloudFog,
  Sparkles,
  BarChart2,
  X,
  MapPin,
  Compass,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import PerformanceMonitor from './PerformanceMonitor';

export default function UIOverlay({
  currentPreset,
  onSelectPreset,
  timeOfDay,
  onChangeTimeOfDay,
  shadowsEnabled,
  onToggleShadows,
  fogEnabled,
  onToggleFog,
  autoRotate,
  onToggleAutoRotate,
  hideHotspots,
  onToggleHotspots,
  onZoomIn,
  onZoomOut,
  selectedPOI,
  onClosePOI,
  onOpenReport
}) {
  const cameraPresets = [
    { id: 'skyline', label: 'Skyline', icon: Eye, position: [160, 100, 160], lookAt: [0, 0, 0] },
    { id: 'street', label: 'Street View', icon: Compass, position: [-25, 4, -10], lookAt: [-25, 2, -15] },
    { id: 'downtown', label: 'Downtown', icon: Building, position: [0, 60, 100], lookAt: [0, 20, 45] },
    { id: 'birdsEye', label: 'Bird\'s Eye', icon: Camera, position: [1, 320, 1], lookAt: [0, 0, 0] },
    { id: 'timesSquare', label: 'Times Square', icon: Sparkles, position: [-35, 25, 10], lookAt: [-25, 8, -10] }
  ];

  return (
    <div className="ui-layer">
      {/* Top Header Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        {/* Title Badge */}
        <div
          className="glass-panel ui-interactive"
          style={{
            padding: '10px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              boxShadow: '0 0 10px #10b981'
            }}
          />
          <div>
            <h1 style={{ fontSize: '1.05rem', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.2 }}>
              Manhattan 3D World
            </h1>
            <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Web-Based Interactive City</span>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <PerformanceMonitor />
          <button
            className="glass-btn ui-interactive"
            onClick={onOpenReport}
            style={{
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(139, 92, 246, 0.2))',
              borderColor: 'rgba(6, 182, 212, 0.4)'
            }}
          >
            <BarChart2 size={16} color="#06b6d4" />
            <span>Optimization Metrics</span>
          </button>
        </div>
      </div>

      {/* POI Landmark Card Popup */}
      {selectedPOI && (
        <div
          className="ui-interactive animate-fade-in"
          style={{
            alignSelf: 'center',
            width: '100%',
            maxWidth: '420px',
            margin: '12px 0'
          }}
        >
          <div
            className="glass-panel"
            style={{
              padding: '20px',
              background: 'rgba(15, 23, 42, 0.88)',
              borderColor: '#06b6d4',
              boxShadow: '0 16px 36px rgba(6, 182, 212, 0.25)',
              position: 'relative'
            }}
          >
            <button
              className="glass-btn"
              onClick={onClosePOI}
              style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                padding: '6px',
                borderRadius: '50%'
              }}
            >
              <X size={16} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  background: 'rgba(6, 182, 212, 0.2)',
                  color: '#06b6d4',
                  padding: '3px 8px',
                  borderRadius: '6px'
                }}
              >
                {selectedPOI.category || 'Landmark'}
              </span>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={18} color="#06b6d4" /> {selectedPOI.name}
            </h3>

            <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '12px' }}>
              {selectedPOI.description}
            </p>

            {selectedPOI.height && (
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontFamily: "'JetBrains Mono', monospace" }}>
                Height: <span style={{ color: '#f8fafc', fontWeight: 600 }}>{selectedPOI.height}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Floating Navigation Toolbar */}
      <div
        className="glass-panel ui-interactive animate-fade-in"
        style={{
          alignSelf: 'center',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          maxWidth: '100%'
        }}
      >
        {/* Camera Viewports */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginRight: '4px' }}>
            Views:
          </span>
          {cameraPresets.map((preset) => {
            const Icon = preset.icon;
            const isActive = currentPreset === preset.id;
            return (
              <button
                key={preset.id}
                className={`glass-btn ${isActive ? 'active' : ''}`}
                onClick={() => onSelectPreset(preset)}
              >
                <Icon size={15} />
                <span>{preset.label}</span>
              </button>
            );
          })}
        </div>

        <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255,255,255,0.15)' }} />

        {/* Time of Day */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            className={`glass-btn ${timeOfDay === 'day' ? 'active' : ''}`}
            onClick={() => onChangeTimeOfDay('day')}
            title="Daytime Light"
          >
            <Sun size={15} color={timeOfDay === 'day' ? '#f59e0b' : 'currentColor'} />
          </button>
          <button
            className={`glass-btn ${timeOfDay === 'sunset' ? 'active' : ''}`}
            onClick={() => onChangeTimeOfDay('sunset')}
            title="Sunset Light"
          >
            <Sunset size={15} color={timeOfDay === 'sunset' ? '#f97316' : 'currentColor'} />
          </button>
          <button
            className={`glass-btn ${timeOfDay === 'night' ? 'active' : ''}`}
            onClick={() => onChangeTimeOfDay('night')}
            title="Night Mode"
          >
            <Moon size={15} color={timeOfDay === 'night' ? '#38bdf8' : 'currentColor'} />
          </button>
        </div>

        <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255,255,255,0.15)' }} />

        {/* Scene Toggles & Manual Zoom Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            className="glass-btn"
            onClick={onZoomIn}
            title="Zoom In"
          >
            <ZoomIn size={15} />
          </button>
          <button
            className="glass-btn"
            onClick={onZoomOut}
            title="Zoom Out"
          >
            <ZoomOut size={15} />
          </button>

          <div style={{ width: '1px', height: '18px', backgroundColor: 'rgba(255,255,255,0.15)', margin: '0 2px' }} />

          <button
            className={`glass-btn ${!hideHotspots ? 'active' : ''}`}
            onClick={onToggleHotspots}
            title="Toggle Landmark Markers"
          >
            <MapPin size={15} />
          </button>
          <button
            className={`glass-btn ${fogEnabled ? 'active' : ''}`}
            onClick={onToggleFog}
            title="Toggle Fog Effect"
          >
            <CloudFog size={15} />
          </button>
          <button
            className={`glass-btn ${autoRotate ? 'active' : ''}`}
            onClick={onToggleAutoRotate}
            title="Toggle Auto Rotation"
          >
            <RotateCw size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
