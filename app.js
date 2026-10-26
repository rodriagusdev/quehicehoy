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

  // Acorde triunfal de celebración al revelar el cupón
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

    if (day.experiencia === 'raspa-y-gana') {
      if (sceneMuseo) sceneMuseo.classList.add('hidden');
      if (sceneScratch) {
        sceneScratch.classList.remove('hidden');
        initScratchCard(day);
      }
    } else {
      // Por defecto escena museo (Día 1 u otros de galería)
      if (sceneScratch) sceneScratch.classList.add('hidden');
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
      if (day.temaColor === 'gold') {
        ambientGlow.style.background = 'radial-gradient(circle, rgba(235, 185, 90, 0.18) 0%, transparent 70%)';
      } else {
        ambientGlow.style.background = 'radial-gradient(circle, rgba(235, 110, 140, 0.16) 0%, transparent 70%)';
      }
    }

    // 4. Actualizar estado en la lista del cajón de recuerdos
    updateCapsuleListActive();

    // 5. Actualizar URL con deep-link sin recargar la página
    try {
      const url = new URL(window.location);
      url.searchParams.set('dia', day.numero);
      window.history.replaceState({}, '', url);
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
  function launchConfettiBurst() {
    const symbols = ['💖', '✨', '🎟️', '🌸', '💕', '⭐', '🌹', '💛'];
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
    const closeLetterBtn = document.getElementById('close-letter-btn');
    const secretModal = document.getElementById('secret-modal');

    if (sealBtn1) sealBtn1.addEventListener('click', (e) => { e.stopPropagation(); showSecretModal(); });
    if (sealBtn2) sealBtn2.addEventListener('click', (e) => { e.stopPropagation(); showSecretModal(); });
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
