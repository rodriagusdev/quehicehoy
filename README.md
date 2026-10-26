# 🏛️ Sorpresas Diarias para Nicky ❤️

Una experiencia web interactiva estilo **museo y cápsula de recuerdos**, diseñada para ser subida a GitHub y desplegada al instante en **GitHub Pages** (100% estática: HTML5, CSS3 y JavaScript puro).

---

## 🎨 ¿Qué contiene la experiencia?

### 🌟 Sistema de Rebobinado ("Rewind") y Cápsula del Tiempo
- **Navegación Histórica:** Una barra flotante en la parte inferior con botones `⏪ Anterior`, `Siguiente ⏩` y un acceso directo a la **Cápsula de Recuerdos (⏳)**.
- **Sin Pérdida de Días:** Cada día que prepares para Nicky se guarda automáticamente en el historial. Al entrar, ella siempre verá la sorpresa de **HOY**, pero puede rebobinar a cualquier día pasado cuando lo desee.
- **Deep-linking:** Puedes enviarle un enlace directo a un día específico (ej. `?dia=1` o `?dia=2`).

### 🏛️ Día 1: Galería de Arte & Declaración N° 1
- **Marco de Cuadro Realista de Museo:** Molduras doradas/madera, paspartú marfil y textura de lienzo de lino.
- **Obra:** Tipografía artística **"TE AMO"** en rojo carmesí con caligrafía decorativa.
- **Interactividad:** Tocar el lienzo genera partículas flotantes de corazones y estrellas con sonido de campanita mágica sintetizada (Web Audio).
- **Cédula de Museo con Sello de Cera (💌):** Abre la primera carta secreta de amor.

### 🎟️ Día 2: Tarjeta Mágica de Raspar ("Raspa y Gana")
- **Billete Dorado de Amor:** Ticket estilizado con borde metálico y numeración de serie para Nicky.
- **Foil de Raspar Interactivo:** La usuaria raspa el billete con el dedo (o mouse) sobre un lienzo Canvas con física suave y sonido de raspado.
- **Premio Revelado:** Al alcanzar el 50% de raspado, se activa una celebración con confeti de corazones, acorde triunfal y se devela el **Vale por una Cita Mágica y Consentimiento Total**.
- **Sello de Cera (💌):** Abre la dedicatoria secreta del Día 2.

---

## ✏️ ¿Cómo agregar el Día 3, Día 4 y futuros días?

Todo se gestiona en [`content.js`](./content.js):

1. Abre `content.js`.
2. Añade un nuevo bloque al final del arreglo `HISTORIAL_DIAS`:

```javascript
{
  id: "dia-3",
  numero: 3,
  fecha: "2026-10-27",
  fechaLegible: "27 de Octubre, 2026",
  icono: "⭐",
  badge: "Cielo Nocturno",
  titulo: "Constelación de Recuerdos",
  experiencia: "museo", // o una nueva experiencia
  tipo: "texto",
  textoPrincipal: "ERES MI LUZ",
  subtitulo: "Bajo cualquier cielo te elijo a ti.",
  tecnica: "Estrellas y amor infinito",
  mensajeSecreto: "Cada estrella en el cielo representa una razón por la que te amo ❤️",
  efectosSonoros: true,
  temaColor: "rose"
}
```

¡Y listo! Al guardar y subir los cambios, Nicky verá automáticamente el nuevo día como **HOY**, con el contador de la Cápsula del Tiempo incrementado y la opción de volver a ver el Día 1 y el Día 2 con `⏪`.

---

## 🚀 ¿Cómo subir los cambios a GitHub Pages?

En tu terminal ejecuta:

```bash
git add .
git commit -m "feat: sistema de rewind y tarjeta de raspar día 2"
git push origin main
```

En 1 minuto los cambios estarán en vivo en tu enlace de GitHub Pages:  
`https://TU_USUARIO.github.io/holanicky/`

---

## 📱 Tip para Nicky (Instalar como App en su celular)
Dile a Nicky que al abrir el enlace en Safari (iPhone) o Chrome (Android):
1. Toque el botón **Compartir** (iPhone) o los **tres puntos** (Android).
2. Seleccione **"Agregar a la pantalla de inicio"**.
3. Tendrá el icono de la rosa 🌹 en su pantalla y se abrirá en pantalla completa como una app nativa sin barras del navegador.
