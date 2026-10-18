// Contenido del home (rediseño "funnel").
// Todo lo que está entre [corchetes] es contenido pendiente: reemplázalo por el dato real.

export const links = {
  calendly:  'https://calendly.com/hello-camiloacosta/30min',
  whatsapp:  'https://wa.me/573007458843',
  email:     'hola@camiloacosta.dev',
  instagram: '', // [URL de Instagram] — vacío = no se muestra
  linkedin:  'https://www.linkedin.com/in/camilo-acosta-m/',
  github:    'https://github.com/camiloacostam',
};

// Cifras: deben ser reales y respaldables (ver CLAUDE.md). Si no se puede respaldar, se quita.
const stats = {
  projects: '[N]', // webs entregadas, con "+": '15+'
  years:    '[N]', // años de experiencia, con "+": '5+'
  slots:    '[N]', // cupos libres este mes, entero: '3'
};

export interface CaseItem {
  name: string;      // texto vertical de la franja cerrada
  title: string;
  cat: string;
  desc: string;
  media: string;     // placeholder hasta tener la captura
  href: string;
  tone: 'mar' | 'cielo' | 'crema' | 'aqua';
  cta?: boolean;
}

const es = {
  meta: {
    title: 'Camilo Acosta — Webs para psicólogos y profesionales de la salud',
    description:
      'Diseño y desarrollo webs para psicólogos, dentistas y profesionales independientes en Cartagena y Colombia. Listas en 7 días, con agenda en línea y WhatsApp integrados.',
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
    cta: 'Agenda una llamada',
    ctaBySection: {
      proyectos: 'Quiero una web así',
      proceso:   'Empezar en 7 días',
      paquetes:  'Elegir mi paquete',
    } as Record<string, string>,
    langLabel: 'EN',
    langAria: 'Read in English',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    menuCta: 'Agenda tu llamada gratis',
  },
  hero: {
    availability: `Disponible · ${stats.slots} cupos este mes`,
    titleStart: 'Tu talento ya tiene seguidores. Hagamos que te',
    titleScript: 'elijan.',
    subline:
      'Diseño y desarrollo webs para psicólogos, dentistas y profesionales independientes. Listas en 7 días y pensadas, pieza por pieza, para convertir.',
    cta: 'Agenda tu llamada gratis',
    secondary: 'Ver trabajos',
    hello: 'Hola, soy Camilo',
    role: `Diseñador y desarrollador web · ${stats.years} años`,
    photoAlt: 'Camilo Acosta, diseñador y desarrollador web',
    location: '[ Cartagena, CO — GMT−5 ]',
    scroll: 'Desliza para explorar',
    delivered: `[ ${stats.projects} webs entregadas ]`,
    callouts: [
      { title: 'Mensaje claro',       desc: 'Se entiende en 5 segundos' },
      { title: 'Agenda integrada',    desc: 'Citas sin ir y venir por DMs' },
      { title: 'WhatsApp a un toque', desc: 'Para quien prefiere escribir' },
    ],
    phone: {
      brand: 'Dra. Nombre',
      title: 'Terapia que te acompaña a tu ritmo.',
      desc: 'Psicóloga clínica · sesiones online y presenciales.',
      cta: 'Agenda tu primera cita',
      review: '“Me sentí escuchada desde la primera sesión.”', // ejemplo ilustrativo del mockup, no es un testimonio real
    },
  },
  statement: {
    textStart: 'Ayudo a psicólogos, dentistas y profesionales independientes a convertir su audiencia de Instagram en',
    highlight: 'clientes agendados',
    textEnd: '. Sin tecnicismos, sin intermediarios.',
    pains: [
      'Tu link en bio no explica qué haces ni por qué elegirte.',
      'Todo pasa por DMs y muchos se enfrían antes de agendar.',
      'Tu trabajo es excelente, pero tu presencia digital no lo transmite.',
    ],
    aside: `Diseño, código y lanzamiento en las mismas manos. ${stats.years} años y ${stats.projects} webs entregadas.`,
    button: ['Agenda tu', 'llamada gratis'],
  },
  bento: {
    title: 'Lo que recibes',
    intro: 'Todo lo que tu marca necesita para vender en línea, en un solo lugar.',
    case: {
      eyebrow: 'Caso real · [Nicho]',
      title: 'Tu web en acción',
      desc: '[Qué logra la web de Prometálica o Atelier para su negocio.]',
      desktop: '[Captura escritorio — Prometálica]',
      mobile: '[Móvil]',
    },
    delivery: { label: 'Entrega', value: '7 días', desc: 'De la primera llamada a tu web en línea.' },
    testimonial: {
      label: 'Testimonio',
      quote: '“[Qué cambió en el negocio del cliente después de tener su web.]”',
      name: '[Nombre]',
      role: '[Profesión]',
    },
    experience: { label: 'Experiencia', value: stats.projects, desc: `webs entregadas en ${stats.years} años.` },
    allInOne: { label: 'Todo en uno', text: 'Diseño y código con la misma persona.', stack: 'Figma · Astro · React · Tailwind' },
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
        name: 'Prometálica', title: 'Prometálica', cat: '[Tipo] · [Sector]',
        desc: '[Qué se hizo y resultado: X solicitudes al mes]',
        media: '[Captura — Prometálica]', href: '/proyectos/', tone: 'mar',
      },
      {
        name: 'Atelier', title: 'Atelier', cat: '[Tipo] · [Sector]',
        desc: '[Qué se hizo y resultado: X solicitudes al mes]',
        media: '[Captura — Atelier]', href: '/proyectos/', tone: 'cielo',
      },
      {
        name: '¿El próximo eres tú?', title: 'Tu marca podría estar aquí.', cat: 'Cupos este mes',
        desc: 'Agenda 30 minutos gratis y diseñemos la web que convierte a tu audiencia en clientes.',
        media: '', href: links.calendly, tone: 'aqua', cta: true,
      },
    ] as CaseItem[],
    actionCase: 'Ver caso →',
    actionCta: 'Agenda tu llamada →',
    barText: '¿Quieres una web así para tu marca?',
    barAll: 'Ver todos los proyectos',
    barCta: 'Agenda tu llamada',
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
    currencyNote: 'Precios en dólares (USD). Para clientes en Colombia se puede facturar en pesos a la TRM del día.',
    dotsLabel: 'Paquete',
    items: [
      { name: 'Landing page', desc: 'Una página enfocada en convertir tus visitas en citas. Lista en 7 días.', price: 'desde USD 200', note: 'Agenda y WhatsApp integrados →' },
      { name: 'Sitio profesional', badge: 'Más elegido', desc: 'Tu marca completa: servicios, sobre ti, blog y contacto.', price: 'desde USD 500', note: 'Hasta [N] páginas y SEO básico →', featured: true },
      { name: 'Acompañamiento', desc: 'Cambios, hosting y mantenimiento para que tu web crezca contigo.', price: 'USD 25', per: ' /mes', note: 'Reporte mensual de visitas →' },
    ],
  },
  faq: {
    title: 'Preguntas frecuentes',
    moreTitle: '¿Te quedó otra duda?',
    moreDesc: 'Escríbeme y te respondo personalmente.',
    moreCta: 'Escríbeme por WhatsApp',
    whatsappText: 'Hola Camilo, vi tu web y tengo una pregunta: ',
    items: [
      ['¿Cuánto cuesta una web?', 'Depende de lo que necesites. Las landing pages empiezan desde USD 200 y en la llamada gratis te doy un valor exacto.'],
      ['¿De verdad está lista en 7 días?', 'Sí, para una landing page. Te pido textos, fotos y logo antes de empezar; si no los tienes, te ayudo a prepararlos.'],
      ['¿Qué necesito tener listo?', 'Tu logo (o tu nombre), algunas fotos tuyas y una idea de tus servicios. Lo demás lo construimos juntos.'],
      ['¿Incluye dominio y hosting?', '[Define aquí qué incluye: dominio, hosting y correo, o si se pagan aparte.]'],
      ['¿Puedo hacer cambios después?', 'Claro. Te enseño a editar lo básico y el plan de acompañamiento cubre los cambios por ti.'],
      ['¿Trabajas fuera de Colombia?', 'Sí. Todo el proceso es remoto: llamadas, diseño y entregas en línea.'],
    ] as [string, string][],
  },
  closing: {
    title: 'Trabajemos juntos',
    button: ['Agenda tu', 'llamada'],
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
      successCta: 'Elegir horario en Calendly',
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
    cta: 'Agenda tu llamada gratis',
    whatsappAria: 'Escríbeme por WhatsApp',
  },
  locale: 'es-CO',
};

