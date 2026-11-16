# TODO — camiloacosta.dev

Pendientes del sitio. Prioridad: 🔴 bloquea el lanzamiento · 🟠 importante · 🟡 pulido.
Contexto general del proyecto en `CLAUDE.md`. Última actualización: 22 de octubre de 2026.

> **Rediseño implementado en todo el sitio con Tailwind v4** en la rama `redesign/funnel` (home, proyectos, blog, 404). Pendiente: revisión visual a 375 px y 1440 px, push y merge.
> Brief: `docs/rediseno/BRIEF-CLAUDE-CODE.md` · Implementación: `docs/rediseno/IMPLEMENTACION.md`.
> El nuevo home resuelve varios puntos de esta lista (marcados con 🎨). Se cierran cuando el rediseño llegue a `main`.
> Lighthouse móvil en local: 99–100 performance, 100 accesibilidad, buenas prácticas y SEO.

---

## Necesito de Camilo (bloquea contenido)

- [ ] **Cifras reales**: proyectos entregados, años de experiencia, clientes, países y cupos por mes. Hoy son `[N]` en `src/data/home.ts`.
- [ ] **Prometálica y Atelier**: tipo, sector, qué se hizo, URL en vivo, resultado con métricas, capturas desktop + móvil y testimonio.
- [x] **Precios** definidos en USD: Landing desde USD 200 · Sitio profesional desde USD 500 · Acompañamiento USD 25/mes.
- [ ] **Sitio profesional**: cuántas páginas incluye. Entrega definida: 2 a 3 semanas.
- [ ] **FAQ**: qué incluye dominio, hosting y correo.
- [ ] **Testimonio** con nombre, profesión y foto.
- [x] **URL de Instagram** y X agregadas.
- [x] Formulario en el home: decidido en el brief (formulario por pasos en el cierre que alimenta a Cal.com).
- [ ] Confirmar las opciones de nicho del formulario: el brief pide `Wedding planner`; se puso `Odontología` siguiendo `CLAUDE.md` (se cambia en `src/data/lead.ts`).
- [ ] Confirmar los valores de la tabla "Valores a definir" del brief (cifras, precios, dominio/hosting, resultados de Prometálica y Atelier, testimonio).
- [x] Blog oculto del menú (y con `noindex`) hasta publicar 2 o 3 artículos.
- [ ] Decidir el inglés: completar o quitar temporalmente.

## Configuración fuera del código

- [ ] Finder → **Mantener descargado** en la carpeta del proyecto (si no, iCloud saca `node_modules` y el build se cuelga).
- [ ] Verificar `camiloacosta.dev` en Resend y configurar `RESEND_FROM` en Cloudflare Pages (con `onboarding@resend.dev` solo llega al dueño de la cuenta).
- [ ] Probar el formulario de punta a punta en producción.
- [x] Agendamiento migrado de Calendly a Cal.com (`camiloacostam/cafecito-para-conocernos`).
- [ ] Cal.com: revisar que el evento muestre el campo **notas** (el formulario lo prellena con `notes` = necesidad · nicho).
- [ ] Google Search Console: registrar el sitio y enviar `sitemap-index.xml`.
- [ ] Perfil de Empresa en Google (SEO local Cartagena).
- [ ] Verificar que `@camiloacostam` exista en X/Twitter; si no, quitar `twitter:creator` y el `sameAs`.

---

## 🔴 Bloqueantes

### Portafolio
- [x] Quitar Nathalia Acosta y Maura Tatis de `src/data/projects.ts`.
- [x] Agregar Prometálica y Atelier a `src/data/projects.ts`, con textos en es y en (datos reales aún en `[corchetes]`).
- [ ] Capturas reales en lugar de los placeholders.
- [ ] Páginas de caso de estudio `/proyectos/[slug]/`: cliente, problema, estrategia, solución, automatizaciones, resultado con métricas, testimonio.
- [ ] Revisar los filtros de `/proyectos/` según las categorías reales.
- [ ] Mientras no haya proyectos de salud: 1–2 casos de demostración (psicólogo, dentista) marcados como concepto.

### Blog
- [ ] Publicar o esconder (ver decisión arriba). Ideas: "Cómo conseguir pacientes desde Instagram sin depender del algoritmo", "Qué debe tener la web de un psicólogo", "Agenda en línea para consultorios odontológicos".

