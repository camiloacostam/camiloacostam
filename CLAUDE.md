# camiloacosta.dev — Contexto del proyecto

Sitio personal y portafolio de **Camilo Acosta**, diseñador web estratégico y desarrollador frontend en Cartagena, Colombia.
Es la vitrina principal para conseguir clientes: cada decisión de diseño, copy y código debe ayudar a que un visitante agende una llamada.

## Negocio y posicionamiento

- **Marca:** Camilo Acosta (marca personal; Domi's Web Services ya no existe y no debe aparecer en ningún lado).
- **Qué vende:** sitios y landing pages estratégicas que convierten y hacen crecer marcas personales: diseño + estrategia de marketing + código limpio.
- **Diferenciador:** "No diseño webs bonitas. Diseño sistemas digitales que trabajan por ti, con estrategia de marketing, automatización con IA y código limpio."
- **IA:** el asistente de WhatsApp con IA **todavía no es un servicio activo**. No se ofrece en el sitio; la tarjeta del chat está archivada en `src/components/home/AiChatCard.astro` para reactivarla más adelante.
- **Nicho:**
  - **Principal: psicólogos** con consulta privada. Es la mayoría de los leads actuales en Fidelius.
  - **Segundo nicho: dentistas** / consultorios odontológicos.
  - **Paraguas:** profesionales y negocios independientes (salud, coaches, marcas personales).
- **Cómo hablarles:** en términos de resultados (más clientes, citas agendadas sin perseguir mensajes, confianza desde el primer scroll), no de tecnologías. Wedding planners ya no son nicho objetivo.
- **Precios:** el sitio **no muestra precios** ("Precio según tu proyecto"); el valor se da en la llamada. Referencia interna: Landing desde USD 200 · Sitio profesional desde USD 500 · Acompañamiento USD 25/mes. A clientes en Colombia se puede facturar en pesos a la TRM del día. Pago 50% anticipo / 50% contra entrega.
- **Entregas:** Landing en 7 días · Sitio profesional en 2 a 3 semanas.
- **Oferta de entrada:** auditoría de presencia digital gratuita (video Loom de 5 min).
- **Embudo:** web / Instagram / DM → Cal.com → llamada de diagnóstico (30 min) → propuesta → cierre. Los leads se gestionan en **Fidelius** (CRM propio).

## Portafolio

- Proyectos a mostrar: **Prometálicas Solutions** (https://prometalica.com.co, metalmecánica industrial) y **Atelier** (https://atelier.prometalica.com.co, mobiliario de lujo). Capturas reales en `src/assets/projects/`.
- **Nathalia Acosta** y **Maura Tatis** no se completaron y **no deben aparecer** en el sitio.

## Stack

- **Astro v6** + **Tailwind CSS v4** (`@tailwindcss/vite`), desplegado en **Cloudflare** (Pages + Functions; ver `wrangler.toml`).
- Gestor de paquetes: **pnpm** (`sharp` es dependencia directa: el modo estricto de pnpm la exige para `astro:assets`).
- **i18n:** español por defecto (`/`), inglés en `/en/`. Los textos viven en `src/data/*.ts` (objetos `es` y `en` con la misma forma); `src/i18n/utils.ts` tiene los helpers de idioma.
- **Blog:** content collections (`src/content.config.ts`, artículos en `src/content/blog/`). Mientras no haya artículos, el blog **no se enlaza**, tiene `noindex` y queda fuera del sitemap (la ruta `/blog/` existe).
- **Proyectos:** datos en `src/data/projects.ts`; página en `src/pages/proyectos/` y `src/pages/en/proyectos/`.
- **Formulario por pasos** (cierre del home): `src/components/home/LeadForm.astro` + `src/scripts/home.ts` hacen `POST /api/contact`, resuelto por `functions/api/contact.ts` (envía el lead con Resend). Opciones del formulario en `src/data/lead.ts`.
- **Agendamiento:** **Cal.com**, evento `https://cal.com/camiloacostam/cafecito-para-conocernos`. Integración en `src/scripts/cal.ts` (embed oficial, colores de la marca).
- **Analítica:** `src/scripts/track.ts` envía los eventos a Umami/Plausible/GA si están cargados. Umami se carga solo si existe `PUBLIC_UMAMI_WEBSITE_ID`.
- **CI:** `.github/workflows/update-readme.yml` + `.github/scripts/update-readme.ts`.

## Estructura

```
src/
  layouts/Layout.astro      # <head>: SEO, OG, hreflang, JSON-LD, fuentes, Umami, analítica y botones de Cal.com
  styles/app.css            # Tailwind v4: tokens de la marca (@theme) y utilidades propias
  components/home/          # home: Nav, Hero, Statement, Bento, Cases, Process, Plans, Faq, Closing, LeadForm, MobileBar
  components/site/          # SiteNav y SiteFooter de las páginas internas
  components/projects/      # galería de /proyectos/
  components/blog/          # índice del blog, post, CTA y 404
  pages/                    # es en la raíz, en bajo /en/; /diagnostico/ (landing de las bios, solo es)
  data/                     # textos y datos: home, site, projects, projects-page, blog-page, diagnostico, lead
  scripts/                  # home.ts, diagnostico.ts, cal.ts (Cal.com), track.ts (analítica)
  assets/                   # imágenes optimizadas con astro:assets (home/, projects/)
functions/api/contact.ts    # endpoint del formulario
public/                     # og-image.jpg, favicons, robots.txt
```

Anclas de la home (en español también en /en/): `#inicio`, `#servicios`, `#proyectos`, `#proceso`, `#paquetes`, `#preguntas`, `#contacto`.
Cómo quedó construido el rediseño: `docs/rediseno/IMPLEMENTACION.md`.

## Identidad visual

- Secciones alternas crema `#F7F1E8` y mar `#0A2342`, acento aqua `#2DD4BF`, azul Mediterráneo `#1D5FAE`. Tokens en `src/styles/app.css` (la paleta por defecto de Tailwind está desactivada).
- Tipografía: Inter Tight; Dancing Script solo para la firma y acentos.
- Los CTA de agendar usan `data-booking` (abre el popup de Cal.com) y `data-track` (eventos de analítica).

## Contacto público

- WhatsApp: https://wa.me/573104327497
- Instagram: https://www.instagram.com/camiloacosta.dev/
- X: https://x.com/camiloacostam
- LinkedIn: https://www.linkedin.com/in/camilo-acosta-m/
- GitHub: https://github.com/camiloacostam

## Convenciones

- Todo texto visible sale de `src/data/*` (es y en). Nunca hardcodear español en componentes compartidos con `/en/`.
- Estilos con clases de Tailwind y los tokens de la marca; sin hex ni `var()` dentro de `class`; `class:list` para clases condicionales.
- Los enlaces internos deben usar barra final (`/proyectos/`) para coincidir con las canonical y evitar redirecciones.
- Las cifras de prueba social (proyectos, clientes, años, cupos) deben ser reales y respaldables. Lo pendiente va entre `[corchetes]` y **no se muestra**: `isPending()` en `src/data/home.ts` oculta esas piezas.
- Antes de publicar: `pnpm build` sin errores y revisar móvil (375px) y escritorio (1440px), español e inglés.
- Commits y PRs sin ningún tipo de firmado: sin `Co-Authored-By`, sin atribución y sin firma GPG.

## Pendientes

Ver `TODO.md`.

## Nota de entorno

La carpeta está en `Documents`, sincronizada con iCloud. Si iCloud "optimiza el almacenamiento", los archivos quedan solo en la nube y las herramientas no pueden leerlos ("Resource deadlock avoided"). Marca la carpeta como "Mantener descargado" en Finder.
