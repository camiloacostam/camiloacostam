// Copy for /blog/, post pages and 404 (es + en, same shape).
// Posts themselves come from the `blog` content collection, never from here.

const es = {
  index: {
    metaTitle: 'Blog — Notas que venden | Camilo Acosta',
    metaDescription:
      'Ideas prácticas para profesionales independientes: cómo conseguir más clientes con tu web, Google, WhatsApp y la IA. Sin tecnicismos.',
    eyebrow: 'Blog · Diseño web · Marca personal · IA',
    titleLead: 'Notas',
    titleScript: 'que venden',
    intro:
      'Ideas prácticas para profesionales independientes: cómo conseguir más clientes con tu web, Google, WhatsApp y la IA. Sin tecnicismos.',
    filterLabel: 'Filtrar por tema',
    filterAll: 'Todas',
    featured: 'Destacado',
    allNotes: 'Todas las notas',
    countOne: 'nota',
    countMany: 'notas',
    readSuffix: 'de lectura',
    readUnit: 'min',
    readPost: 'Leer nota',
    emptyTitle: 'Las primeras notas están en camino',
    emptyDesc:
      'Estoy escribiendo las primeras guías sobre webs, Google, WhatsApp e IA para profesionales independientes. Mientras tanto, cuéntame tu caso y te digo por dónde empezar.',
    emptyLabel: 'Pronto',
  },
  post: {
    back: '← Volver al blog',
    author: 'Camilo Acosta',
    readSuffix: 'de lectura',
    readUnit: 'min',
    titleSuffix: 'Camilo Acosta',
  },
  cta: {
    eyebrow: '¿Prefieres que lo haga por ti?',
    titleLead: 'Leer ayuda. Tener tu web lista,',
    titleScript: 'ayuda más.',
    desc: 'En 7 días aplicamos todo esto a tu negocio. Agenda 30 minutos gratis y te digo por dónde empezar.',
    button: 'Agenda tu diagnóstico',
  },
  notFound: {
    code: '404',
    title: 'Página no encontrada',
    desc: 'La página que buscas no existe o cambió de dirección. Puedes volver al inicio, ver los proyectos o escribirme directamente.',
    home: 'Volver al inicio',
    projects: 'Ver proyectos',
    cta: 'Agenda tu diagnóstico',
  },
};

const en: typeof es = {
  index: {
    metaTitle: 'Blog — Notes that sell | Camilo Acosta',
    metaDescription:
      'Practical ideas for independent professionals: how to get more clients with your website, Google, WhatsApp and AI. No jargon.',
    eyebrow: 'Blog · Web design · Personal brand · AI',
    titleLead: 'Notes',
    titleScript: 'that sell',
    intro:
      'Practical ideas for independent professionals: how to get more clients with your website, Google, WhatsApp and AI. No jargon.',
    filterLabel: 'Filter by topic',
    filterAll: 'All',
    featured: 'Featured',
    allNotes: 'All notes',
    countOne: 'note',
    countMany: 'notes',
    readSuffix: 'read',
    readUnit: 'min',
    readPost: 'Read note',
    emptyTitle: 'The first notes are on the way',
    emptyDesc:
      "I'm writing the first guides on websites, Google, WhatsApp and AI for independent professionals. In the meantime, tell me about your case and I'll tell you where to start.",
    emptyLabel: 'Soon',
  },
  post: {
    back: '← Back to blog',
    author: 'Camilo Acosta',
    readSuffix: 'read',
    readUnit: 'min',
    titleSuffix: 'Camilo Acosta',
  },
  cta: {
    eyebrow: 'Prefer me to do it for you?',
    titleLead: 'Reading helps. Having your site ready,',
    titleScript: 'helps more.',
    desc: 'In 7 days we apply all of this to your business. Book 30 free minutes and I will tell you where to start.',
    button: 'Book your diagnosis',
  },
  notFound: {
    code: '404',
    title: 'Page not found',
    desc: "The page you're looking for doesn't exist or has moved. You can go back home, see the projects or write to me directly.",
    home: 'Back to home',
    projects: 'See projects',
    cta: 'Book your diagnosis',
  },
};

export const blogPage = { es, en };
export type BlogPageCopy = typeof es;
