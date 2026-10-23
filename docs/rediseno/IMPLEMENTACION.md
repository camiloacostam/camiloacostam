# Rediseño del home — implementación

Cómo quedó construido el rediseño descrito en [`BRIEF-CLAUDE-CODE.md`](./BRIEF-CLAUDE-CODE.md), en la rama `redesign/funnel`.
Lo pendiente vive en [`TODO.md`](../../TODO.md); el contexto del negocio, en [`CLAUDE.md`](../../CLAUDE.md).

---

## Estado

| | |
|---|---|
| Rama | `redesign/funnel` (sin merge a `main`) |
| Páginas | `/` y `/en/` con el diseño nuevo. `/proyectos/`, `/blog/` y las 404 siguen con el diseño anterior. |
| Build | `pnpm build` sin errores |
| Lighthouse móvil (preview local) | Performance 99–100 · Accesibilidad 100 · Buenas prácticas 100 · SEO 100 · LCP ≈ 1,2 s · CLS ≈ 0,002 |
| Contenido | Textos completos en es y en. Cifras, capturas, testimonio y algunos datos siguen como `[corchetes]` (ver "Contenido pendiente"). |

---

## Mapa de archivos

```
src/
  pages/index.astro, pages/en/index.astro   # solo renderizan <HomePage />
  components/home/
    HomePage.astro    # arma la página: Layout variant="funnel" + secciones + script
    Nav.astro         # menú flotante de vidrio, CTA dinámico, progreso, menú móvil
    Hero.astro        # hero con foto sin fondo, mockup de celular y tarjetas 01–03
    Statement.astro   # presentación + 3 dolores + botón circular magnético
    Bento.astro       # "Lo que recibes" con spotlight
    Cases.astro       # casos reales: franjas acordeón + galería horizontal
    Process.astro     # 4 pasos + "tu web estaría lista el {hoy + 7 días}"
    Plans.astro       # paquetes + nota de moneda
    Faq.astro         # preguntas frecuentes (<details name="faq">)
    Closing.astro     # cierre "Trabajemos juntos" + footer
    LeadForm.astro    # formulario por pasos del cierre
    MobileBar.astro   # barra fija inferior en móvil
    Icon.astro        # íconos SVG compartidos
  data/home.ts        # TODOS los textos del home (es/en), enlaces y cifras
  data/lead.ts        # opciones del formulario (need, niche, timeline); lo usa también el backend
  styles/home.css     # tokens de color, utilidades (glass, fill-btn, reveal...) y reduced motion
  scripts/home.ts     # interacciones (JS vanilla, sin dependencias)
  assets/home/        # camilo-cutout.webp (hero) y camilo.webp (avatares), optimizadas con astro:assets
  layouts/Layout.astro  # prop variant="funnel": fuentes nuevas, sin Header/Footer clásicos
functions/api/contact.ts  # endpoint del formulario (Cloudflare Pages Function)
```

`Layout.astro` con `variant="classic"` (por defecto) sigue sirviendo a las páginas viejas sin cambios, y el CSS del home no se carga en ellas.

---

## Cómo editar el contenido

Casi todo se cambia en **`src/data/home.ts`**, sin tocar componentes.

- **Cifras** (`stats` al inicio del archivo): `projects` (`'15+'`), `years` (`'5+'`), `slots` (`'3'`). Aparecen en el hero, la presentación y el bento.
- **Enlaces** (`links`): Calendly, WhatsApp, email, Instagram (vacío = no se muestra), LinkedIn, GitHub.
- **Textos por sección**: objetos `hero`, `statement`, `bento`, `cases`, `process`, `plans`, `faq`, `closing`, `mobileBar`, en `es` y en `en`. Los dos idiomas tienen la misma forma: el objeto `en` está tipado con la forma de `es`, así que el editor marca si falta una clave en inglés (el build no revisa tipos).
- **Casos** (`cases.items`): cada franja tiene `name`, `title`, `cat`, `desc`, `media` (placeholder de la captura), `href` y `tone` (`mar` | `cielo` | `crema` | `aqua`). La franja `cta: true` abre Calendly.
- **Opciones del formulario**: en **`src/data/lead.ts`**. Cambiar o agregar una opción ahí actualiza el formulario y la validación del backend a la vez.

---

## Comportamiento

