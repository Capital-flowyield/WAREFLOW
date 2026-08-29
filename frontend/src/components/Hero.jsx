import { motion, useScroll, useTransform } from 'framer-motion';
import { HERO } from '../data/content';
import { scrollToSection } from '../lib/scroll';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const EASE = [0.16, 1, 0.3, 1];

export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, -140]);
  const opacity = useTransform(scrollY, [0, 550], [1, 0]);

  const lineVariants = {
    hidden: { y: '115%' },
    visible: (i) => ({
      y: '0%',
      transition: { delay: 0.35 + i * 0.14, duration: 1.1, ease: EASE },
    }),
  };

  return (
    <section data-testid="hero-section" className="relative flex min-h-screen flex-col justify-center overflow-hidden">
      <motion.div
        style={reduced ? undefined : { y, opacity }}
        className="pointer-events-none relative z-10 mx-auto w-full max-w-7xl px-6 pt-24"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          data-testid="hero-label"
          className="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-primary"
        >
          <span className="animate-pulse-dot inline-block h-1.5 w-1.5 bg-primary" />
          {HERO.label}
        </motion.p>

        <h1 data-testid="hero-headline" className="font-display text-5xl font-black uppercase leading-[0.95] tracking-tighter md:text-7xl lg:text-8xl">
          {HERO.lines.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-1">
              <motion.span
                className="block"
                custom={i}
                variants={lineVariants}
                initial={reduced ? 'visible' : 'hidden'}
                animate="visible"
              >
                {line.text}
                {line.accent && <span className="text-primary">{line.accent}</span>}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: reduced ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.9, ease: EASE }}
          data-testid="hero-subhead"
          className="mt-10 max-w-xl text-base leading-relaxed text-mute md:text-lg"
        >
          {HERO.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.9, ease: EASE }}
          className="pointer-events-auto mt-10 flex flex-wrap items-center gap-4"
        >
          <button
            data-testid="hero-cta-demo"
            onClick={() => scrollToSection('#demo')}
            className="bg-primary px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.15em] text-ink transition-colors duration-300 hover:bg-primary-hover"
          >
            Richiedi una demo
          </button>
          <button
            data-testid="hero-cta-problem"
            onClick={() => scrollToSection('#problemi')}
            className="border border-white/20 px-8 py-4 font-mono text-sm uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:border-primary hover:text-primary"
          >
            Vedi il problema ↓
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 mx-auto flex max-w-7xl items-center justify-between px-6 pb-8"
      >
        <div data-testid="hero-microstats" className="hidden gap-6 font-mono text-[10px] uppercase tracking-[0.25em] text-mute md:flex">
          {HERO.microstats.map((s) => (
            <span key={s} className="flex items-center gap-2">
              <span className="text-primary">/</span> {s}
            </span>
          ))}
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-mute">
          Scorri — dal caos all’ordine <span className="text-primary">↓</span>
        </p>
      </motion.div>
    </section>
  );
}
