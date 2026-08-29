export const HERO = {
  label: 'WMS DI NUOVA GENERAZIONE',
  lines: [
    { text: 'IL MAGAZZINO CHE VEDI', accent: '' },
    { text: 'A SCHERMO È QUELLO', accent: '' },
    { text: 'CHE HAI ', accent: 'DAVVERO.' },
  ],
  sub: 'WareFlow sincronizza le giacenze in meno di 1 millisecondo e trova qualsiasi codice in meno di 100. Nato dentro un magazzino vero, costruito sull’architettura che muove centinaia di milioni di pacchi al giorno — con la fatturazione SDI e il GDPR che i sistemi cinesi non hanno.',
  microstats: ['SYNC GIACENZE < 1MS', 'RICERCA < 100MS', 'ONBOARDING < 2H'],
  robotHint: 'Clicca il robot o trascina un pacco — li sistema da solo',
};

export const PROBLEMS = [
  {
    n: '01',
    title: 'Giacenza fantasma',
    body: 'A schermo il pezzo c’è. Sullo scaffale no. Prometti al cliente merce che non hai — e il suo camion resta fermo al molo mentre il tuo magazziniere la cerca per venti minuti.',
  },
  {
    n: '02',
    title: 'Un’interfaccia ferma al 1998',
    body: 'Schermate da 80 campi, navigazione a tasti F1–F12. Il tuo magazziniere lavora in piedi, con i guanti, otto ore al giorno — non alla scrivania di vent’anni fa.',
  },
  {
    n: '03',
    title: 'Codici incrociati impossibili',
    body: 'Il cliente ti dà un codice OEM o aftermarket. Il gestionale risponde silenzio. Minuti di ricerca manuale — e troppo spesso la vendita va al concorrente.',
  },
  {
    n: '04',
    title: 'Resi e garanzie nel caos',
    body: 'Scatole accumulate in accettazione per giorni, senza tracciabilità. Accrediti merce non conforme, perdi pezzi in garanzia, e nessuno sa dove sia finita la carcassa.',
  },
  {
    n: '05',
    title: 'Ostaggio del fornitore',
    body: 'Un campo nuovo, un layout di etichetta: mesi di attesa e 80–150 €/ora di consulenza. E al prossimo aggiornamento rischia di rompersi tutto quello che hai personalizzato.',
  },
  {
    n: '06',
    title: 'Il Wi-Fi che tradisce',
    body: 'Tra due scaffali metallici il segnale muore. Il palmare si blocca, i dati inseriti spariscono — e con loro il lavoro dell’ultima ora.',
  },
  {
    n: '07',
    title: 'Errori umani invisibili',
    body: 'Un operatore digita 100 pezzi invece di 10, 1.500 kg invece di 150. Nessuno se ne accorge finché la fattura non è già partita.',
  },
  {
    n: '08',
    title: 'L’Excel-dipendenza',
    body: 'Il gestionale non parla con e-commerce e corrieri. Così le decisioni critiche finiscono in fogli Excel paralleli che nessuno controlla — e il dato unico non esiste più.',
  },
  {
    n: '09',
    title: 'Il collo di bottiglia di fine mese',
    body: 'Fatturazione massiva, importazione ordini: il database monolitico va in stallo e blocca il lavoro di tutto il magazzino proprio quando serve di più.',
  },
];

export const TRANSFORMATION = {
  label: 'LA SVOLTA',
  titleA: 'Continua a scorrere.',
  titleB: 'Il magazzino si riordina da solo.',
  sub: 'È quello che fa WareFlow: stessa merce, stessi scaffali, stesse persone. Cambia solo il sistema che le coordina.',
};

export const PRINCIPLES = [
  {
    n: '01',
    title: 'Configurazione, mai codice',
    body: 'Ogni cliente è un tenant isolato: struttura del magazzino, campi articolo, workflow dei resi — tutto a configurazione. Sei operativo in meno di 2 ore. Zero righe di codice custom, zero aggiornamenti che rompono quello che hai costruito negli anni.',
  },
  {
    n: '02',
    title: 'Paghi solo ciò che usi',
    body: 'Moduli attivabili on/off: un magazzino farmaceutico accende la tracciabilità lotti e scadenze FEFO, un distributore di ricambi accende la ricerca incrociata OEM. Stesso core, configurazione diversa per ogni settore.',
  },
  {
    n: '03',
    title: 'API aperte, zero lock-in',
    body: 'Connettori pronti per Zucchetti, TeamSystem, SAP, Mexal e AS400. I tuoi dati sono tuoi: li esporti tutti, quando vuoi. Integrazione con e-commerce e corrieri in minuti, non in mesi.',
  },
];