### Menú
- Cada sección lleva `data-nav="dark|light"`. `scripts/home.ts` detecta qué sección está a 48 px del borde superior y pone `.on-dark` / `.on-light` en el menú.
- **CTA dinámico**: el texto cambia según la sección (`nav.ctaBySection` en `home.ts`: proyectos, proceso y paquetes) con un fade y un brillo aqua. La barra móvil usa el mismo mapa.
- **Progreso**: la línea inferior de la píldora sigue el scroll; al llegar al final, el CTA hace un destello.
- **Menú móvil**: pantalla completa, cierra con Escape o al tocar un enlace, devuelve el foco al botón.

### Calendly
- Cualquier `<a data-calendly href="https://calendly.com/...">` abre el popup. El script de Calendly se carga con el **primer clic** (no en cada página) desde `Layout.astro`.
- Si el `href` trae parámetros (`?name=…&email=…&a1=…`), el popup se abre **prellenado**.
- Si Calendly no carga, se abre la página de Calendly en otra pestaña.

### Casos
- Escritorio: al pasar el mouse sobre una franja, se abre; flechas ← → con contador y barra de progreso; sobre la franja abierta, el cursor se vuelve un círculo de vidrio "Ver caso".
- Táctil: el primer toque abre la franja y el segundo entra al caso.
- Las franjas de casos apuntan a `/proyectos/` hasta que existan las páginas de caso.

### Fecha de entrega
`initClock()` calcula **hoy + 7 días corridos** en hora de Colombia al cargar la página ("el 25 de octubre" / "on October 25"). Si falla, queda "en 7 días". En el footer, la hora local de Cartagena se actualiza cada 30 s.

### Formulario por pasos (cierre)

| Paso | Pregunta | Campo | Obligatorio |
|---|---|---|---|
| 1 | ¿Qué necesitas? | `need`: landing, site, redesign, unsure | Sí (avanza solo al elegir) |
| 2 | ¿A qué te dedicas? | `niche`: psychology, dentistry, coaching, health, other (+ `nicheOther`) | Sí |
| 2 | ¿Para cuándo la necesitas? | `timeline`: asap, month, quarter, exploring | Sí |
| 3 | Tus datos | `name`, `email`, `phone` (+57), `message` | Nombre y email |

- Los chips son `<button aria-pressed>` en `role="group"`; todo funciona con teclado; "← Atrás" conserva lo elegido.
- **Éxito**: confirmación "¡Listo, {nombre}!", y a los 600 ms se abre Calendly con `name`, `email` y `a1 = {necesidad} · {nicho}`. Debajo, un enlace a WhatsApp con el mensaje armado.
- **Error**: mensaje en la tarjeta; los datos se conservan.
- Sin JavaScript el formulario no se muestra (los chips lo necesitan); siguen disponibles el botón de Calendly, el email y WhatsApp.

### Endpoint `POST /api/contact`

- Acepta JSON (y formulario clásico sin JS). Cualquier otro método responde **405**.
- Valida `need`, `niche` y `timeline` contra `src/data/lead.ts`; `nicheOther` obligatorio si el nicho es "other"; email con formato válido; teléfono de máximo 20 caracteres (dígitos, espacios, `+`, `-`); límites de largo en todos los campos.
- Honeypot `website`: si viene lleno, responde éxito sin enviar nada.
- Envía el correo con Resend: asunto `Nuevo lead: {necesidad} · {nicho} · {plazo} — {nombre}`, tabla con todos los campos (HTML escapado), `replyTo` al email del lead y botón a WhatsApp si dejó su número (agrega el 57 a celulares de 10 dígitos).
- Si Resend rechaza el envío, responde **502** (no finge éxito).
- `sendToCrm()` está vacío, listo para conectar Fidelius.

**Variables de entorno** (en `.env` local y en Cloudflare Pages, también para el entorno de preview):

| Variable | Para qué |
|---|---|
| `RESEND_API_KEY` | API key de Resend |
| `RESEND_TO` | Correo donde llegan los leads |
| `RESEND_FROM` | Remitente verificado, p. ej. `Formulario Web <formulario@camiloacosta.dev>`. Sin él se usa `onboarding@resend.dev`, que **solo entrega al dueño de la cuenta de Resend**. |

### Analítica

Los elementos con `data-track` envían un evento al hacer clic, y el formulario envía los suyos desde el script. `track()` en `scripts/home.ts` los pasa a la herramienta que esté cargada (`window.plausible`, `window.umami` o `window.gtag`); hoy no hay ninguna, así que no se registran hasta conectarla.

