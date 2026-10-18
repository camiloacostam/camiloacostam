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
    try {
      const d = new Date(Date.now() + 7 * 864e5);
      const date = d.toLocaleDateString(el.dataset.locale, { timeZone: tz, day: 'numeric', month: 'long' });
      el.textContent = `${el.dataset.prefix} ${date}`;
    } catch {
      // Se queda el texto de respaldo ("en 7 días")
    }
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

/* ── Formulario por pasos del cierre: alimenta a Calendly ───────────────────── */
function initLeadForm() {
  const root = document.querySelector<HTMLElement>('[data-lead]');
  const form = root?.querySelector<HTMLFormElement>('[data-lead-form]');
  if (!root || !form) return;
  root.hidden = false;

  const d         = root.dataset;
  const panes     = [...form.querySelectorAll<HTMLElement>('[data-pane]')];
  const total     = panes.length;
  const stepLabel = root.querySelector<HTMLElement>('[data-lead-step]')!;
  const bar       = root.querySelector<HTMLElement>('[data-lead-bar]')!;
  const other     = form.querySelector<HTMLElement>('[data-niche-other]')!;
  const otherIn   = other.querySelector<HTMLInputElement>('input')!;
  const paneError = form.querySelector<HTMLElement>('[data-pane-error]')!;
  const sendError = form.querySelector<HTMLElement>('[data-submit-error]')!;
  const submit    = form.querySelector<HTMLButtonElement>('[data-submit]')!;
  const submitTxt = form.querySelector<HTMLElement>('[data-submit-label]')!;
  const done      = root.querySelector<HTMLElement>('[data-lead-done]')!;

  const fill = (tpl = '', values: Record<string, string>) =>
    tpl.replace(/\{(\w+)\}/g, (_, k) => values[k] ?? '');

  // Selección actual de cada grupo de chips: { key, label }
  const picked: Record<string, { key: string; label: string } | undefined> = {};
  let step = 1;

  const show = (n: number) => {
    const back = n < step;
    step = n;
    panes.forEach((p) => {
      const on = Number(p.dataset.pane) === n;
      p.hidden = !on;
      p.classList.remove('is-entering', 'is-entering-back');
      if (on && !reduceMotion) p.classList.add(back ? 'is-entering-back' : 'is-entering');
    });
    stepLabel.textContent = fill(d.stepTpl, { n: String(n), t: String(total) });
    bar.style.transform = `scaleX(${n / total})`;
    paneError.textContent = '';
    panes[n - 1].querySelector<HTMLElement>('.lead-q')?.focus({ preventScroll: true });
    track('form_step', { step: String(n) });
  };

  form.querySelectorAll<HTMLButtonElement>('[data-field]').forEach((chip) => {
    chip.addEventListener('click', () => {
      const field = chip.dataset.field!;
      const group = form.querySelectorAll<HTMLButtonElement>(`[data-field="${field}"]`);
      group.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
      picked[field] = { key: chip.dataset.value!, label: chip.dataset.label! };

      if (field === 'need') show(2);
      if (field === 'niche') {
        other.hidden = chip.dataset.value !== 'other';
        if (!other.hidden) otherIn.focus();
      }
      if (field === 'niche' || field === 'timeline') paneError.textContent = '';
    });
  });

  form.querySelector('[data-next]')!.addEventListener('click', () => {
    if (!picked.niche || !picked.timeline) { paneError.textContent = d.pickOne!; return; }
    if (picked.niche.key === 'other' && !otherIn.value.trim()) {
      paneError.textContent = d.otherRequired!;
      otherIn.focus();
      return;
    }
    show(3);
  });

  form.querySelectorAll('[data-back]').forEach((b) => b.addEventListener('click', () => show(step - 1)));

  const nicheText = () =>
    picked.niche?.key === 'other' ? otherIn.value.trim() : picked.niche?.label ?? '';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!picked.need || !picked.niche || !picked.timeline || !form.reportValidity()) return;

    const fd = new FormData(form);
    const value = (k: string) => String(fd.get(k) ?? '').trim();
    const payload = {
      need: picked.need.key,
      niche: picked.niche.key,
      nicheOther: picked.niche.key === 'other' ? otherIn.value.trim() : '',
      timeline: picked.timeline.key,
      name: value('name'),
      email: value('email'),
      phone: value('phone'),
      message: value('message'),
      website: value('website'),
    };

    const label = submitTxt.textContent;
    submit.disabled = true;
    submitTxt.textContent = d.submitting!;
    sendError.textContent = '';
    track('form_submit', { need: payload.need, niche: payload.niche, timeline: payload.timeline });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));
    } catch {
      sendError.textContent = d.error!;
      submit.disabled = false;
      submitTxt.textContent = label;
      return;
    }

    track('form_success', { need: payload.need, niche: payload.niche, timeline: payload.timeline });

    const firstName = payload.name.split(/\s+/)[0];
    const values = { name: firstName, need: picked.need.label, niche: nicheText() };

    const cal = new URL(d.calendlyBase!);
    cal.searchParams.set('name', payload.name);
    cal.searchParams.set('email', payload.email);
    cal.searchParams.set('a1', `${values.need} · ${values.niche}`);
    const calBtn = done.querySelector<HTMLAnchorElement>('[data-done-calendly]')!;
    calBtn.href = cal.toString();

    const wa = done.querySelector<HTMLAnchorElement>('[data-done-wa]')!;
    wa.href = `${d.waBase}?text=${encodeURIComponent(fill(d.waTpl, { ...values, name: payload.name }))}`;

    const title = done.querySelector<HTMLElement>('[data-done-title]')!;
    title.textContent = fill(d.successTpl, values);

    form.hidden = true;
    root.querySelector<HTMLElement>('.lead-top')!.hidden = true;
    done.hidden = false;
    title.focus({ preventScroll: true });

    // Abre Calendly prellenado; el botón queda por si el usuario lo cierra
    setTimeout(() => calBtn.click(), 600);
  });
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
initLeadForm();
initTracking();
