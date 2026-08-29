import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { playBeep } from '../lib/sound';

gsap.registerPlugin(ScrollTrigger);

const smooth = (t) => t * t * (3 - 2 * t);

const seeded = (i, salt) => {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const Z_ROWS = [-4.8, -3.1, -1.4, 1.6, 3.3, 5.0];

const LOOSE = [
  { p: [5.5, 0.42, 0.95], rot: 0.5 },
  { p: [3.15, 0.38, 1.15], rot: -0.8 },
  { p: [5.2, 0.46, -0.85], rot: 1.2 },
];

const SLOTS = [
  [3.85, 0.42, 1.15],
  [2.9, 0.42, 1.15],
  [1.95, 0.42, 1.15],
];

const _v = new THREE.Vector3();
const _v2 = new THREE.Vector3();

function makeCardboardTexture(label) {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 256;
  const g = c.getContext('2d');
  g.fillStyle = '#AC8757';
  g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 700; i++) {
    g.fillStyle = `rgba(70, 48, 24, ${Math.random() * 0.07})`;
    g.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
  }
  const edge = g.createLinearGradient(0, 0, 0, 256);
  edge.addColorStop(0, 'rgba(255,255,255,0.08)');
  edge.addColorStop(1, 'rgba(0,0,0,0.18)');
  g.fillStyle = edge;
  g.fillRect(0, 0, 256, 256);
  g.fillStyle = 'rgba(206, 176, 128, 0.9)';
  g.fillRect(114, 0, 26, 256);
  g.fillStyle = 'rgba(0,0,0,0.12)';
  g.fillRect(114, 0, 2, 256);
  g.fillRect(138, 0, 2, 256);
  if (label) {
    g.fillStyle = '#EDEDE6';
    g.fillRect(160, 150, 70, 52);
    g.fillStyle = '#141414';
    let x = 166;
    while (x < 222) {
      const w = 1 + Math.floor(Math.random() * 3);
      g.fillRect(x, 158, w, 26);
      x += w + 1 + Math.floor(Math.random() * 3);
    }
    g.fillRect(166, 190, 48, 4);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function buildLayout(count) {
  const cols = 9;
  const items = [];
  for (let i = 0; i < count; i++) {
    const c = i % cols;
    const r = Math.floor(i / cols) % Z_ROWS.length;
    const r1 = seeded(i, 1);
    const r2 = seeded(i, 2);
    const r3 = seeded(i, 3);
    const r4 = seeded(i, 4);
    const stacked = i % 5 === 4;
    const sy = 0.55 + r3 * 0.45;
    items.push({
      chaos: {
        p: [(r1 - 0.5) * 18, 0.4 + r2 * 4.5, -4 + (r3 - 0.5) * 10],
        rot: [r2 * Math.PI * 0.9, r4 * Math.PI * 2, (r1 - 0.5) * Math.PI * 0.7],
      },
      order: {
        p: [(c - (cols - 1) / 2) * 1.9, (stacked ? 1.02 : 0.16) + sy / 2, Z_ROWS[r]],
      },
      size: [0.7 + r2 * 0.45, sy, 0.7 + r4 * 0.4],
      amber: i % 9 === 0,
    });
  }
  return items;
}

function Boxes({ progressRef, items }) {
  const refs = useRef([]);
  const texPlain = useMemo(() => makeCardboardTexture(false), []);
  const texLabel = useMemo(() => makeCardboardTexture(true), []);

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
        map={i % 3 === 2 ? texLabel : texPlain}
        roughness={0.95}
        metalness={0}
        emissive={it.amber ? '#FF5C00' : '#000000'}
        emissiveIntensity={it.amber ? 0.18 : 0}
      />
    </mesh>
  ));
}

