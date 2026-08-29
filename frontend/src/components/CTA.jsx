import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Check } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useLang } from '../i18n';

const inputCls =
  'w-full border border-white/15 bg-ink px-4 py-3.5 font-sans text-sm text-white placeholder:text-white/30 outline-none transition-colors duration-300 focus:border-primary';

export default function Cta() {
  const { t } = useLang();
  const d = t.cta;
  const reduced = usePrefersReducedMotion();
  const [form, setForm] = useState({ nome: '', azienda: '', email: '', dimensione: '', note: '' });
  const [sending, setSending] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setForm({ nome: '', azienda: '', email: '', dimensione: '', note: '' });
      toast.success(d.toast, {
        style: { background: '#121212', border: '1px solid rgba(255,92,0,0.4)', color: '#fff' },
      });
    }, 900);
  };

  return (
    <section id="demo" data-testid="cta-section" className="relative z-10 border-t border-white/10 bg-[#0B0B0B] py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-2 lg:gap-24">
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-primary">
            <span className="inline-block h-px w-10 bg-primary" />
            {d.label}
          </p>
          <h2 data-testid="cta-title" className="font-display text-4xl font-black uppercase leading-[1.02] tracking-tighter md:text-6xl">
            {d.titleA}
            <br />
            <span className="text-primary">{d.titleB}</span>
          </h2>
          <p className="mt-8 max-w-lg text-base leading-relaxed text-mute md:text-lg">{d.body}</p>
          <ul className="mt-10 space-y-4" data-testid="cta-bullets">
            {d.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm leading-relaxed text-white/80 md:text-base">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={2} />
                {b}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.form
          data-testid="demo-form"
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: reduced ? 0 : 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="border border-white/10 bg-surface p-8 md:p-10"
        >
          <p className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-mute">
            {d.formTitleA} <span className="text-primary">{d.formTitleB}</span>
          </p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <input
              data-testid="demo-form-nome"
              required
              value={form.nome}
              onChange={set('nome')}
              placeholder={d.nome}
              className={inputCls}
            />
            <input
              data-testid="demo-form-azienda"
              required
              value={form.azienda}
              onChange={set('azienda')}
              placeholder={d.azienda}
              className={inputCls}
            />
            <input
              data-testid="demo-form-email"
              required
              type="email"
              value={form.email}
              onChange={set('email')}
              placeholder={d.email}
              className={`${inputCls} sm:col-span-2`}
            />
            <select
              data-testid="demo-form-dimensione"
              required
              value={form.dimensione}
              onChange={set('dimensione')}
              className={`${inputCls} sm:col-span-2 ${form.dimensione ? 'text-white' : 'text-white/30'}`}
            >
              <option value="" disabled>
                {d.dimensione}
              </option>
              {d.options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <textarea
              data-testid="demo-form-note"
              value={form.note}
              onChange={set('note')}
              rows={4}
              placeholder={d.note}
              className={`${inputCls} resize-none sm:col-span-2`}
            />
          </div>
          <button
            data-testid="demo-form-submit"
            type="submit"
            disabled={sending}
            className="mt-8 w-full bg-primary px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.15em] text-ink transition-colors duration-300 hover:bg-primary-hover disabled:opacity-60"
          >
            {sending ? d.sending : d.submit}
          </button>
          <p className="mt-5 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
            {d.formNote}
          </p>
        </motion.form>
      </div>

      <footer data-testid="site-footer" className="mx-auto mt-32 max-w-7xl border-t border-white/10 px-6 pt-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-2.5">
            <span className="block h-3 w-3 bg-primary shadow-[0_0_14px_rgba(255,92,0,0.8)]" />
            <span className="font-mono text-sm font-bold tracking-[0.3em] text-white">WAREFLOW</span>
          </div>
          <p className="text-sm text-mute">{t.footer.tagline}</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
            {t.footer.rights}
          </p>
        </div>
      </footer>
    </section>
  );
}
