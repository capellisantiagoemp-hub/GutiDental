(function () {
  "use strict";

  // ===========================================================================
  // GutiDental — datos de marca (verificados) para la maqueta.
  // Fuentes: Ficha de Google, Instagram @gutidental, Facebook Gutidental (sep 2026)
  // + fotos reales del equipo y de los doctores aportadas por el cliente.
  // ===========================================================================

  window.__BRAND__ = {
    name: "GutiDental",
    tagline: "Odontología familiar en Hialeah desde hace más de 30 años.",

    contact: {
      phone: "+1 305 362 5559",
      phoneHref: "+13053625559",
      text: "305 417 8840",
      textHref: "+13054178840",
      email: "gutidental@gutidental.com",
      address: "3822 W 16th Ave, Hialeah, FL 33012",
      maps: "https://maps.google.com/?q=GutiDental+3822+W+16th+Ave+Hialeah+FL+33012",
      instagram: "https://www.instagram.com/gutidental/",
      facebook: "https://www.facebook.com/Gutidental"
    },

    hours: [
      { d: "Lunes",     h: "9:00 – 19:00" },
      { d: "Martes",    h: "9:00 – 19:00" },
      { d: "Miércoles", h: "9:00 – 19:00" },
      { d: "Jueves",    h: "9:00 – 19:00" },
      { d: "Viernes",   h: "9:00 – 15:00" },
      { d: "Sábado",    h: "9:00 – 17:00" },
      { d: "Domingo",   h: "Cerrado" }
    ],

    reputation: { rating: 4.6, count: 86, source: "Google", years: 30 },

    doctors: [
      { name: "Dr. Jorge M. Gutiérrez, DDS", role: "Fundador · Primera generación" },
      { name: "Dr. Mariano Gutiérrez", role: "Segunda generación" }
    ],

    services: [
      "Odontología general y familiar",
      "Endodoncia (tratamiento de conducto)",
      "Implantes dentales",
      "Coronas y puentes",
      "Estética dental",
      "Urgencias y dolor dental"
    ],

    // Reseñas REALES publicadas públicamente. Verificar autoría/redacción exacta
    // antes de publicar (instrucción del cliente: no inventar testimonios).
    reviews: [
      {
        text: "I have been a patient at Guti Dental since 2006. Awesome service, the quality of the work is excellent. They are always on time. The staff is great!",
        author: "Gabriel T.",
        meta: "Paciente desde 2006 · reseña pública",
        verified: true
      },
      {
        text: "From the front desk to the back of the office everyone is so amazing and wonderful.",
        author: "Reseña de Google",
        meta: "Nombre por verificar",
        verified: false
      }
    ]
  };
})();