function AmbientParcels() {
  const tex = useMemo(() => makeCardboardTexture(false), []);
  const refs = useRef([]);
  const data = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        p: [(seeded(i, 11) - 0.5) * 12, 0.8 + seeded(i, 12) * 4, -2 + (seeded(i, 13) - 0.5) * 7],
        s: 0.3 + seeded(i, 14) * 0.25,
        sp: 0.3 + seeded(i, 15) * 0.5,
        ph: seeded(i, 16) * Math.PI * 2,
        dir: i % 2 === 0 ? 1 : -1,
      })),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const scroll = typeof window !== 'undefined' ? window.scrollY : 0;
    for (let i = 0; i < data.length; i++) {
      const m = refs.current[i];
      if (!m) continue;
      const d = data[i];
      m.position.y = d.p[1] + Math.sin(t * d.sp + d.ph) * 0.35 + scroll * 0.0004 * d.dir;
      m.rotation.y = t * 0.15 * d.sp + d.ph;
      m.rotation.x = Math.sin(t * 0.2 + d.ph) * 0.15;
    }
  });

  return data.map((d, i) => (
    <mesh key={i} ref={(el) => (refs.current[i] = el)} position={d.p} scale={d.s}>
      <boxGeometry args={[1, 0.8, 1]} />
      <meshStandardMaterial map={tex} roughness={0.95} metalness={0} />
    </mesh>
  ));
}

