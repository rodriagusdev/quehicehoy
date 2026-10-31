// ==============================================================================
// 🎨 HISTORIAL DIARIO Y CONFIGURACIÓN - "HOLA NICKY" ❤️
// ==============================================================================
// Este archivo guarda la historia completa de todas las sorpresas diarias para Nicky.
//
// 📌 REGLA DE ORO PARA AGENTES Y DESARROLLADORES:
// - ¡NUNCA BORRES NI SOBRESCRIBAS DÍAS ANTERIORES!
// - Cada nuevo día se agrega como un nuevo objeto al final del arreglo `HISTORIAL_DIAS`.
// - De este modo, Nicky siempre ve la sorpresa más reciente al entrar ("HOY"), pero
//   puede presionar "⏪ Anterior" o abrir la "Cápsula de Recuerdos" para revivir
//   cualquier día anterior que le hayas dedicado.
// ==============================================================================

const CONFIG_MUSEO = {
  dedicadoA: "Nicky",
  artista: "Con todo mi amor",
  coleccion: "Galería de Momentos",
  lugar: "Un rincón solo para ti"
};

const HISTORIAL_DIAS = [
  // ----------------------------------------------------------------------------
  // 🏛️ DÍA 1: Declaración de Museo
  // ----------------------------------------------------------------------------
  {
    id: "dia-1",
    numero: 1,
    fecha: "2026-10-25",
    fechaLegible: "25 de Octubre, 2026",
    icono: "🏛️",
    badge: "Galería de Museo",
    titulo: "Declaración N° 1",
    experiencia: "museo", // Tipo de interfaz: Galería con marco realista
    tipo: "texto",
    textoPrincipal: "TE AMO",
    subtitulo: "Hoy, mañana y todos los días de mi vida.",
    tecnica: "Amor puro sobre lienzo digital",
    mensajeSecreto: "Eres lo más hermoso que me ha pasado en la vida. Gracias por existir ❤️",
    efectosSonoros: true,
    temaColor: "rose"
  },

  // ----------------------------------------------------------------------------
  // 🎟️ DÍA 2: Tarjeta Mágica de Raspar (Scratch-off Golden Ticket)
  // ----------------------------------------------------------------------------
  {
    id: "dia-2",
    numero: 2,
    fecha: "2026-10-26",
    fechaLegible: "26 de Octubre, 2026",
    icono: "🎟️",
    badge: "Ticket Dorado de Amor",
    titulo: "Raspa y Gana tu Sorpresa",
    experiencia: "raspa-y-gana", // Tipo de interfaz: Tarjeta interactiva de raspar
    subtitulo: "Desliza tu dedo sobre el billete dorado para rasparlo y descubrir tu sorpresa",
    instruccion: "Frota la zona dorada con tu dedo",
    tecnica: "Foil dorado interactivo y confeti de amor",
    premio: {
      badge: "✨ VALE OFICIAL DE AMOR CANJEABLE ✨",
      titulo: "UNA CITA MÁGICA Y CONSENTIMIENTO TOTAL",
      descripcion: "Válido por: Tu comida favorita + Un masaje relajante infinito + Todos los besos y abrazos que quieras hoy y siempre 💕",
      validez: "Vigencia: Ilimitada • Canjeable cuando tú quieras",
      codigo: "NICKY-AMOR-2026-INFINITO"
    },
    mensajeSecreto: "Te mereces el universo entero, mi vida. Este vale no tiene fecha de vencimiento y puedes cobrarlo cuantas veces quieras. Te amo con todo mi ser ❤️",
    efectosSonoros: true,
    temaColor: "gold"
  },

  // ----------------------------------------------------------------------------
  // 🫂 DÍA 3: Frasco de Besos & Abrazos Infinitos
  // ----------------------------------------------------------------------------
  {
    id: "dia-3",
    numero: 3,
    fecha: "2026-10-30",
    fechaLegible: "30 de Octubre, 2026",
    icono: "🫂",
    badge: "Frasco de Amor Infinito",
    titulo: "Frasco de Besos & Abrazos",
    experiencia: "frasco-abrazos", // Tipo de interfaz: Dispensador táctil de besos y abrazos
    subtitulo: "Hoy nada comprado con dinero: solo mis brazos, mis besos y mi cariño infinito para ti.",
    tecnica: "Ternura ilimitada, presencia y calor de hogar",
    mimos: [
      {
        icono: "🫂",
        titulo: "El Abrazo Refugio",
        descripcion: "Apoya tu cabecita en mi pecho, respira profundo y deja que yo te cuide y te mime un rato.",
        tipo: "abrazo"
      },
      {
        icono: "🌸",
        titulo: "Beso Suave en la Frente",
        descripcion: "Un beso tierno para borrar cualquier preocupación, cansancio o estrés que hayas tenido hoy.",
        tipo: "beso"
      },
      {
        icono: "🐻",
        titulo: "Abrazo de Oso Apapachador",
        descripcion: "De esos apretaditos que te juntan todas las piezas, te reinician el corazón y te hacen suspirar de alivio.",
        tipo: "abrazo"
      },
      {
        icono: "💋",
        titulo: "Lluvia de Besitos en la Cara",
        descripcion: "10 besitos rápidos seguidos en los cachetes y la nariz hasta hacerte sonreír.",
        tipo: "beso"
      },
      {
        icono: "🤍",
        titulo: "Mimo Silencioso de Cama",
        descripcion: "Estar acostados tapaditos en silencio, abrazados piel con piel, sintiendo que no hace falta nada más en el mundo.",
        tipo: "abrazo"
      },
      {
        icono: "💆‍♀️",
        titulo: "Caricias en el Cabello",
        descripcion: "Pasar mis dedos suavemente por tu pelo hasta que te dé sueño y te quedes en paz absoluta.",
        tipo: "mimo"
      },
      {
        icono: "🦥",
        titulo: "Abrazo de Koala",
        descripcion: "Subirte a upa o rodearme con tus brazos y quedarte pegadita a mí todo el tiempo que quieras.",
        tipo: "abrazo"
      },
      {
        icono: "✨",
        titulo: "Beso en los Ojos Cerrados",
        descripcion: "Un beso suave en cada párpado para que descanses tranquila sabiendo que estoy cuidándote.",
        tipo: "beso"
      },
      {
        icono: "🕊️",
        titulo: "Abrazo de Paz Profunda",
        descripcion: "Un abrazo largo sin apuro, donde el mundo exterior se apaga y solo existimos tú y yo.",
        tipo: "abrazo"
      },
      {
        icono: "💖",
        titulo: "Beso en la Mano Mirándote",
        descripcion: "Tomar tu manito, darle un beso tierno en los nudillos y recordarte lo hermosa que eres.",
        tipo: "beso"
      }
    ],
    mensajeSecreto: "Hoy no quiero invitarte a ningún lugar ni darte nada que se compre con dinero. Hoy quiero regalarte lo más valioso y sincero que tengo: mis brazos cuando necesites calma, mis besos para recordarte lo hermosa que eres, y mi amor incondicional para cuidarte siempre. Te amo con toda mi alma ❤️",
    efectosSonoros: true,
    temaColor: "warm-rose"
  }
];

// Compatibilidad retroactiva por si algún script antiguo accede a CONFIG_OBRAS
const CONFIG_OBRAS = {
  museo: CONFIG_MUSEO,
  obraDeHoy: HISTORIAL_DIAS[HISTORIAL_DIAS.length - 1],
  obrasPorFecha: {}
};

// Exportar al objeto global de ventana
window.CONFIG_MUSEO = CONFIG_MUSEO;
window.HISTORIAL_DIAS = HISTORIAL_DIAS;
window.CONFIG_OBRAS = CONFIG_OBRAS;
