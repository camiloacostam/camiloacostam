// Agendamiento con Cal.com (embed oficial). El script se descarga solo cuando hace falta:
// con el primer clic en un botón [data-booking] o al acercarse al calendario embebido.
import { track } from './track';

export const CAL_LINK = 'camiloacostam/cafecito-para-conocernos';
const CAL_ORIGIN = 'https://app.cal.com';
const EMBED_URL = `${CAL_ORIGIN}/embed/embed.js`;
const NS = 'cafecito';

type CalApi = (action: string, payload?: unknown) => void;
export type BookingPrefill = Partial<Record<'name' | 'email' | 'notes', string>>;

// Colores de la marca (tokens de src/styles/app.css) para el booker de Cal.com
const brandVars = {
  'cal-brand': '#1D5FAE',
  'cal-brand-emphasis': '#0A2342',
  'cal-brand-text': '#FFFFFF',
  'cal-text': '#0A2342',
  'cal-text-emphasis': '#0A2342',
  'cal-text-subtle': '#4A5868',
  'cal-bg': '#FFFBF5',
  'cal-bg-muted': '#F7F1E8',
  'cal-bg-subtle': '#E1F1FB',
  'cal-bg-emphasis': '#D3F5EF',
  'cal-border': '#DCE2E3',
  'cal-border-subtle': '#DCE2E3',
  'cal-border-booker': '#DCE2E3',
  radius: '14px',
};

let ready: Promise<CalApi> | null = null;

/** Inyecta el snippet oficial de Cal.com (una sola vez) y configura el namespace */
function loadCal(): Promise<CalApi> {
  ready ??= new Promise((resolve, reject) => {
    const w = window as any;
    // Snippet oficial de @calcom/embed-snippet: crea window.Cal con una cola hasta que carga embed.js
    (function (C: any, A: string, L: string) {
      const p = (a: any, ar: IArguments | unknown[]) => a.q.push(ar);
      const d = C.document;
      C.Cal = C.Cal || function () {
        const cal = C.Cal;
        const ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement('script')).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api: any = function () { p(api, arguments); };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === 'string') {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ['initNamespace', namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
    })(window, EMBED_URL, 'init');

    w.Cal('init', NS, { origin: CAL_ORIGIN });
    // embed.js reemplaza la cola del namespace al cargar: se resuelve en cada llamada
    const cal: CalApi = (action, payload) => w.Cal.ns[NS](action, payload);
    cal('ui', { theme: 'light', hideEventTypeDetails: false, layout: 'month_view', cssVarsPerTheme: { light: brandVars } });
    // Reserva completada (bookingSuccessfulV2 reemplaza al obsoleto bookingSuccessful)
    cal('on', { action: 'bookingSuccessfulV2', callback: () => track('agendado') });

    const script = document.querySelector<HTMLScriptElement>(`script[src="${EMBED_URL}"]`);
    script?.addEventListener('load', () => resolve(cal), { once: true });
    script?.addEventListener('error', () => { ready = null; reject(new Error('Cal.com embed failed to load')); }, { once: true });
  });
  return ready;
}

/** Lee name, email y notes del href de un botón (los arma el formulario del home) */
export function prefillFromHref(href: string | null): BookingPrefill {
  const out: BookingPrefill = {};
  if (!href) return out;
  try {
    const params = new URL(href, location.href).searchParams;
    for (const key of ['name', 'email', 'notes'] as const) {
      const value = params.get(key);
      if (value) out[key] = value;
    }
  } catch { /* href inválido: sin prellenado */ }
  return out;
}

/** Abre el popup de Cal.com; si el embed no carga, abre la página del evento */
export async function openBooking(prefill: BookingPrefill = {}) {
  try {
    const cal = await loadCal();
    cal('modal', { calLink: CAL_LINK, config: { layout: 'month_view', ...prefill } });
  } catch {
    const url = new URL(`https://cal.com/${CAL_LINK}`);
    Object.entries(prefill).forEach(([k, v]) => v && url.searchParams.set(k, v));
    window.open(url, '_blank', 'noopener');
  }
}

/** Monta el calendario embebido dentro de `el`; devuelve false si el embed no carga */
export async function mountInline(el: HTMLElement, onReady?: () => void): Promise<boolean> {
  try {
    const cal = await loadCal();
    if (onReady) cal('on', { action: 'linkReady', callback: onReady });
    cal('inline', { elementOrSelector: el, calLink: CAL_LINK, config: { layout: 'month_view' } });
    return true;
  } catch {
    return false;
  }
}

/** Cualquier <a data-booking> abre el popup (con prellenado si el href lo trae) */
export function initBookingButtons() {
  document.addEventListener('click', (e) => {
    const trigger = (e.target as Element).closest<HTMLAnchorElement>('[data-booking]');
    if (!trigger) return;
    e.preventDefault();
    openBooking(prefillFromHref(trigger.getAttribute('href')));
  });
}
