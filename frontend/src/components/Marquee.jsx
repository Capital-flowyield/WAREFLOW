import { useLang } from '../i18n';

export default function Marquee() {
  const { t } = useLang();
  const items = [...t.marquee, ...t.marquee];
  return (
    <div
      data-testid="editorial-marquee"
      className="relative z-10 overflow-hidden border-y border-white/10 bg-[rgba(12,11,10,0.9)] py-6"
    >
      <div className="animate-marquee flex w-max items-center">
        {items.map((item, i) => (
          <span
            key={i}
            className="flex items-center whitespace-nowrap font-mono text-sm uppercase tracking-[0.35em] text-white/60"
          >
            <span className="px-8">{item}</span>
            <span className="text-primary">///</span>
          </span>
        ))}
      </div>
    </div>
  );
}
