import { motion } from 'framer-motion';
import { Search, Route, WifiOff, RotateCcw, Gauge } from 'lucide-react';
import { useLang } from '../i18n';
import SectionHeading from './SectionHeading';

const ICONS = {
  search: Search,
  route: Route,
  'wifi-off': WifiOff,
  rotate: RotateCcw,
  gauge: Gauge,
};

export default function Modules() {
  const { t } = useLang();
  const d = t.modules;
  return (
    <section id="moduli" data-testid="modules-section" className="relative z-10 bg-[rgba(14,12,10,0.94)] py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          index={d.index}
          label={d.label}
          title={d.title}
          sub={d.sub}
          testid="modules-heading"
        />
        <div className="border-t border-white/10">
          {d.items.map((m, i) => {
            const Icon = ICONS[m.icon];
            return (
              <motion.div
                key={m.n}
                data-testid={`module-row-${m.n}`}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group grid grid-cols-1 items-start gap-4 border-b border-white/10 px-4 py-10 transition-colors duration-500 hover:bg-surface md:grid-cols-[90px_1.1fr_1.6fr_64px] md:items-center md:px-8"
              >
                <p className="font-mono text-sm tracking-[0.3em] text-primary/70 transition-colors duration-500 group-hover:text-primary">
                  {d.prefix}{m.n}
                </p>
                <h3 className="font-display text-2xl font-bold leading-tight tracking-tight md:text-3xl">
                  {m.title}
                </h3>
                <p className="text-sm leading-relaxed text-mute md:text-base">{m.body}</p>
                <div className="hidden justify-end md:flex">
                  <Icon
                    className="h-8 w-8 text-white/20 transition-colors duration-500 group-hover:text-primary"
                    strokeWidth={1.25}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
