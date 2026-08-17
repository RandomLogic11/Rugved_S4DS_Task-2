import React, { useRef, useEffect, useState, Suspense, Component } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, PerspectiveCamera, Sky } from '@react-three/drei';
import * as THREE from 'three';

const DRACO_DECODER_URL = 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/';

// Preload GLTF model with Draco support
useGLTF.preload('/manhattan_optimized.glb', DRACO_DECODER_URL);

// React Error Boundary to catch WebGL / GLTF load failures gracefully
class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('3D Canvas Render Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: '#ef4444', padding: '20px', textAlign: 'center', background: '#090a0f', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>3D Scene Error</h3>
          <p style={{ color: '#94a3b8', maxWidth: '500px' }}>{this.state.error?.message || 'Failed to render 3D canvas.'}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// Landmark Points of Interest (POIs) calibrated directly to 3D model geometry
export const POI_LANDMARKS = [
  {
    id: 'esb',
    name: 'Empire State Building',
    height: '443m / 1,454 ft',
    description: 'Iconic 102-story Art Deco skyscraper in Midtown Manhattan, completed in 1931.',
    position: [0, 12, -2],
    category: 'Architecture'
  },
  {
    id: 'owtc',
    name: 'One World Trade Center',
    height: '541m / 1,776 ft',
    description: 'The tallest building in the Western Hemisphere, standing at a symbolic 1,776 feet.',
    position: [-42, 16, 2],
    category: 'Landmark'
  },
  {
    id: 'chrysler',
    name: 'Chrysler Building',
    height: '319m / 1,046 ft',
    description: 'Masterpiece of Art Deco architecture famous for its terraced crown and eagle gargoyles.',
    position: [18, 12, -8],
    category: 'Architecture'
  },
  {
    id: 'centralpark',
    name: 'Central Park',
    area: '843 Acres',
    description: 'Urban oasis situated between Upper West & Upper East sides of Manhattan.',
    position: [-35, 4, -28],
    category: 'Park & Nature'
  },
  {
    id: 'timesSquare',
    name: 'Times Square',
    vibe: 'Bustling Commercial Hub',
    description: 'Major commercial intersection, tourist destination, and entertainment center.',
    position: [-12, 6, -10],
    category: 'District'
  }
];

// One-shot Lerp Camera Rig (Stops lerping once target is reached so OrbitControls is 100% free)
function CameraRig({ targetPosition, targetLookAt, controlsRef }) {
  const { camera } = useThree();
  const isAnimating = useRef(false);

  useEffect(() => {
    if (targetPosition) {
      isAnimating.current = true;
    }
  }, [targetPosition, targetLookAt]);

  useFrame((state, delta) => {
    if (isAnimating.current && targetPosition && targetLookAt && controlsRef?.current) {
      const posVec = new THREE.Vector3(...targetPosition);
      const lookVec = new THREE.Vector3(...targetLookAt);

      camera.position.lerp(posVec, delta * 5);
      controlsRef.current.target.lerp(lookVec, delta * 5);
      controlsRef.current.update();

      if (camera.position.distanceTo(posVec) < 0.5) {
        isAnimating.current = false;
      }
    }
  });

  return null;
}

// Full 3D Manhattan City Model Component
function ManhattanModel({ shadowsEnabled, onDoubleClickPoint }) {
  const { scene } = useGLTF('/manhattan_optimized.glb', DRACO_DECODER_URL);

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = shadowsEnabled;
          child.receiveShadow = shadowsEnabled;
          child.frustumCulled = false;
          if (child.material) {
            child.material.side = THREE.DoubleSide;
            child.material.roughness = 0.5;
            child.material.metalness = 0.1;
            child.material.needsUpdate = true;
          }
        }
      });
    }
  }, [scene, shadowsEnabled]);

  return (
    <primitive
      object={scene}
      scale={[25, 25, 25]}
      position={[0, -10, 0]}
      onDoubleClick={(e) => {
        e.stopPropagation();
        if (e.point && onDoubleClickPoint) {
          onDoubleClickPoint(e.point);
        }
      }}
    />
  );
}

