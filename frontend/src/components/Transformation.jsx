import { TRANSFORMATION } from '../data/content';

export default function Transformation() {
  return (
    <section id="transformation-track" data-testid="transformation-section" className="relative z-10 h-[300vh]">
      <div className="pointer-events-none sticky top-0 flex h-screen flex-col items-center justify-center px-6 text-center">
        <p className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-primary">
          <span className="animate-pulse-dot inline-block h-1.5 w-1.5 bg-primary" />
          {TRANSFORMATION.label}
          <span className="animate-pulse-dot inline-block h-1.5 w-1.5 bg-primary" />
        </p>
        <h2 data-testid="transformation-title" className="font-display text-4xl font-black uppercase leading-[1.0] tracking-tighter md:text-7xl">
          {TRANSFORMATION.titleA}
          <br />
          <span className="text-primary">{TRANSFORMATION.titleB}</span>
        </h2>
        <p className="mt-8 max-w-lg text-sm leading-relaxed text-mute md:text-base">{TRANSFORMATION.sub}</p>
      </div>
    </section>
  );
}
