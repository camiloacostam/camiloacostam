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

export const BUDGETS = {
  low:  { es: 'Menos de $1.500.000',     en: 'Under COP 1,500,000' },
  mid:  { es: '$1.500.000 – $3.000.000', en: 'COP 1,500,000 – 3,000,000' },
  high: { es: 'Más de $3.000.000',       en: 'Over COP 3,000,000' },
  talk: { es: 'Prefiero hablarlo',       en: 'I’d rather discuss it' },
} satisfies Record<string, Labels>;

export type NeedKey   = keyof typeof NEEDS;
export type NicheKey  = keyof typeof NICHES;
export type BudgetKey = keyof typeof BUDGETS;
