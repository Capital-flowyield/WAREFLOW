let ctx = null;
let master = null;
let beepTimer = null;
let nodes = [];

export function playBeep(freq = 1180) {
  if (!ctx || !master) return;
  const t0 = ctx.currentTime;
  const b = ctx.createOscillator();
  b.type = 'square';
  b.frequency.value = freq;
  const bg = ctx.createGain();
  bg.gain.setValueAtTime(0, t0);
  bg.gain.linearRampToValueAtTime(0.045, t0 + 0.008);
  bg.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.09);
  b.connect(bg);
  bg.connect(master);
  b.start(t0);
  b.stop(t0 + 0.11);
}

export function startEngine() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return false;
  ctx = new AC();
  master = ctx.createGain();
  master.gain.value = 0.9;
  master.connect(ctx.destination);

  const humFilter = ctx.createBiquadFilter();
  humFilter.type = 'lowpass';
  humFilter.frequency.value = 200;
  const humGain = ctx.createGain();
  humGain.gain.value = 0.03;
  humFilter.connect(humGain);
  humGain.connect(master);

  const osc = ctx.createOscillator();
  osc.type = 'sawtooth';
  osc.frequency.value = 52;
  const osc2 = ctx.createOscillator();
  osc2.type = 'sine';
  osc2.frequency.value = 104.5;
  osc.connect(humFilter);
  osc2.connect(humFilter);

  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.12;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 0.012;
  lfo.connect(lfoGain);
  lfoGain.connect(humGain.gain);

  const len = ctx.sampleRate * 2;
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * 0.4;
  const noise = ctx.createBufferSource();
  noise.buffer = buf;
  noise.loop = true;
  const nf = ctx.createBiquadFilter();
  nf.type = 'bandpass';
  nf.frequency.value = 380;
  nf.Q.value = 0.5;
  const ng = ctx.createGain();
  ng.gain.value = 0.007;
  noise.connect(nf);
  nf.connect(ng);
  ng.connect(master);

  osc.start();
  osc2.start();
  lfo.start();
  noise.start();
  nodes = [osc, osc2, lfo, noise];

  const beep = () => {
    if (!ctx) return;
    playBeep(1180);
    beepTimer = setTimeout(beep, 2600 + Math.random() * 4600);
  };
  beepTimer = setTimeout(beep, 1400);
  return true;
}

export function stopEngine() {
  clearTimeout(beepTimer);
  nodes.forEach((n) => {
    try {
      n.stop();
    } catch {
      /* already stopped */
    }
  });
  nodes = [];
  if (ctx) {
    ctx.close();
    ctx = null;
    master = null;
  }
}
