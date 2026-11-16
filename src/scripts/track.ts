// Analítica compartida: se conecta a la herramienta que esté cargada (Plausible, Umami o GA).
// Cualquier elemento con data-track="evento" (y opcional data-track-place) envía un evento al hacer clic.
// La reserva completada ("agendado") la envía src/scripts/cal.ts con el evento bookingSuccessfulV2 de Cal.com.

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
}
