// Interacciones del home rediseñado. JS vanilla, sin dependencias.

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer  = matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ── Entrada al hacer scroll ───────────────────────────────────────────────── */
// .reveal usa animation-timeline cuando existe; .breathe siempre late una vez al entrar
function initReveal() {
  if (reduceMotion) return;
  const scrollTimeline = CSS.supports('animation-timeline: view()');
  if (!scrollTimeline) document.documentElement.classList.add('io');
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -10% 0px' },
  );
  document.querySelectorAll(scrollTimeline ? '.breathe' : '.reveal, .breathe').forEach((el) => io.observe(el));
}

/* ── Menú: color según la sección, CTA dinámico y progreso ─────────────────── */
function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  const ctaMap: Record<string, string> = JSON.parse(nav.dataset.ctaMap || '{}');
  const navDefault = nav.dataset.ctaDefault || '';
  const labels   = [...document.querySelectorAll<HTMLElement>('[data-cta-label]')];
  const navCta   = nav.querySelector<HTMLElement>('.nav-cta');
  const progress = document.getElementById('nav-progress');
  const sections = [...document.querySelectorAll<HTMLElement>('[data-nav]')];
  const bar      = document.getElementById('mobile-bar');
  const closing  = document.getElementById('contacto');

  let current = '';
  let flashed = false;
  let ticking = false;

  const glow = (el: HTMLElement | null) => {
    if (!el || reduceMotion) return;
    el.classList.remove('is-glowing');
    void el.offsetWidth; // reinicia la animación
    el.classList.add('is-glowing');
  };

  const setCta = (key: string) => {
    for (const label of labels) {
      const text = ctaMap[key] || label.dataset.ctaDefault || navDefault;
      if (label.textContent === text) continue;
      label.textContent = text;
      if (reduceMotion) continue;
      label.classList.remove('is-swapping');
      void label.offsetWidth;
      label.classList.add('is-swapping');
    }
    glow(navCta);
  };

  const update = () => {
    ticking = false;
    const probe = 48;
    let mode = 'dark';
    let key = '';
    for (const s of sections) {
      const r = s.getBoundingClientRect();
      const off = parseInt(s.dataset.navOffset || '0', 10);
      if (r.top + off <= probe && r.bottom > probe) {
        mode = s.dataset.nav === 'light' ? 'light' : 'dark';
        key = ctaMap[s.id] ? s.id : '';
        break;
      }
    }
    nav.classList.toggle('on-light', mode === 'light');
    nav.classList.toggle('on-dark', mode !== 'light');

    if (key !== current) {
      current = key;
      setCta(key);
    }

    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
    if (progress) progress.style.transform = `scaleX(${p})`;
    if (p > 0.985 && !flashed) { flashed = true; glow(navCta); }
    if (p < 0.9) flashed = false;

    if (bar && closing) bar.classList.toggle('is-hidden', closing.getBoundingClientRect().top < innerHeight - 120);
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  update();
}

/* ── Menú móvil a pantalla completa ────────────────────────────────────────── */
function initMobileMenu() {
  const menu   = document.getElementById('mobile-menu');
  const open   = document.getElementById('menu-open');
  const close  = document.getElementById('menu-close');
  const bar    = document.getElementById('mobile-bar');
  if (!menu || !open || !close) return;

  const setOpen = (on: boolean) => {
    menu.hidden = !on;
    open.setAttribute('aria-expanded', String(on));
    document.body.style.overflow = on ? 'hidden' : '';
    bar?.toggleAttribute('hidden', on);
    (on ? close : open).focus();
  };

  open.addEventListener('click', () => setOpen(true));
  close.addEventListener('click', () => setOpen(false));
  menu.querySelectorAll('[data-menu-close]').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) setOpen(false);
  });
}

/* ── Botones circulares magnéticos ─────────────────────────────────────────── */
function initMagnets() {
  if (!finePointer || reduceMotion) return;
  document.querySelectorAll<HTMLElement>('[data-magnet]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.35;
      const y = (e.clientY - r.top - r.height / 2) * 0.35;
      el.classList.add('is-active');
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
    el.addEventListener('pointerleave', () => {
      el.classList.remove('is-active');
      el.style.transform = '';
    });
  });
}

/* ── Spotlight del bento ───────────────────────────────────────────────────── */
function initSpotlight() {
  if (!finePointer || reduceMotion) return;
  document.querySelectorAll<HTMLElement>('[data-spotlight]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--sx', `${e.clientX - r.left}px`);
      el.style.setProperty('--sy', `${e.clientY - r.top}px`);
    });
    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--sx', '-999px');
      el.style.setProperty('--sy', '-999px');
    });
  });
}

