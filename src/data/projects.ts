export interface Project {
  title: string;
  category: 'Sitio Web' | 'Landing Page' | 'E-commerce' | 'App Web';
  description: string;
  shortDesc: string;
  tech: string[];
  cover?: string;
  link?: string;
  date: string;       // formato: 'YYYY-MM-DD'
  featured?: boolean; // true = aparece en la sección destacada del home
}

export const projects: Project[] = [
  {
    title: 'Maura Tatis',
    category: 'Sitio Web',
    description:
      'Diseño y desarrollo de un sitio web profesional que refleja la marca personal y conecta con su audiencia. Solución completa desde el concepto visual hasta el deploy.',
    shortDesc:
      'Diseño y desarrollo de una landing page profesional que atrae y convierte novias desde Instagram.',
    tech: ['Astro', 'Tailwind', 'Figma'],
    cover: '',         // reemplaza con: '/images/projects/maura.jpg'
    link: '#',
    date: '2025-02-09',
    featured: true,
  },
  {
    title: 'Nathalia Acosta',
    category: 'Landing Page',
    description:
      'Landing page diseñada para una psicóloga independiente que busca atraer nuevos pacientes desde redes sociales. Enfoque en transmitir confianza, calidez y profesionalismo desde el primer scroll.',
    shortDesc:
      'Landing page para psicóloga independiente que convierte visitas de Instagram en consultas agendadas.',
    tech: ['Astro', 'Tailwind', 'Figma'],
    cover: '',        // reemplaza con: '/images/projects/nathalia.jpg'
    link: '#',
    date: '2025-04-01',
    featured: true,
  },
  // ── Agrega aquí más proyectos ──────────────────────────────────────────────
  // {
  //   title: 'Nombre del proyecto',
  //   category: 'Landing Page',
  //   description: 'Descripción larga para la página de proyectos.',
  //   shortDesc: 'Descripción corta para la tarjeta.',
  //   tech: ['React', 'Next.js'],
  //   cover: '/images/projects/proyecto.jpg',
  //   link: 'https://...',
  //   date: '2025-06-01',
  //   featured: false,
  // },
];
