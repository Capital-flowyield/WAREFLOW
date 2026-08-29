# WareFlow — PRD

## Problem statement (originale)
Sito di marketing single-page per WareFlow, WMS di nuova generazione per PMI italiane/europee. Due fasi: (1) strategia di copy persuasivo scritta da zero dal materiale grezzo (9 problemi reali dei gestionali legacy, 3 principi architetturali, 5 moduli, numeri di performance reali, compliance italiana); (2) sito 3D scroll-driven livello Awwwards: React + Tailwind + Three.js/R3F + GSAP ScrollTrigger (scrub) + Lenis, narrativa "dal caos all'ordine" con robot AGV stilizzato come elemento narrativo ricorrente, cursore custom scanner. Niente prove sociali inventate, niente backend. Consegna finale: push su GitHub repo `wareflow-emergent` (branch main) tramite pulsante "Save to GitHub".

## User personas
- Titolare/direttore operativo di PMI italiana con magazzino fisico (ricambi, farmaceutico, elettrico/idraulico, abbigliamento, 3PL, e-commerce logistics): stanco del gestionale attuale ma cauto verso il cambio. Il copy rassicura (zero lock-in, dati esportabili, connettori pronti) quanto entusiasma.

## Architettura
- Solo frontend React (CRA + craco), nessun backend/database usato (site statico di marketing; backend template lasciato invariato).
- Scena 3D lazy-loaded (`React.lazy`): canvas fixed z-0, GSAP ScrollTrigger su `#transformation-track` (300vh) con scrub → progress 0→1 che interpola 54 box (27 su mobile) da posizioni caotiche a griglia ordinata; AGV robot (gruppo mesh low-poly, emissive amber, point light, cono scanner) attraversa la corsia centrale; camera rig interpolata.
- Lenis + gsap ticker per smooth scroll; framer-motion per reveal cinetico hero (masked line-by-line), scroll-reveal sezioni, contatori count-up (singola `animate()` on inView, once).
- Cursore custom desktop-only (`pointer: fine`): dot ambra + scia gradiente (3 trail dot a molle), stato scanner a parentesi su elementi interattivi.
- `prefers-reduced-motion`: no Lenis, scena statica ordinata (progress=1), reveal senza animazioni, marquee/animazioni CSS disattivate.
- Copy centralizzato in `src/data/content.js` (headline come array di righe, mai string-splitting).

## Requisiti core (statici)
- Headline: "Il magazzino che vedi a schermo è quello che hai davvero."
- 9 problemi riformulati come conseguenze reali; 3 principi; 5 moduli; numeri <100ms/<1ms/<2ms/<2h; compliance SDI/GDPR/UE/B2B; CTA demo.
- Nessun Lorem Ipsum, nessun logo cliente/testimonianza inventata.

## Implementato (2026-08-29)
- Strategia copy Fase 1 approvata dall'utente (headline + riformulazione 9 problemi).
- Sito completo: Navbar glass, Hero cinetico + scena caotica, Problemi (bento 01–09), Trasformazione 3D scrub caos→ordine con AGV, Principi (capitoli numerati con ghost numbers), Moduli (lista editoriale 5 righe), Stats count-up, Marquee editoriale, Compliance, CTA + form demo simulato (toast sonner) + footer.
- Palette: industriale scuro #080808 + ambra #FF5C00/#FF8A00; font Cabinet Grotesk / Manrope / JetBrains Mono; noise overlay; scrollbar custom.
- data-testid su tutti gli elementi interattivi e informativi.
- Verificato e2e: hero reveal completo, scrub progress 0→0.97, contatori arrivano a <100ms/<1ms/<2ms/<2h, form invia e mostra toast, zero errori console.

## Verificato / Non verificato
- Verificato: desktop 1920px, scroll completo, animazioni, form. 
- Non verificato su device mobile reale (solo logica responsive implementata: meno mesh, dpr ridotto, cursore disattivato su touch).
- Form demo è SIMULATO (nessun invio email reale).

## Backlog prioritizzato
- P0: Push su GitHub `wareflow-emergent` (branch main) — azione manuale utente via pulsante "Save to GitHub".
- P1: Form demo reale (integrazione email, es. Resend) con backend /api.
- P1: Test su mobile reale + tuning performance 3D (fps meter).
- P2: Meta OG/social cards, favicon brand, analytics eventi CTA.

## Implementato (iterazione 2, 2026-08-29)
- Toggle IT/EN nella navbar con LanguageProvider (React context + localStorage `wf-lang`, `document.lang` aggiornato). Tutto il copy localizzato in `src/data/content.js` (CONTENT.it / CONTENT.en): nav, hero, 9 problemi, trasformazione, principi, moduli, stats, marquee, compliance, CTA/form, footer, toggle audio.
- Scena 3D cinematografica: scaffalature reali (uprights + beams in instancedMesh, fade-in con il progress), pallet sotto ogni box (instanced), 4 coni di luce volumetrica additiva dal soffitto.
- Sound design ambientale WebAudio (`SoundToggle.jsx`, fixed bottom-left): ronzio AGV (saw 52Hz + LFO), roomtone filtrato, bip scanner 1180Hz random ogni 2.6–7.2s. Default off, nessun asset esterno.
- Verificato: toggle EN su tutta la pagina, scena ordinata con scaffali a p=0.85, toggle audio on/off senza errori, zero errori console.

## Next tasks
1. Utente: Save to GitHub → repo `wareflow-emergent`, branch main.
2. Collegare form demo a email reale (serve scelta provider).
3. QA mobile fisico.
