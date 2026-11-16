// Copy for /proyectos/ (es) and /en/proyectos/ (en). [brackets] = pending content.
const es = {
  meta: {
    title: 'Proyectos — La galería | Camilo Acosta',
    description:
      'Webs hechas a medida para profesionales independientes: mira los proyectos de Camilo Acosta y cómo ayudan a conseguir clientes.',
  },
  hero: {
    eyebrow: 'Proyectos · Casos reales · 2025 →',
    eyebrowScript: 'hoy',
    title: 'La galería',
    intro:
      'Webs para profesionales y negocios independientes que quieren que los elijan. Usa las flechas para recorrer los proyectos.',
  },
  gallery: {
    label: 'Galería de proyectos',
    prev: 'Proyecto anterior',
    next: 'Proyecto siguiente',
    view: 'Ver',
    media: 'Captura',
    tools: 'Herramientas',
    client: 'Cliente',
    result: 'Resultado',
    soon: 'Caso completo próximamente',
    fullCase: 'Ver el sitio en vivo ↗',
  },
  own: {
    title: 'Tu proyecto aquí',
    kind: 'Tu web',
    client: 'Tu negocio',
    tools: 'Diseño web a medida',
    result: 'Lista en 7 días',
    media: 'Este espacio puede ser para tu web',
    action: 'Agenda tu diagnóstico →',
  },
  index: {
    title: 'Todos los proyectos',
    count: (n: number) => `${n} ${n === 1 ? 'proyecto' : 'proyectos'} + un espacio para el tuyo`,
    cols: { no: 'Nº', project: 'Proyecto', tools: 'Herramientas', year: 'Año' },
  },
  closing: {
    eyebrow: 'Tu proyecto aquí',
    titleStart: 'Tu web puede ser el',
    titleScript: 'próximo',
    titleEnd: 'proyecto.',
    cta: 'Agenda tu diagnóstico gratis',
    whatsapp: 'Escríbeme por WhatsApp',
    brand: 'Tu marca',
    spots: 'Cupos disponibles: [N] este mes',
  },
};

const en: typeof es = {
  meta: {
    title: 'Work — The gallery | Camilo Acosta',
    description:
      'Custom websites for independent professionals: see Camilo Acosta’s projects and how they help win clients.',
  },
  hero: {
    eyebrow: 'Work · Real cases · 2025 →',
    eyebrowScript: 'today',
    title: 'The gallery',
    intro:
      'Websites for independent professionals and businesses that want to be chosen. Use the arrows to browse the projects.',
  },
  gallery: {
    label: 'Project gallery',
    prev: 'Previous project',
    next: 'Next project',
    view: 'View',
    media: 'Screenshot',
    tools: 'Tools',
    client: 'Client',
    result: 'Result',
    soon: 'Full case study coming soon',
    fullCase: 'See the live site ↗',
  },
  own: {
    title: 'Your project here',
    kind: 'Your website',
    client: 'Your business',
    tools: 'Custom web design',
    result: 'Ready in 7 days',
    media: 'This space could be your website',
    action: 'Book your audit →',
  },
  index: {
    title: 'All projects',
    count: (n: number) => `${n} ${n === 1 ? 'project' : 'projects'} + a spot for yours`,
    cols: { no: 'No.', project: 'Project', tools: 'Tools', year: 'Year' },
  },
  closing: {
    eyebrow: 'Your project here',
    titleStart: 'Your website could be the',
    titleScript: 'next',
    titleEnd: 'project.',
    cta: 'Book your free audit',
    whatsapp: 'Message me on WhatsApp',
    brand: 'Your brand',
    spots: 'Spots available: [N] this month',
  },
};

export function getProjectsPage(lang: 'es' | 'en') {
  return lang === 'en' ? en : es;
}
