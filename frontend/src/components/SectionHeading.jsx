import { motion } from 'framer-motion';

export default function SectionHeading({ index, label, title, sub, testid }) {
  return (
    <div className="mb-16 max-w-3xl md:mb-20" data-testid={testid}>
      <motion.p
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-primary"
      >
        <span className="inline-block h-px w-10 bg-primary" />
        {index} — {label}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-4xl font-bold uppercase leading-[1.02] tracking-tight md:text-6xl"
      >
        {title}
      </motion.h2>
      {sub && (
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-xl text-base leading-relaxed text-mute md:text-lg"
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}
