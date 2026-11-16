// Contenido de /diagnostico/: landing de las bios (Instagram, LinkedIn, X, Threads).
// Un solo objetivo: agendar la llamada de diagnóstico. Sin precios. Solo en español.
// [corchetes] = contenido pendiente: nunca reemplazarlo con datos inventados.
import { links } from './home';

const waText = 'Hola Camilo, quiero mi diagnóstico gratis';

export const diagnostico = {
  meta: {
    title: 'Diagnóstico gratis de 30 minutos — Camilo Acosta',
    description:
      'Agenda una llamada gratis y sin compromiso: reviso tu web, Instagram, Google y WhatsApp, y te llevas ideas concretas para conseguir más clientes agendados.',
  },
  whatsappHref: `${links.whatsapp}?text=${encodeURIComponent(waText)}`,
  cta: 'Agenda tu diagnóstico gratis',
  nav: { home: 'Inicio' },
  hero: {
    eyebrow: 'Diagnóstico gratis · 30 minutos',
    titleStart: 'Hablemos 30 minutos. Te digo qué le falta a tu web para que te',
    titleScript: 'elijan.',
    subtitle: 'Una llamada gratis y sin compromiso: entiendo tu negocio y te llevas una propuesta clara de qué hacer.',
    signature: 'Camilo Acosta',
    role: 'Diseño web y marketing para profesionales independientes',
    photoAlt: 'Camilo Acosta, diseñador web en Cartagena',
  },
  takeaways: {
    eyebrow: 'Qué te llevas',
    title: 'Media hora que te ahorra',
    titleScript: 'meses.',
    items: [
      'Un diagnóstico de tu presencia digital: web, Instagram, Google y WhatsApp.',
      'Ideas concretas para conseguir más clientes agendados.',
      'Una propuesta clara para tu web, sin compromiso.',
    ],
  },
  schedule: {
    eyebrow: 'Agenda',
    title: 'Elige el día y la hora que te',
    titleScript: 'queden bien.',
    eventName: 'Cafecito para conocernos ☕ (diagnóstico gratis, 30 min)',
    loading: 'Cargando el calendario…',
    noscript: 'Abrir el calendario en Cal.com',
    or: '¿No te queda cómodo agendar aquí?',
    whatsapp: 'Prefiero escribir por WhatsApp',
  },
  audience: {
    text: 'Es para profesionales independientes que quieren más clientes agendados: psicólogos, odontólogos, coaches y cualquiera que viva de su consulta o su servicio.',
  },
  proof: {
    eyebrow: 'Trabajo real',
    title: 'Algunos proyectos',
    more: 'Ver todos los proyectos',
  },
  faq: {
    title: 'Preguntas rápidas',
    items: [
      ['¿Es gratis de verdad?', 'Sí. Son 30 minutos sin costo y sin compromiso. Si al final quieres que trabajemos juntos, te paso una propuesta; si no, te quedas con las ideas.'],
      ['¿Cuánto dura?', '30 minutos. Eliges el día y la hora en el calendario y te llega la confirmación a tu correo.'],
      ['¿Qué necesito tener listo?', 'Nada técnico. Si ya tienes web o Instagram, ten los enlaces a mano. Con que me cuentes a qué te dedicas y qué quieres lograr es suficiente.'],
      ['¿Y si todavía no sé qué necesito?', 'Para eso es la llamada. Revisamos juntos dónde estás hoy y te digo por dónde empezar, aunque sea algo pequeño.'],
    ] as [string, string][],
  },
  closing: {
    title: 'Tu próximo cliente te está',
    titleScript: 'buscando.',
    text: 'Agenda 30 minutos y te digo qué hacer para que te encuentre y te elija.',
  },
};