function Pallets({ progressRef, items }) {
  const mesh = useRef();
  const mat = useRef();

  useLayoutEffect(() => {
    const dummy = new THREE.Object3D();
    items.forEach((it, i) => {
      dummy.position.set(it.order.p[0], 0.08, it.order.p[2]);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  }, [items]);

  useFrame(() => {
    if (mat.current) mat.current.opacity = smooth(progressRef.current) * 0.95;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, items.length]}>
      <boxGeometry args={[1.12, 0.14, 1.12]} />
      <meshStandardMaterial ref={mat} color="#2B1D0E" roughness={0.95} metalness={0} transparent opacity={0} />
    </instancedMesh>
  );
}

function Racks({ progressRef, rows }) {
  const uprights = useRef();
  const beams = useRef();
  const matUp = useRef();
  const matBeam = useRef();
  const counts = useMemo(() => ({ up: rows.length * 5, beam: rows.length * 2 }), [rows]);

  useLayoutEffect(() => {
    const dummy = new THREE.Object3D();
    let u = 0;
    let b = 0;
    rows.forEach((z) => {
      for (let k = 0; k < 5; k++) {
        dummy.position.set(-8.55 + k * 4.275, 1.3, z);
        dummy.updateMatrix();
        uprights.current.setMatrixAt(u, dummy.matrix);
        u += 1;
      }
      [0.05, 2.35].forEach((y) => {
        dummy.position.set(0, y, z);
        dummy.updateMatrix();
        beams.current.setMatrixAt(b, dummy.matrix);
        b += 1;
      });
    });
    uprights.current.instanceMatrix.needsUpdate = true;
    beams.current.instanceMatrix.needsUpdate = true;
  }, [rows]);

  useFrame(() => {
    const o = smooth(progressRef.current) * 0.8;
    if (matUp.current) matUp.current.opacity = o;
    if (matBeam.current) matBeam.current.opacity = o;
  });

  return (
    <>
      <instancedMesh ref={uprights} args={[undefined, undefined, counts.up]}>
        <boxGeometry args={[0.12, 2.6, 0.12]} />
        <meshStandardMaterial ref={matUp} color="#3A3A3A" roughness={0.45} metalness={0.7} transparent opacity={0} />
      </instancedMesh>
      <instancedMesh ref={beams} args={[undefined, undefined, counts.beam]}>
        <boxGeometry args={[17.4, 0.09, 0.4]} />
        <meshStandardMaterial
          ref={matBeam}
          color="#242424"
          emissive="#FF5C00"
          emissiveIntensity={0.05}
          roughness={0.45}
          metalness={0.65}
          transparent
          opacity={0}
        />
      </instancedMesh>
    </>
  );
}

function LightBeams() {
  const beams = [
    [-5.2, -3.0],
    [0, -1.2],
    [5.2, 1.4],
    [-1.5, 3.6],
  ];
  return beams.map(([x, z], i) => (
    <mesh key={i} position={[x, 5.2, z]}>
      <coneGeometry args={[2.3, 9.5, 24, 1, true]} />
      <meshBasicMaterial
        color="#FF8A00"
        transparent
        opacity={0.035}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  ));
}

function Agv({ progressRef, reduced, camRef }) {
  const root = useRef();
  const turret = useRef();
  const shoulder = useRef();
  const elbow = useRef();
  const clawL = useRef();
  const clawR = useRef();
  const ringMat = useRef();
  const hitRef = useRef();
  const parcelsRef = useRef([]);
  const busy = useRef(false);
  const grabbedOnce = useRef(false);
  const hoverRef = useRef(false);
  const slotTaken = useRef([false, false, false]);
  const dragRef = useRef(null);
  const dragMoved = useRef(false);
  const downPos = useRef([0, 0]);
  const texLabel = useMemo(() => makeCardboardTexture(true), []);

  const runSequence = (i) => {
    const P = parcelsRef.current[i];
    const slotIdx = slotTaken.current.findIndex((v) => !v);
    if (!P || slotIdx === -1) return;
    busy.current = true;
    slotTaken.current[slotIdx] = true;
    const R = root.current.position;
    const S = SLOTS[slotIdx];
    const faceP = -Math.atan2(P.position.z - R.z, P.position.x - R.x);
    const faceS = -Math.atan2(S[2] - R.z, S[0] - R.x);
    const tl = gsap.timeline({
      onComplete: () => {
        busy.current = false;
      },
    });
    tl.to(root.current.rotation, { y: faceP, duration: 0.55, ease: 'power2.inOut' }, 0)
      .to(turret.current.rotation, { y: 0, duration: 0.3 }, 0)
      .to(shoulder.current.rotation, { z: -0.55, duration: 0.55, ease: 'power2.inOut' }, 0.45)
      .to(elbow.current.rotation, { z: 0.9, duration: 0.55, ease: 'power2.inOut' }, 0.45)
      .to(clawL.current.position, { z: 0.035, duration: 0.15 }, 1.05)
      .to(clawR.current.position, { z: -0.035, duration: 0.15 }, 1.05)
      .to(P.scale, { x: 1, y: 1, z: 1, duration: 0.2 }, 1.0)
      .add(() => playBeep(1320), 1.1)
      .to(P.position, { y: 1.75, duration: 0.5, ease: 'power2.out' }, 1.2)
      .to(P.position, { x: R.x, z: R.z, duration: 0.45, ease: 'power2.inOut' }, 1.72)
      .to(root.current.rotation, { y: faceS, duration: 0.6, ease: 'power2.inOut' }, 2.2)
      .to(P.position, { x: S[0], z: S[2], duration: 0.6, ease: 'power2.inOut' }, 2.2)
      .to(P.rotation, { x: 0, y: 0, duration: 0.5, ease: 'power2.inOut' }, 2.2)
      .to(P.position, { y: S[1], duration: 0.35, ease: 'power2.in' }, 2.85)
      .add(() => {
        playBeep(880);
        P.userData.placed = true;
      }, 3.2)
      .to(clawL.current.position, { z: 0.09, duration: 0.15 }, 3.2)
      .to(clawR.current.position, { z: -0.09, duration: 0.15 }, 3.2)
      .to(shoulder.current.rotation, { z: 0.9, duration: 0.5, ease: 'power2.inOut' }, 3.4)
      .to(elbow.current.rotation, { z: -1.5, duration: 0.5, ease: 'power2.inOut' }, 3.4)
      .to(root.current.rotation, { y: 0, duration: 0.6, ease: 'power2.inOut' }, 3.7);
  };

  const assistPlace = (P, slotIdx) => {
    busy.current = true;
    slotTaken.current[slotIdx] = true;
    const S = SLOTS[slotIdx];
    const R = root.current.position;
    const face = -Math.atan2(P.position.z - R.z, P.position.x - R.x);
    const tl = gsap.timeline({
      onComplete: () => {
        busy.current = false;
      },
    });
    tl.to(root.current.rotation, { y: face, duration: 0.5, ease: 'power2.inOut' }, 0)
      .to(turret.current.rotation, { y: 0, duration: 0.3 }, 0)
      .to(shoulder.current.rotation, { z: -0.55, duration: 0.5, ease: 'power2.inOut' }, 0.35)
      .to(elbow.current.rotation, { z: 0.9, duration: 0.5, ease: 'power2.inOut' }, 0.35)
      .add(() => playBeep(1320), 0.85)
      .to(P.position, { x: S[0], y: S[1], z: S[2], duration: 0.45, ease: 'power2.inOut' }, 0.85)
      .to(P.rotation, { x: 0, y: 0, duration: 0.45, ease: 'power2.inOut' }, 0.85)
      .add(() => {
        playBeep(880);
        P.userData.placed = true;
      }, 1.3)
      .to(shoulder.current.rotation, { z: 0.9, duration: 0.45, ease: 'power2.inOut' }, 1.35)
      .to(elbow.current.rotation, { z: -1.5, duration: 0.45, ease: 'power2.inOut' }, 1.35)
      .to(root.current.rotation, { y: 0, duration: 0.5, ease: 'power2.inOut' }, 1.6);
  };

  const dropParcel = (P) => {
    P.userData.dragging = false;
    if (smooth(progressRef.current) > 0.35 || busy.current) {
      gsap.to(P.position, { y: 0.42, duration: 0.4, ease: 'bounce.out' });
      return;
    }
    let best = -1;
    let bestD = 1.7;
    SLOTS.forEach((S, i) => {
      if (slotTaken.current[i]) return;
      const d = Math.hypot(P.position.x - S[0], P.position.z - S[2]);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    if (best >= 0) {
      assistPlace(P, best);
    } else {
      gsap.to(P.position, { y: 0.42, duration: 0.4, ease: 'bounce.out' });
      busy.current = true;
      const R = root.current.position;
      const face = -Math.atan2(P.position.z - R.z, P.position.x - R.x) - root.current.rotation.y;
      gsap.to(turret.current.rotation, {
        y: face,
        duration: 0.4,
        onComplete: () => {
          gsap.to(turret.current.rotation, {
            y: 0,
            duration: 0.4,
            delay: 0.35,
            onComplete: () => {
              busy.current = false;
            },
          });
        },
      });
    }
  };

  const resetCycle = () => {
    busy.current = true;
    slotTaken.current = [false, false, false];
    const tl = gsap.timeline({
      onComplete: () => {
        busy.current = false;
      },
    });
    parcelsRef.current.forEach((P, i) => {
      if (!P) return;
      tl.to(P.scale, { x: 0.001, y: 0.001, z: 0.001, duration: 0.3, ease: 'power2.in' }, i * 0.12)
        .add(() => {
          P.position.set(LOOSE[i].p[0], LOOSE[i].p[1], LOOSE[i].p[2]);
          P.rotation.set(0, LOOSE[i].rot, 0);
          P.userData.placed = false;
        }, i * 0.12 + 0.32)
        .to(P.scale, { x: 1, y: 1, z: 1, duration: 0.35, ease: 'back.out(2)' }, i * 0.12 + 0.36);
    });
    tl.add(() => playBeep(660), 0.5);
  };

  const grab = () => {
    if (busy.current) return;
    const idx = parcelsRef.current.findIndex((P) => P && !P.userData.placed);
    if (idx === -1) {
      resetCycle();
      return;
    }
    if (!grabbedOnce.current) {
      grabbedOnce.current = true;
      window.dispatchEvent(new Event('wf:robot-grabbed'));
    }
    runSequence(idx);
  };

  useEffect(() => {
    const ray = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const floor = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.9);
    const hitP = new THREE.Vector3();
    let raf = 0;
    const setRay = (e) => {
      ndc.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
      ray.setFromCamera(ndc, camRef.current);
    };
    const testRobot = (e) => {
      if (!camRef.current || !hitRef.current) return false;
      setRay(e);
      return ray.intersectObject(hitRef.current, false).length > 0;
    };
    const pickParcel = (e) => {
      if (!camRef.current) return null;
      setRay(e);
      const targets = parcelsRef.current.filter((P) => P && !P.userData.placed && !busy.current);
      const hits = ray.intersectObjects(targets, false);
      return hits.length ? hits[0].object : null;
    };
    const onDown = (e) => {
      if (e.target.closest('button, a, input, select, textarea, label')) return;
      downPos.current = [e.clientX, e.clientY];
      dragMoved.current = false;
      const P = pickParcel(e);
      if (P) {
        dragRef.current = P;
        P.userData.dragging = true;
        document.body.style.userSelect = 'none';
        e.preventDefault();
      }
    };
    const onDragMove = (e) => {
      if (!dragRef.current || !camRef.current) return;
      if (Math.hypot(e.clientX - downPos.current[0], e.clientY - downPos.current[1]) > 6) dragMoved.current = true;
      setRay(e);
      if (ray.ray.intersectPlane(floor, hitP)) {
        dragRef.current.position.set(
          THREE.MathUtils.clamp(hitP.x, -8, 8),
          0.9,
          THREE.MathUtils.clamp(hitP.z, -4, 5)
        );
        dragRef.current.rotation.y += 0.02;
      }
    };
    const onUp = () => {
      if (dragRef.current) {
        dropParcel(dragRef.current);
        dragRef.current = null;
        document.body.style.userSelect = '';
      }
    };
    const onMove = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const h = dragRef.current ? true : testRobot(e) || pickParcel(e) !== null;
        if (h !== hoverRef.current) {
          hoverRef.current = h;
          window.dispatchEvent(new CustomEvent('wf:robot-hover', { detail: h }));
        }
      });
    };
    const onClick = (e) => {
      if (dragMoved.current) {
        dragMoved.current = false;
        return;
      }
      if (e.target.closest('button, a, input, select, textarea, label')) return;
      if (testRobot(e)) grab();
    };
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onDragMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onDragMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [camRef]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = smooth(progressRef.current);
    if (!busy.current && root.current) {
      const x = THREE.MathUtils.lerp(4.2, -6, p);
      const bob = reduced ? 0 : Math.sin(t * 7) * 0.02 * (1 - p);
      root.current.position.set(x, bob, 0.1);
      root.current.rotation.y = reduced ? 0 : Math.sin(t * 1.4) * 0.12 * (1 - p);
      root.current.rotation.z = reduced ? 0 : Math.sin(t * 3.2) * 0.04 * (1 - p);
      if (turret.current && !dragRef.current) turret.current.rotation.y = reduced ? 0 : Math.sin(t * 0.7) * 0.7;
      if (shoulder.current) shoulder.current.rotation.z = 0.9 + (reduced ? 0 : Math.sin(t * 1.2) * 0.05);
    }
    parcelsRef.current.forEach((m) => {
      if (!m || m.userData.placed || busy.current || m.userData.dragging) return;
      m.scale.setScalar(Math.max(0.001, 1 - p));
    });
    if (dragRef.current && root.current && turret.current) {
      const d = dragRef.current.position;
      turret.current.rotation.y =
        -Math.atan2(d.z - root.current.position.z, d.x - root.current.position.x) - root.current.rotation.y;
    }
    if (ringMat.current) {
      const base = grabbedOnce.current ? 0 : 0.3 + Math.sin(t * 3) * 0.15;
      ringMat.current.opacity = base * (1 - p);
    }
    if (root.current) {
      root.current.getWorldPosition(_v);
      _v.y = 0.9;
      _v.project(state.camera);
      window.__wfRobot = {
        x: (_v.x * 0.5 + 0.5) * window.innerWidth,
        y: (-_v.y * 0.5 + 0.5) * window.innerHeight,
      };
      window.__wfParcels = parcelsRef.current.map((m) => (m ? [m.position.x, m.position.y, m.position.z] : null));
      window.__wfParcelsScreen = parcelsRef.current.map((m) => {
        if (!m) return null;
        m.getWorldPosition(_v2);
        _v2.project(state.camera);
        return {
          x: (_v2.x * 0.5 + 0.5) * window.innerWidth,
          y: (-_v2.y * 0.5 + 0.5) * window.innerHeight,
        };
      });
    }
  });

  const wheels = [
    [-0.45, 0.16, 0.44],
    [0.45, 0.16, 0.44],
    [-0.45, 0.16, -0.44],
    [0.45, 0.16, -0.44],
  ];

  return (
    <>
      <group ref={root} position={[4.2, 0, 0.1]} scale={[1.2, 1.2, 1.2]}>
        <mesh position={[0, 0.34, 0]}>
          <boxGeometry args={[1.35, 0.36, 0.86]} />
          <meshStandardMaterial color="#181818" roughness={0.35} metalness={0.7} />
        </mesh>
        <mesh position={[0, 0.55, 0]}>
          <boxGeometry args={[1.1, 0.08, 0.66]} />
          <meshStandardMaterial color="#222222" roughness={0.4} metalness={0.6} />
        </mesh>
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[1.36, 0.045, 0.88]} />
          <meshStandardMaterial color="#FF5C00" emissive="#FF5C00" emissiveIntensity={0.9} />
        </mesh>
        <mesh position={[0.69, 0.34, 0]}>
          <boxGeometry args={[0.04, 0.08, 0.6]} />
          <meshStandardMaterial color="#FF5C00" emissive="#FF5C00" emissiveIntensity={2.2} />
        </mesh>
        {wheels.map((w, i) => (
          <group key={i} position={w}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.16, 0.16, 0.1, 16]} />
              <meshStandardMaterial color="#0C0C0C" roughness={0.9} />
            </mesh>
            <mesh position={[0, 0, w[2] > 0 ? 0.06 : -0.06]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.06, 0.06, 0.02, 12]} />
              <meshStandardMaterial color="#FF8A00" emissive="#FF8A00" emissiveIntensity={1.5} />
            </mesh>
          </group>
        ))}
        <mesh position={[-0.42, 1.05, 0]}>
          <boxGeometry args={[0.13, 0.95, 0.13]} />
          <meshStandardMaterial color="#242424" metalness={0.7} roughness={0.4} />
        </mesh>
        <group ref={turret} position={[-0.42, 1.56, 0]}>
          <mesh>
            <cylinderGeometry args={[0.17, 0.2, 0.16, 20]} />
            <meshStandardMaterial color="#1C1C1C" metalness={0.7} roughness={0.35} />
          </mesh>
          <mesh position={[0.16, 0.02, 0]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshStandardMaterial color="#FF8A00" emissive="#FF8A00" emissiveIntensity={3.4} />
          </mesh>
          <pointLight position={[0.2, 0.05, 0]} color="#FF7A00" intensity={5} distance={6} decay={2} />
        </group>
        <group ref={shoulder} position={[0.42, 0.62, 0]} rotation={[0, 0, 0.9]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.11, 0.11, 0.2, 16]} />
            <meshStandardMaterial color="#FF5C00" emissive="#FF5C00" emissiveIntensity={0.7} metalness={0.5} roughness={0.4} />
          </mesh>
          <mesh position={[0.32, 0, 0]}>
            <boxGeometry args={[0.68, 0.13, 0.13]} />
            <meshStandardMaterial color="#2A2A2A" metalness={0.65} roughness={0.4} />
          </mesh>
          <group ref={elbow} position={[0.64, 0, 0]} rotation={[0, 0, -1.5]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 0.16, 16]} />
              <meshStandardMaterial color="#FF8A00" emissive="#FF8A00" emissiveIntensity={0.7} />
            </mesh>
            <mesh position={[0.27, 0, 0]}>
              <boxGeometry args={[0.58, 0.1, 0.1]} />
              <meshStandardMaterial color="#333333" metalness={0.65} roughness={0.4} />
            </mesh>
            <group position={[0.56, 0, 0]}>
              <mesh ref={clawL} position={[0.05, 0, 0.09]}>
                <boxGeometry args={[0.2, 0.05, 0.05]} />
                <meshStandardMaterial color="#444444" metalness={0.7} roughness={0.35} />
              </mesh>
              <mesh ref={clawR} position={[0.05, 0, -0.09]}>
                <boxGeometry args={[0.2, 0.05, 0.05]} />
                <meshStandardMaterial color="#444444" metalness={0.7} roughness={0.35} />
              </mesh>
            </group>
          </group>
        </group>
        <mesh position={[1.0, 0.8, 0]} rotation={[0, 0, -Math.PI / 2.6]}>
          <coneGeometry args={[0.5, 1.9, 24, 1, true]} />
          <meshBasicMaterial color="#FF5C00" transparent opacity={0.05} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
        <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.15, 0.02, 8, 48]} />
          <meshBasicMaterial ref={ringMat} color="#FF5C00" transparent opacity={0.3} depthWrite={false} />
        </mesh>
        <mesh ref={hitRef} position={[0.3, 1.1, 0]}>
          <boxGeometry args={[2.8, 2.6, 2.6]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      </group>
      {LOOSE.map((l, i) => (
        <mesh key={i} ref={(el) => (parcelsRef.current[i] = el)} position={l.p} rotation={[0, l.rot, 0]}>
          <boxGeometry args={[0.85, 0.7, 0.85]} />
          <meshStandardMaterial map={texLabel} roughness={0.95} metalness={0} />
        </mesh>
      ))}
    </>
  );
}

