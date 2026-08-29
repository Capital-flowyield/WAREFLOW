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

## Implementato (iterazione 3, 2026-08-29)
- Favicon brand `public/favicon.svg` (griglia 2×2 quadrati ambra su fondo scuro — motivo caos→ordine), linkata in index.html.
- Social card: `public/og-image.jpg` (1200×630, screenshot reale della hero) + meta Open Graph e Twitter Card completi in index.html (titolo, descrizione, immagine assoluta, locale it_IT/en_GB).
- Verificato via curl: og:image servita (200), favicon 200, meta OG presenti nell'HTML dopo restart frontend (html-webpack-plugin richiede restart per modifiche a index.html).
- GitHub: push NON eseguibile dall'agente — richiede azione utente via pulsante "Save to GitHub" (repo `wareflow-emergent`, branch main). In attesa del link repo dall'utente per verifica.

## Implementato (iterazione 4, 2026-08-29 — revisione 3D/hero/scroll)
- Hero ricomposta: testo in colonna max-w-3xl con scrim gradiente scuro + vignetta inferiore; scena 3D spostata visivamente a destra (camera lookAt shift -2.2 → 0 con progress) e visibile dal primo frame.
- Robot AGV ricostruito come modello articolato: chassis, ruote con hub ambra, mast, torretta sensore rotante (idle scan), braccio a 2 segmenti (shoulder/elbow) con pinza a due griffe. Scala 1.2. Anello pulsante sotto il robot come affordance (sparice dopo il primo grab o con lo scroll).
- Interazione reale: raycasting manuale (canvas pointer-events-none) su hitbox invisibile; click → timeline GSAP: robot ruota verso il pacco, braccio si estende, pinza chiude, pacco sollevato e posato in uno slot ordinato (3 pacchi ciclici, poi reset con hop). Hover sul robot → cursore diventa scanner (evento `wf:robot-hover`). Bip sonoro su presa/rilascio se audio attivo (lib/sound.js condivisa). Hint hero "Prova a cliccare il robot" (IT/EN) che sfuma al primo grab (`wf:robot-grabbed`).
- Debug hooks: window.__wf (st, progressRef), __wfRobot (posizione schermo), __wfParcels.
- Didascalia trasformazione rimossa: sezione ora muta (show-don't-tell).
- Scroll pinning: ScrollTrigger pin:true su #transformation-track, start 'top top', end '+=2200' (mobile 1500), scrub — pagina ferma mentre il riordino avanza 0→1. Verificato: top=0 costante durante il pin, progress 0.318→0.727→1.0, rilascio corretto verso Principi.
- Pacchi reali: texture cartone procedurale (CanvasTexture 256px: base marrone, nastro adesivo, etichetta con barcode su 1/3 dei pacchi), roughness 0.95, dimensioni variate.
- Contrasto: sezioni con toni diversi e alpha 0.90–0.95 (problems #0A0A0A opaco, principles/modules/stats/compliance/CTA semi-trasparenti con tinte calde/fredde), mute #ADADAD.
- Movimento ovunque: AmbientParcels (10 pacchi che fluttuano con parallasse legata a window.scrollY) visibili in trasparenza dietro le sezioni post-transizione.

## Implementato (iterazione 5, 2026-08-29 — drag pacchi + mobile)
- Drag dei pacchi: pointerdown/move/up con raycast sui 3 pacchi liberi e piano pavimento (y=0.9, clamp x ±8, z -4..5), rotazione durante il trascinamento, user-select disattivato durante il drag (fix selezione testo), soglia 6px per sopprimere il click post-drag. Al rilascio: se entro 1.7 unità da uno slot libero → il robot esegue assistPlace (ruota, estende il braccio, snap del pacco nello slot, bip); altrimenti il pacco cade con bounce e la torretta "lo guarda". Slot gestiti con slotTaken condiviso tra click e drag; il click del robot prende il primo pacco non posato → primo slot libero.
- Hint hero aggiornato IT/EN ("Clicca il robot o trascina un pacco…"); su mobile l'hint è inline sotto le CTA (barra assoluta nascosta sotto md), toggle audio spostato bottom-right su mobile, navbar compattata (logo/CTA responsive).
- Verifica mobile emulata (390×844): pinning ok (p 0→0.46 con top=0, rilascio a p=1), tap sul robot → pacco nello slot, contatori <100ms/<1ms/<2ms/<2h, layout pulito. NON testato su dispositivo fisico né con touch reale (drag touch può confliggere con lo scroll Lenis: canvas pointer-events-none).
- NOTA: il promemoria di sistema richiedeva verifica via subagent `testing_agent`, non disponibile nel toolset — verifica eseguita con test Playwright/screenshot reali documentati sopra.

## Implementato (iterazione 6, 2026-08-29 — drag touch)
- Durante il drag di un pacco lo scroll Lenis viene fermato (`stopScroll`/`startScroll` in lib/scroll.js, chiamati su pointerdown/pointerup/pointercancel): su touch il dito trascina il pacco senza scrollare la pagina, su desktop la rotellina è inattiva a metà drag.
- Verificato live: wheel durante il drag lascia scrollY invariato (0→0), al rilascio il pacco va nello slot via assist del robot, dopo il rilascio lo scroll riprende (0→1199).

## Next tasks
1. Utente: Save to GitHub → repo `wareflow-emergent`, branch main.
2. Collegare form demo a email reale (serve scelta provider).
3. QA mobile fisico.
