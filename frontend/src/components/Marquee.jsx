import { MARQUEE_ITEMS } from '../data/content';

export default function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div
      data-testid="editorial-marquee"
      className="relative z-10 overflow-hidden border-y border-white/10 bg-[#0B0B0B] py-6"
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
