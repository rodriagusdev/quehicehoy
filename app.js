/**
 * ==============================================================================
 * 🏛️ MOTOR DE EXPERIENCIAS DIARIAS & REBOBINADO - "HOLA NICKY" ❤️
 * ==============================================================================
 * Maneja el sistema histórico de rebobinado (Rewind), la Galería de Museo (Día 1),
 * la Tarjeta Mágica de Raspar (Día 2), audio sintetizado, partículas y el cajón
 * de recuerdos.
 */

(function () {
  'use strict';

  // ----------------------------------------------------------------------------
  // ESTADO GLOBAL
  // ----------------------------------------------------------------------------
  const historial = window.HISTORIAL_DIAS || [];
  let currentIndex = historial.length > 0 ? historial.length - 1 : 0; // Por defecto: el día más reciente (HOY)
  let audioEnabled = true;
  let audioCtx = null;
  let scratchInitialized = false;
  let scratchRevealed = false;
  let lastScratchSoundTime = 0;

  // ----------------------------------------------------------------------------
  // SINTETIZADOR DE AUDIO (Web Audio API - Sin archivos externos)
  // ----------------------------------------------------------------------------
  function initAudio() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Campanitas románticas pentatónicas suaves
  const CHIME_FREQUENCIES = [554.37, 659.25, 830.61, 987.77, 1108.73, 1318.51];
  let chimeIndex = 0;

  function playRomanticChime() {
    if (!audioEnabled) return;
    initAudio();
    if (!audioCtx) return;

    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      const freq = CHIME_FREQUENCIES[chimeIndex % CHIME_FREQUENCIES.length];
      chimeIndex++;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 1.25);
    } catch (e) {
      console.warn("Audio no disponible:", e);
    }
  }

  // Sonido suave de roce / raspado
  function playScratchTick() {
    if (!audioEnabled) return;
    const now = Date.now();
    if (now - lastScratchSoundTime < 80) return; // Limitar frecuencia de audio
    lastScratchSoundTime = now;

    initAudio();
    if (!audioCtx) return;

    try {
      const audioNow = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      // Tono crujiente sutil
      osc.frequency.setValueAtTime(1200 + Math.random() * 400, audioNow);
      osc.frequency.exponentialRampToValueAtTime(400, audioNow + 0.04);

      gain.gain.setValueAtTime(0.025, audioNow);
      gain.gain.exponentialRampToValueAtTime(0.001, audioNow + 0.04);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(audioNow);
      osc.stop(audioNow + 0.05);
    } catch (e) {}
  }

  // Acorde triunfal de celebración al revelar el cupón o abrazo
  function playCelebrationChord() {
    if (!audioEnabled) return;
    initAudio();
    if (!audioCtx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (Do Mayor radiante)
      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const startTime = audioCtx.currentTime + idx * 0.09;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.07, startTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.8);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + 1.9);
      });
    } catch (e) {}
  }

  // Latido del corazón cálido sintetizado para el abrazo sostenido
  function playHeartbeatSound() {
    if (!audioEnabled) return;
    initAudio();
    if (!audioCtx) return;

    try {
      const now = audioCtx.currentTime;

      // Primer latido (lub)
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(85, now);
      osc1.frequency.exponentialRampToValueAtTime(45, now + 0.09);
      gain1.gain.setValueAtTime(0.12, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc1.connect(gain1);
      gain1.connect(audioCtx.destination);
      osc1.start(now);
      osc1.stop(now + 0.1);

      // Segundo latido (dub)
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(72, now + 0.13);
      osc2.frequency.exponentialRampToValueAtTime(38, now + 0.22);
      gain2.gain.setValueAtTime(0.08, now + 0.13);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);
      osc2.start(now + 0.13);
      osc2.stop(now + 0.23);
    } catch (e) {}
  }

  // Sonido dulce de beso / extracción de mimo del frasco
  function playKissSound() {
    if (!audioEnabled) return;
    initAudio();
    if (!audioCtx) return;

    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(650, now);
      osc.frequency.exponentialRampToValueAtTime(1150, now + 0.07);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.22);
    } catch (e) {}
  }

  // Sonido de burbujeo mágico del caldero de Halloween
  function playCauldronBubbleSound() {
    if (!audioEnabled) return;
    initAudio();
    if (!audioCtx) return;

    try {
      const now = audioCtx.currentTime;
      for (let i = 0; i < 4; i++) {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const startTime = now + i * 0.07;
        const startFreq = 260 + Math.random() * 200;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(startFreq, startTime);
        osc.frequency.exponentialRampToValueAtTime(startFreq + 350, startTime + 0.06);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.05, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.06);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.07);
      }
    } catch (e) {}
  }

  // Campanita misteriosa y mágica de Halloween
  function playSpookyMagicChime() {
    if (!audioEnabled) return;
    initAudio();
    if (!audioCtx) return;

    try {
      const notes = [587.33, 698.46, 830.61, 987.77, 1174.66]; // D5, F5, G#5, B5, D6
      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const startTime = audioCtx.currentTime + idx * 0.07;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.06, startTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.2);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + 1.25);
      });
    } catch (e) {}
  }

  // Sonido de fantasma juguetón / travesura
  function playGhostBooSound() {
    if (!audioEnabled) return;
    initAudio();
    if (!audioCtx) return;

    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(540, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(280, now + 0.35);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.07, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.4);
    } catch (e) {}
  }

  // ----------------------------------------------------------------------------
  // GESTOR DE DÍAS Y NAVEGACIÓN (REWIND ENGINE)
  // ----------------------------------------------------------------------------
  function getCurrentDay() {
    return historial[currentIndex] || historial[0];
  }

  function goToDay(index) {
    if (index < 0 || index >= historial.length) return;
    currentIndex = index;
    const day = getCurrentDay();
    const isLatest = currentIndex === historial.length - 1;

    // 1. Alternar vistas en el DOM
    const sceneMuseo = document.getElementById('scene-museo');
    const sceneScratch = document.getElementById('scene-scratch');
    const sceneFrasco = document.getElementById('scene-frasco');
    const sceneHalloween = document.getElementById('scene-halloween');

    if (sceneMuseo) sceneMuseo.classList.add('hidden');
    if (sceneScratch) sceneScratch.classList.add('hidden');
    if (sceneFrasco) sceneFrasco.classList.add('hidden');
    if (sceneHalloween) sceneHalloween.classList.add('hidden');

    if (day.experiencia === 'halloween-caldero') {
      if (sceneHalloween) {
        sceneHalloween.classList.remove('hidden');
        initHalloweenCaldero(day);
      }
    } else if (day.experiencia === 'frasco-abrazos') {
      if (sceneFrasco) {
        sceneFrasco.classList.remove('hidden');
        initFrascoAbrazos(day);
      }
    } else if (day.experiencia === 'raspa-y-gana') {
      if (sceneScratch) {
        sceneScratch.classList.remove('hidden');
        initScratchCard(day);
      }
    } else {
      // Por defecto escena museo (Día 1 u otros de galería)
      if (sceneMuseo) {
        sceneMuseo.classList.remove('hidden');
        renderMuseumScene(day);
      }
    }

    // 2. Actualizar la barra flotante de rebobinado
    const btnPrev = document.getElementById('btn-prev-day');
    const btnNext = document.getElementById('btn-next-day');
    const pillText = document.getElementById('pill-text');

    if (btnPrev) btnPrev.disabled = currentIndex === 0;
    if (btnNext) btnNext.disabled = isLatest;

    if (pillText) {
      pillText.textContent = `Día ${day.numero} ${isLatest ? '• Hoy' : ''}`;
    }

    // 3. Ambient Glow adaptado al color del día
    const ambientGlow = document.getElementById('ambient-glow');
    if (ambientGlow) {
      if (day.temaColor === 'halloween') {
        ambientGlow.style.background = 'radial-gradient(circle, rgba(168, 85, 247, 0.24) 0%, rgba(249, 115, 22, 0.18) 45%, transparent 70%)';
      } else if (day.temaColor === 'gold') {
        ambientGlow.style.background = 'radial-gradient(circle, rgba(235, 185, 90, 0.18) 0%, transparent 70%)';
      } else if (day.temaColor === 'warm-rose') {
        ambientGlow.style.background = 'radial-gradient(circle, rgba(244, 114, 182, 0.22) 0%, transparent 70%)';
      } else {
        ambientGlow.style.background = 'radial-gradient(circle, rgba(235, 110, 140, 0.16) 0%, transparent 70%)';
      }
    }

    // 4. Actualizar estado en la lista del cajón de recuerdos
    updateCapsuleListActive();

    // 5. Actualizar URL con deep-link sin recargar la página (solo para días pasados, para que al recargar siempre abra el día más reciente)
    try {
      const url = new URL(window.location);
      if (isLatest) {
        url.searchParams.delete('dia');
      } else {
        url.searchParams.set('dia', day.numero);
      }
      const newRelativePathQuery = url.pathname + (url.search ? url.search : '') + url.hash;
      window.history.replaceState({}, '', newRelativePathQuery);
    } catch (e) {}

    playRomanticChime();
  }

  // ----------------------------------------------------------------------------
  // DÍA 1: RENDERIZADO DE LA ESCENA DE MUSEO
  // ----------------------------------------------------------------------------
  function renderMuseumScene(day) {
    const elTitle = document.getElementById('plaque-title');
    const elDate = document.getElementById('plaque-date');
    const elTechnique = document.getElementById('plaque-technique');
    const elArtist = document.getElementById('gallery-artist-label');

    if (elTitle) elTitle.textContent = day.titulo || 'DECLARACIÓN N° 1';
    if (elDate) elDate.textContent = day.fechaLegible || day.fecha || '25 de Octubre, 2026';
    if (elTechnique) elTechnique.textContent = day.tecnica || 'Amor puro sobre lienzo digital';
    if (elArtist) elArtist.textContent = `Para ${window.CONFIG_MUSEO?.dedicadoA || 'Nicky'}`;
  }

  // ----------------------------------------------------------------------------
  // DÍA 2: TARJETA MÁGICA DE RASPAR (Scratch Card Engine)
  // ----------------------------------------------------------------------------
  function initScratchCard(day) {
    const canvas = document.getElementById('scratch-canvas');
    if (!canvas) return;

    // Si ya fue revelado previamente en esta sesión, mantener descubierto
    if (scratchRevealed) {
      canvas.style.opacity = '0';
      canvas.style.pointerEvents = 'none';
      const hint = document.getElementById('scratch-instruction-text');
      if (hint) hint.textContent = '✨ ¡Cupón canjeado con éxito! Toca 💌 para tu carta';
      const bar = document.getElementById('scratch-progress-bar');
      if (bar) bar.style.width = '100%';
      return;
    }

    const ctx = canvas.getContext('2d');
    const box = canvas.parentElement;
    const rect = box.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    const width = rect.width || 340;
    const height = rect.height || 230;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);

    // Pintar Foil Dorado Metálico con Textura de Brillos
    drawGoldenFoil(ctx, width, height, day);

    // Configurar raspado
    setupScratchEvents(canvas, ctx, width, height, dpr);
    scratchInitialized = true;
  }

  function drawGoldenFoil(ctx, width, height, day) {
    // Fondo base degradado metálico dorado
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#f2d484');
    grad.addColorStop(0.25, '#d4af37');
    grad.addColorStop(0.5, '#fef0cd');
    grad.addColorStop(0.75, '#b88a38');
    grad.addColorStop(1, '#deb85a');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Destellos dorados y filigrana sutil
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    for (let i = 0; i < 45; i++) {
      const rx = (Math.sin(i * 99) * 0.5 + 0.5) * width;
      const ry = (Math.cos(i * 33) * 0.5 + 0.5) * height;
      const r = (i % 3) + 1;
      ctx.beginPath();
      ctx.arc(rx, ry, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Marco ornamental en el foil
    ctx.strokeStyle = 'rgba(122, 82, 35, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.strokeRect(10, 10, width - 20, height - 20);
    ctx.setLineDash([]);

    // Textos de invitación sobre el foil
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Emoji o icono central
    ctx.font = '28px sans-serif';
    ctx.fillText('✨ 💎 ✨', width / 2, height / 2 - 28);

    // Título principal
    ctx.fillStyle = '#4a3311';
    ctx.font = 'bold 15px "Cinzel", Georgia, serif';
    ctx.fillText('FROTA AQUÍ CON TU DEDO', width / 2, height / 2 + 8);

    // Subtítulo
    ctx.fillStyle = '#6b4d1b';
    ctx.font = 'italic 12px "Cormorant Garamond", Georgia, serif';
    ctx.fillText('Raspa para revelar tu premio de hoy', width / 2, height / 2 + 28);
  }

  function setupScratchEvents(canvas, ctx, width, height, dpr) {
    let isDrawing = false;
    let totalPixels = 0;
    let checkThrottle = 0;

    const brushRadius = 26; // Radio del raspador con el dedo

    function getCoords(e) {
      const rect = canvas.getBoundingClientRect();
      let clientX = e.clientX;
      let clientY = e.clientY;

      if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }

      return {
        x: (clientX - rect.left),
        y: (clientY - rect.top)
      };
    }

    function scratch(x, y) {
      if (scratchRevealed) return;

      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, brushRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Audio feedback sutil
      playScratchTick();

      // Calcular porcentaje periódicamente (cada ~12 movimientos)
      checkThrottle++;
      if (checkThrottle % 12 === 0) {
        calculateScratchProgress();
      }
    }

    function calculateScratchProgress() {
      if (scratchRevealed) return;

      const sampleStep = 8; // Muestreo eficiente para no congelar móviles
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      let transparentCount = 0;
      let sampledCount = 0;

      for (let y = 0; y < canvas.height; y += sampleStep) {
        for (let x = 0; x < canvas.width; x += sampleStep) {
          const index = (y * canvas.width + x) * 4;
          const alpha = data[index + 3];
          if (alpha < 128) {
            transparentCount++;
          }
          sampledCount++;
        }
      }

      const percent = Math.min(100, Math.round((transparentCount / sampledCount) * 100));
      const progressBar = document.getElementById('scratch-progress-bar');
      const hintText = document.getElementById('scratch-instruction-text');

      if (progressBar) {
        progressBar.style.width = `${percent}%`;
      }

      if (hintText && percent > 5 && percent < 50) {
        hintText.textContent = `✨ Raspado: ${percent}%... ¡Sigue frotando!`;
      }

      // Si se raspa más del 48%, auto-revelar con celebración
      if (percent >= 48) {
        revealPrizeCelebration();
      }
    }

    function revealPrizeCelebration() {
      if (scratchRevealed) return;
      scratchRevealed = true;

      // Desvanecer el lienzo restante
      canvas.style.opacity = '0';
      canvas.style.pointerEvents = 'none';

      const progressBar = document.getElementById('scratch-progress-bar');
      const hintText = document.getElementById('scratch-instruction-text');

      if (progressBar) progressBar.style.width = '100%';
      if (hintText) {
        hintText.innerHTML = '🎉 <strong>¡PREMIO DESBLOQUEADO CON ÉXITO!</strong> 💖';
      }

      // Vibración háptica en móvil (si soportado)
      if (navigator.vibrate) {
        try { navigator.vibrate([100, 50, 150]); } catch (e) {}
      }

      // Música triunfal y lluvia de confeti
      playCelebrationChord();
      launchConfettiBurst();
    }

    // Handlers
    function start(e) {
      if (scratchRevealed) return;
      isDrawing = true;
      initAudio();
      const coords = getCoords(e);
      scratch(coords.x, coords.y);
    }

    function move(e) {
      if (!isDrawing || scratchRevealed) return;
      e.preventDefault(); // Prevenir scroll en móviles
      const coords = getCoords(e);
      scratch(coords.x, coords.y);
    }

    function end() {
      isDrawing = false;
    }

    // Touch events (Móvil)
    canvas.addEventListener('touchstart', start, { passive: false });
    canvas.addEventListener('touchmove', move, { passive: false });
    canvas.addEventListener('touchend', end);

    // Mouse events (Desktop)
    canvas.addEventListener('mousedown', start);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', end);
  }

  // ----------------------------------------------------------------------------
  // LLUVIA DE CONFETI Y CORAZONES DE CELEBRACIÓN
  // ----------------------------------------------------------------------------
  function launchConfettiBurst(customSymbols) {
    const symbols = customSymbols || ['💖', '✨', '🎟️', '🌸', '💕', '⭐', '🌹', '💛'];
    const count = 35;

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'confetti-particle';
      p.textContent = symbols[Math.floor(Math.random() * symbols.length)];

      const startX = window.innerWidth / 2 + (Math.random() - 0.5) * 160;
      const startY = window.innerHeight * 0.42;

      const destX = (Math.random() - 0.5) * window.innerWidth * 0.9;
      const destY = (Math.random() * 350) + 180;
      const rot = (Math.random() - 0.5) * 720;
      const size = 0.9 + Math.random() * 0.9;

      p.style.left = `${startX}px`;
      p.style.top = `${startY}px`;
      p.style.fontSize = `${size}rem`;
      p.style.setProperty('--cf-x', `${destX}px`);
      p.style.setProperty('--cf-y', `${destY}px`);
      p.style.setProperty('--cf-rot', `${rot}deg`);

      document.body.appendChild(p);

      setTimeout(() => {
        if (p.parentNode) p.parentNode.removeChild(p);
      }, 2300);
    }
  }

  // ----------------------------------------------------------------------------
  // DÍA 3: FRASCO DE BESOS & ABRAZOS INFINITOS (Engine)
  // ----------------------------------------------------------------------------
  let frascoInitialized = false;
  let currentMimoIndex = 0;
  let mimosGivenCount = 1;
  let isHoldingHug = false;
  let hugStartTime = 0;
  let hugHeartbeatTimer = null;
  let hugAnimFrame = null;
  const HUG_TOTAL_DURATION = 2300; // ms para completar el abrazo
  const RING_CIRCUMFERENCE = 326.72; // 2 * PI * 52

  function initFrascoAbrazos(day) {
    const mimosList = day.mimos || [];
    const elNoteDisplay = document.getElementById('jar-note-display');
    const elIcon = document.getElementById('note-icon');
    const elBadge = document.getElementById('note-badge');
    const elTitle = document.getElementById('note-title');
    const elDesc = document.getElementById('note-desc');
    const elCounter = document.getElementById('mimos-count');
    const jarClickable = document.getElementById('jar-clickable');
    const btnDrawKiss = document.getElementById('btn-draw-kiss');
    const btnAnotherKiss = document.getElementById('btn-another-kiss');
    const btnHugHold = document.getElementById('btn-hug-hold');
    const progressCircle = document.getElementById('hug-progress-circle');
    const statusText = document.getElementById('hug-status-text');

    // Inicializar primer mimo en la tarjeta si aún no tiene
    function displayMimo(mimo, triggerAnimation = true) {
      if (!mimo) return;
      if (elIcon) elIcon.textContent = mimo.icono || '🫂';
      if (elBadge) {
        elBadge.textContent = mimo.tipo === 'abrazo' ? 'Abrazo Especial' : (mimo.tipo === 'beso' ? 'Beso Incondicional' : 'Mimo del Alma');
      }
      if (elTitle) elTitle.textContent = mimo.titulo || 'Mimo para ti';
      if (elDesc) elDesc.textContent = mimo.descripcion || '';

      if (triggerAnimation && elNoteDisplay) {
        elNoteDisplay.style.animation = 'none';
        void elNoteDisplay.offsetWidth; // Reflow
        elNoteDisplay.style.animation = 'noteSlidePop 0.45s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards';
      }
    }

    // Sacar siguiente mimo
    function drawNextMimo(userAction = true) {
      if (mimosList.length === 0) return;
      currentMimoIndex = (currentMimoIndex + 1) % mimosList.length;
      const mimo = mimosList[currentMimoIndex];
      displayMimo(mimo, true);

      if (userAction) {
        mimosGivenCount++;
        if (elCounter) elCounter.textContent = mimosGivenCount;
        playKissSound();

        // Lanzar partículas desde el frasco
        const jarRect = jarClickable ? jarClickable.getBoundingClientRect() : null;
        if (jarRect) {
          spawnJarParticles(jarRect.left + jarRect.width / 2, jarRect.top + jarRect.height / 2);
        }
      }
    }

    // Partículas que flotan desde el frasco al sacar un mimo
    function spawnJarParticles(centerX, centerY) {
      const jarSymbols = ['💋', '💖', '✨', '🌸', '🫂', '🤍'];
      for (let i = 0; i < 7; i++) {
        const p = document.createElement('span');
        p.className = 'floating-heart-particle';
        p.textContent = jarSymbols[Math.floor(Math.random() * jarSymbols.length)];

        const dx = (Math.random() - 0.5) * 120;
        const rot = (Math.random() - 0.5) * 50;
        const size = 1.1 + Math.random() * 0.7;

        p.style.position = 'fixed';
        p.style.left = `${centerX}px`;
        p.style.top = `${centerY}px`;
        p.style.fontSize = `${size}rem`;
        p.style.setProperty('--dx', `${dx}px`);
        p.style.setProperty('--rot', `${rot}deg`);

        document.body.appendChild(p);

        setTimeout(() => {
          if (p.parentNode) p.parentNode.removeChild(p);
        }, 1600);
      }
    }

    // Mostrar el primer mimo inicial sin contar como acción nueva
    if (!frascoInitialized && mimosList.length > 0) {
      displayMimo(mimosList[0], false);
    }

    // Si ya vinculamos eventos, no repetir
    if (frascoInitialized) return;
    frascoInitialized = true;

    if (jarClickable) {
      jarClickable.addEventListener('click', () => drawNextMimo(true));
      jarClickable.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          drawNextMimo(true);
        }
      });
    }

    if (btnDrawKiss) {
      btnDrawKiss.addEventListener('click', () => drawNextMimo(true));
    }

    if (btnAnotherKiss) {
      btnAnotherKiss.addEventListener('click', () => drawNextMimo(true));
    }

    // --------------------------------------------------------------------------
    // LÓGICA DE ABRAZO SOSTENIDO (Hold to Hug)
    // --------------------------------------------------------------------------
    function updateProgressRing(fraction) {
      if (!progressCircle) return;
      const offset = RING_CIRCUMFERENCE * (1 - fraction);
      progressCircle.style.strokeDashoffset = offset;
    }

    function onHugHeartbeat() {
      playHeartbeatSound();
      if (navigator.vibrate) {
        try { navigator.vibrate(40); } catch(e) {}
      }
    }

    function stepHugAnimation() {
      if (!isHoldingHug) return;
      const elapsed = Date.now() - hugStartTime;
      const progress = Math.min(elapsed / HUG_TOTAL_DURATION, 1);
      updateProgressRing(progress);

      if (statusText) {
        if (progress < 0.28) {
          statusText.textContent = 'Sintiendo tu calorcito... 💓';
        } else if (progress < 0.65) {
          statusText.textContent = 'Abrazándote bien fuerte... 🤗';
        } else if (progress < 0.95) {
          statusText.textContent = 'Llenando tu corazón de amor y paz... ✨';
        }
      }

      if (progress >= 1) {
        completeHugHold();
      } else {
        hugAnimFrame = requestAnimationFrame(stepHugAnimation);
      }
    }

    function startHugHold(e) {
      if (e) e.preventDefault();
      if (isHoldingHug) return;
      isHoldingHug = true;
      hugStartTime = Date.now();

      if (btnHugHold) btnHugHold.classList.add('holding');

      // Primer latido instantáneo
      onHugHeartbeat();

      // Latidos regulares cada 680ms
      hugHeartbeatTimer = setInterval(onHugHeartbeat, 680);

      // Iniciar animación de anillo
      hugAnimFrame = requestAnimationFrame(stepHugAnimation);
    }

    function cancelHugHold() {
      if (!isHoldingHug) return;
      isHoldingHug = false;

      if (btnHugHold) btnHugHold.classList.remove('holding');
      if (hugHeartbeatTimer) clearInterval(hugHeartbeatTimer);
      if (hugAnimFrame) cancelAnimationFrame(hugAnimFrame);

      // Retroceder anillo suavemente
      updateProgressRing(0);

      if (statusText) {
        statusText.textContent = '¡No te sueltes tan rápido! Mantén presionado 🤗';
      }
    }

    function completeHugHold() {
      isHoldingHug = false;
      if (btnHugHold) btnHugHold.classList.remove('holding');
      if (hugHeartbeatTimer) clearInterval(hugHeartbeatTimer);
      if (hugAnimFrame) cancelAnimationFrame(hugAnimFrame);

      updateProgressRing(1);

      playCelebrationChord();
      if (navigator.vibrate) {
        try { navigator.vibrate([60, 50, 90]); } catch(e) {}
      }

      launchConfettiBurst(['🫂', '💋', '❤️', '💖', '✨', '🌸', '🤍', '🧸']);

      if (statusText) {
        statusText.textContent = '¡ABRAZO ENORME ENTREGADO! Te tengo en mis brazos 💕';
      }

      mimosGivenCount++;
      if (elCounter) elCounter.textContent = mimosGivenCount;

      setTimeout(() => {
        updateProgressRing(0);
        if (statusText && !isHoldingHug) {
          statusText.textContent = 'Apoya tu dedo y no lo sueltes...';
        }
      }, 4000);
    }

    if (btnHugHold) {
      // Pointer Events (soporta touch y mouse sin conflicto)
      btnHugHold.addEventListener('pointerdown', startHugHold);
      btnHugHold.addEventListener('pointerup', cancelHugHold);
      btnHugHold.addEventListener('pointercancel', cancelHugHold);
      btnHugHold.addEventListener('pointerleave', cancelHugHold);
    }
  }

  // ----------------------------------------------------------------------------
  // DÍA 4: EL CALDERO ENCANTADO DE HALLOWEEN (Engine)
  // ----------------------------------------------------------------------------
  let halloweenInitialized = false;
  let currentSpellIndex = 0;
  const LIQUID_COLORS = [
    'radial-gradient(ellipse at 50% 50%, #34d399 0%, #10b981 35%, #8b5cf6 75%, #4c1d95 100%)',
    'radial-gradient(ellipse at 50% 50%, #f97316 0%, #ea580c 40%, #7e22ce 80%, #3b0764 100%)',
    'radial-gradient(ellipse at 50% 50%, #ec4899 0%, #db2777 40%, #9333ea 75%, #4c1d95 100%)',
    'radial-gradient(ellipse at 50% 50%, #38bdf8 0%, #0284c7 35%, #8b5cf6 75%, #312e81 100%)'
  ];
  let liquidColorIndex = 0;

  function initHalloweenCaldero(day) {
    const hechizosList = day.hechizos || [];
    const elNoteDisplay = document.getElementById('spell-note-display');
    const elIcon = document.getElementById('spell-icon');
    const elBadge = document.getElementById('spell-badge');
    const elTitle = document.getElementById('spell-title');
    const elDesc = document.getElementById('spell-desc');
    const elLiquid = document.getElementById('cauldron-liquid');
    const cauldronClickable = document.getElementById('cauldron-clickable');
    const btnStirCauldron = document.getElementById('btn-stir-cauldron');
    const btnAnotherSpell = document.getElementById('btn-another-spell');
    const btnTreat = document.getElementById('btn-tot-treat');
    const btnTrick = document.getElementById('btn-tot-trick');
    const totMsgBox = document.getElementById('tot-message-box');

    function displaySpell(spell, triggerAnimation = true) {
      if (!spell) return;
      if (elIcon) elIcon.textContent = spell.icono || '🎃';
      if (elBadge) elBadge.textContent = 'Hechizo de Amor';
      if (elTitle) elTitle.textContent = spell.titulo || 'Hechizo Mágico';
      if (elDesc) elDesc.textContent = spell.descripcion || '';

      if (triggerAnimation && elNoteDisplay) {
        elNoteDisplay.style.animation = 'none';
        void elNoteDisplay.offsetWidth; // Reflow
        elNoteDisplay.style.animation = 'spellSlidePop 0.45s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards';
      }
    }

    function stirCauldron(userAction = true) {
      if (hechizosList.length === 0) return;
      currentSpellIndex = (currentSpellIndex + 1) % hechizosList.length;
      const spell = hechizosList[currentSpellIndex];
      displaySpell(spell, true);

      // Cambiar color del líquido resplandeciente
      liquidColorIndex = (liquidColorIndex + 1) % LIQUID_COLORS.length;
      if (elLiquid) {
        elLiquid.style.background = LIQUID_COLORS[liquidColorIndex];
      }

      if (userAction) {
        playCauldronBubbleSound();
        setTimeout(playSpookyMagicChime, 150);

        if (navigator.vibrate) {
          try { navigator.vibrate(35); } catch (e) {}
        }

        // Partículas mágicas desde el caldero
        const rect = cauldronClickable ? cauldronClickable.getBoundingClientRect() : null;
        if (rect) {
          spawnCauldronParticles(rect.left + rect.width / 2, rect.top + 30);
        }
      }
    }

    function spawnCauldronParticles(centerX, centerY) {
      const magicSymbols = ['🎃', '✨', '🔮', '🦇', '🍬', '💜', '🧡', '👻'];
      for (let i = 0; i < 7; i++) {
        const p = document.createElement('span');
        p.className = 'floating-heart-particle';
        p.textContent = magicSymbols[Math.floor(Math.random() * magicSymbols.length)];

        const dx = (Math.random() - 0.5) * 140;
        const rot = (Math.random() - 0.5) * 60;
        const size = 1.1 + Math.random() * 0.7;

        p.style.position = 'fixed';
        p.style.left = `${centerX}px`;
        p.style.top = `${centerY}px`;
        p.style.fontSize = `${size}rem`;
        p.style.setProperty('--dx', `${dx}px`);
        p.style.setProperty('--rot', `${rot}deg`);

        document.body.appendChild(p);

        setTimeout(() => {
          if (p.parentNode) p.parentNode.removeChild(p);
        }, 1600);
      }
    }

    // Inicializar primer hechizo
    if (!halloweenInitialized && hechizosList.length > 0) {
      displaySpell(hechizosList[0], false);
    }

    if (halloweenInitialized) return;
    halloweenInitialized = true;

    if (cauldronClickable) {
      cauldronClickable.addEventListener('click', () => stirCauldron(true));
      cauldronClickable.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          stirCauldron(true);
        }
      });
    }

    if (btnStirCauldron) {
      btnStirCauldron.addEventListener('click', () => stirCauldron(true));
    }

    if (btnAnotherSpell) {
      btnAnotherSpell.addEventListener('click', () => stirCauldron(true));
    }

    // Mecánica Dulce
    if (btnTreat) {
      btnTreat.addEventListener('click', () => {
        const dulces = day.dulces || ["🍬 ¡Eres la persona más dulce del mundo entero!"];
        const msg = dulces[Math.floor(Math.random() * dulces.length)];
        if (totMsgBox) totMsgBox.textContent = msg;

        playRomanticChime();
        if (navigator.vibrate) {
          try { navigator.vibrate(30); } catch (e) {}
        }
        launchConfettiBurst(['🍬', '🍭', '🍫', '💖', '✨', '🧁', '🧡']);
      });
    }

    // Mecánica Travesura
    if (btnTrick) {
      btnTrick.addEventListener('click', () => {
        const travesuras = day.travesuras || ["🎃 ¡Buuu! Estoy perdidamente embrujado de ti."];
        const msg = travesuras[Math.floor(Math.random() * travesuras.length)];
        if (totMsgBox) totMsgBox.textContent = msg;

        playGhostBooSound();
        if (navigator.vibrate) {
          try { navigator.vibrate([40, 40, 60]); } catch (e) {}
        }
        launchConfettiBurst(['🦇', '🎃', '👻', '🕸️', '✨', '🕷️', '💜']);
      });
    }
  }

  // Partículas táctiles en el lienzo de museo
  const HEART_SYMBOLS = ['❤️', '✨', '💖', '💕', '🌸', '💫'];

  function spawnTouchParticles(clientX, clientY) {
    const canvasEl = document.getElementById('canvas');
    if (!canvasEl) return;

    const rect = canvasEl.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const count = Math.floor(Math.random() * 3) + 3;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('span');
      particle.className = 'floating-heart-particle';
      particle.textContent = HEART_SYMBOLS[Math.floor(Math.random() * HEART_SYMBOLS.length)];

      const dx = (Math.random() - 0.5) * 80;
      const rot = (Math.random() - 0.5) * 60;
      const size = 0.9 + Math.random() * 0.8;

      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.fontSize = `${size}rem`;
      particle.style.setProperty('--dx', `${dx}px`);
      particle.style.setProperty('--rot', `${rot}deg`);

      canvasEl.appendChild(particle);

      setTimeout(() => {
        if (particle.parentNode) particle.parentNode.removeChild(particle);
      }, 1600);
    }
  }

  // ----------------------------------------------------------------------------
  // CAJÓN DE RECUERDOS (CÁPSULA DEL TIEMPO / TIMELINE DRAWER)
  // ----------------------------------------------------------------------------
  function renderCapsuleDrawerList() {
    const listEl = document.getElementById('capsule-days-list');
    const countBadge = document.getElementById('capsule-count-badge');
    if (!listEl) return;

    if (countBadge) countBadge.textContent = historial.length;
    listEl.innerHTML = '';

    // Mostrar en orden cronológico o inverso
    historial.forEach((day, index) => {
      const isToday = index === historial.length - 1;
      const isActive = index === currentIndex;

      const item = document.createElement('div');
      item.className = `day-card-item ${isActive ? 'active' : ''}`;
      item.setAttribute('role', 'listitem');
      item.innerHTML = `
        <div class="day-card-left">
          <div class="day-card-icon">${day.icono || '✨'}</div>
          <div>
            <div class="day-card-number">Día ${day.numero}</div>
            <div class="day-card-title">${day.titulo}</div>
            <div class="day-card-date">${day.fechaLegible || day.fecha}</div>
          </div>
        </div>
        <div class="day-card-right">
          ${isToday ? '<span class="badge-today">HOY</span>' : ''}
          ${isActive ? '<span class="badge-active-dot">● Viendo</span>' : ''}
        </div>
      `;

      item.addEventListener('click', () => {
        goToDay(index);
        closeCapsuleDrawer();
      });

      listEl.appendChild(item);
    });
  }

  function updateCapsuleListActive() {
    const items = document.querySelectorAll('.day-card-item');
    items.forEach((item, index) => {
      const isActive = index === currentIndex;
      if (isActive) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  function openCapsuleDrawer() {
    const drawer = document.getElementById('capsule-drawer');
    if (drawer) {
      renderCapsuleDrawerList();
      drawer.classList.add('active');
      playRomanticChime();
    }
  }

  function closeCapsuleDrawer() {
    const drawer = document.getElementById('capsule-drawer');
    if (drawer) {
      drawer.classList.remove('active');
    }
  }

  // ----------------------------------------------------------------------------
  // MODAL DE MENSAJE SECRETO (Carta de Amor)
  // ----------------------------------------------------------------------------
  function showSecretModal() {
    const modal = document.getElementById('secret-modal');
    const textEl = document.getElementById('secret-letter-text');
    const titleEl = document.getElementById('secret-letter-title');
    if (!modal || !textEl) return;

    const day = getCurrentDay();
    textEl.textContent = day.mensajeSecreto || 'Te amo con todo mi corazón, hoy y siempre.';
    if (titleEl) {
      titleEl.textContent = `Mensaje del Día ${day.numero}`;
    }

    modal.classList.add('active');
    playRomanticChime();
  }

  function hideSecretModal() {
    const modal = document.getElementById('secret-modal');
    if (modal) {
      modal.classList.remove('active');
    }
  }

  // ----------------------------------------------------------------------------
  // VINCULACIÓN DE EVENTOS Y ARRANQUE
  // ----------------------------------------------------------------------------
  function setupEvents() {
    // 1. Botones de rebobinado
    const btnPrev = document.getElementById('btn-prev-day');
    const btnNext = document.getElementById('btn-next-day');
    const btnPill = document.getElementById('btn-capsule-pill');
    const btnTopCapsule = document.getElementById('open-capsule-btn');
    const btnCloseCapsule = document.getElementById('close-capsule-btn');
    const drawerBackdrop = document.getElementById('capsule-drawer');

    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        if (currentIndex > 0) goToDay(currentIndex - 1);
      });
    }

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        if (currentIndex < historial.length - 1) goToDay(currentIndex + 1);
      });
    }

    if (btnPill) btnPill.addEventListener('click', openCapsuleDrawer);
    if (btnTopCapsule) btnTopCapsule.addEventListener('click', openCapsuleDrawer);
    if (btnCloseCapsule) btnCloseCapsule.addEventListener('click', closeCapsuleDrawer);

    if (drawerBackdrop) {
      drawerBackdrop.addEventListener('click', (e) => {
        if (e.target === drawerBackdrop) closeCapsuleDrawer();
      });
    }

    // Atajos de teclado (flechas izquierda / derecha)
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        goToDay(currentIndex - 1);
      } else if (e.key === 'ArrowRight' && currentIndex < historial.length - 1) {
        goToDay(currentIndex + 1);
      } else if (e.key === 'Escape') {
        closeCapsuleDrawer();
        hideSecretModal();
      }
    });

    // 2. Sellos de Cera (abren la carta de amor)
    const sealBtn1 = document.getElementById('seal-btn');
    const sealBtn2 = document.getElementById('seal-btn-scratch');
    const sealBtn3 = document.getElementById('seal-btn-frasco');
    const sealBtn4 = document.getElementById('seal-btn-halloween');
    const closeLetterBtn = document.getElementById('close-letter-btn');
    const secretModal = document.getElementById('secret-modal');

    if (sealBtn1) sealBtn1.addEventListener('click', (e) => { e.stopPropagation(); showSecretModal(); });
    if (sealBtn2) sealBtn2.addEventListener('click', (e) => { e.stopPropagation(); showSecretModal(); });
    if (sealBtn3) sealBtn3.addEventListener('click', (e) => { e.stopPropagation(); showSecretModal(); });
    if (sealBtn4) sealBtn4.addEventListener('click', (e) => { e.stopPropagation(); showSecretModal(); });
    if (closeLetterBtn) closeLetterBtn.addEventListener('click', hideSecretModal);

    if (secretModal) {
      secretModal.addEventListener('click', (e) => {
        if (e.target === secretModal) hideSecretModal();
      });
    }

    // 3. Toque en el lienzo del Día 1
    const canvasEl = document.getElementById('canvas');
    if (canvasEl) {
      const handleTap = (e) => {
        let clientX = e.clientX;
        let clientY = e.clientY;

        if (e.touches && e.touches.length > 0) {
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
        }

        if (clientX !== undefined && clientY !== undefined) {
          spawnTouchParticles(clientX, clientY);
        }

        playRomanticChime();
      };

      canvasEl.addEventListener('click', handleTap);
      canvasEl.addEventListener('touchstart', handleTap, { passive: true });
    }

    // 4. Control de Sonido
    const soundToggle = document.getElementById('sound-toggle');
    if (soundToggle) {
      soundToggle.addEventListener('click', () => {
        audioEnabled = !audioEnabled;
        const icon = soundToggle.querySelector('.sound-icon');
        const label = soundToggle.querySelector('.sound-label');

        if (audioEnabled) {
          initAudio();
          playRomanticChime();
          if (icon) icon.textContent = '🔔';
          if (label) label.textContent = 'Sonido';
          soundToggle.style.opacity = '1';
        } else {
          if (icon) icon.textContent = '🔕';
          if (label) label.textContent = 'Silencio';
          soundToggle.style.opacity = '0.6';
        }
      });
    }
  }

  // ----------------------------------------------------------------------------
  // INICIALIZACIÓN
  // ----------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Revisar si la URL trae un parámetro `?dia=N`
    try {
      const params = new URLSearchParams(window.location.search);
      const diaParam = parseInt(params.get('dia'), 10);
      if (!isNaN(diaParam)) {
        const foundIdx = historial.findIndex(d => d.numero === diaParam);
        if (foundIdx !== -1) {
          currentIndex = foundIdx;
        }
      }
    } catch (e) {}

    setupEvents();
    renderCapsuleDrawerList();

    // Iniciar en el día seleccionado (por defecto el último / HOY)
    goToDay(currentIndex);
  });

})();
