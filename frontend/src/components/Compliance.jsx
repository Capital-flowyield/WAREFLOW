import { motion } from 'framer-motion';
import { FileCheck2, ShieldCheck, Handshake, Plug } from 'lucide-react';
import { useLang } from '../i18n';

const ICONS = { file: FileCheck2, shield: ShieldCheck, handshake: Handshake, plug: Plug };

export default function Compliance() {
  const { t } = useLang();
  const d = t.compliance;
  return (
    <section data-testid="compliance-section" className="relative z-10 bg-[rgba(10,10,12,0.94)] py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-2 lg:gap-24">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-primary">
            <span className="inline-block h-px w-10 bg-primary" />
            {d.index} — {d.label}
          </p>
          <h2 data-testid="compliance-title" className="font-display text-4xl font-black uppercase leading-[1.02] tracking-tighter md:text-6xl">
            {d.titleA}
            <br />
            <span className="text-primary">{d.titleB}</span>
          </h2>
          <p className="mt-8 max-w-lg text-base leading-relaxed text-mute md:text-lg">{d.body}</p>
        </motion.div>
        <div className="flex flex-col justify-center gap-px bg-white/10">
          {d.items.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <motion.div
                key={item.title}
                data-testid={`compliance-item-${i}`}
                initial={{ opacity: 0, x: 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group flex items-start gap-5 bg-ink p-6 transition-colors duration-500 hover:bg-surface md:p-8"
              >
                <Icon className="mt-1 h-6 w-6 shrink-0 text-primary" strokeWidth={1.5} />
                <div>
                  <h3 className="font-display text-lg font-bold tracking-tight md:text-xl">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mute">{item.body}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
