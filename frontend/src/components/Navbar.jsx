import { useEffect, useState } from 'react';
import { scrollToSection } from '../lib/scroll';

const LINKS = [
  { label: 'Problemi', href: '#problemi', testid: 'nav-link-problemi' },
  { label: 'Soluzione', href: '#principi', testid: 'nav-link-soluzione' },
  { label: 'Moduli', href: '#moduli', testid: 'nav-link-moduli' },
  { label: 'Numeri', href: '#numeri', testid: 'nav-link-numeri' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      data-testid="navbar"
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled ? 'border-b border-white/10 bg-black/60 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <button
          data-testid="nav-logo"
          onClick={() => window.scrollTo(0, 0)}
          className="flex items-center gap-2.5"
        >
          <span className="block h-3 w-3 bg-primary shadow-[0_0_14px_rgba(255,92,0,0.8)]" />
          <span className="font-mono text-sm font-bold tracking-[0.3em] text-white">WAREFLOW</span>
        </button>
        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.href}
              data-testid={l.testid}
              onClick={() => scrollToSection(l.href)}
              className="font-mono text-xs uppercase tracking-[0.2em] text-mute transition-colors duration-300 hover:text-primary"
            >
              {l.label}
            </button>
          ))}
        </nav>
        <button
          data-testid="nav-cta-demo"
          onClick={() => scrollToSection('#demo')}
          className="border border-primary/60 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-primary transition-colors duration-300 hover:bg-primary hover:text-ink"
        >
          Richiedi una demo
        </button>
      </div>
    </header>
  );
}