export const MODULES = [
  {
    n: '01',
    icon: 'search',
    title: 'Ricerca intelligente e cross-referencing',
    body: 'Motore fuzzy che trova il pezzo giusto — codice OEM, aftermarket o interno — in meno di 100 ms. Tollera gli errori di battitura e legge via OCR anche le etichette rovinate.',
  },
  {
    n: '02',
    icon: 'route',
    title: 'Picking guidato e ottimizzato',
    body: 'Il percorso più breve tra gli scaffali per ogni lista di prelievo. Il dynamic slotting sposta gli articoli più movimentati vicino all’ingresso. Mappa 2D/3D del magazzino in tempo reale.',
  },
  {
    n: '03',
    icon: 'wifi-off',
    title: 'App da magazziniere offline-first',
    body: 'Usabile con una mano sola, anche con i guanti. Doppia scansione di sicurezza — ubicazione + articolo — con feedback verde/rosso immediato. Se cade il Wi-Fi, continua a lavorare e sincronizza da sola alla riconnessione.',
  },
  {
    n: '04',
    icon: 'rotate',
    title: 'Resi e garanzie in 3 step',
    body: 'Scansione bolla → causale (reso commerciale, difetto in garanzia, carcassa) → foto del pezzo. Smistamento automatico delle ubicazioni: scaffale, quarantena o rigenerazione.',
  },
  {
    n: '05',
    icon: 'gauge',
    title: 'Dashboard direzionale predittiva',
    body: 'Blocca le transazioni anomale prima del danno: un prelievo da 1,5 tonnellate invece di 150 kg non passa. KPI in tempo reale su tempi di evasione, produttività per corsia e valore fermo nei resi.',
  },
];

export const STATS = [
  { value: 100, prefix: '<', unit: 'ms', label: 'Ricerca fuzzy cross-riferimenti' },
  { value: 1, prefix: '<', unit: 'ms', label: 'Sincronizzazione giacenze in tempo reale (cache Redis)' },
  { value: 2, prefix: '<', unit: 'ms', label: 'Notifica di aggiornamento stock via WebSocket' },
  { value: 2, prefix: '<', unit: 'h', label: 'Onboarding di un nuovo cliente, da zero a operativo' },
];

export const MARQUEE_ITEMS = [
  'GIACENZE IN TEMPO REALE',
  'RICERCA < 100 MS',
  'OFFLINE-FIRST',
  'ZERO LOCK-IN',
  'SDI NATIVA',
  'HOSTING UE',
  'GDPR READY',
  'ONBOARDING < 2 ORE',
];

export const COMPLIANCE = {
  titleA: 'Veloce come la Cina.',
  titleB: 'Conforme all’Italia.',
  body: 'I sistemi che gestiscono il Singles’ Day — centinaia di milioni di pacchi in 24 ore — sono avanzatissimi operativamente, ma la fiscalità italiana non sanno nemmeno cosa sia. WareFlow porta la stessa velocità con la compliance che il tuo commercialista pretende.',
  items: [
    { icon: 'file', title: 'Fatturazione Elettronica SDI nativa', body: 'Emissione e ricezione integrate nel flusso di magazzino, non un modulo appiccicato dopo.' },
    { icon: 'shield', title: 'GDPR e hosting in UE', body: 'Dati ospitati in Europa, gestiti secondo il regolamento europeo. Nessuna sorpresa in sede di audit.' },
    { icon: 'handshake', title: 'Listini B2B e pagamenti dilazionati', body: 'Condizioni commerciali complesse, listini per cliente e pagamenti a 30-60-90: il mercato italiano com’è davvero.' },
    { icon: 'plug', title: 'Convive col gestionale che hai', body: 'Connettori pronti per Zucchetti, TeamSystem, SAP, Mexal, AS400. Non devi buttare via tutto per iniziare.' },
  ],
};

export const CTA = {
  label: 'RICHIESTA DEMO',
  titleA: 'Vedi WareFlow',
  titleB: 'sul tuo magazzino.',
  body: '30 minuti di demo sui tuoi processi reali — i tuoi codici, i tuoi resi, le tue corsie. Zero impegno, zero migrazione forzata: i tuoi dati restano tuoi.',
  bullets: [
    'Nessuna migrazione traumatica: WareFlow si collega al gestionale che usi oggi',
    'Operativo in meno di 2 ore, senza una riga di codice custom',
    'I tuoi dati restano tuoi: esportabili in qualsiasi momento',
  ],
};

