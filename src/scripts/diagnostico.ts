// Interacciones de /diagnostico/: Cal.com embebido bajo demanda, botón fijo en móvil y analítica.
import { mountInline } from './cal';

/* ── Cal.com embebido: el script se descarga solo al acercarse al bloque ───── */
function initInlineBooking() {
  const box = document.querySelector<HTMLElement>('[data-cal-inline]');
  const loading = document.querySelector<HTMLElement>('[data-cal-loading]');
  if (!box) return;

  const mount = async () => {
    const ok = await mountInline(box, () => loading?.remove());
    if (ok || !loading) return;
    // Sin conexión con Cal.com: dejamos un enlace directo al evento
    const a = document.createElement('a');
    a.href = box.dataset.fallbackHref!;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = box.dataset.fallbackLabel!;
    a.className = 'font-semibold text-mediterraneo underline';
    loading.replaceChildren(a);
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
initInlineBooking();
initStickyCta();
