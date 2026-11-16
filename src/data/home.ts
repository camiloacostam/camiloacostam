// Contenido del home (rediseño "funnel").
// Todo lo que está entre [corchetes] es contenido pendiente: reemplázalo por el dato real.
import type { ImageMetadata } from 'astro';
import prometalicaDesktop from '../assets/projects/prometalica-desktop.jpg';
import atelierDesktop from '../assets/projects/atelier-desktop.jpg';
import prometalicaMobile from '../assets/projects/prometalica-mobile.jpg';
import atelierMobile from '../assets/projects/atelier-mobile.jpg';

export const links = {
  booking:   'https://cal.com/camiloacostam/cafecito-para-conocernos', // Cal.com
  whatsapp:  'https://wa.me/573104327497',
  email:     'hola@camiloacosta.dev',
  instagram: 'https://www.instagram.com/camiloacosta.dev/',
  x:         'https://x.com/camiloacostam',
  linkedin:  'https://www.linkedin.com/in/camilo-acosta-m/',
  github:    'https://github.com/camiloacostam',
};

// Cifras: deben ser reales y respaldables (ver CLAUDE.md). Si no se puede respaldar, se quita.
export const stats = {
  projects: '+10', // proyectos digitales desarrollados
  years:    '5+',  // años de experiencia (desde 2020)
  slots:    '3',   // cupos libres este mes
};

/** true si el texto aún tiene contenido pendiente entre [corchetes]: esa pieza no se muestra */
export const isPending = (text: string) => /\[[^\]]+\]/.test(text);

// Testimonio real del cliente de Prometálicas Solutions y Atelier (mismo cliente, un solo testimonio).
// Se firma solo con la empresa. Lo usan la tarjeta del bento y los casos de /diagnostico.
export const clientTestimonial = {
  es: { quote: 'El resultado superó por completo nuestras expectativas. Excelente trabajo, Camilo.' },
  en: { quote: 'The result completely exceeded our expectations. Excellent work, Camilo.' },
  author: 'Prometálicas Solutions',
};

export interface CaseItem {
  name: string;      // texto vertical de la franja cerrada
  title: string;
  cat: string;
  desc: string;
  media: string;     // texto alternativo de la captura (o placeholder si no hay imagen)
  image?: ImageMetadata;       // captura de escritorio
  imageMobile?: ImageMetadata; // captura de celular (franjas en móvil)
  href: string;
  tone: 'mar' | 'cielo' | 'crema' | 'aqua';
  cta?: boolean;
}

export interface PlanItem {
  name: string;
  badge?: string;
  desc: string;
  includes: string[];
  delivery: string;
  result: string;
  price: string;
  per?: string;
  featured?: boolean;
}

export interface ChatLine {
  from: 'them' | 'me';
  text: string;
}