const EN = {
  nav: {
    links: [
      { label: 'Problems', href: '#problemi', testid: 'nav-link-problemi' },
      { label: 'Solution', href: '#principi', testid: 'nav-link-soluzione' },
      { label: 'Modules', href: '#moduli', testid: 'nav-link-moduli' },
      { label: 'Numbers', href: '#numeri', testid: 'nav-link-numeri' },
    ],
    cta: 'Book a demo',
  },
  hero: {
    label: 'NEXT-GENERATION WMS',
    lines: [
      { text: 'THE WAREHOUSE YOU SEE', accent: '' },
      { text: 'ON SCREEN IS THE ONE', accent: '' },
      { text: 'YOU ACTUALLY ', accent: 'HAVE.' },
    ],
    sub: 'WareFlow syncs inventory in under 1 millisecond and finds any code in under 100. Born inside a real warehouse, built on the architecture that moves hundreds of millions of parcels a day — with the SDI e-invoicing and GDPR compliance the Chinese systems never had.',
    microstats: ['INVENTORY SYNC < 1MS', 'SEARCH < 100MS', 'ONBOARDING < 2H'],
    robotHint: 'Click the robot or drag a parcel — it tidies them up itself',
    ctaDemo: 'Book a demo',
    ctaProblem: 'See the problem ↓',
    scrollHint: 'Scroll — from chaos to order',
  },
  problems: {
    index: '01',
    label: 'THE PROBLEM',
    title: 'Your management software is slowing down your warehouse.',
    sub: 'These aren’t theoretical annoyances. They’re the nine things that cost money, time and credibility every single day to anyone running a warehouse on software designed twenty years ago.',
    items: [
      { n: '01', title: 'Phantom inventory', body: 'On screen the part exists. On the shelf it doesn’t. You promise a customer goods you don’t have — and their truck sits idle at the dock while your operator searches for twenty minutes.' },
      { n: '02', title: 'An interface stuck in 1998', body: '80-field screens, F1–F12 function keys. Your warehouse operator works on their feet, wearing gloves, eight hours a day — not at a desk from twenty years ago.' },
      { n: '03', title: 'Impossible cross-references', body: 'A customer gives you an OEM or aftermarket code. The system answers with silence. Minutes of manual searching — and too often the sale goes to a competitor.' },
      { n: '04', title: 'Returns and warranty chaos', body: 'Boxes pile up in receiving for days, untracked. You credit non-conforming goods, lose warranty parts, and nobody knows where the core ended up.' },
      { n: '05', title: 'Held hostage by your vendor', body: 'A new field, a label layout: months of waiting and €80–150/hour in consulting. And the next update threatens to break everything you’ve customized.' },
      { n: '06', title: 'The Wi-Fi that betrays you', body: 'Between two metal racks the signal dies. The handheld freezes, entered data vanishes — along with the last hour of work.' },
      { n: '07', title: 'Invisible human errors', body: 'An operator types 100 pieces instead of 10, 1,500 kg instead of 150. Nobody notices until the invoice has already gone out.' },
      { n: '08', title: 'The Excel dependency', body: 'The WMS doesn’t talk to your e-commerce or carriers. So critical decisions end up in parallel spreadsheets nobody controls — and the single source of truth is gone.' },
      { n: '09', title: 'The end-of-month bottleneck', body: 'Mass invoicing, order imports: the monolithic database stalls and freezes the whole warehouse exactly when you need it most.' },
    ],
  },
  transformation: {
    label: 'THE TURNING POINT',
    titleA: 'Keep scrolling.',
    titleB: 'The warehouse tidies itself.',
    sub: 'That’s what WareFlow does: same goods, same racks, same people. Only the system coordinating them changes.',
  },
  principles: {
    index: '02',
    label: 'THE SOLUTION',
    title: 'Three principles. Taken from the giants, adapted to you.',
    sub: 'WareFlow applies the architectural principles of the systems that run Singles’ Day — hundreds of millions of parcels in 24 hours — to the reality of a European warehouse.',
    chapter: 'CH.',
    items: [
      { n: '01', title: 'Configuration, never code', body: 'Every customer is an isolated tenant: warehouse layout, item fields, returns workflows — all configured. You’re live in under 2 hours. Zero lines of custom code, zero updates that break what you’ve built over the years.' },
      { n: '02', title: 'You pay only for what you use', body: 'Modules switch on/off: a pharma warehouse enables lot and FEFO expiry tracking, a parts distributor enables OEM cross-reference search. Same core, different configuration per industry.' },
      { n: '03', title: 'Open APIs, zero lock-in', body: 'Ready connectors for Zucchetti, TeamSystem, SAP, Mexal and AS400. Your data is yours: export all of it, whenever you want. E-commerce and carrier integrations in minutes, not months.' },
    ],
  },
  modules: {
    index: '03',
    label: 'THE MODULES',
    title: 'Five modules. Switch on only what you need.',
    sub: 'Same core, different configuration per industry. A pharma warehouse enables FEFO lots and expiry dates; a parts distributor enables OEM cross-reference search.',
    prefix: 'M.',
    items: [
      { n: '01', icon: 'search', title: 'Intelligent search & cross-referencing', body: 'A fuzzy engine that finds the right part — OEM, aftermarket or internal code — in under 100 ms. It tolerates typos and reads even damaged labels via OCR.' },
      { n: '02', icon: 'route', title: 'Guided, optimized picking', body: 'The shortest path through the racks for every pick list. Dynamic slotting moves fast-moving items near the entrance. Real-time 2D/3D warehouse map.' },
      { n: '03', icon: 'wifi-off', title: 'Offline-first operator app', body: 'Usable one-handed, even with gloves. Dual safety scan — location + item — with instant green/red feedback. If Wi-Fi drops, it keeps working and syncs itself on reconnection.' },
      { n: '04', icon: 'rotate', title: 'Returns & warranties in 3 steps', body: 'Scan the delivery note → reason (commercial return, warranty defect, core) → photo of the part. Automatic location routing: shelf, quarantine or regeneration.' },
      { n: '05', icon: 'gauge', title: 'Predictive executive dashboard', body: 'It blocks anomalous transactions before the damage: a 1.5-tonne pick instead of 150 kg doesn’t go through. Real-time KPIs on fulfilment times, per-aisle productivity and value stuck in returns.' },
    ],
  },
  stats: {
    index: '04',
    label: 'PERFORMANCE',
    title: 'Facts, not promises.',
    sub: 'Numbers measured on the production architecture. We didn’t write them to impress you: we wrote them because they’re the reason the warehouse never stops.',
    items: [
      { value: 100, prefix: '<', unit: 'ms', label: 'Fuzzy cross-reference search' },
      { value: 1, prefix: '<', unit: 'ms', label: 'Real-time inventory sync (Redis cache)' },
      { value: 2, prefix: '<', unit: 'ms', label: 'Stock update notification via WebSocket' },
      { value: 2, prefix: '<', unit: 'h', label: 'Onboarding of a new customer, from zero to live' },
    ],
  },
  marquee: [
    'REAL-TIME INVENTORY',
    'SEARCH < 100 MS',
    'OFFLINE-FIRST',
    'ZERO LOCK-IN',
    'NATIVE SDI',
    'EU HOSTING',
    'GDPR READY',
    'ONBOARDING < 2 HOURS',
  ],
  compliance: {
    index: '05',
    label: 'COMPLIANCE',
    titleA: 'Fast like China.',
    titleB: 'Compliant like Italy.',
    body: 'The systems that run Singles’ Day — hundreds of millions of parcels in 24 hours — are operationally brilliant, but they don’t even know what Italian tax rules are. WareFlow brings the same speed with the compliance your accountant demands.',
    items: [
      { icon: 'file', title: 'Native SDI e-invoicing', body: 'Issuing and receiving built into the warehouse flow, not bolted on afterwards.' },
      { icon: 'shield', title: 'GDPR & EU hosting', body: 'Data hosted in Europe, managed under the European regulation. No surprises at audit time.' },
      { icon: 'handshake', title: 'B2B price lists & deferred payments', body: 'Complex trade terms, per-customer price lists and 30-60-90-day payments: the Italian market as it really is.' },
      { icon: 'plug', title: 'Lives with your current ERP', body: 'Ready connectors for Zucchetti, TeamSystem, SAP, Mexal, AS400. You don’t have to throw everything away to start.' },
    ],
  },
  cta: {
    label: 'DEMO REQUEST',
    titleA: 'See WareFlow',
    titleB: 'on your warehouse.',
    body: 'A 30-minute demo on your real processes — your codes, your returns, your aisles. Zero commitment, zero forced migration: your data stays yours.',
    bullets: [
      'No traumatic migration: WareFlow connects to the system you use today',
      'Live in under 2 hours, without a single line of custom code',
      'Your data stays yours: exportable at any time',
    ],
    formTitleA: 'Request form',
    formTitleB: '— 30 seconds',
    nome: 'Full name',
    azienda: 'Company',
    email: 'Work email',
    dimensione: 'Warehouse size',
    options: [
      { value: '<1000', label: 'Under 1,000 m²' },
      { value: '1000-5000', label: '1,000 – 5,000 m²' },
      { value: '5000-20000', label: '5,000 – 20,000 m²' },
      { value: '>20000', label: 'Over 20,000 m²' },
    ],
    note: 'Tell us about your warehouse: industry, current system, the problem that wastes you the most time.',
    submit: 'Book the demo',
    sending: 'Sending…',
    formNote: 'Reply within 24 business hours — no spam, no pushy calls',
    toast: 'Request sent. We’ll get back to you within 24 business hours.',
  },
  footer: {
    tagline: 'Born in a warehouse. Built for warehouses.',
    rights: '© 2026 WareFlow — Your data. Always exportable.',
  },
  sound: { on: 'Sound on', off: 'Sound off', aria: 'Toggle warehouse ambient sound' },
};

