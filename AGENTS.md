# 🤖 AGENTS.md - Guía del Proyecto "Hola Nicky" ❤️

Este documento sirve como bitácora y guía de diseño para agentes y desarrolladores que trabajen en este repositorio.

---

## 🎯 Propósito del Proyecto
**"Hola Nicky"** es una experiencia web diaria creada con amor para Nicky (la novia del usuario). 
Está pensada para ser consumida principalmente desde su teléfono móvil y desplegada de forma estática en **GitHub Pages**.

Cada día (o en cada actualización), el usuario le presenta una sorpresa nueva, interactiva y emocionante, pero **manteniendo un registro histórico acumulativo para que Nicky pueda "rebobinar" (rewind), explorar días pasados y revivir cada detalle**.

---

## 📅 Registro de Días Existentes

### 🏛️ Día 1: Galería de Museo ("Declaración N° 1")
- **Experiencia:** Galería con marco de cuadro realista 3D sobre pared de museo (`#141215`).
- **Lienzo:** Tipografía "TE AMO", caligrafía ornamental roja en SVG y subtítulo *"Hoy, mañana y todos los días de mi vida."*
- **Interactividad:** Toques sobre el lienzo generan partículas de corazones y estrellas flotantes (`❤️`, `✨`, `💖`, `💕`, `🌸`, `💫`) acompañadas de campanitas pentatónicas armónicas sintetizadas con Web Audio.
- **Cédula de Museo:** Placa inferior con sello de cera (`💌`) que abre una carta secreta:
  > *"Eres lo más hermoso que me ha pasado en la vida. Gracias por existir ❤️"*

### 🎟️ Día 2: Tarjeta Mágica de Raspar ("Raspa y Gana tu Sorpresa")
- **Experiencia:** Billete Dorado de Amor (Scratch-off Ticket) con textura metálica de foil sobre un ticket con muescas decorativas.
- **Mecánica de Raspar:** La usuaria desliza su dedo o mouse sobre el foil dorado en un HTML5 `<canvas>`. Al frotar, el foil se borra dejando ver el premio oculto con sonido de fricción suave.
- **Premio Revelado:** Al raspar el ~50%, se activa la auto-revelación con explosión de confeti y corazones, acorde triunfal y vibración háptica:
  > *"🎟️ VALE OFICIAL CANJEABLE: CITA MÁGICA Y CONSENTIMIENTO TOTAL — Válido por: Tu comida favorita + Un masaje relajante infinito + Todos los besos y abrazos que quieras hoy y siempre 💕"*
- **Carta Secreta del Día 2:** Mensaje accesible mediante el botón de sello de cera (`💌`):
  > *"Te mereces el universo entero, mi vida. Este vale no tiene fecha de vencimiento y puedes cobrarlo cuantas veces quieras. Te amo con todo mi ser ❤️"*

---

## ⏳ Arquitectura del Sistema de "Rewind" (Rebobinado)

1. **Estructura de Datos (`content.js`):**
   - El arreglo `HISTORIAL_DIAS` almacena todos los días en orden cronológico (`numero: 1, 2, ...`).
   - Cada día contiene: `id`, `numero`, `fecha`, `fechaLegible`, `icono`, `badge`, `titulo`, `experiencia`, `mensajeSecreto`, `temaColor`, y los datos específicos de su dinámica.
2. **Navegación en Pantalla:**
   - **Barra Flotante Inferior (`.rewind-nav-bar`):**
     - Botón `⏪ Anterior`: Retrocede un día en el tiempo. Deshabilitado si se está en el Día 1.
     - Botón `Día X • Hoy ▲`: Píldora central que indica el día visible y abre la Cápsula del Tiempo.
     - Botón `Siguiente ⏩`: Avanza hacia los días más recientes. Deshabilitado en el último día.
   - **Cajón de Recuerdos / Cápsula del Tiempo (`#capsule-drawer`):**
     - Deslizable desde abajo con efecto vidrio escarchado (*frosted glass*).
     - Lista todos los días creados con sus iconos, fechas y títulos. Permite saltar directamente a cualquiera con un toque.
     - Destaca con un badge el día de `HOY` y marca con `● Viendo` el día activo.
   - **Carga Inicial Inteligente:**
     - Al entrar a la URL raíz (`index.html`), el sistema abre **el día más reciente (HOY)** automáticamente.
     - Soporta deep-links: `?dia=1` o `?dia=2` para compartir o revivir un día exacto.

---

## 📌 Protocolo para Agregar Nuevos Días (Día 3, Día 4, etc.)

Cuando el usuario pida *"haz algo diferente hoy"*:
1. **NUNCA borres ni sobrescribas los días anteriores en `HISTORIAL_DIAS`.**
2. Añade un nuevo objeto al final del arreglo `HISTORIAL_DIAS` en `content.js` con:
   - `numero`: N
   - `fecha`: Fecha actual en `AAAA-MM-DD`
   - `id`: `"dia-N"`
   - `icono`: Emoji representativo de la experiencia
   - `experiencia`: Nombre de la escena o tipo de dinámica
   - `titulo`, `subtitulo`, `mensajeSecreto`, etc.
3. Si la experiencia utiliza una escena visual nueva (ej: constelación de estrellas, tocadiscos, carta desdoblable, minijuego), agrégala en `index.html` dentro de `<div id="stage-container">` con clase `scene-view hidden`.
4. En `app.js`, vincula la lógica del nuevo día dentro de `goToDay()` para que se active su escenario cuando `currentIndex` coincida.
5. Actualiza este archivo `AGENTS.md` registrando la nueva sorpresa creada.

---

## 🛠️ Tecnologías y Restricciones
- **100% Estático:** HTML5, CSS3 y JavaScript puro (vanilla). Apto para GitHub Pages directo sin build step ni Node en producción.
- **Audio Web API:** Síntesis nativa para evitar dependencias de archivos pesados.
- **Diseño Mobile-First:** Diseñado para pantallas táctiles de celulares iPhone/Android con prevención de rebotes y soporte PWA.