const es = {
  meta: {
    title: 'Camilo Acosta — Webs estratégicas para profesionales independientes',
    description:
      'Diseño y desarrollo webs para profesionales independientes y negocios en Cartagena y Colombia. Listas en 7 días, con agenda en línea y botón de WhatsApp.',
  },
  nav: {
    label: 'Principal',
    links: [
      { href: '#servicios', label: 'Servicios' },
      { href: '#proyectos', label: 'Trabajo' },
      { href: '#proceso',   label: 'Proceso' },
      { href: '#paquetes',  label: 'Paquetes' },
      { href: '#preguntas', label: 'Preguntas' },
    ],
    cta: 'Agenda tu diagnóstico',
    ctaBySection: {
      proyectos: 'Quiero una web así',
      proceso:   'Empezar en 7 días',
      paquetes:  'Pedir mi propuesta',
    } as Record<string, string>,
    langLabel: 'EN',
    langAria: 'Read in English',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    menuCta: 'Agenda tu diagnóstico gratis',
  },
  hero: {
    availability: `Disponible · ${stats.slots} cupos este mes`,
    titleStart: 'Tu talento ya existe. Hagamos que te',
    titleScript: 'elijan.',
    subline:
      'Una web pensada para que te agenden, con tu agenda en línea y tu WhatsApp a un clic. Para psicólogos, odontólogos, coaches y profesionales independientes. Lista en 7 días.',
    cta: 'Agenda tu diagnóstico gratis',
    secondary: 'Ver trabajos',
    hello: 'Hola, soy Camilo',
    role: 'Diseñador y desarrollador web',
    roleYears: `${stats.years} años`,
    photoAlt: 'Camilo Acosta, diseñador y desarrollador web',
    location: '[ Cartagena, CO — GMT−5 ]',
    scroll: 'Desliza para explorar',
    delivered: isPending(stats.projects) ? '' : `[ ${stats.projects} proyectos digitales desarrollados ]`,
    callouts: [
      { title: 'Mensaje claro',       desc: 'Se entiende en 5 segundos' },
      { title: 'Agenda integrada',    desc: 'Citas sin ir y venir por mensajes' },
      { title: 'Agenda en línea',     desc: 'Reservan sin escribirte' },
    ],
    // Ejemplo ilustrativo del mockup, no es un cliente ni un testimonio real
    phone: {
      brand: 'Tu consultorio',
      title: 'Atención cercana, a tu ritmo.',
      desc: 'Consulta privada · citas presenciales y en línea.',
      cta: 'Agenda tu primera cita',
      bookingLabel: 'Agenda en línea',
      bookingSlot: 'Jueves · 3:00 p. m.',
      bookingCta: 'Reservar',
    },
  },
  statement: {
    textStart: 'Ayudo a profesionales independientes, como psicólogos, odontólogos y coaches, a convertir su talento en',
    highlight: 'clientes agendados',
    textEnd: '. Sin tecnicismos, sin intermediarios.',
    pains: [
      'Te recomiendan, pero quien te busca en Google no encuentra una web que lo convenza.',
      'Respondes los mismos mensajes de WhatsApp todo el día y muchos se enfrían antes de agendar.',
      'Tu trabajo es excelente, pero tu presencia digital no lo transmite.',
    ],
    aside: 'Diseño, código y lanzamiento en las mismas manos.',
    asideStats: `${stats.years} años y ${stats.projects} proyectos digitales desarrollados.`,
    button: ['Agenda tu', 'diagnóstico gratis'],
  },
  bento: {
    title: 'Lo que recibes',
    intro: 'Todo lo que tu marca necesita para vender en línea, en un solo lugar.',
    case: {
      eyebrow: 'Caso real · Metalmecánica industrial',
      title: 'Prometálicas Solutions',
      desc: 'Su web explica en segundos qué hacen y lleva a cada visitante a pedir su cotización en 4 preguntas.',
      href: 'https://prometalica.com.co',
      linkLabel: 'Ver el sitio en vivo',
    },
    delivery: { label: 'Entrega', value: '7 días', desc: 'De la primera llamada a tu web en línea.' },
    // Tarjeta de testimonio: texto en clientTestimonial (arriba)
    testimonial: {
      label: 'Testimonio',
      quote: `“${clientTestimonial.es.quote}”`,
      name: clientTestimonial.author,
    },
    experience: { label: 'Experiencia', value: stats.projects, desc: 'proyectos digitales desarrollados desde 2020.' },
    // Inactivo: el asistente de WhatsApp con IA aún no es un servicio (ver AiChatCard.astro)
    ai: {
      badge: 'Mi diferencial',
      title: 'WhatsApp con IA que responde y agenda por ti',
      desc: 'Atiende las preguntas de siempre y deja la cita lista, incluso cuando estás ocupado.',
      chat: [
        { from: 'them', text: 'Hola, ¿tienes cita esta semana?' },
        { from: 'me',   text: '¡Hola! Tengo jueves 3:00 p. m. o viernes 10:00 a. m. ¿Cuál te sirve?' },
        { from: 'them', text: 'El jueves' },
        { from: 'me',   text: 'Listo, quedaste agendado ✓' },
      ] as ChatLine[],
    },
    // Visual activo de "Mi diferencial". El chat de `ai` queda guardado para reactivarlo (AiChatCard.astro)
    differential: {
      badge: 'Mi diferencial',
      title: 'Webs pensadas para que te agenden',
      desc: 'Cada sección guía a tu visitante hacia un solo paso: agendar contigo. Sin adornos que distraigan.',
      steps: ['Te encuentran', 'Confían en ti', 'Agendan'],
    },
    allInOne: { label: 'Todo en uno', text: 'Diseño y desarrollo con la misma persona. Hablas directo conmigo, sin intermediarios.' },
    availability: { label: 'Disponible', text: `${stats.slots} cupos este mes`, desc: 'Pocos proyectos, dedicación real.' },
    cta: 'Hablemos 30 minutos, gratis.',
  },
  cases: {
    eyebrow: 'Trabajo reciente',
    title: 'Casos reales',
    prev: 'Proyecto anterior',
    next: 'Proyecto siguiente',
    cursor: 'Ver caso',
    hint: 'Toca una franja para abrirla',
    items: [
      {
        name: 'Prometálicas', title: 'Prometálicas Solutions', cat: 'Sitio corporativo · Metalmecánica industrial',
        desc: 'Web corporativa que explica sus servicios en segundos y lleva a cada visitante a cotizar en 4 preguntas.',
        media: 'Página de inicio de prometalica.com.co', image: prometalicaDesktop, imageMobile: prometalicaMobile, href: '/proyectos/', tone: 'mar',
      },
      {
        name: 'Atelier', title: 'Atelier', cat: 'Tienda en línea · Mobiliario de lujo',
        desc: 'Tienda en línea de mobiliario de lujo hecho en Colombia, con colección, carrito y proyectos a medida.',
        media: 'Página de inicio de atelier.prometalica.com.co', image: atelierDesktop, imageMobile: atelierMobile, href: '/proyectos/', tone: 'cielo',
      },
      {
        name: '¿El próximo eres tú?', title: 'Tu marca podría estar aquí.', cat: 'Cupos este mes',
        desc: 'Agenda 30 minutos gratis y diseñemos la web que convierte a tus visitantes en clientes.',
        media: '', href: links.booking, tone: 'aqua', cta: true,
      },
    ] as CaseItem[],
    actionCase: 'Ver caso →',
    actionCta: 'Agenda tu diagnóstico →',
    barText: '¿Quieres una web así para tu marca?',
    barAll: 'Ver todos los proyectos',
    barCta: 'Agenda tu diagnóstico',
  },
  process: {
    title: 'Cuatro pasos. Siete días.',
    steps: [
      { day: 'Día 1',    title: 'Llamada y brief', desc: 'Conozco tu marca, tu cliente ideal y tus objetivos.' },
      { day: 'Días 2–3', title: 'Diseño',          desc: 'Te muestro el diseño y lo ajustamos juntos.' },
      { day: 'Días 4–6', title: 'Desarrollo',      desc: 'Tu web rápida, adaptada a móvil y lista para Google.' },
      { day: 'Día 7',    title: 'Lanzamiento',     desc: 'Publicamos y te enseño a actualizarla.' },
    ],
    readyStart: 'Si empezamos hoy, tu web estaría lista',
    readyPrefix: 'el',            // "lista el 25 de octubre"
    readyFallback: 'en 7 días',   // si no se puede calcular la fecha
    cta: 'Empezar ahora',
  },
  plans: {
    title: 'Paquetes',
    intro: 'Cada negocio es distinto. En una llamada de diagnóstico gratis de 30 minutos entiendo lo que necesitas y te doy una propuesta clara, sin compromiso.',
    dotsLabel: 'Paquete',
    includesLabel: 'Incluye',
    deliveryLabel: 'Entrega',
    resultLabel: 'Resultado',
    cta: 'Agenda tu diagnóstico gratis →',
    guarantee: 'Si no entrego tu web en el plazo acordado, sigo trabajando sin costo extra hasta terminarla.',
    items: [
      {
        name: 'Landing page',
        desc: 'Una página clara que explica qué haces y lleva a tus visitas a agendar contigo.',
        includes: ['Diseño a medida de tu marca', 'Agenda en línea y botón de WhatsApp', 'Textos pensados para convertir', 'Lista para Google y para celular'],
        delivery: '7 días',
        result: 'Más consultas agendadas, sin ir y venir por mensajes',
        price: 'Precio según tu proyecto',
      },
      {
        name: 'Sitio profesional', badge: 'Más elegido',
        desc: 'Tu marca completa en internet: inicio, sobre ti, servicios, casos y contacto.',
        includes: ['Todo lo de la landing page', 'Hasta 5 páginas: Inicio, Sobre mí, Servicios, Casos y Contacto', 'SEO básico para aparecer en Google'],
        delivery: '2 a 3 semanas',
        result: 'Una presencia que genera confianza y te trae clientes desde Google',
        price: 'Precio según tu proyecto', featured: true,
      },
      {
        name: 'Acompañamiento',
        desc: 'Para que tu web siga funcionando y creciendo contigo, sin preocuparte por nada técnico.',
        includes: ['Cambios y actualizaciones', 'Hosting, seguridad y respaldos', 'Reporte mensual de visitas y citas', 'Ajustes para que te agenden más'],
        delivery: 'Mes a mes',
        result: 'Una web siempre al día mientras tú atiendes a tus clientes',
        price: 'Precio según tu proyecto',
      },
    ] as PlanItem[],
  },
  faq: {
    title: 'Preguntas frecuentes',
    moreTitle: '¿Te quedó otra duda?',
    moreDesc: 'Escríbeme y te respondo personalmente.',
    moreCta: 'Escríbeme por WhatsApp',
    whatsappText: 'Hola Camilo, vi tu web y tengo una pregunta: ',
    items: [
      ['¿Cuánto cuesta una web?', 'Depende de lo que necesites. En la llamada de diagnóstico gratis entiendo tu caso y te doy una propuesta con un valor exacto, sin compromiso.'],
      ['¿Cómo me llegan las citas?', 'Tus clientes eligen día y hora en tu agenda en línea y te llega la confirmación. Si prefieren escribir, tienen tu WhatsApp a un clic.'],
      ['¿De verdad está lista en 7 días?', 'Sí, para una landing page. Te pido textos, fotos y logo antes de empezar; si no los tienes, te ayudo a prepararlos.'],
      ['¿Qué necesito tener listo?', 'Tu logo (o tu nombre), algunas fotos tuyas y una idea de tus servicios. Lo demás lo construimos juntos.'],
      ['¿Incluye dominio y hosting?', '[Define aquí qué incluye: dominio, hosting y correo, o si se pagan aparte.]'],
      ['¿Puedo hacer cambios después?', 'Claro. Te enseño a editar lo básico y el plan de acompañamiento cubre los cambios por ti.'],
      ['¿Trabajas fuera de Colombia?', 'Sí. Todo el proceso es remoto: llamadas, diseño y entregas en línea.'],
    ] as [string, string][],
  },
  closing: {
    title: 'Trabajemos juntos',
    button: ['Agenda tu', 'diagnóstico'],
    whatsappText: 'Hola Camilo, quiero una web para mi marca',
    emailSubject: 'Quiero una web para mi marca',
    // Formulario por pasos. {n}, {t}, {name}, {need} y {niche} se reemplazan en el navegador.
    form: {
      label: 'Cuéntame de tu proyecto',
      step: 'Paso {n} de {t}',
      needTitle: '¿Qué necesitas?',
      nicheTitle: '¿A qué te dedicas?',
      nicheOther: '¿Cuál?',
      nicheOtherPh: 'Ej.: nutricionista',
      timelineTitle: '¿Para cuándo la necesitas?',
      optional: '(opcional)',
      continue: 'Continuar',
      back: '← Atrás',
      dataTitle: 'Tus datos',
      name: 'Nombre',
      email: 'Email',
      phone: 'WhatsApp',
      message: '¿Algo más que deba saber?',
      submit: 'Enviar y elegir horario',
      submitting: 'Enviando…',
      pickOne: 'Elige a qué te dedicas y para cuándo la necesitas.',
      otherRequired: 'Cuéntame a qué te dedicas.',
      successTitle: '¡Listo, {name}! Ahora elige tu horario.',
      successCta: 'Elegir mi horario',
      successWa: '¿Prefieres WhatsApp? Escríbeme',
      waLead: 'Hola Camilo, soy {name}. Me interesa {need} para mi marca de {niche}.',
      error: 'No se pudo enviar. Intenta de nuevo o escríbeme por WhatsApp.',
    },
    whatsapp: 'WhatsApp',
    versionLabel: 'Versión',
    version: '2026 © Edición',
    timeLabel: 'Hora local',
    timeCity: 'Cartagena',
    socialLabel: 'Redes',
  },
  mobileBar: {
    cta: 'Agenda tu diagnóstico gratis',
    whatsappAria: 'Escríbeme por WhatsApp',
  },
  locale: 'es-CO',
};

