import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { scrollToSection } from '../lib/scroll';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useLang } from '../i18n';

const EASE = [0.16, 1, 0.3, 1];

export default function Hero() {
  const { t } = useLang();
  const HERO = t.hero;
  const reduced = usePrefersReducedMotion();
  const [grabbed, setGrabbed] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, -140]);
  const opacity = useTransform(scrollY, [0, 550], [1, 0]);

  useEffect(() => {
    const onGrab = () => setGrabbed(true);
    window.addEventListener('wf:robot-grabbed', onGrab);
    return () => window.removeEventListener('wf:robot-grabbed', onGrab);
  }, []);

  const lineVariants = {
    hidden: { y: '115%' },
    visible: (i) => ({
      y: '0%',
      transition: { delay: 0.35 + i * 0.14, duration: 1.1, ease: EASE },
    }),
  };

  return (
    <section data-testid="hero-section" className="relative flex min-h-screen flex-col justify-center overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[5] bg-[linear-gradient(100deg,rgba(8,8,8,0.96)_0%,rgba(8,8,8,0.88)_32%,rgba(8,8,8,0.5)_55%,rgba(8,8,8,0)_78%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-44 bg-gradient-to-t from-[#080808] to-transparent" />
      <motion.div
        style={reduced ? undefined : { y, opacity }}
        className="pointer-events-none relative z-10 mx-auto w-full max-w-7xl px-6 pt-24"
      >
        <div className="max-w-3xl">
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

          <h1 data-testid="hero-headline" className="font-display text-4xl font-black uppercase leading-[0.95] tracking-tighter md:text-6xl lg:text-7xl">
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
              {HERO.ctaDemo}
            </button>
            <button
              data-testid="hero-cta-problem"
              onClick={() => scrollToSection('#problemi')}
              className="border border-white/20 px-8 py-4 font-mono text-sm uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:border-primary hover:text-primary"
            >
              {HERO.ctaProblem}
            </button>
            {HERO.robotHint && (
              <p
                data-testid="hero-robot-hint-mobile"
                className={`mt-6 flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-primary transition-opacity duration-700 md:hidden ${
                  grabbed ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <span className="animate-pulse-dot inline-block h-1.5 w-1.5 shrink-0 bg-primary" />
                {HERO.robotHint}
              </p>
            )}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 mx-auto hidden max-w-7xl px-6 pb-8 md:block"
      >
        {HERO.robotHint && (
          <p
            data-testid="hero-robot-hint"
            className={`mb-4 flex items-center gap-2.5 pr-[150px] font-mono text-[11px] uppercase tracking-[0.25em] text-primary transition-opacity duration-700 md:pr-0 ${
              grabbed ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <span className="animate-pulse-dot inline-block h-1.5 w-1.5 bg-primary" />
            {HERO.robotHint}
          </p>
        )}
        <div className="flex items-center justify-between">
          <div data-testid="hero-microstats" className="hidden gap-6 font-mono text-[10px] uppercase tracking-[0.25em] text-mute md:flex">
            {HERO.microstats.map((s) => (
              <span key={s} className="flex items-center gap-2">
                <span className="text-primary">/</span> {s}
              </span>
            ))}
          </div>
          <p className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-mute md:block">
            {HERO.scrollHint} <span className="text-primary">↓</span>
          </p>
        </div>
      </motion.div>
    </section>
  );
}
