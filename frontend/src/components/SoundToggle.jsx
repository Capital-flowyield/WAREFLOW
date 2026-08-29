import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useLang } from '../i18n';
import { startEngine, stopEngine } from '../lib/sound';

export default function SoundToggle() {
  const { t } = useLang();
  const [on, setOn] = useState(false);
  const onRef = useRef(false);

  useEffect(() => () => stopEngine(), []);

  const toggle = () => {
    if (onRef.current) {
      stopEngine();
      onRef.current = false;
      setOn(false);
    } else if (startEngine()) {
      onRef.current = true;
      setOn(true);
    }
  };

  return (
    <button
      data-testid="sound-toggle"
      onClick={toggle}
      aria-pressed={on}
      aria-label={t.sound.aria}
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2.5 border border-white/15 bg-black/60 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.25em] text-mute backdrop-blur-xl transition-colors duration-300 hover:border-primary hover:text-primary"
    >
      {on ? (
        <Volume2 className="h-4 w-4 text-primary" strokeWidth={1.5} />
      ) : (
        <VolumeX className="h-4 w-4" strokeWidth={1.5} />
      )}
      {on ? t.sound.on : t.sound.off}
    </button>
  );
}