export type HomeContent = typeof es;

const en: HomeContent = {
  meta: {
    title: 'Camilo Acosta — Strategic websites for independent professionals',
    description:
      'I design and build websites for independent professionals and businesses. Ready in 7 days, with online booking and a WhatsApp button.',
  },
  nav: {
    label: 'Main',
    links: [
      { href: '#servicios', label: 'Services' },
      { href: '#proyectos', label: 'Work' },
      { href: '#proceso',   label: 'Process' },
      { href: '#paquetes',  label: 'Packages' },
      { href: '#preguntas', label: 'FAQ' },
    ],
    cta: 'Book your assessment',
    ctaBySection: {
      proyectos: 'I want a site like this',
      proceso:   'Start in 7 days',
      paquetes:  'Get my proposal',
    },
    langLabel: 'ES',
    langAria: 'Leer en español',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    menuCta: 'Book your free assessment',
  },
  hero: {
    availability: `Available · ${stats.slots} spots this month`,
    titleStart: 'Your talent already exists. Let’s make them',
    titleScript: 'choose you.',
    subline:
      'A website built to get you booked, with your online calendar and your WhatsApp one tap away. For psychologists, dentists, coaches and independent professionals. Ready in 7 days.',
    cta: 'Book your free assessment',
    secondary: 'See my work',
    hello: 'Hi, I’m Camilo',
    role: 'Web designer & developer',
    roleYears: `${stats.years} years`,
    photoAlt: 'Camilo Acosta, web designer and developer',
    location: '[ Cartagena, CO — GMT−5 ]',
    scroll: 'Scroll to explore',
    delivered: isPending(stats.projects) ? '' : `[ ${stats.projects} digital projects built ]`,
    callouts: [
      { title: 'Clear message',       desc: 'Understood in 5 seconds' },
      { title: 'Built-in booking',    desc: 'Appointments without message ping-pong' },
      { title: 'Online booking',      desc: 'They book without messaging you' },
    ],
    phone: {
      brand: 'Your practice',
      title: 'Caring support, at your pace.',
      desc: 'Private practice · in-person and online sessions.',
      cta: 'Book your first session',
      bookingLabel: 'Online booking',
      bookingSlot: 'Thursday · 3:00 p.m.',
      bookingCta: 'Book',
    },
  },
  statement: {
    textStart: 'I help independent professionals, like psychologists, dentists and coaches, turn their talent into',
    highlight: 'booked clients',
    textEnd: '. No jargon, no middlemen.',
    pains: [
      'People recommend you, but anyone who searches for you on Google doesn’t find a website that convinces them.',
      'You answer the same WhatsApp messages all day and many leads go cold before booking.',
      'Your work is excellent, but your online presence doesn’t show it.',
    ],
    aside: 'Design, code and launch in the same hands.',
    asideStats: `${stats.years} years and ${stats.projects} digital projects built.`,
    button: ['Book your', 'free assessment'],
  },
  bento: {
    title: 'What you get',
    intro: 'Everything your brand needs to sell online, in one place.',
    case: {
      eyebrow: 'Real case · Industrial metalworking',
      title: 'Prometálicas Solutions',
      desc: 'Their website explains what they do in seconds and walks every visitor to a quote in 4 questions.',
      href: 'https://prometalica.com.co',
      linkLabel: 'See the live site',
    },
    delivery: { label: 'Delivery', value: '7 days', desc: 'From our first call to your site going live.' },
    testimonial: {
      label: 'Testimonial',
      quote: `“${clientTestimonial.en.quote}”`,
      name: clientTestimonial.author,
    },
    experience: { label: 'Experience', value: stats.projects, desc: 'digital projects built since 2020.' },
    ai: {
      badge: 'My edge',
      title: 'WhatsApp with AI that answers and books for you',
      desc: 'It handles the usual questions and leaves the appointment ready, even when you’re busy.',
      chat: [
        { from: 'them', text: 'Hi, do you have an appointment this week?' },
        { from: 'me',   text: 'Hi! I have Thursday 3:00 p.m. or Friday 10:00 a.m. Which works for you?' },
        { from: 'them', text: 'Thursday' },
        { from: 'me',   text: 'Done, you’re booked ✓' },
      ],
    },
    differential: {
      badge: 'My edge',
      title: 'Websites built to get you booked',
      desc: 'Every section guides your visitor toward one step: booking with you. Nothing to distract them.',
      steps: ['They find you', 'They trust you', 'They book'],
    },
    allInOne: { label: 'All in one', text: 'Design and development by the same person. You talk directly to me, no middlemen.' },
    availability: { label: 'Available', text: `${stats.slots} spots this month`, desc: 'Few projects, real dedication.' },
    cta: 'Let’s talk for 30 minutes, free.',
  },
  cases: {
    eyebrow: 'Recent work',
    title: 'Real cases',
    prev: 'Previous project',
    next: 'Next project',
    cursor: 'View case',
    hint: 'Tap a strip to open it',
    items: [
      {
        name: 'Prometálicas', title: 'Prometálicas Solutions', cat: 'Corporate website · Industrial metalworking',
        desc: 'A corporate website that explains its services in seconds and walks every visitor to a quote in 4 questions.',
        media: 'Home page of prometalica.com.co', image: prometalicaDesktop, imageMobile: prometalicaMobile, href: '/en/proyectos/', tone: 'mar',
      },
      {
        name: 'Atelier', title: 'Atelier', cat: 'Online store · Luxury furniture',
        desc: 'An online store for luxury furniture made in Colombia, with a collection, cart and custom projects.',
        media: 'Home page of atelier.prometalica.com.co', image: atelierDesktop, imageMobile: atelierMobile, href: '/en/proyectos/', tone: 'cielo',
      },
      {
        name: 'Are you next?', title: 'Your brand could be here.', cat: 'Spots this month',
        desc: 'Book a free 30-minute call and let’s design the website that turns your visitors into clients.',
        media: '', href: links.booking, tone: 'aqua', cta: true,
      },
    ],
    actionCase: 'View case →',
    actionCta: 'Book your assessment →',
    barText: 'Want a website like this for your brand?',
    barAll: 'See all projects',
    barCta: 'Book your assessment',
  },
  process: {
    title: 'Four steps. Seven days.',
    steps: [
      { day: 'Day 1',    title: 'Call and brief', desc: 'I get to know your brand, your ideal client and your goals.' },
      { day: 'Days 2–3', title: 'Design',         desc: 'I show you the design and we refine it together.' },
      { day: 'Days 4–6', title: 'Development',    desc: 'A fast website, mobile-ready and set up for Google.' },
      { day: 'Day 7',    title: 'Launch',         desc: 'We go live and I show you how to update it.' },
    ],
    readyStart: 'If we start today, your website would be ready',
    readyPrefix: 'on',
    readyFallback: 'in 7 days',
    cta: 'Start now',
  },
  plans: {
    title: 'Packages',
    intro: 'Every business is different. On a free 30-minute assessment call I learn what you need and give you a clear proposal, no strings attached.',
    dotsLabel: 'Package',
    includesLabel: 'Includes',
    deliveryLabel: 'Delivery',
    resultLabel: 'Result',
    cta: 'Book your free assessment →',
    guarantee: 'If I don’t deliver your website by the agreed date, I keep working at no extra cost until it’s finished.',
    items: [
      {
        name: 'Landing page',
        desc: 'A clear page that explains what you do and leads your visitors to book with you.',
        includes: ['Custom design for your brand', 'Online booking and WhatsApp button', 'Copy written to convert', 'Ready for Google and mobile'],
        delivery: '7 days',
        result: 'More booked appointments, no message ping-pong',
        price: 'Price based on your project',
      },
      {
        name: 'Professional site', badge: 'Most popular',
        desc: 'Your full brand online: home, about you, services, cases and contact.',
        includes: ['Everything in the landing page', 'Up to 5 pages: Home, About, Services, Cases and Contact', 'Basic SEO to show up on Google'],
        delivery: '2 to 3 weeks',
        result: 'A presence that builds trust and brings you clients from Google',
        price: 'Price based on your project', featured: true,
      },
      {
        name: 'Ongoing care',
        desc: 'So your website keeps working and growing with you, with nothing technical to worry about.',
        includes: ['Changes and updates', 'Hosting, security and backups', 'Monthly report on visits and bookings', 'Tweaks so you get more bookings'],
        delivery: 'Month to month',
        result: 'A website that’s always up to date while you take care of your clients',
        price: 'Price based on your project',
      },
    ],
  },
  faq: {
    title: 'Frequently asked questions',
    moreTitle: 'Still have a question?',
    moreDesc: 'Message me and I’ll answer personally.',
    moreCta: 'Message me on WhatsApp',
    whatsappText: 'Hi Camilo, I saw your website and I have a question: ',
    items: [
      ['How much does a website cost?', 'It depends on what you need. On the free assessment call I get to know your case and send you a proposal with an exact price, no strings attached.'],
      ['How do appointments reach me?', 'Your clients pick a day and time in your online calendar and you get the confirmation. If they’d rather write, your WhatsApp is one tap away.'],
      ['Is it really ready in 7 days?', 'Yes, for a landing page. I’ll ask for your copy, photos and logo before we start; if you don’t have them, I’ll help you prepare them.'],
      ['What do I need to have ready?', 'Your logo (or your name), a few photos of you and an idea of your services. We build the rest together.'],
      ['Are domain and hosting included?', '[Define what’s included: domain, hosting and email, or whether they’re billed separately.]'],
      ['Can I make changes later?', 'Of course. I’ll teach you to edit the basics, and the ongoing care plan covers changes for you.'],
      ['Do you work outside Colombia?', 'Yes. The whole process is remote: calls, design and delivery online.'],
    ],
  },
  closing: {
    title: 'Let’s work together',
    button: ['Book your', 'assessment'],
    whatsappText: 'Hi Camilo, I want a website for my brand',
    emailSubject: 'I want a website for my brand',
    form: {
      label: 'Tell me about your project',
      step: 'Step {n} of {t}',
      needTitle: 'What do you need?',
      nicheTitle: 'What do you do?',
      nicheOther: 'What exactly?',
      nicheOtherPh: 'E.g. nutritionist',
      timelineTitle: 'When do you need it?',
      optional: '(optional)',
      continue: 'Continue',
      back: '← Back',
      dataTitle: 'Your details',
      name: 'Name',
      email: 'Email',
      phone: 'WhatsApp',
      message: 'Anything else I should know?',
      submit: 'Send and pick a time',
      submitting: 'Sending…',
      pickOne: 'Choose what you do and when you need it.',
      otherRequired: 'Tell me what you do.',
      successTitle: 'All set, {name}! Now pick a time.',
      successCta: 'Pick my time',
      successWa: 'Prefer WhatsApp? Message me',
      waLead: 'Hi Camilo, I’m {name}. I’m interested in {need} for my {niche} brand.',
      error: 'Couldn’t send it. Try again or message me on WhatsApp.',
    },
    whatsapp: 'WhatsApp',
    versionLabel: 'Version',
    version: '2026 © Edition',
    timeLabel: 'Local time',
    timeCity: 'Cartagena',
    socialLabel: 'Social',
  },
  mobileBar: {
    cta: 'Book your free assessment',
    whatsappAria: 'Message me on WhatsApp',
  },
  locale: 'en-US',
};

export function getHome(lang: 'es' | 'en'): HomeContent {
  return lang === 'en' ? en : es;
}
