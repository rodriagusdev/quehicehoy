/**
 * ==============================================================================
 * 🏛️ MOTOR DE LA GALERÍA - HOLANICKY
 * ==============================================================================
 * Maneja el renderizado de la obra del día, la música sintetizada por Web Audio,
 * las partículas de corazones y el modal de mensaje secreto.
 */

(function () {
  'use strict';

  // Estado global de la app
  let audioEnabled = true;
  let audioCtx = null;
  let currentWork = null;

  // Inicializar Web Audio al primer toque (política de navegadores móviles)
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

  // Tocar una campanita mágica armónica (Pentatónica romántica suave)
  const CHIME_FREQUENCIES = [554.37, 659.25, 830.61, 987.77, 1108.73, 1318.51]; // C#5, E5, G#5, B5, C#6, E6
  let chimeIndex = 0;

  function playRomanticChime() {
    if (!audioEnabled) return;
    initAudio();
    if (!audioCtx) return;

    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      // Alternar notas pentatónicas suaves
      const freq = CHIME_FREQUENCIES[chimeIndex % CHIME_FREQUENCIES.length];
      chimeIndex++;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Envolvente de sonido suave (tipo caja musical / carillón de cristal)
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 1.25);
    } catch (e) {
      console.warn("Audio feedback no disponible:", e);
    }
  }

  // Obtener fecha actual en formato AAAA-MM-DD (local)
  function getLocalDateKey() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Formatear fecha para el museo (ej: "25 de Octubre, 2026")
  function formatMuseumDate(dateObj = new Date()) {
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    const dia = dateObj.getDate();
    const mes = meses[dateObj.getMonth()];
    const anio = dateObj.getFullYear();
    return `${dia} de ${mes}, ${anio}`;
  }

  // Determinar la obra que corresponde mostrar hoy
  function resolveCurrentWork() {
    const config = window.CONFIG_OBRAS || {};
    const dateKey = getLocalDateKey();

    // 1. Verificar si hay una obra específica programada para la fecha de hoy
    if (config.obrasPorFecha && config.obrasPorFecha[dateKey]) {
      return {
        ...config.obrasPorFecha[dateKey],
        origen: 'calendario'
      };
    }

    // 2. Si no, usar la obra fijada en `obraDeHoy`
    if (config.obraDeHoy) {
      return {
        ...config.obraDeHoy,
        origen: 'defecto'
      };
    }

    // 3. Fallback de emergencia
    return {
      tipo: 'texto',
      titulo: 'Declaración de Amor',
      textoPrincipal: 'TE AMO',
      subtitulo: 'Cada instante a tu lado es una obra de arte.',
      tecnica: 'Amor puro sobre lienzo',
      mensajeSecreto: 'Eres mi persona favorita en el universo entero ❤️'
    };
  }

  // Renderizar el lienzo según el tipo
  function renderCanvas(work) {
    const container = document.getElementById('canvas-content');
    if (!container) return;

    container.innerHTML = '';

    if (work.tipo === 'texto') {
      const wrapper = document.createElement('div');
      wrapper.className = 'canvas-content-wrapper';

      const mainText = document.createElement('h1');
      mainText.className = 'art-te-amo';
      mainText.id = 'painting-main-text';
      mainText.textContent = work.textoPrincipal || 'TE AMO';

      // Floreo caligráfico decorativo (SVG)
      const flourish = document.createElement('div');
      flourish.className = 'art-flourish';
      flourish.innerHTML = `
        <svg viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 10C25 3 35 17 50 10C65 3 75 17 95 10" stroke="#991b34" stroke-width="1.8" stroke-linecap="round"/>
          <circle cx="50" cy="10" r="2.5" fill="#991b34"/>
          <circle cx="20" cy="8" r="1.5" fill="#c73652"/>
          <circle cx="80" cy="12" r="1.5" fill="#c73652"/>
        </svg>
      `;

      const subtitle = document.createElement('p');
      subtitle.className = 'art-subtitle';
      subtitle.textContent = work.subtitulo || '';

      wrapper.appendChild(mainText);
      wrapper.appendChild(flourish);
      if (work.subtitulo) {
        wrapper.appendChild(subtitle);
      }
      container.appendChild(wrapper);

    } else if (work.tipo === 'imagen') {
      const img = document.createElement('img');
      img.className = 'canvas-image-view';
      img.src = work.imagenUrl;
      img.alt = work.titulo || 'Obra para Nicky';
      img.loading = 'eager';

      img.onerror = function () {
        // Fallback si la imagen no carga
        container.innerHTML = `
          <div class="canvas-content-wrapper">
            <span style="font-size: 2.5rem; margin-bottom: 0.5rem;">🖼️</span>
            <p class="art-subtitle" style="color: #8c6d23;">${work.titulo || 'Para Nicky'}</p>
          </div>
        `;
      };

      container.appendChild(img);

    } else if (work.tipo === 'video') {
      const video = document.createElement('video');
      video.className = 'canvas-video-view';
      video.src = work.videoUrl;
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.setAttribute('playsinline', '');

      container.appendChild(video);

    } else if (work.tipo === 'accion') {
      const wrapper = document.createElement('div');
      wrapper.className = 'canvas-content-wrapper';
      wrapper.innerHTML = `
        <div style="font-size: 2.8rem; margin-bottom: 0.75rem;">💌</div>
        <h2 style="font-family: 'Cinzel', serif; font-size: 1.15rem; color: #7a5223; margin-bottom: 0.5rem;">${work.titulo || 'Para Ti'}</h2>
        <p style="font-family: 'Cormorant Garamond', serif; font-size: 1.25rem; font-style: italic; color: #42352c; margin-bottom: 1rem;">${work.textoPrincipal || ''}</p>
        <span style="display: inline-block; font-size: 0.75rem; background: rgba(184, 138, 56, 0.15); color: #8c6d23; padding: 0.35rem 0.85rem; border-radius: 9999px; border: 1px dashed #b88a38;">${work.instruccion || 'Toca aquí'}</span>
      `;
      container.appendChild(wrapper);
    }
  }

  // Actualizar la Cédula de Museo debajo del marco
  function renderPlaque(work) {
    const config = window.CONFIG_OBRAS || {};
    const museo = config.museo || {};

    const elTitle = document.getElementById('plaque-title');
    const elDate = document.getElementById('plaque-date');
    const elTechnique = document.getElementById('plaque-technique');
    const elArtist = document.getElementById('gallery-artist-label');

    if (elTitle) elTitle.textContent = work.titulo || 'PARA NICKY';
    if (elDate) elDate.textContent = formatMuseumDate();
    if (elTechnique) elTechnique.textContent = work.tecnica || 'Óleo y amor sobre lienzo';
    if (elArtist) elArtist.textContent = `Para ${museo.dedicadoA || 'Nicky'}`;
  }

  // Generar partículas de corazones y estrellas en el punto de contacto
  const HEART_SYMBOLS = ['❤️', '✨', '💖', '💕', '🌸', '💫'];

  function spawnTouchParticles(clientX, clientY) {
    const canvasEl = document.getElementById('canvas');
    if (!canvasEl) return;

    const rect = canvasEl.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Crear entre 3 y 5 partículas por toque
    const count = Math.floor(Math.random() * 3) + 3;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('span');
      particle.className = 'floating-heart-particle';
      particle.textContent = HEART_SYMBOLS[Math.floor(Math.random() * HEART_SYMBOLS.length)];

      // Dispersión aleatoria
      const dx = (Math.random() - 0.5) * 80;
      const rot = (Math.random() - 0.5) * 60;
      const size = 0.9 + Math.random() * 0.8;

      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.fontSize = `${size}rem`;
      particle.style.setProperty('--dx', `${dx}px`);
      particle.style.setProperty('--rot', `${rot}deg`);

      canvasEl.appendChild(particle);

      // Eliminar al terminar la animación
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 1600);
    }
  }

  // Modal de Mensaje Secreto
  function showSecretModal() {
    const modal = document.getElementById('secret-modal');
    const textEl = document.getElementById('secret-letter-text');
    if (!modal || !textEl) return;

    textEl.textContent = currentWork.mensajeSecreto || 'Te amo con todo mi corazón, hoy y siempre.';
    modal.classList.add('active');
    playRomanticChime();
  }

  function hideSecretModal() {
    const modal = document.getElementById('secret-modal');
    if (modal) {
      modal.classList.remove('active');
    }
  }

  // Inicialización de Eventos
  function setupEvents() {
    const canvasEl = document.getElementById('canvas');
    const sealBtn = document.getElementById('seal-btn');
    const closeBtn = document.getElementById('close-letter-btn');
    const modal = document.getElementById('secret-modal');
    const soundToggle = document.getElementById('sound-toggle');

    // Toque en el lienzo
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

    // Botón de sello de cera abre el mensaje secreto
    if (sealBtn) {
      sealBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showSecretModal();
      });
    }

    // Cerrar modal
    if (closeBtn) {
      closeBtn.addEventListener('click', hideSecretModal);
    }
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          hideSecretModal();
        }
      });
    }

    // Control de sonido
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

  // Arranque al cargar DOM
  document.addEventListener('DOMContentLoaded', () => {
    currentWork = resolveCurrentWork();
    renderCanvas(currentWork);
    renderPlaque(currentWork);
    setupEvents();
  });

})();
