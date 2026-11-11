// Interacciones de /diagnostico/: Calendly embebido bajo demanda, botón fijo en móvil y analítica.
import { initTracking } from './track';

/* ── Calendly embebido: el script se descarga solo al acercarse al bloque ──── */
function loadCalendly(): Promise<void> {
  const w = window as any;
  if (w.Calendly) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'https://assets.calendly.com/assets/external/widget.css';
    document.head.appendChild(css);

    const js = document.createElement('script');
    js.src = 'https://assets.calendly.com/assets/external/widget.js';
    js.onload = () => resolve();
    js.onerror = () => reject();
    document.head.appendChild(js);
  });
}

function initCalendly() {
  const box = document.querySelector<HTMLElement>('[data-calendly-inline]');
  const loading = document.querySelector<HTMLElement>('[data-calendly-loading]');
  if (!box) return;

  const mount = async () => {
    try {
      await loadCalendly();
      (window as any).Calendly.initInlineWidget({ url: box.dataset.url, parentElement: box });
      loading?.remove();
    } catch {
      // Sin conexión con Calendly: dejamos un enlace directo
      if (loading) {
        loading.innerHTML = '';
        const a = document.createElement('a');
        a.href = box.dataset.url!.split('?')[0];
        a.target = '_blank';
        a.rel = 'noopener';
        a.textContent = 'Abrir el calendario en Calendly';
        a.className = 'font-semibold text-mediterraneo underline';
        loading.appendChild(a);
      }
    }
  };

  const io = new IntersectionObserver(
    (entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      mount();
    },
    { rootMargin: '600px 0px' },
  );
  io.observe(box);
}

/* ── Botón fijo en móvil: visible solo cuando no hay otro CTA ni el calendario a la vista ── */
function initStickyCta() {
  const bar = document.querySelector<HTMLElement>('[data-sticky-cta]');
  const blockers = document.querySelectorAll('[data-hide-sticky]');
  if (!bar || !blockers.length) return;

  const visible = new Set<Element>();
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) e.isIntersecting ? visible.add(e.target) : visible.delete(e.target);
    bar.toggleAttribute('data-hidden', visible.size > 0);
    bar.toggleAttribute('inert', visible.size > 0);
  });
  blockers.forEach((el) => io.observe(el));
}

/* ── Header: tono según la sección que tiene debajo (data-nav="dark|light") ── */
function initHeaderTone() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const sections = [...document.querySelectorAll<HTMLElement>('[data-nav]')];
  if (!header || !sections.length) return;

  let ticking = false;
  const update = () => {
    ticking = false;
    const probe = 48; // altura aproximada del centro de la píldora
    const current = sections.find((s) => {
      const r = s.getBoundingClientRect();
      return r.top <= probe && r.bottom > probe;
    });
    header.dataset.tone = current?.dataset.nav === 'light' ? 'light' : 'dark';
  };
  addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();
}

initHeaderTone();
initCalendly();
initStickyCta();
initTracking();