/* ── Casos: acordeón + galería horizontal ──────────────────────────────────── */
function initCases() {
  const root    = document.querySelector<HTMLElement>('[data-cases]');
  const track   = root?.querySelector<HTMLElement>('[data-cases-track]');
  if (!root || !track) return;

  const strips  = [...track.querySelectorAll<HTMLElement>('[data-strip]')];
  const counter = document.querySelector('[data-cases-counter]');
  const barEl   = document.querySelector<HTMLElement>('[data-cases-bar]');
  const prev    = document.querySelector<HTMLButtonElement>('[data-cases-prev]');
  const next    = document.querySelector<HTMLButtonElement>('[data-cases-next]');
  const cursor  = root.querySelector<HTMLElement>('[data-cases-cursor]');
  const total   = String(strips.length).padStart(2, '0');

  let act = 0;
  let wprog = 0;

  const render = () => {
    strips.forEach((s, i) => s.classList.toggle('is-open', i === act));
    if (counter) counter.textContent = `${String(act + 1).padStart(2, '0')} / ${total}`;
    if (barEl) barEl.style.transform = `scaleX(${Math.max(0.12, ((act + 1) / strips.length) * 0.5 + wprog * 0.5)})`;
    if (prev) prev.disabled = act === 0;
    if (next) next.disabled = act === strips.length - 1;
  };

  const go = (i: number, scroll: boolean) => {
    act = Math.max(0, Math.min(strips.length - 1, i));
    render();
    if (scroll) track.scrollTo({ left: Math.max(0, strips[act].offsetLeft - track.offsetLeft), behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  prev?.addEventListener('click', () => go(act - 1, true));
  next?.addEventListener('click', () => go(act + 1, true));

  strips.forEach((s, i) => {
    if (finePointer) s.addEventListener('mouseenter', () => act !== i && go(i, false));
    s.addEventListener('focus', () => act !== i && go(i, false));
    // En táctil, el primer toque abre la franja y el segundo entra al caso
    s.addEventListener('click', (e) => {
      if (act === i) return;
      e.preventDefault();
      e.stopPropagation();
      go(i, true);
    });
  });

  track.addEventListener('scroll', () => {
    const m = track.scrollWidth - track.clientWidth;
    wprog = m > 0 ? track.scrollLeft / m : 1;
    render();
  }, { passive: true });

  if (cursor && finePointer) {
    root.addEventListener('mousemove', (e) => {
      const r = root.getBoundingClientRect();
      const over = (e.target as Element).closest('.strip.is-open:not(.strip--cta)');
      root.classList.toggle('show-cursor', !!over);
      cursor.style.left = `${e.clientX - r.left}px`;
      cursor.style.top = `${e.clientY - r.top}px`;
    });
    root.addEventListener('mouseleave', () => root.classList.remove('show-cursor'));
  }

  render();
}

/* ── Puntos del carrusel de paquetes (móvil) ───────────────────────────────── */
function initPlanDots() {
  const plans = document.querySelector<HTMLElement>('[data-plans]');
  const dots  = [...document.querySelectorAll<HTMLElement>('[data-plan-dots] > *')];
  if (!plans || !dots.length) return;
  plans.addEventListener('scroll', () => {
    const card = plans.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 10 : 310;
    const i = Math.max(0, Math.min(dots.length - 1, Math.round(plans.scrollLeft / step)));
    dots.forEach((d, j) => d.classList.toggle('is-active', j === i));
  }, { passive: true });
}

/* ── Fechas y hora de Cartagena ────────────────────────────────────────────── */
function initClock() {
  const tz = 'America/Bogota';
  document.querySelectorAll<HTMLElement>('[data-ready-date]').forEach((el) => {
    const d = new Date(Date.now() + 7 * 864e5);
    el.textContent = d.toLocaleDateString(el.dataset.locale, { timeZone: tz, day: 'numeric', month: 'long' });
  });

  const clocks = [...document.querySelectorAll<HTMLElement>('[data-local-time]')];
  if (!clocks.length) return;
  const tick = () => {
    for (const el of clocks) {
      el.textContent = new Date().toLocaleTimeString(el.dataset.locale, { timeZone: tz, hour: '2-digit', minute: '2-digit' });
    }
  };
  tick();
  setInterval(tick, 30_000);
}

/* ── "¿Qué necesitas?": prellenan WhatsApp y el asunto del correo ──────────── */
function initNeeds() {
  const root = document.querySelector('[data-needs]');
  const wa   = document.querySelector<HTMLAnchorElement>('[data-need-wa]');
  const mail = document.querySelector<HTMLAnchorElement>('[data-need-mail]');
  if (!root) return;
  const chips = [...root.querySelectorAll<HTMLButtonElement>('[data-need]')];
  chips.forEach((chip) => chip.addEventListener('click', () => {
    chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
    if (wa && chip.dataset.wa) wa.href = chip.dataset.wa;
    if (mail && chip.dataset.mail) mail.href = chip.dataset.mail;
  }));
}

/* ── Analítica: se conecta a la herramienta que esté cargada ───────────────── */
type Props = Record<string, string>;
function track(event: string, props: Props = {}) {
  const w = window as any;
  w.plausible?.(event, { props });
  w.umami?.track?.(event, props);
  w.gtag?.('event', event, props);
}

function initTracking() {
  document.addEventListener('click', (e) => {
    const el = (e.target as Element).closest<HTMLElement>('[data-track]');
    if (el) track(el.dataset.track!, { place: el.dataset.trackPlace || '' });
  });

  // Calendly avisa por postMessage cuando alguien agenda
  addEventListener('message', (e) => {
    if (e.origin === 'https://calendly.com' && e.data?.event === 'calendly.event_scheduled') track('agendado');
  });
}

initReveal();
initNav();
initMobileMenu();
initMagnets();
initSpotlight();
initCases();
initPlanDots();
initClock();
initNeeds();
initTracking();
