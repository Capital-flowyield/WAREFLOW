import { motion } from 'framer-motion';
import { PROBLEMS } from '../data/content';
import SectionHeading from './SectionHeading';

export default function Problems() {
  return (
    <section id="problemi" data-testid="problems-section" className="relative z-10 bg-ink py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          index="01"
          label="IL PROBLEMA"
          title="Il tuo gestionale sta rallentando il tuo magazzino."
          sub="Non sono fastidi teorici. Sono le nove cose che ogni giorno costano soldi, tempo e credibilità a chi gestisce un magazzino con un software pensato vent’anni fa."
          testid="problems-heading"
        />
        <div className="grid grid-cols-1 gap-px bg-white/10 md:grid-cols-3" data-testid="problems-grid">
          {PROBLEMS.map((p, i) => (
            <motion.article
              key={p.n}
              data-testid={`problem-card-${p.n}`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-ink p-8 transition-colors duration-500 hover:bg-surface md:p-10"
            >
              <p className="font-mono text-xs tracking-[0.3em] text-primary/70 transition-colors duration-500 group-hover:text-primary">
                {p.n}
              </p>
              <h3 className="mt-5 font-display text-xl font-bold leading-snug tracking-tight md:text-2xl">
                {p.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-mute">{p.body}</p>
              <span className="mt-6 block h-px w-0 bg-primary shadow-[0_0_10px_rgba(255,92,0,0.6)] transition-[width] duration-700 group-hover:w-full" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
