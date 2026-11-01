# 🤖 AGENTS.md - Guía del Proyecto "Hola Nicky" ❤️

Este documento sirve como bitácora y guía de diseño para agentes y desarrolladores que trabajen en este repositorio.

---

## 🎯 Propósito del Proyecto
**"Hola Nicky"** es una experiencia web diaria creada con amor para Nicky (la novia del usuario). 
Está pensada para ser consumida principalmente desde su teléfono móvil y desplegada de forma estática en **GitHub Pages**.

Cada día (o en cada actualización), el usuario le presenta una sorpresa nueva, interactiva y emocionante, pero **manteniendo un registro histórico acumulativo para que Nicky pueda "rebobinar" (rewind), explorar días pasados y revivir cada detalle**.

---

## 👩‍❤️‍👨 Perfil y Preferencias de Nicky (Reglas Críticas de Tono y Diseño)
- 🇦🇷 **Español Argentino:** El idioma y redacción a usar SIEMPRE es **español Argentino / Rioplatense** con voseo auténtico y afectuoso (*vos sos, mirá lo que somos, te amo con locura, bancarnos, che mi amor*, etc.). Evitar modismos neutros o de otros países.
- 🚫🧉 **NO toma mate:** **Nunca** hacer referencias a tomar mate, rondas de mate o cebar mates (¡no le gusta/no toma mate!).
- 🌌 **Color favorito:** Su color favorito es el **azul oscuro como de noche estrellada** (azul noche profundo / medianoche con destellos de estrellas, ej: `#0b132b`, `#1c2541`, midnight blue cósmico). Tenerlo siempre presente para futuros temas, paletas y experiencias visuales.

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

### 🫂 Día 3: Frasco de Besos & Abrazos Infinitos ("Dispensador de Mimos")
- **Experiencia:** Refugio íntimo de cariño, 100% emocional y cero cosas materiales o pagas. Un frasco de cristal iluminado con luciérnagas y corazones animados en su interior.
- **Mecánica 1 (Sacar un Mimo):** Tocar el frasco o pulsar "Sacar un Mimo" extrae una tarjeta de cariño única (*El Abrazo Refugio*, *Beso Suave en la Frente*, *Abrazo de Oso Apapachador*, *Lluvia de Besitos*, *Caricias en el Cabello*, *Mimo Silencioso de Cama*, etc.) con sonido dulce de beso y partículas flotantes.
- **Mecánica 2 (Abrazo Sostenido "Hold-to-Hug"):** Mantener presionado el corazón central simula un abrazo en tiempo real: sintetiza latidos de corazón ("lub-dub") con Web Audio, vibración háptica suave en el teléfono y un anillo radial SVG que se carga durante 2.4 segundos. Al llegar al 100%, estalla una lluvia de confeti de abrazos (`🫂`, `💋`, `❤️`, `💖`, `✨`), acorde de celebración y confirmación afectuosa.
- **Contador Dinámico:** Registra cuántos mimos ha recibido Nicky en la sesión con contador acumulativo.
- **Carta Secreta del Día 3:** Mensaje accesible mediante el sello de cera (`💌`):
  > *"Hoy no quiero invitarte a ningún lugar ni darte nada que se compre con dinero. Hoy quiero regalarte lo más valioso y sincero que tengo: mis brazos cuando necesites calma, mis besos para recordarte lo hermosa que eres, y mi amor incondicional para cuidarte siempre. Te amo con toda mi alma ❤️"*

### 🎃 Día 4: Noche de Halloween ("El Caldero Encantado de Amor")
- **Experiencia:** Noche mágica de brujas, tierna y misteriosa. Un caldero de hierro humeante con líquido resplandeciente, burbujas mágicas animadas, murciélagos (`🦇`) y fantasmitas (`👻`) flotantes.
- **Mecánica 1 (Revolver el Caldero / Hechizo de Amor):** Tocar el caldero o pulsar "Revolver la Poción" sintetiza un burbujeo de poción y campanitas misteriosas con Web Audio, cambia el color del líquido encantado y desprende una tarjeta de hechizo (*Protección Contra Sustos*, *Embrujo de Besitos de Calabaza*, *Fantasmita de Mimos*, *El Oráculo del Destino*, *Refugio a la Luz de las Velas*, etc.).
- **Mecánica 2 (¿Dulce o Travesura?):**
  - Botón `🍬 ¡Dulce!`: Desata lluvia de caramelos y chocolates flotantes con frases empalagosas de amor.
  - Botón `🎃 ¡Travesura!`: Sonido fantasmagórico, vibración háptica juguetona y lluvia de murciélagos con piropos de que el usuario está irremediablemente embrujado por Nicky.
- **Carta Secreta del Día 4:** Mensaje accesible mediante el sello de calabaza (`🎃`):
  > *"Dicen que en Halloween los espíritus buscan un refugio en el mundo terrenal, pero yo ya encontré el mío hace tiempo: tu sonrisa y tus abrazos. No hay truco ni brujería en este mundo que se compare con la magia que siento cada vez que estoy contigo. Si alguna vez te da miedo la oscuridad, acuérdate de que siempre voy a estar acá para cuidarte, abrazarte bien fuerte y recordarte que eres mi persona favorita en todo el universo. Feliz noche de Halloween, mi brujita hermosa. Te amo eternamente ❤️🎃"*

### 🥂 Día 5: Aniversario 2 Años y 10 Meses ("Nuestra Historia en 3 Momentos")
- **Experiencia:** Celebración de aniversario (¡34 meses juntos!). Álbum fotográfico interactivo estilo Polaroid 3D con las fotos reales de la pareja (`assets/images/1_1_11.jpg`, `2_1_11.jpg`, `3_1_11.jpg`), cinta washi tape, revelado suave y textos en español argentino ("che mi amor", "bancándonos", "sos todo").
- **Mecánica Interactiva del 1 al 3:**
  - Selector con línea de progreso `[ 1 ]` (El Comienzo), `[ 2 ]` (Creciendo y bancándonos), `[ 3 ]` (¡Hoy: 2 años y 10 meses!).
  - Al tocar la Polaroid en cualquier momento, genera partículas de chispas y corazones (`🥂`, `💖`, `✨`, `⭐`, `❤️`) con campanitas armónicas.
  - Al llegar al Paso 3, detona una fiesta de aniversario: acorde triunfal de celebración, vibración háptica rítmica, explosión de confeti y copas de brindis (`🥂`, `💖`, `💍`, `✨`, `🎉`, `🍾`), junto con el banner festivo de los 34 meses.
- **Carta Secreta del Día 5:** Mensaje accesible mediante el sello de brindis (`🥂`):
  > *"Felices 2 años y 10 meses, amor de mi vida. No te das una idea de lo feliz que me hace tenerte al lado todos los días. Sos mi compañera de vida, mi refugio y lo más lindo que me pasó en el universo. Gracias por cada beso, por cada charla hasta tarde, por bancarme siempre y por hacerme sentir el tipo más afortunado del planeta. Te amo con todo mi corazón y con toda mi alma, hoy y siempre ❤️🥂"*

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
