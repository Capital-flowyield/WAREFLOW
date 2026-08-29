export const HERO = {
  label: 'WMS DI NUOVA GENERAZIONE',
  lines: [
    { text: 'IL MAGAZZINO CHE VEDI', accent: '' },
    { text: 'A SCHERMO È QUELLO', accent: '' },
    { text: 'CHE HAI ', accent: 'DAVVERO.' },
  ],
  sub: 'WareFlow sincronizza le giacenze in meno di 1 millisecondo e trova qualsiasi codice in meno di 100. Nato dentro un magazzino vero, costruito sull’architettura che muove centinaia di milioni di pacchi al giorno — con la fatturazione SDI e il GDPR che i sistemi cinesi non hanno.',
  microstats: ['SYNC GIACENZE < 1MS', 'RICERCA < 100MS', 'ONBOARDING < 2H'],
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
