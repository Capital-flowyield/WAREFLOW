import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const smooth = (t) => t * t * (3 - 2 * t);

const seeded = (i, salt) => {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

function buildLayout(count) {
  const cols = 9;
  const zRows = [-4.8, -3.1, -1.4, 1.6, 3.3, 5.0];
  const items = [];
  for (let i = 0; i < count; i++) {
    const c = i % cols;
    const r = Math.floor(i / cols) % zRows.length;
    const r1 = seeded(i, 1);
    const r2 = seeded(i, 2);
    const r3 = seeded(i, 3);
    const r4 = seeded(i, 4);
    const stacked = i % 5 === 4;
    items.push({
      chaos: {
        p: [(r1 - 0.5) * 18, 0.4 + r2 * 4.5, -4 + (r3 - 0.5) * 10],
        rot: [r2 * Math.PI * 0.9, r4 * Math.PI * 2, (r1 - 0.5) * Math.PI * 0.7],
      },
      order: {
        p: [(c - (cols - 1) / 2) * 1.9, stacked ? 1.35 : 0.45, zRows[r]],
      },
      size: [0.95, 0.8 + r3 * 0.35, 0.95],
      amber: i % 9 === 0,
    });
  }
  return items;
}

function Boxes({ progressRef, count }) {
  const items = useMemo(() => buildLayout(count), [count]);
  const refs = useRef([]);

  useFrame(() => {
    const p = smooth(progressRef.current);
    for (let i = 0; i < items.length; i++) {
      const m = refs.current[i];
      if (!m) continue;
      const it = items[i];
      m.position.set(
        THREE.MathUtils.lerp(it.chaos.p[0], it.order.p[0], p),
        THREE.MathUtils.lerp(it.chaos.p[1], it.order.p[1], p),
        THREE.MathUtils.lerp(it.chaos.p[2], it.order.p[2], p)
      );
      m.rotation.set(it.chaos.rot[0] * (1 - p), it.chaos.rot[1] * (1 - p), it.chaos.rot[2] * (1 - p));
    }
  });

  return items.map((it, i) => (
    <mesh key={i} ref={(el) => (refs.current[i] = el)}>
      <boxGeometry args={it.size} />
      <meshStandardMaterial
        color={it.amber ? '#331803' : '#222222'}
        roughness={0.8}
        metalness={0.15}
        emissive={it.amber ? '#FF5C00' : '#000000'}
        emissiveIntensity={it.amber ? 0.55 : 0}
      />
    </mesh>
  ));
}

function Agv({ progressRef, reduced }) {
  const g = useRef();
  useFrame((state) => {
    if (!g.current) return;
    const p = smooth(progressRef.current);
    const t = state.clock.elapsedTime;
    const x = THREE.MathUtils.lerp(-8.5, 8.5, p);
    const bob = reduced ? 0 : Math.sin(t * 7) * 0.02 * (1 - p);
    g.current.position.set(x, bob, 0.1);
    g.current.rotation.z = reduced ? 0 : Math.sin(t * 3.2) * 0.05 * (1 - p);
    g.current.rotation.y = reduced ? 0 : Math.sin(t * 1.6) * 0.18 * (1 - p);
  });

  const wheels = [
    [-0.42, 0.13, 0.34],
    [0.42, 0.13, 0.34],
    [-0.42, 0.13, -0.34],
    [0.42, 0.13, -0.34],
  ];

  return (
    <group ref={g}>
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[1.2, 0.38, 0.74]} />
        <meshStandardMaterial color="#171717" roughness={0.35} metalness={0.65} />
      </mesh>
      <mesh position={[0, 0.51, 0]}>
        <boxGeometry args={[1.22, 0.05, 0.52]} />
        <meshStandardMaterial color="#FF5C00" emissive="#FF5C00" emissiveIntensity={1.8} />
      </mesh>
      <mesh position={[0.45, 0.85, 0]}>
        <boxGeometry args={[0.07, 0.85, 0.07]} />
        <meshStandardMaterial color="#242424" roughness={0.4} metalness={0.7} />
      </mesh>
      <mesh position={[0.45, 1.32, 0]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#FF8A00" emissive="#FF8A00" emissiveIntensity={3.2} />
      </mesh>
      <mesh position={[1.05, 0.85, 0]} rotation={[0, 0, -Math.PI / 2.6]}>
        <coneGeometry args={[0.5, 1.9, 24, 1, true]} />
        <meshBasicMaterial color="#FF5C00" transparent opacity={0.05} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      {wheels.map((w, i) => (
        <mesh key={i} position={w} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.14, 0.14, 0.09, 16]} />
          <meshStandardMaterial color="#0D0D0D" roughness={0.9} />
        </mesh>
      ))}
      <pointLight position={[0.45, 1.4, 0]} color="#FF6A00" intensity={7} distance={7} decay={2} />
    </group>
  );
}

function CameraRig({ progressRef, reduced }) {
  useFrame(({ camera }) => {
    const p = smooth(progressRef.current);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, reduced ? 0 : Math.sin(p * Math.PI) * 1.2, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, THREE.MathUtils.lerp(7.5, 9.4, p), 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, THREE.MathUtils.lerp(15.5, 13.2, p), 0.05);
    camera.lookAt(0, 0.6, 0);
  });
  return null;
}

export default function Scene3D() {
  const progressRef = useRef(0);
  const settings = useMemo(() => {
    if (typeof window === 'undefined') return { mobile: false, reduced: false };
    return {
      mobile: window.matchMedia('(max-width: 768px)').matches,
      reduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    };
  }, []);
  const count = settings.mobile ? 27 : 54;

  useEffect(() => {
    if (settings.reduced) {
      progressRef.current = 1;
      return undefined;
    }
    const st = ScrollTrigger.create({
      trigger: '#transformation-track',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
    });
    ScrollTrigger.refresh();
    window.__wf = { st, progressRef };
    return () => st.kill();
  }, [settings.reduced]);

  return (
    <div data-testid="scene-3d" className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <Canvas
        dpr={settings.mobile ? [1, 1.5] : [1, 2]}
        camera={{ position: [0, 7.5, 15.5], fov: 42, near: 0.1, far: 70 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <fog attach="fog" args={['#080808', 14, 34]} />
        <ambientLight intensity={0.35} />
        <directionalLight position={[6, 10, 4]} intensity={0.8} color="#FFF4E6" />
        <pointLight position={[-8, 8, -3]} color="#FF5C00" intensity={90} distance={32} decay={2} />
        <pointLight position={[8, 8, 3]} color="#FF8A00" intensity={60} distance={30} decay={2} />
        <gridHelper args={[48, 48, '#2E2E2E', '#161616']} position={[0, 0.01, 0]} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
          <planeGeometry args={[80, 80]} />
          <meshStandardMaterial color="#0A0A0A" roughness={1} metalness={0} />
        </mesh>
        <Boxes progressRef={progressRef} count={count} />
        <Agv progressRef={progressRef} reduced={settings.reduced} />
        <CameraRig progressRef={progressRef} reduced={settings.reduced} />
      </Canvas>
    </div>
  );
}