export default function CityCanvas({
  cameraTarget,
  timeOfDay,
  shadowsEnabled,
  fogEnabled,
  autoRotate,
  hideHotspots,
  onSelectPOI,
  onDoubleClickPoint
}) {
  const controlsRef = useRef();

  // Lighting & Background configurations based on Time of Day
  const atmosphereSettings = {
    day: {
      sunPos: [200, 300, 150],
      sunIntensity: 3.2,
      ambientIntensity: 1.2,
      hemiSkyColor: '#ffffff',
      hemiGroundColor: '#475569',
      sunColor: '#ffffff',
      skyBg: 'radial-gradient(circle at center, #38bdf8 0%, #0284c7 100%)',
      fogColor: '#93c5fd',
      fogDensity: 0.0001,
      turbidity: 3,
      rayleigh: 0.3,
      mieCoefficient: 0.003,
      mieDirectionalG: 0.7
    },
    sunset: {
      sunPos: [300, 30, -200],
      sunIntensity: 4.0,
      ambientIntensity: 1.0,
      hemiSkyColor: '#f97316',
      hemiGroundColor: '#1e1b4b',
      sunColor: '#ea580c',
      skyBg: 'radial-gradient(circle at center, #7c2d12 0%, #311005 100%)',
      fogColor: '#7c2d12',
      fogDensity: 0.0002,
      turbidity: 10,
      rayleigh: 3.0,
      mieCoefficient: 0.04,
      mieDirectionalG: 0.8
    },
    night: {
      sunPos: [-150, -50, -100],
      sunIntensity: 0.8,
      ambientIntensity: 0.5,
      hemiSkyColor: '#38bdf8',
      hemiGroundColor: '#0f172a',
      sunColor: '#06b6d4',
      skyBg: 'radial-gradient(circle at center, #1e293b 0%, #090d16 100%)',
      fogColor: '#0f172a',
      fogDensity: 0.0003,
      turbidity: 20,
      rayleigh: 0.1,
      mieCoefficient: 0.1,
      mieDirectionalG: 0.95
    }
  };

  const currentAtmo = atmosphereSettings[timeOfDay] || atmosphereSettings.day;

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: currentAtmo.skyBg, transition: 'background 0.8s ease' }}>
      <CanvasErrorBoundary>
        <Canvas
          shadows={shadowsEnabled}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: timeOfDay === 'night' ? 1.0 : 1.25
          }}
        >
          <PerspectiveCamera makeDefault position={[160, 90, 160]} fov={45} far={8000} near={0.1} />
          
          <CameraRig
            targetPosition={cameraTarget?.position}
            targetLookAt={cameraTarget?.lookAt}
            controlsRef={controlsRef}
          />

          {/* Dynamic Sky */}
          <Sky
            distance={450000}
            sunPosition={currentAtmo.sunPos}
            turbidity={currentAtmo.turbidity}
            rayleigh={currentAtmo.rayleigh}
            mieCoefficient={currentAtmo.mieCoefficient}
            mieDirectionalG={currentAtmo.mieDirectionalG}
          />

          {/* Light Fog */}
          {fogEnabled && (
            <fogExp2 attach="fog" color={currentAtmo.fogColor} density={currentAtmo.fogDensity} />
          )}

          {/* Hemisphere Lighting */}
          <hemisphereLight
            skyColor={currentAtmo.hemiSkyColor}
            groundColor={currentAtmo.hemiGroundColor}
            intensity={currentAtmo.ambientIntensity}
          />
          <ambientLight intensity={0.5} />
          <directionalLight
            position={currentAtmo.sunPos}
            intensity={currentAtmo.sunIntensity}
            color={currentAtmo.sunColor}
            castShadow={shadowsEnabled}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={1000}
            shadow-camera-left={-250}
            shadow-camera-right={250}
            shadow-camera-top={250}
            shadow-camera-bottom={-250}
          />

          {/* 3D Manhattan Model */}
          <Suspense fallback={null}>
            <ManhattanModel shadowsEnabled={shadowsEnabled} onDoubleClickPoint={onDoubleClickPoint} />

            {/* Interactive 3D POI Landmark Hotspots with Occlusion */}
            {!hideHotspots && POI_LANDMARKS.map((poi) => (
              <group key={poi.id} position={poi.position}>
                <Html occlude center zIndexRange={[10, 0]} style={{ pointerEvents: 'auto' }}>
                  <button
                    className="poi-marker"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectPOI(poi);
                    }}
                    title={poi.name}
                  >
                    📍
                  </button>
                </Html>
              </group>
            ))}
          </Suspense>

          {/* Orbit Controls (Capped at ground level so camera never goes under the model) */}
          <OrbitControls
            ref={controlsRef}
            enableDamping
            dampingFactor={0.1}
            enablePan={true}
            screenSpacePanning={true}
            rotateSpeed={1.0}
            zoomSpeed={1.4}
            panSpeed={1.4}
            minPolarAngle={0.01}
            maxPolarAngle={Math.PI / 2 - 0.05}
            minDistance={0.5}
            maxDistance={3000}
            autoRotate={autoRotate}
            autoRotateSpeed={0.8}
          />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}