function CameraRig({ progressRef, reduced, mobile }) {
  useFrame(({ camera }) => {
    const p = smooth(progressRef.current);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, reduced ? 0 : Math.sin(p * Math.PI) * 1.2, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, THREE.MathUtils.lerp(7.5, 9.4, p), 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, THREE.MathUtils.lerp(15.5, 13.2, p), 0.05);
    const shift = mobile ? -0.9 : -2.2;
    camera.lookAt(THREE.MathUtils.lerp(shift, 0, p), 0.6, 0);
  });
  return null;
}

export default function Scene3D() {
  const progressRef = useRef(0);
  const camRef = useRef(null);
  const settings = useMemo(() => {
    if (typeof window === 'undefined') return { mobile: false, reduced: false };
    return {
      mobile: window.matchMedia('(max-width: 768px)').matches,
      reduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    };
  }, []);
  const count = settings.mobile ? 27 : 54;
  const items = useMemo(() => buildLayout(count), [count]);
  const rows = settings.mobile ? Z_ROWS.slice(0, 3) : Z_ROWS;

  useEffect(() => {
    if (settings.reduced) {
      progressRef.current = 1;
      return undefined;
    }
    const st = ScrollTrigger.create({
      trigger: '#transformation-track',
      start: 'top top',
      end: settings.mobile ? '+=1500' : '+=2200',
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
    });
    ScrollTrigger.refresh();
    window.__wf = { st, progressRef };
    return () => st.kill();
  }, [settings.reduced, settings.mobile]);

  return (
    <div data-testid="scene-3d" className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <Canvas
        dpr={settings.mobile ? [1, 1.5] : [1, 2]}
        camera={{ position: [0, 7.5, 15.5], fov: 42, near: 0.1, far: 70 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={(s) => {
          camRef.current = s.camera;
        }}
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
        <Boxes progressRef={progressRef} items={items} />
        <Pallets progressRef={progressRef} items={items} />
        <Racks progressRef={progressRef} rows={rows} />
        <LightBeams />
        <AmbientParcels />
        <Agv progressRef={progressRef} reduced={settings.reduced} camRef={camRef} />
        <CameraRig progressRef={progressRef} reduced={settings.reduced} mobile={settings.mobile} />
      </Canvas>
    </div>
  );
}
