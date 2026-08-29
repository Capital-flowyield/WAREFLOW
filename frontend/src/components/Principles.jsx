import { motion } from 'framer-motion';
import { useLang } from '../i18n';
import SectionHeading from './SectionHeading';

export default function Principles() {
  const { t } = useLang();
  const d = t.principles;
  return (
    <section id="principi" data-testid="principles-section" className="relative z-10 bg-[rgba(11,11,11,0.94)] py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          index={d.index}
          label={d.label}
          title={d.title}
          sub={d.sub}
          testid="principles-heading"
        />
        <div className="border-t border-white/10">
          {d.items.map((p, i) => (
            <motion.div
              key={p.n}
              data-testid={`principle-${p.n}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative grid grid-cols-1 gap-6 overflow-hidden border-b border-white/10 py-14 md:grid-cols-[280px_1fr] md:py-20"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 select-none font-display text-[11rem] font-black leading-none text-white/[0.04] md:text-[16rem]"
              >
                {p.n}
              </span>
              <p className="font-mono text-sm tracking-[0.3em] text-primary">{d.chapter} {p.n}</p>
              <div className="relative">
                <h3 className="font-display text-3xl font-bold tracking-tight md:text-5xl">{p.title}</h3>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-mute md:text-lg">{p.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
