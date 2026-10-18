# camiloacosta.dev — Contexto del proyecto

Sitio personal y portafolio de **Camilo Acosta**, diseñador web estratégico y desarrollador frontend en Cartagena, Colombia.
Es la vitrina principal para conseguir clientes: cada decisión de diseño, copy y código debe ayudar a que un visitante agende una llamada.

## Negocio y posicionamiento

- **Marca:** Camilo Acosta (marca personal; Domi's Web Services ya no existe y no debe aparecer en ningún lado).
- **Qué vende:** sitios y landing pages estratégicas que convierten, automatizan y hacen crecer marcas personales: diseño + estrategia de marketing + automatización con IA + código limpio.
- **Diferenciador:** "No diseño webs bonitas. Diseño sistemas digitales que trabajan por ti, con estrategia de marketing, automatización con IA y código limpio."
- **Nicho:**
  - **Principal: psicólogos** con consulta privada. Es la mayoría de los leads actuales en Fidelius.
  - **Segundo nicho: dentistas** / consultorios odontológicos.
  - **Paraguas:** profesionales de la salud con consulta privada y, en general, marcas personales y profesionales independientes.
- **Cómo hablarles:** en términos de resultados (más pacientes, citas agendadas sin perseguir mensajes, confianza desde el primer scroll), no de tecnologías. Wedding planners ya no son nicho objetivo.
- **Paquetes de referencia (COP):** Esencial $1.200.000 · Profesional $2.200.000 · Premium $3.500.000. Pago 50% anticipo / 50% contra entrega.
- **Oferta de entrada:** auditoría de presencia digital gratuita (video Loom de 5 min).
- **Embudo:** web / Instagram / DM → Calendly → llamada de descubrimiento → propuesta → cierre. Los leads se gestionan en **Fidelius** (CRM propio).

## Portafolio

- Proyectos a mostrar: **Prometálica** y **Atelier**.
- **Nathalia Acosta** y **Maura Tatis** no se completaron y **no deben aparecer** en el sitio.

## Stack

- **Astro v6.1.3**, desplegado en **Cloudflare** (Pages + Functions; ver `wrangler.toml`).
- Gestor de paquetes: **pnpm** (ojo: también hay un `package-lock.json`, ver TODO).
- **i18n** propio: `src/i18n/es.ts`, `src/i18n/en.ts`, `src/i18n/utils.ts`. Español es el idioma por defecto (`/`); inglés vive en `/en/`.
- **Blog:** content collections (`src/content.config.ts`), páginas `src/pages/blog/[slug].astro` y `src/pages/en/blog/[slug].astro`, RSS en `src/pages/rss.xml.ts`.
- **Proyectos:** datos en `src/data/projects.ts`, listados en `src/pages/proyectos/` y `src/pages/en/proyectos/`.
- **Formulario de contacto:** `src/components/sections/Contact.astro` hace `fetch('/api/contact')` (POST JSON `{name, email, message}`), resuelto por la Cloudflare Function `functions/api/contact.ts`. Variables en `.env` (ver `.env.example`).
- **Agendamiento:** Calendly en popup — `https://calendly.com/hello-camiloacosta/30min`.
- **Analítica:** solo Cloudflare Web Analytics (beacon), sin eventos de conversión.
- **CI:** `.github/workflows/update-readme.yml` + `.github/scripts/update-readme.ts`.

## Estructura

```
src/
  layouts/Layout.astro          # <head>: SEO, OG, hreflang, JSON-LD, fuentes, Calendly (variant="funnel" para el home)
  components/home/              # home rediseñado: Nav, Hero, Statement, Bento, Cases, Process, Plans, Faq, Closing, MobileBar
  components/layout/            # Header.astro, Footer.astro (páginas clásicas: /proyectos/, /blog/, 404)
  components/sections/          # secciones del home anterior (Contact aún tiene el formulario)
  pages/                        # es en raíz, en bajo /en/
  i18n/                         # textos y helpers de traducción
  data/home.ts                  # textos del home (es/en); [corchetes] = contenido pendiente
  data/projects.ts              # portafolio
  styles/home.css               # tokens y utilidades del rediseño
  scripts/home.ts               # interacciones del home (JS vanilla)
functions/api/contact.ts        # endpoint del formulario
public/                         # og-image.jpg, favicons, robots.txt, images/
```

Anclas de la home (en español también en /en/): `#inicio`, `#servicios`, `#proyectos`, `#proceso`, `#paquetes`, `#preguntas`, `#contacto`.

## Identidad visual

- Rediseño (home): secciones alternas crema `#F7F1E8` y mar `#0A2342`, acento aqua `#2DD4BF`, azul Mediterráneo `#1D5FAE`. Tokens en `src/styles/home.css`; brief y referencias en `docs/rediseno/`.
- Tipografía: Inter Tight en el home; Dancing Script solo para la firma y acentos. Las páginas clásicas aún usan Inter y el azul `#2563EB` con toggle claro/oscuro.
- Todos los CTA de agendar usan `data-calendly` (abre el popup) y `data-track` (eventos de analítica).

## Contacto público

- WhatsApp: https://wa.me/573007458843
- LinkedIn: https://www.linkedin.com/in/camilo-acosta-m/
- GitHub: https://github.com/camiloacostam

## Convenciones

- Todo texto visible sale de `src/i18n/*`. Nunca hardcodear español en componentes compartidos con `/en/`.
- Los enlaces internos deben usar barra final (`/proyectos/`) para coincidir con las canonical y evitar redirecciones.
- Las cifras de prueba social (proyectos, clientes, países, años) deben ser reales y respaldables.
- Antes de publicar: `pnpm build` sin errores y revisar móvil (375px), español e inglés.

## Pendientes

Ver `TODO.md`.

## Nota de entorno

La carpeta está en `Documents`, sincronizada con iCloud. Si iCloud "optimiza el almacenamiento", los archivos quedan solo en la nube y las herramientas no pueden leerlos ("Resource deadlock avoided"). Marca la carpeta como "Mantener descargado" en Finder.
