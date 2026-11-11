// Analítica compartida: se conecta a la herramienta que esté cargada (Plausible, Umami o GA).
// Cualquier elemento con data-track="evento" (y opcional data-track-place) envía un evento al hacer clic.

type Props = Record<string, string>;

export function track(event: string, props: Props = {}) {
  const w = window as any;
  w.plausible?.(event, { props });
  w.umami?.track?.(event, props);
  w.gtag?.('event', event, props);
}

export function initTracking() {
  document.addEventListener('click', (e) => {
    const el = (e.target as Element).closest<HTMLElement>('[data-track]');
    if (el) track(el.dataset.track!, { place: el.dataset.trackPlace || '' });
  });

  // Calendly avisa por postMessage cuando alguien agenda (popup o embebido)
  addEventListener('message', (e) => {
    if (e.origin === 'https://calendly.com' && e.data?.event === 'calendly.event_scheduled') track('agendado');
  });
}
