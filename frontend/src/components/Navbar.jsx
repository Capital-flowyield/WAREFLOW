import { useEffect, useState } from 'react';
import { scrollToSection } from '../lib/scroll';
import { useLang } from '../i18n';

export default function Navbar() {
  const { lang, setLang, t } = useLang();
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
          <span className="font-mono text-xs font-bold tracking-[0.18em] text-white md:text-sm md:tracking-[0.3em]">WAREFLOW</span>
        </button>
        <nav className="hidden items-center gap-8 md:flex">
          {t.nav.links.map((l) => (
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
        <div className="flex items-center gap-5">
          <div data-testid="lang-toggle" className="flex items-center font-mono text-[11px] tracking-[0.2em]">
            <button
              data-testid="lang-toggle-it"
              onClick={() => setLang('it')}
              className={`transition-colors duration-300 ${lang === 'it' ? 'text-primary' : 'text-mute hover:text-white'}`}
            >
              IT
            </button>
            <span className="px-1.5 text-white/20">/</span>
            <button
              data-testid="lang-toggle-en"
              onClick={() => setLang('en')}
              className={`transition-colors duration-300 ${lang === 'en' ? 'text-primary' : 'text-mute hover:text-white'}`}
            >
              EN
            </button>
          </div>
          <button
            data-testid="nav-cta-demo"
            onClick={() => scrollToSection('#demo')}
            className="whitespace-nowrap border border-primary/60 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-primary transition-colors duration-300 hover:bg-primary hover:text-ink md:px-4 md:text-xs md:tracking-[0.2em]"
          >
            {t.nav.cta}
          </button>
        </div>
      </div>
    </header>
  );
}
