import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

function TrailDot({ x, y, stiffness, damping, size, color, opacity }) {
  const sx = useSpring(x, { stiffness, damping, mass: 0.4 });
  const sy = useSpring(y, { stiffness, damping, mass: 0.4 });
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] rounded-full"
      style={{
        x: sx,
        y: sy,
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        background: color,
        opacity,
        filter: 'blur(1px)',
      }}
    />
  );
}

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 900, damping: 55, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 900, damping: 55, mass: 0.3 });

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return undefined;
    setEnabled(true);
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => {
      if (e.target.closest('a, button, input, select, textarea, label, [data-cursor="scan"]')) setHover(true);
    };
    const out = (e) => {
      if (e.target.closest('a, button, input, select, textarea, label, [data-cursor="scan"]')) setHover(false);
    };
    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
    };
  }, [x, y]);

  useEffect(() => {
    const onRobot = (e) => setHover(Boolean(e.detail));
    window.addEventListener('wf:robot-hover', onRobot);
    return () => window.removeEventListener('wf:robot-hover', onRobot);
  }, []);

  if (!enabled) return null;

  return (
    <>
      <TrailDot x={x} y={y} stiffness={220} damping={22} size={22} color="#FFC400" opacity={0.18} />
      <TrailDot x={x} y={y} stiffness={340} damping={28} size={15} color="#FF8A00" opacity={0.3} />
      <TrailDot x={x} y={y} stiffness={520} damping={38} size={9} color="#FF5C00" opacity={0.5} />
      <motion.div
        data-testid="custom-cursor"
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[91]"
        style={{ x: sx, y: sy }}
      >
        {hover ? (
          <div className="relative -ml-[22px] -mt-[22px] h-11 w-11" data-testid="custom-cursor-scanner">
            <span className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-primary" />
            <span className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-primary" />
            <span className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary" />
            <span className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary" />
            <span className="animate-scanline absolute left-1 right-1 top-1/2 h-px bg-primary shadow-[0_0_8px_#FF5C00]" />
          </div>
        ) : (
          <div className="-ml-[5px] -mt-[5px] h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_12px_rgba(255,92,0,0.9)]" />
        )}
      </motion.div>
    </>
  );
}