| Evento | Propiedades | Cuándo |
|---|---|---|
| `agendar` | `place`: nav, menu, hero, presentacion, bento, casos, casos-barra, proceso, paquete-1/2/3, cierre, barra-movil | Clic en un CTA de Calendly |
| `whatsapp` | `place`: faq, cierre, barra-movil, form | Clic en WhatsApp |
| `email` | `place`: cierre | Clic en el email |
| `form_step` | `step`: 1–3 | Cambio de paso |
| `form_submit` / `form_success` | `need`, `niche`, `timeline` | Envío / envío exitoso |
| `calendly_open` | `place`: form | Apertura de Calendly desde la confirmación |
| `agendado` | — | Calendly confirma una cita (`postMessage`) |

---

## Accesibilidad y rendimiento

- **Movimiento reducido**: con `prefers-reduced-motion` se apagan todas las animaciones; lo que aparecía con animación (bloques `.reveal`, tarjetas del hero) se muestra directo; sin efecto magnético ni spotlight.
- **Foco visible** en todos los elementos interactivos (anillo crema/mediterráneo sobre claro, mar/aqua sobre oscuro).
- Botones y enlaces reales, `aria-label` en los botones de solo ícono, contraste ≥ 4,5:1 (verificado con Lighthouse).
- **CSS incrustado** en el HTML (`build.inlineStylesheets: 'always'`) y **Google Fonts cargadas sin bloquear el render** (`media="print"` + `onload`, con `display=swap`).
- Fotos con `astro:assets` (WebP en varios tamaños; la del hero con `fetchpriority="high"`).

---

## Decisiones que se apartan del brief

| Brief | Implementado | Por qué |
|---|---|---|
| Astro + Tailwind | Variables CSS en `styles/home.css` | El proyecto no usa Tailwind; el brief permite variables CSS. |
| Casos y testimonio de Nathalia Acosta y Maura Tatis | Prometálica y Atelier con placeholders | `CLAUDE.md`: Nathalia y Maura no se completaron y no deben aparecer. |
| Nichos "coaches, wedding planners" en el copy y "Wedding planner" en el formulario | Psicólogos y dentistas; opción "Odontología" en el formulario | `CLAUDE.md`: wedding planners ya no son nicho; dentistas es el segundo. **Pendiente de confirmar.** |
| Cifras "15+" y "5+ años" | `[N]` | `CLAUDE.md`: las cifras deben ser reales y respaldables. |
| Botones que "respiran" con `animation-timeline: view()` | Latido único al entrar en pantalla (IntersectionObserver); el CTA del hero no late | Ligado al scroll, el anillo quedaba congelado a mitad de la animación. El hero ya está visible al cargar. |
| Galería de casos con `scroll-behavior: smooth` | Sin smooth en CSS (las flechas usan `scrollTo({ behavior: 'smooth' })`) | Con scroll-snap, Chrome hacía un scroll inicial y **dejaba de medir el LCP** (Lighthouse daba Performance 0). |
| Textos más cortos en móvil (hero, presentación) | Un solo texto para ambos | Evita duplicar contenido en el DOM. |

---

## Cómo probar

```bash
pnpm install
pnpm build            # debe terminar sin errores
pnpm preview          # sirve dist/ en http://localhost:4321
```

- `pnpm preview` **no ejecuta** la Cloudflare Function: el formulario mostrará el error de envío. Para probar el endpoint en local: `npx wrangler pages dev dist` con las variables en un archivo `.dev.vars`.
- Revisar a 375 px y 390 px, en español (`/`) y en inglés (`/en/`), con teclado (Tab) y con movimiento reducido activado en el sistema.
- Si el build se queda colgado, iCloud sacó archivos del disco: Finder → **Mantener descargado** en la carpeta del proyecto.

---

## Contenido pendiente

Lo que sigue en `[corchetes]` o depende de una decisión (detalle en `TODO.md`):

- Cifras: webs entregadas, años, cupos del mes.
- Paquete Sitio profesional: cuántas páginas incluye.
- FAQ: qué incluye dominio y hosting.
- Prometálica y Atelier: tipo, sector, resultado, capturas (escritorio y móvil), testimonio.
- Testimonio del bento y nicho del caso destacado.
- URL de Instagram.
- Confirmar: opción "Odontología" vs "Wedding planner"; 7 días corridos o hábiles.
- Configuración externa: dominio en Resend + `RESEND_FROM`; en Calendly, renombrar el evento y crear la **primera pregunta personalizada** (para el prellenado `a1`); elegir herramienta de analítica.

## Siguientes pasos

1. Llevar `/proyectos/`, las páginas de caso (`/proyectos/[slug]/`), `/blog/` y las 404 al diseño nuevo.
2. Reemplazar los placeholders con los datos reales.
3. Conectar la analítica y verificar los eventos.
4. Revisar la vista previa de Cloudflare Pages de la rama y hacer merge a `main`.