const IT = {
  nav: {
    links: [
      { label: 'Problemi', href: '#problemi', testid: 'nav-link-problemi' },
      { label: 'Soluzione', href: '#principi', testid: 'nav-link-soluzione' },
      { label: 'Moduli', href: '#moduli', testid: 'nav-link-moduli' },
      { label: 'Numeri', href: '#numeri', testid: 'nav-link-numeri' },
    ],
    cta: 'Richiedi una demo',
  },
  hero: {
    ...HERO,
    ctaDemo: 'Richiedi una demo',
    ctaProblem: 'Vedi il problema ↓',
    scrollHint: 'Scorri — dal caos all’ordine',
  },
  problems: {
    index: '01',
    label: 'IL PROBLEMA',
    title: 'Il tuo gestionale sta rallentando il tuo magazzino.',
    sub: 'Non sono fastidi teorici. Sono le nove cose che ogni giorno costano soldi, tempo e credibilità a chi gestisce un magazzino con un software pensato vent’anni fa.',
    items: PROBLEMS,
  },
  transformation: TRANSFORMATION,
  principles: {
    index: '02',
    label: 'LA SOLUZIONE',
    title: 'Tre principi. Presi dai giganti, adattati a te.',
    sub: 'WareFlow applica i principi architetturali dei sistemi che gestiscono il Singles’ Day — centinaia di milioni di pacchi in 24 ore — alla realtà di un magazzino italiano.',
    chapter: 'CAP.',
    items: PRINCIPLES,
  },
  modules: {
    index: '03',
    label: 'I MODULI',
    title: 'Cinque moduli. Accendi solo quelli che ti servono.',
    sub: 'Stesso core, configurazione diversa per settore. Un farmaceutico accende lotti e scadenze FEFO; un distributore di ricambi accende la ricerca incrociata OEM.',
    prefix: 'M.',
    items: MODULES,
  },
  stats: {
    index: '04',
    label: 'LE PERFORMANCE',
    title: 'Fatti, non promesse.',
    sub: 'Numeri misurati sull’architettura in produzione. Non li abbiamo scritti per impressionarti: li abbiamo scritti perché sono il motivo per cui il magazzino non si ferma più.',
    items: STATS,
  },
  marquee: MARQUEE_ITEMS,
  compliance: { index: '05', label: 'COMPLIANCE', ...COMPLIANCE },
  cta: {
    ...CTA,
    formTitleA: 'Modulo richiesta',
    formTitleB: '— 30 secondi',
    nome: 'Nome e cognome',
    azienda: 'Azienda',
    email: 'Email aziendale',
    dimensione: 'Dimensione del magazzino',
    options: [
      { value: '<1000', label: 'Meno di 1.000 m²' },
      { value: '1000-5000', label: '1.000 – 5.000 m²' },
      { value: '5000-20000', label: '5.000 – 20.000 m²' },
      { value: '>20000', label: 'Oltre 20.000 m²' },
    ],
    note: 'Raccontaci il tuo magazzino: settore, gestionale attuale, il problema che ti fa perdere più tempo.',
    submit: 'Richiedi la demo',
    sending: 'Invio in corso…',
    formNote: 'Risposta entro 24 ore lavorative — niente spam, niente call forzate',
    toast: 'Richiesta inviata. Ti ricontattiamo entro 24 ore lavorative.',
  },
  footer: {
    tagline: 'Nato in un magazzino. Costruito per i magazzini.',
    rights: '© 2026 WareFlow — Dati tuoi. Sempre esportabili.',
  },
  sound: { on: 'Audio on', off: 'Audio off', aria: 'Attiva o disattiva il suono ambientale di magazzino' },
};

export const CONTENT = { it: IT, en: EN };
