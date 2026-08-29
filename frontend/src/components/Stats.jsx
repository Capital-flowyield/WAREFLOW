import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView } from 'framer-motion';
import { STATS } from '../data/content';
import SectionHeading from './SectionHeading';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

function Stat({ stat, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const reduced = usePrefersReducedMotion();
  const [val, setVal] = useState(reduced ? stat.value : 0);

  useEffect(() => {
    if (!inView || reduced) return undefined;
    const controls = animate(0, stat.value, {
      duration: 1.8,
      delay: index * 0.15,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, reduced, stat.value, index]);

  return (
    <div ref={ref} data-testid={`stat-${index}`} className="border-l border-white/10 pl-6 md:pl-8">
      <p className="font-mono text-5xl font-bold tracking-tight text-white md:text-7xl">
        <span className="text-primary">{stat.prefix}</span>
        {Math.round(val)}
        <span className="text-primary">{stat.unit}</span>
      </p>
      <p className="mt-4 max-w-[220px] text-sm leading-relaxed text-mute">{stat.label}</p>
    </div>
  );
}

export default function Stats() {
  return (
    <section id="numeri" data-testid="stats-section" className="relative z-10 bg-ink py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          index="04"
          label="LE PERFORMANCE"
          title="Fatti, non promesse."
          sub="Numeri misurati sull’architettura in produzione. Non li abbiamo scritti per impressionarti: li abbiamo scritti perché sono il motivo per cui il magazzino non si ferma più."
          testid="stats-heading"
        />
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4"
          data-testid="stats-grid"
        >
          {STATS.map((s, i) => (
            <Stat key={s.label} stat={s} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
