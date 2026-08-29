import { Suspense, lazy, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Toaster } from 'sonner';
import { LanguageProvider } from './i18n';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problems from './components/Problems';
import Transformation from './components/Transformation';
import Principles from './components/Principles';
import Modules from './components/Modules';
import Stats from './components/Stats';
import Marquee from './components/Marquee';
import Compliance from './components/Compliance';
import Cta from './components/CTA';
import SoundToggle from './components/SoundToggle';
import { setLenis } from './lib/scroll';

gsap.registerPlugin(ScrollTrigger);

const Scene3D = lazy(() => import('./components/Scene3D'));

export default function App() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    setLenis(lenis);
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      lenis.destroy();
      setLenis(null);
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <LanguageProvider>
      <div className="bg-ink font-sans text-white antialiased">
        <div className="noise-overlay" aria-hidden />
        <Cursor />
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <Problems />
          <Transformation />
          <Principles />
          <Modules />
          <Stats />
          <Marquee />
          <Compliance />
          <Cta />
        </main>
        <SoundToggle />
        <Toaster theme="dark" position="bottom-right" />
      </div>
    </LanguageProvider>
  );
}
