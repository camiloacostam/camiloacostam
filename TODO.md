# TODO — camiloacosta.dev

Pendientes del sitio. Prioridad: 🔴 bloquea el lanzamiento · 🟠 importante · 🟡 pulido.
Contexto general del proyecto en `CLAUDE.md`. Última actualización: 18 de octubre de 2026.

> **Rediseño implementado** en la rama `redesign/funnel` (brief en `docs/rediseno/BRIEF-CLAUDE-CODE.md`), pendiente de revisión y merge.
> El nuevo home resuelve varios puntos de esta lista (marcados con 🎨). Se cierran cuando el rediseño llegue a `main`.
> Lighthouse móvil en local: 99–100 performance, 100 accesibilidad, buenas prácticas y SEO.

---

## Necesito de Camilo (bloquea contenido)

- [ ] **Cifras reales**: proyectos entregados, años de experiencia, clientes, países y cupos por mes. Hoy son `[N]` en `src/data/home.ts`.
- [ ] **Prometálica y Atelier**: tipo, sector, qué se hizo, URL en vivo, resultado con métricas, capturas desktop + móvil y testimonio.
- [ ] **Paquetes**: confirmar nombres y precios del nuevo home (Landing / Sitio profesional / Acompañamiento mensual) frente a los de `CLAUDE.md` (Esencial $1.200.000 · Profesional $2.200.000 · Premium $3.500.000).
- [ ] **FAQ**: qué incluye dominio, hosting y correo.
- [ ] **Testimonio** con nombre, profesión y foto.
- [ ] **URL de Instagram**.
- [x] Formulario en el home: decidido en el brief (formulario por pasos en el cierre que alimenta a Calendly).
- [ ] Confirmar las opciones de nicho del formulario: el brief pide `Wedding planner`; se puso `Odontología` siguiendo `CLAUDE.md` (se cambia en `src/data/lead.ts`).
- [ ] Confirmar los valores de la tabla "Valores a definir" del brief (cifras, precios, dominio/hosting, resultados de Prometálica y Atelier, testimonio).
- [ ] Decidir el blog: publicar 2 o 3 artículos o quitarlo del menú hasta tener contenido.
- [ ] Decidir el inglés: completar o quitar temporalmente.

## Configuración fuera del código

- [ ] Finder → **Mantener descargado** en la carpeta del proyecto (si no, iCloud saca `node_modules` y el build se cuelga).
- [ ] Verificar `camiloacosta.dev` en Resend y configurar `RESEND_FROM` en Cloudflare Pages (con `onboarding@resend.dev` solo llega al dueño de la cuenta).
- [ ] Probar el formulario de punta a punta en producción.
- [ ] Calendly: renombrar "30 Minute Meeting" a "Llamada de diagnóstico gratuita (30 min)".
- [ ] Calendly: crear como **primera pregunta personalizada** del evento algo como "¿Qué necesitas y a qué te dedicas?". El formulario la prellena con el parámetro `a1`; si no existe, Calendly ignora el dato.
- [ ] Google Search Console: registrar el sitio y enviar `sitemap-index.xml`.
- [ ] Perfil de Empresa en Google (SEO local Cartagena).
- [ ] Verificar que `@camiloacostam` exista en X/Twitter; si no, quitar `twitter:creator` y el `sameAs`.

---

## 🔴 Bloqueantes

### Portafolio
- [ ] Quitar Nathalia Acosta y Maura Tatis de `src/data/projects.ts` (siguen en `/proyectos/`; el nuevo home ya no las usa 🎨).
- [ ] Agregar Prometálica y Atelier a `src/data/projects.ts`, con textos en es y en.
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
- [ ] Actualizar `meta description`, `og:description` y JSON-LD con el nicho (psicólogos y dentistas, Cartagena). Hoy aún mencionan wedding planners.
- [ ] Corregir el LinkedIn del JSON-LD (`/in/camiloacostam` → `/in/camilo-acosta-m/`).

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
- [ ] Elegir herramienta (Plausible, Umami o GA4) y conectar los eventos `data-track` del rediseño: clic en Agendar, Calendly agendado, clic en WhatsApp/email, envío del formulario.

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
- [x] Calendly cargado con el primer clic; botones `type="button"`.
- [x] Barra final en enlaces internos; `/en/` enlaza a páginas en inglés; `lang="en"`, H1 y `<title>` en `/en/proyectos/` y `/en/blog/`.
- [x] Limpieza: `package-lock.json`, restos del starter y `favicon 2.png`.

## Proyectos del portafolio

| Proyecto | Tipo | Estado en el sitio | Pendiente |
|---|---|---|---|
| Prometálica | _por completar_ | Placeholder en el nuevo home | Datos, capturas, caso y testimonio |
| Atelier | _por completar_ | Placeholder en el nuevo home | Datos, capturas, caso y testimonio |
| ~~Nathalia Acosta~~ | — | Aún en `/proyectos/` | **Quitar** |
| ~~Maura Tatis~~ | — | Aún en `/proyectos/` | **Quitar** |
