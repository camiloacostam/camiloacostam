// Opciones del formulario por pasos del cierre.
// Lo importan el formulario (src/components/home/LeadForm.astro) y el endpoint
// (functions/api/contact.ts), así las listas permitidas viven en un solo lugar.

type Labels = { es: string; en: string };

export const NEEDS = {
  landing:  { es: 'Landing page',   en: 'Landing page' },
  site:     { es: 'Sitio completo', en: 'Full website' },
  redesign: { es: 'Rediseño',       en: 'Redesign' },
  unsure:   { es: 'Aún no lo sé',   en: 'Not sure yet' },
} satisfies Record<string, Labels>;

export const NICHES = {
  psychology: { es: 'Psicología',        en: 'Psychology' },
  dentistry:  { es: 'Odontología',       en: 'Dentistry' },
  coaching:   { es: 'Coaching',          en: 'Coaching' },
  health:     { es: 'Salud / bienestar', en: 'Health / wellness' },
  other:      { es: 'Otro',              en: 'Other' },
} satisfies Record<string, Labels>;

// El presupuesto no se pregunta: se habla en la llamada (los precios "desde" de Paquetes sirven de referencia)
export const TIMELINES = {
  asap:      { es: 'Lo antes posible',      en: 'As soon as possible' },
  month:     { es: 'Este mes',              en: 'This month' },
  quarter:   { es: 'En 1–3 meses',          en: 'In 1–3 months' },
  exploring: { es: 'Solo estoy explorando', en: 'Just exploring' },
} satisfies Record<string, Labels>;

export type NeedKey   = keyof typeof NEEDS;
export type NicheKey  = keyof typeof NICHES;
export type TimelineKey = keyof typeof TIMELINES;
