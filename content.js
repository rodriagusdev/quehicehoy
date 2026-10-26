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