### Copy y credibilidad
- [ ] 🎨 Hero con el diferenciador y beneficio concreto.
- [ ] 🎨 Servicios en términos de resultados.
- [ ] 🎨 Cifras honestas (pendiente de los datos reales).
- [x] `meta description` y JSON-LD actualizados para profesionales independientes.
- [x] LinkedIn del JSON-LD corregido.

### Versión en inglés
- [ ] Traducir descripciones y etiquetas de proyectos, fechas con locale `en`, filtros y estados vacíos de `/en/proyectos/`.
- [ ] Traducir las fechas del blog en `/en/blog/` (hoy usan `es-CO`).
- [ ] `meta keywords` en inglés repite las de español (o quitarlas, ver SEO).

---

## 🟠 Importante

### Formulario de contacto
- [ ] Turnstile si el honeypot no alcanza.
- [ ] Opcional: enviar el lead a Fidelius además del correo (`sendToCrm()` vacío en `functions/api/contact.ts`).

### Legal
- [ ] Política de privacidad / tratamiento de datos (Ley 1581 de 2012) en es y en.
- [ ] Casilla de aceptación con enlace a la política junto al formulario.
- [ ] Enlace a la política en el footer.

### Medición
- [ ] Umami: crear la cuenta y poner `PUBLIC_UMAMI_WEBSITE_ID` en Cloudflare Pages (el sitio ya está preparado; los eventos `data-track` ya se envían).

### Secciones que faltan para vender
- [ ] 🎨 Proceso de trabajo.
- [ ] 🎨 Paquetes.
- [ ] 🎨 Preguntas frecuentes.
- [ ] Testimonios con foto (hay un espacio en el bento 🎨, falta el contenido).
- [ ] CTA a la auditoría gratuita (oferta de entrada); el diseño nuevo no lo tiene.

---

## 🟡 Pulido

### SEO técnico
- [ ] Quitar `meta keywords`.
- [ ] Ampliar JSON-LD con `ProfessionalService` (`areaServed`, `priceRange`, servicios).
- [ ] Alternates hreflang en el sitemap (`@astrojs/sitemap` con `i18n`).
- [ ] `og:image` por proyecto y por artículo.
- [ ] `Layout.astro` pide `/favicon.svg`, que no existe: crearlo o quitar la etiqueta.

### HTML y accesibilidad
- [ ] 🎨 Quitar duplicados del DOM (bento + lista, "Disponible para proyectos" ×5).
- [ ] Revisar contraste y foco visible en `/proyectos/` y `/blog/` (el rediseño trae su propio anillo de foco 🎨).

### WhatsApp
- [ ] Mensaje prellenado en todos los enlaces (el rediseño lo hace en el cierre 🎨).
- [ ] 🎨 Botón de WhatsApp fijo en móvil (barra inferior).

### Rendimiento
- [ ] Autoalojar las fuentes en vez de Google Fonts.
- [x] Fuente de la firma: **Dancing Script** (decidido en el rediseño).

### Coherencia visual
- [ ] Llevar `/proyectos/`, `/blog/` y la 404 al sistema visual del rediseño (crema / mar, Inter Tight).
- [ ] El Header clásico enlaza a `/#sobre-mi`, que ya no existe en el home nuevo (cae al inicio).
- [ ] Reemplazar los placeholders de capturas del home (bento y casos) por imágenes reales con `astro:assets`.
- [ ] Borrar los componentes viejos de `src/components/sections/` cuando se decida qué pasa con el formulario.

---

## Hecho

- [x] Endpoint del formulario: escape de HTML, validación, `replyTo`, errores de Resend, honeypot, 405 en métodos distintos de POST, `method="post"` sin JS (`a0cb65c`).
- [x] Página 404 en es y en, fuera del sitemap.
- [x] Agendamiento (Cal.com) cargado con el primer clic; botones `type="button"`.
- [x] Barra final en enlaces internos; `/en/` enlaza a páginas en inglés; `lang="en"`, H1 y `<title>` en `/en/proyectos/` y `/en/blog/`.
- [x] Limpieza: `package-lock.json`, restos del starter y `favicon 2.png`.

## Proyectos del portafolio

| Proyecto | Tipo | Estado en el sitio | Pendiente |
|---|---|---|---|
| Prometálica | _por completar_ | Placeholder en el nuevo home | Datos, capturas, caso y testimonio |
| Atelier | _por completar_ | Placeholder en el nuevo home | Datos, capturas, caso y testimonio |
| ~~Nathalia Acosta~~ | — | Aún en `/proyectos/` | **Quitar** |
| ~~Maura Tatis~~ | — | Aún en `/proyectos/` | **Quitar** |
