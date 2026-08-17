import React, { useState } from 'react';
import CityCanvas from './components/CityCanvas';
import UIOverlay from './components/UIOverlay';
import LoadingScreen from './components/LoadingScreen';
import OptimizationModal from './components/OptimizationModal';

export default function App() {
  const [currentPreset, setCurrentPreset] = useState('skyline');
  const [cameraTarget, setCameraTarget] = useState({
    position: [250, 140, 250],
    lookAt: [0, 20, 0]
  });
  const [timeOfDay, setTimeOfDay] = useState('day');
  const [shadowsEnabled, setShadowsEnabled] = useState(true);
  const [fogEnabled, setFogEnabled] = useState(true);
  const [autoRotate, setAutoRotate] = useState(false);
  const [userHideHotspots, setUserHideHotspots] = useState(false);
  const [selectedPOI, setSelectedPOI] = useState(null);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const handleSelectPreset = (preset) => {
    setCurrentPreset(preset.id);
    setCameraTarget({ position: preset.position, lookAt: preset.lookAt });
  };

  const handleDoubleClickPoint = (point) => {
    setCurrentPreset('custom');
    setCameraTarget({
      position: [point.x + 20, point.y + 15, point.z + 20],
      lookAt: [point.x, point.y, point.z]
    });
  };

  const handleZoomIn = () => {
    setCameraTarget((prev) => ({
      position: [prev.position[0] * 0.7, prev.position[1] * 0.7, prev.position[2] * 0.7],
      lookAt: prev.lookAt
    }));
  };

  const handleZoomOut = () => {
    setCameraTarget((prev) => ({
      position: [prev.position[0] * 1.35, prev.position[1] * 1.35, prev.position[2] * 1.35],
      lookAt: prev.lookAt
    }));
  };

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      {/* 3D Loading Progress Screen */}
      <LoadingScreen />

      {/* 3D WebGL Canvas Scene */}
      <CityCanvas
        cameraTarget={cameraTarget}
        timeOfDay={timeOfDay}
        shadowsEnabled={shadowsEnabled}
        fogEnabled={fogEnabled}
        autoRotate={autoRotate}
        hideHotspots={isReportOpen || userHideHotspots}
        onSelectPOI={(poi) => setSelectedPOI(poi)}
        onDoubleClickPoint={handleDoubleClickPoint}
      />

      {/* Glassmorphic UI HUD Controls */}
      <UIOverlay
        currentPreset={currentPreset}
        onSelectPreset={handleSelectPreset}
        timeOfDay={timeOfDay}
        onChangeTimeOfDay={(mode) => setTimeOfDay(mode)}
        shadowsEnabled={shadowsEnabled}
        onToggleShadows={() => setShadowsEnabled((prev) => !prev)}
        fogEnabled={fogEnabled}
        onToggleFog={() => setFogEnabled((prev) => !prev)}
        autoRotate={autoRotate}
        onToggleAutoRotate={() => setAutoRotate((prev) => !prev)}
        hideHotspots={userHideHotspots}
        onToggleHotspots={() => setUserHideHotspots((prev) => !prev)}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        selectedPOI={selectedPOI}
        onClosePOI={() => setSelectedPOI(null)}
        onOpenReport={() => setIsReportOpen(true)}
      />

      {/* Optimization Metrics & Techniques Modal */}
      <OptimizationModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} />
    </div>
  );
}
