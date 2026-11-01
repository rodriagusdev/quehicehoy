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
  },

  // ----------------------------------------------------------------------------
  // 🎃 DÍA 4: Noche de Halloween - El Caldero Encantado de Amor
  // ----------------------------------------------------------------------------
  {
    id: "dia-4",
    numero: 4,
    fecha: "2026-10-31",
    fechaLegible: "31 de Octubre, 2026",
    icono: "🎃",
    badge: "Noche de Brujas & Hechizos",
    titulo: "El Caldero Encantado",
    experiencia: "halloween-caldero", // Tipo de interfaz: Caldero interactivo y Dulce o Travesura
    subtitulo: "Revuelve la poción para revelar un hechizo o elige tu Dulce o Travesura",
    tecnica: "Poción mágica de amor, misterio y mimos nocturnos",
    hechizos: [
      {
        icono: "🦇",
        titulo: "Protección Contra Sustos",
        descripcion: "Si vemos una película espeluznante o escuchas un ruido en la oscuridad, tienes pase libre para saltar a mis brazos y esconder tu carita en mi cuello.",
        tipo: "hechizo"
      },
      {
        icono: "🎃",
        titulo: "Embrujo de Besitos de Calabaza",
        descripcion: "Un hechizo inevitable: quedas formalmente condenada a recibir besos en las mejillas y la nariz hasta que no des más de la risa.",
        tipo: "hechizo"
      },
      {
        icono: "👻",
        titulo: "Fantasmita de Mimos",
        descripcion: "Me aparezco misteriosamente a tu lado solo para abrazarte por la espalda, envolverte en una manta y darte calorcito.",
        tipo: "hechizo"
      },
      {
        icono: "🔮",
        titulo: "El Oráculo del Destino",
        descripcion: "Miro mi bola de cristal y veo con total claridad... que estás destinada a ser la persona más cuidada, mimada y amada de toda esta noche.",
        tipo: "hechizo"
      },
      {
        icono: "🕯️",
        titulo: "Refugio a la Luz de las Velas",
        descripcion: "Estar juntitos entre sábanas abrigadas, hablando en susurros y sintiendo que ningún fantasma ni monstruo se atreve a molestarte.",
        tipo: "hechizo"
      },
      {
        icono: "🍬",
        titulo: "Poción Dulce Antiestrés",
        descripcion: "Ingredientes: un masaje suave en los hombros, caricias en las manos y una dosis infinita de tranquilidad solo para ti.",
        tipo: "hechizo"
      },
      {
        icono: "🌙",
        titulo: "Hechizo de Luna Llena",
        descripcion: "No importa qué tan oscura esté la noche: mis brazos siempre van a ser tu rincón más seguro, luminoso y lleno de paz.",
        tipo: "hechizo"
      },
      {
        icono: "🕷️",
        titulo: "Telaraña de Cariño",
        descripcion: "Quedas atrapada en una red de abrazos apretaditos de la que es absolutamente imposible escapar hoy.",
        tipo: "hechizo"
      }
    ],
    dulces: [
      "🍬 ¡Dulce otorgado! Eres más dulce que una tonelada de caramelos.",
      "🍫 Chocolate mágico: Válido por 10 besitos sorpresa sin aviso previo.",
      "🍭 Chupetín de amor: Tienes garantizada una sonrisa mía cada vez que me mires.",
      "🧁 Pastelito encantado: Te ganaste un apapacho extra largo hoy."
    ],
    travesuras: [
      "🎃 ¡Buuu! La travesura es que estoy irremediablemente embrujado de ti y no hay antídoto que me salve.",
      "🦇 ¡Susto tierno! Un murciélago mensajero acaba de robarte un beso volador.",
      "👻 ¡Aparición sorpresa! Prometo espantar a cualquier monstruo que intente quitarte la paz.",
      "🕸️ ¡Caíste en la trampa! Ahora tienes que darme un abrazo largo de oso."
    ],
    mensajeSecreto: "Dicen que en Halloween los espíritus buscan un refugio en el mundo terrenal, pero yo ya encontré el mío hace tiempo: tu sonrisa y tus abrazos. No hay truco ni brujería en este mundo que se compare con la magia que siento cada vez que estoy contigo. Si alguna vez te da miedo la oscuridad, acuérdate de que siempre voy a estar acá para cuidarte, abrazarte bien fuerte y recordarte que eres mi persona favorita en todo el universo. Feliz noche de Halloween, mi brujita hermosa. Te amo eternamente ❤️🎃",
    efectosSonoros: true,
    temaColor: "halloween"
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
