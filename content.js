// ==============================================================================
// 🎨 CONFIGURACIÓN DE LA OBRA DIARIA PARA NICKY
// ==============================================================================
// Aquí puedes definir lo que Nicky verá cada día al entrar a la página.
// 
// ¿CÓMO USARLO?
// 1. Si quieres fijar una obra específica hoy sin importar la fecha, edita `obraDeHoy` abajo.
// 2. O si prefieres programar días con anticipación, agrega la fecha en `obrasPorFecha` ("AAAA-MM-DD").
// 3. Puedes usar 4 tipos de contenido: "texto", "imagen", "video" o "accion".
// ==============================================================================

const CONFIG_OBRAS = {
  // Datos que aparecen en la cédula del museo (etiqueta bajo el cuadro)
  museo: {
    dedicadoA: "Nicky",
    artista: "Con todo mi amor",
    coleccion: "Galería de Momentos",
    lugar: "Un rincón solo para ti"
  },

  // ----------------------------------------------------------------------------
  // 🌟 OBRA DE HOY (Si esta activa, se muestra inmediatamente)
  // ----------------------------------------------------------------------------
  obraDeHoy: {
    // Tipo: "texto" | "imagen" | "video" | "accion"
    tipo: "texto",
    
    // Título de la obra de hoy
    titulo: "Declaración N° 1",
    
    // Contenido principal
    textoPrincipal: "TE AMO",
    
    // Subtítulo o dedicatoria
    subtitulo: "Hoy, mañana y todos los días de mi vida.",
    
    // Técnica artística (aparece en la ficha del museo)
    tecnica: "Amor puro sobre lienzo digital",
    
    // Mensaje secreto que se revela al tocar el cuadro
    mensajeSecreto: "Eres lo más hermoso que me ha pasado en la vida. Gracias por existir ❤️",
    
    // Música / Sonido ambiente: true para activar sintetizador de campanitas mágicas al tocar
    efectosSonoros: true,
    
    // Color de acento de hoy (opcional: 'rose', 'gold', 'crimson', 'emerald', 'lavender')
    temaColor: "rose"
  },

  // ----------------------------------------------------------------------------
  // 📅 CALENDARIO DE OBRAS PROGRAMADAS (Opcional)
  // Puedes programar días específicos con formato "AAAA-MM-DD".
  // Si la fecha actual coincide con una de estas, se mostrará automáticamente.
  // ----------------------------------------------------------------------------
  obrasPorFecha: {
    /*
    // EJEMPLO 1: Un día con una Foto / Imagen
    "2026-10-26": {
      tipo: "imagen",
      titulo: "Nuestra Mejor Sonrisa",
      imagenUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80",
      pieDeFoto: "Mirarte sonreír ilumina todo mi mundo.",
      tecnica: "Fotografía y recuerdos eternos",
      mensajeSecreto: "Te acuerdas de ese día? Siempre estás en mi mente.",
      temaColor: "gold"
    },

    // EJEMPLO 2: Un día con un Video (mp4 directo o link embed de YouTube)
    "2026-10-27": {
      tipo: "video",
      titulo: "Canción para Ti",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      descripcion: "Escucha esto pensando en nosotros.",
      tecnica: "Melodía y fotogramas",
      mensajeSecreto: "Esta canción me recuerda a ti.",
      temaColor: "lavender"
    },

    // EJEMPLO 3: Un día con una Acción Interactiva
    "2026-10-28": {
      tipo: "accion",
      titulo: "Un Vale Especial",
      textoPrincipal: "🎟️ Vale por un abrazo infinito y tu comida favorita",
      instruccion: "Toca el boleto para canjearlo",
      recompensa: "¡Canjeado exitosamente! Válido cuando tú quieras 💖",
      tecnica: "Promesa interactiva",
      mensajeSecreto: "Te mereces todos los mimos del mundo.",
      temaColor: "emerald"
    }
    */
  }
};
