import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, RoundedBox, MeshTransmissionMaterial, Sphere, Cylinder, Box } from '@react-three/drei';
import * as THREE from 'three';

function AdvancedBulletCamera() {
  const group = useRef();
  const panTiltArm = useRef();
  const lensHousing = useRef();

  // Premium Materials
  const matGraphite = new THREE.MeshStandardMaterial({ 
    color: '#1a1a1c', roughness: 0.4, metalness: 0.6 
  });
  const matBlackMetal = new THREE.MeshStandardMaterial({ 
    color: '#080808', roughness: 0.2, metalness: 0.8 
  });
  const matSilver = new THREE.MeshStandardMaterial({ 
    color: '#a0a0a0', roughness: 0.3, metalness: 0.9 
  });
  const matLensInterior = new THREE.MeshStandardMaterial({
    color: '#020202', roughness: 0.9, metalness: 0.1
  });
  
  // LED Emissive Materials
  const matLedCyan = new THREE.MeshStandardMaterial({ 
    color: '#00ffff', emissive: '#00ffff', emissiveIntensity: 4 
  });
  const matLedRed = new THREE.MeshStandardMaterial({ 
    color: '#ff0000', emissive: '#ff0000', emissiveIntensity: 3 
  });

  useFrame((state) => {
    if (!group.current) return;
    const pointer = state.pointer || state.mouse;
    if (!pointer) return;

    // Subtle overall floating/parallax
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, (pointer.x * Math.PI) / 12, 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -(pointer.y * Math.PI) / 16, 0.05);
    
    // Smooth PTZ tracking on the mounting arm joint
    if (panTiltArm.current) {
      panTiltArm.current.rotation.y = THREE.MathUtils.lerp(panTiltArm.current.rotation.y, (pointer.x * Math.PI) / 4, 0.08);
      panTiltArm.current.rotation.z = THREE.MathUtils.lerp(panTiltArm.current.rotation.z, (pointer.y * Math.PI) / 6, 0.08);
    }
  });

  return (
    <group ref={group} position={[0, -0.5, 0]}>
      {/* Wall/Ceiling Mounting Plate */}
      <Cylinder args={[0.5, 0.6, 0.1, 32]} position={[0, 1.8, -0.5]} rotation={[Math.PI / 2, 0, 0]} material={matBlackMetal} />
      
      {/* Main Articulated Arm */}
      <Cylinder args={[0.15, 0.15, 0.6, 16]} position={[0, 1.8, -0.2]} rotation={[Math.PI / 2, 0, 0]} material={matGraphite} />
      
      {/* Swivel Joint */}
      <Sphere args={[0.25, 32, 32]} position={[0, 1.8, 0.1]} material={matSilver} />
      
      {/* Camera Body Assembly (Pans and Tilts) */}
      <group ref={panTiltArm} position={[0, 1.8, 0.1]}>
        
        {/* Arm connecting to camera belly */}
        <Cylinder args={[0.12, 0.12, 0.4, 16]} position={[0, -0.2, 0]} material={matGraphite} />
        
        {/* Main Camera Body (Bullet Shape) */}
        <group position={[0, -0.4, 0.4]}>
          
          {/* Core Cylinder */}
          <Cylinder args={[0.45, 0.45, 1.8, 32]} rotation={[Math.PI / 2, 0, 0]} material={matGraphite} />
          
          {/* Back Plate */}
          <Cylinder args={[0.46, 0.46, 0.1, 32]} position={[0, 0, -0.9]} rotation={[Math.PI / 2, 0, 0]} material={matBlackMetal} />
          
          {/* Wireless Antenna */}
          <Cylinder args={[0.04, 0.04, 0.6, 16]} position={[0.3, 0.4, -0.8]} rotation={[0.2, 0, 0.2]} material={matBlackMetal} />
          
          {/* Sun Shield / Weather Visor (Extends over the front) */}
          <Cylinder args={[0.48, 0.48, 1.6, 32, 1, false, 0, Math.PI]} position={[0, 0.02, 0.2]} rotation={[Math.PI / 2, 0, 0]} material={matBlackMetal} />
          
          {/* Front Bezel */}
          <Cylinder args={[0.46, 0.46, 0.1, 32]} position={[0, 0, 0.9]} rotation={[Math.PI / 2, 0, 0]} material={matBlackMetal} />
          
          {/* Status LED */}
          <Sphere args={[0.03, 16, 16]} position={[0, 0.52, 0.7]} material={matLedCyan} />

          {/* Lens & Glass Assembly */}
          <group ref={lensHousing} position={[0, 0, 0.9]}>
            
            {/* Dark Interior Recess */}
            <Cylinder args={[0.42, 0.42, 0.05, 32]} position={[0, 0, -0.05]} rotation={[Math.PI / 2, 0, 0]} material={matLensInterior} />
            
            {/* Central Optical Lens */}
            <Cylinder args={[0.15, 0.18, 0.1, 32]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} material={matBlackMetal} />
            <Sphere args={[0.12, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} position={[0, 0, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
               <MeshTransmissionMaterial thickness={0.5} color="#111111" ior={1.5} roughness={0} />
            </Sphere>

            {/* IR LED Ring (Night Vision Array) */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i / 12) * Math.PI * 2;
              const radius = 0.32;
              return (
                <Cylinder 
                  key={i}
                  args={[0.025, 0.025, 0.02, 16]} 
                  position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0.01]} 
                  rotation={[Math.PI / 2, 0, 0]} 
                  material={matLedRed} 
                />
              );
            })}

            {/* Main Front Glass Cover (Flat) */}
            <Cylinder args={[0.42, 0.42, 0.02, 32]} position={[0, 0, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
              <MeshTransmissionMaterial 
                thickness={0.1}
                chromaticAberration={0.05}
                anisotropy={0.3}
                distortion={0}
                color="#ffffff"
                roughness={0.02}
                clearcoat={1}
                ior={1.2}
              />
            </Cylinder>
            
          </group>
        </group>
      </group>
    </group>
  );
}

export function CCTVScene({ className }) {
  return (
    <div className={className}>
      <Canvas shadows camera={{ position: [0, 1.2, 5.5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <React.Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          
          {/* Key Light */}
          <spotLight position={[5, 10, 5]} angle={0.3} penumbra={0.8} intensity={8} castShadow color="#ffffff" />
          
          {/* Cold Blue Fill */}
          <directionalLight position={[-5, 5, -5]} intensity={3} color="#00aaff" />
          
          {/* Subtle Warm Rim Light */}
          <directionalLight position={[5, -2, 2]} intensity={2} color="#ff8800" />
          
          <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.2} floatingRange={[-0.05, 0.05]}>
            <AdvancedBulletCamera />
          </Float>
          
          <Environment preset="studio" />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
