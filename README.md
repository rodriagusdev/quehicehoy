# 🏛️ Galería de Arte para Nicky ❤️

Una página web móvil estilo **obra de arte en museo**, diseñada para ser subida a GitHub y desplegada al instante en **GitHub Pages** (100% estática: HTML, CSS con Tailwind y JavaScript puro).

---

## 🎨 ¿Qué contiene la página?

1. **Marco de Cuadro Realista de Museo:**
   - Molduras doradas/madera, paspartú marfil y textura de lienzo de lino.
   - Iluminación cenital cálida que enfoca la obra en el centro.
2. **Obra de Hoy:**
   - Viene lista con el texto artístico **"TE AMO"**, caligrafía refinada y dedicatoria.
3. **Interactividad:**
   - **Tocar el lienzo:** Genera lluvia de corazones y estrellas flotantes con sonido armónico de campana mágica (sintetizada con Web Audio, sin archivos pesados).
   - **Cédula de museo (placa inferior):** Muestra la fecha actual automáticamente, técnica artística y un botón de **sello de cera (💌)** que abre un **mensaje secreto / carta de amor**.
   - **Botón de sonido:** Para silenciar o activar el sonido en la esquina superior.

---

## 🚀 ¿Cómo subir a GitHub y activar GitHub Pages?

Es muy fácil y toma menos de 2 minutos:

### Paso 1: Inicializar el repositorio y subir los archivos
Abre tu terminal en esta carpeta (`c:\dev\Personal\holanicky`) y ejecuta:

```bash
git init
git add .
git commit -m "feat: galeria de arte para Nicky"
```

Luego crea un repositorio en GitHub (por ejemplo llamado `holanicky`), enlázalo y haz push:

```bash
git branch -M main
git remote add origin https://github.com/TU_USUARIO/holanicky.git
git push -u origin main
```

### Paso 2: Activar GitHub Pages en 3 clics
1. En tu repositorio de GitHub, ve a la pestaña **Settings** (Configuración).
2. En el menú de la izquierda, haz clic en **Pages**.
3. En **Build and deployment > Branch**, selecciona la rama `main` y la carpeta `/(root)`, luego haz clic en **Save**.
4. ¡Listo! En 1 minuto tendrás tu enlace público:  
   `https://TU_USUARIO.github.io/holanicky/`

---

## ✏️ ¿Cómo cambiar la obra cada día?

Solo necesitas editar el archivo [`content.js`](./content.js). Puedes hacerlo desde tu computadora o **directamente desde GitHub con tu celular**.

### Opción A: Cambiar la obra de hoy directamente
Abre `content.js` y modifica `obraDeHoy`:

```javascript
obraDeHoy: {
  tipo: "texto", // o "imagen", "video", "accion"
  titulo: "Día Especial",
  textoPrincipal: "TE AMO",
  subtitulo: "Hoy, mañana y siempre.",
  tecnica: "Amor puro sobre lienzo digital",
  mensajeSecreto: "Eres lo más hermoso de mi vida ❤️"
}
```

### Opción B: Si hoy quieres poner una FOTO
Cambia `tipo: "imagen"` y pon el link de la foto:

```javascript
obraDeHoy: {
  tipo: "imagen",
  titulo: "Nuestra Mejor Aventura",
  imagenUrl: "https://tufoto.jpg", // o una ruta local como "./fotos/foto1.jpg"
  tecnica: "Fotografía y recuerdos",
  mensajeSecreto: "Ese día fue inolvidable contigo."
}
```

### Opción C: Si hoy quieres poner un VIDEO
Cambia `tipo: "video"`:

```javascript
obraDeHoy: {
  tipo: "video",
  titulo: "Nuestra Canción",
  videoUrl: "https://tuvideo.mp4",
  tecnica: "Melodía y recuerdos",
  mensajeSecreto: "Cada que suena esta canción pienso en ti."
}
```

### Opción D: Si hoy quieres poner una ACCIÓN / VALE INTERACTIVO
Cambia `tipo: "accion"`:

```javascript
obraDeHoy: {
  tipo: "accion",
  titulo: "Vale Especial",
  textoPrincipal: "🎟️ Vale por un masaje y tu cena favorita",
  instruccion: "Toca el boleto para canjear",
  mensajeSecreto: "Válido para cobrar hoy mismo 😘"
}
```

### Opción E: Dejar días programados en el calendario
En `content.js` puedes descomentar o agregar fechas en `obrasPorFecha`:
```javascript
obrasPorFecha: {
  "2026-10-26": { ... },
  "2026-10-27": { ... }
}
```
Si la fecha del celular de Nicky coincide con una fecha programada, se mostrará esa obra automáticamente sin que tengas que cambiar nada ese día.

---

## 📱 Tip para Nicky (Instalar como App en su celular)
Dile a Nicky que al abrir el enlace en Safari (iPhone) o Chrome (Android):
1. Toque el botón **Compartir** (iPhone) o los **tres puntos** (Android).
2. Seleccione **"Agregar a la pantalla de inicio"**.
3. Tendrá el icono de la rosa 🌹 en su pantalla y se abrirá en pantalla completa como una app nativa de museo sin barras del navegador.