export type HomeContent = typeof es;

const en: HomeContent = {
  meta: {
    title: 'Camilo Acosta — Websites for psychologists and health professionals',
    description:
      'I design and build websites for psychologists, dentists and independent professionals. Ready in 7 days, with online booking and WhatsApp built in.',
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
    cta: 'Book a call',
    ctaBySection: {
      proyectos: 'I want a site like this',
      proceso:   'Start in 7 days',
      paquetes:  'Choose my package',
    },
    langLabel: 'ES',
    langAria: 'Leer en español',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    menuCta: 'Book your free call',
  },
  hero: {
    availability: `Available · ${stats.slots} spots this month`,
    titleStart: 'Your talent already has followers. Let’s make them',
    titleScript: 'choose you.',
    subline:
      'I design and build websites for psychologists, dentists and independent professionals. Ready in 7 days and crafted, piece by piece, to convert.',
    cta: 'Book your free call',
    secondary: 'See my work',
    hello: 'Hi, I’m Camilo',
    role: `Web designer & developer · ${stats.years} years`,
    photoAlt: 'Camilo Acosta, web designer and developer',
    location: '[ Cartagena, CO — GMT−5 ]',
    scroll: 'Scroll to explore',
    delivered: `[ ${stats.projects} websites delivered ]`,
    callouts: [
      { title: 'Clear message',       desc: 'Understood in 5 seconds' },
      { title: 'Built-in booking',    desc: 'Appointments without DM ping-pong' },
      { title: 'WhatsApp in one tap', desc: 'For those who prefer to text' },
    ],
    phone: {
      brand: 'Dr. Name',
      title: 'Therapy that moves at your pace.',
      desc: 'Clinical psychologist · online and in-person sessions.',
      cta: 'Book your first session',
      review: '“I felt heard from the very first session.”',
    },
  },
  statement: {
    textStart: 'I help psychologists, dentists and independent professionals turn their Instagram audience into',
    highlight: 'booked clients',
    textEnd: '. No jargon, no middlemen.',
    pains: [
      'Your link in bio doesn’t explain what you do or why to choose you.',
      'Everything happens in DMs and many leads go cold before booking.',
      'Your work is excellent, but your online presence doesn’t show it.',
    ],
    aside: `Design, code and launch in the same hands. ${stats.years} years and ${stats.projects} websites delivered.`,
    button: ['Book your', 'free call'],
  },
  bento: {
    title: 'What you get',
    intro: 'Everything your brand needs to sell online, in one place.',
    case: {
      eyebrow: 'Real case · [Niche]',
      title: 'Your website in action',
      desc: '[What the Prometálica or Atelier website achieves for their business.]',
      desktop: '[Desktop screenshot — Prometálica]',
      mobile: '[Mobile]',
    },
    delivery: { label: 'Delivery', value: '7 days', desc: 'From our first call to your site going live.' },
    testimonial: {
      label: 'Testimonial',
      quote: '“[What changed in the client’s business after launching their website.]”',
      name: '[Name]',
      role: '[Profession]',
    },
    experience: { label: 'Experience', value: stats.projects, desc: `websites delivered over ${stats.years} years.` },
    allInOne: { label: 'All in one', text: 'Design and code by the same person.', stack: 'Figma · Astro · React · Tailwind' },
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
        name: 'Prometálica', title: 'Prometálica', cat: '[Type] · [Industry]',
        desc: '[What was built and the result: X requests per month]',
        media: '[Screenshot — Prometálica]', href: '/en/proyectos/', tone: 'mar',
      },
      {
        name: 'Atelier', title: 'Atelier', cat: '[Type] · [Industry]',
        desc: '[What was built and the result: X requests per month]',
        media: '[Screenshot — Atelier]', href: '/en/proyectos/', tone: 'cielo',
      },
      {
        name: 'Are you next?', title: 'Your brand could be here.', cat: 'Spots this month',
        desc: 'Book a free 30-minute call and let’s design the website that turns your audience into clients.',
        media: '', href: links.calendly, tone: 'aqua', cta: true,
      },
    ],
    actionCase: 'View case →',
    actionCta: 'Book your call →',
    barText: 'Want a website like this for your brand?',
    barAll: 'See all projects',
    barCta: 'Book your call',
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
    currencyNote: 'Prices in US dollars (USD). Clients in Colombia can be invoiced in pesos at the day’s exchange rate (TRM).',
    dotsLabel: 'Package',
    items: [
      { name: 'Landing page', desc: 'A single page focused on turning visits into appointments. Ready in 7 days.', price: 'from USD 200', note: 'Booking and WhatsApp built in →' },
      { name: 'Professional site', badge: 'Most popular', desc: 'Your full brand: services, about you, blog and contact.', price: 'from USD 500', note: 'Up to [N] pages and basic SEO →', featured: true },
      { name: 'Ongoing care', desc: 'Changes, hosting and maintenance so your website grows with you.', price: 'USD 25', per: ' /month', note: 'Monthly traffic report →' },
    ],
  },
  faq: {
    title: 'Frequently asked questions',
    moreTitle: 'Still have a question?',
    moreDesc: 'Message me and I’ll answer personally.',
    moreCta: 'Message me on WhatsApp',
    whatsappText: 'Hi Camilo, I saw your website and I have a question: ',
    items: [
      ['How much does a website cost?', 'It depends on what you need. Landing pages start from USD 200, and on the free call I’ll give you an exact quote.'],
      ['Is it really ready in 7 days?', 'Yes, for a landing page. I’ll ask for your copy, photos and logo before we start; if you don’t have them, I’ll help you prepare them.'],
      ['What do I need to have ready?', 'Your logo (or your name), a few photos of you and an idea of your services. We build the rest together.'],
      ['Are domain and hosting included?', '[Define what’s included: domain, hosting and email, or whether they’re billed separately.]'],
      ['Can I make changes later?', 'Of course. I’ll teach you to edit the basics, and the ongoing care plan covers changes for you.'],
      ['Do you work outside Colombia?', 'Yes. The whole process is remote: calls, design and delivery online.'],
    ],
  },
  closing: {
    title: 'Let’s work together',
    button: ['Book your', 'call'],
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
      successCta: 'Pick a time on Calendly',
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
    cta: 'Book your free call',
    whatsappAria: 'Message me on WhatsApp',
  },
  locale: 'en-US',
};

export function getHome(lang: 'es' | 'en'): HomeContent {
  return lang === 'en' ? en : es;
}
