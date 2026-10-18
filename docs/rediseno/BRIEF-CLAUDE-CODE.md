# Rediseño de camiloacosta.dev — brief para Claude Code

Implementa el rediseño del home de camiloacosta.dev en el proyecto actual (Astro + Tailwind). El objetivo es convertir el sitio en un **funnel de ventas para marcas personales y profesionales independientes** (psicólogos, coaches, wedding planners, consultores) con una sola conversión principal: **agendar una llamada gratis de 30 minutos** (Calendly), y WhatsApp como canal secundario.

## Archivos de este paquete

| Archivo | Qué es |
| --- | --- |
| `referencia/desktop.dc.html` | Diseño aprobado de escritorio (responsive). Es la **fuente de verdad** visual: textos, colores, tamaños, espaciados y efectos. |
| `referencia/mobile.dc.html` | Diseño aprobado para móvil (390 px). Define los cambios específicos de móvil. |
| `referencia/tokens.json` | Tokens de color, espaciado, radios y sombras. Ignora la familia `display` (Bricolage): el diseño final usa **Inter Tight** para todo y **Dancing Script** solo para la firma y acentos. |
| `assets/camilo-cutout.webp` | Foto de Camilo sin fondo (hero). |
| `assets/camilo.webp` | Foto original (avatares circulares). |

Los `.dc.html` usan un formato de plantilla (`<x-dc>`, `{{hole}}`, `<sc-for>`, `<sc-if>`, y una clase `Component` con `renderVals()`). **No copies ese formato**: léelo como referencia y reconstrúyelo como componentes Astro, con islas solo donde haga falta interactividad.

## Reglas generales

- Mantén el stack actual (Astro + Tailwind). No agregues frameworks pesados; para animaciones usa CSS (`animation-timeline: view()`) con un fallback con IntersectionObserver, y JS vanilla o una isla mínima donde haga falta.
- Componentiza: un componente por sección en `src/components/home/`.
- Pasa los colores a la config de Tailwind (o a variables CSS) con estos nombres: `mar` #0A2342, `mar-raised` #10305A, `mar-line` #224A7A, `crema` #F7F1E8, `crema-raised` #FFFBF5, `line` #DCE2E3, `ink-muted` #4A5868, `ink-muted-dark` #A9C0DA, `aqua` #2DD4BF, `aqua-light` #5EEAD4, `mediterraneo` #1D5FAE, `cielo` #9FD3F2, `cielo-soft` #E1F1FB, `disponible` #7FDB9A.
- Fuentes de Google Fonts: Inter Tight (300, 400, 500, 600) y Dancing Script (700), con `display=swap` y preconnect.
- Todo lo que está entre `[corchetes]` es contenido pendiente: déjalo como placeholder visible o en un archivo de contenido fácil de editar (`src/data/home.ts`).
- Respeta `prefers-reduced-motion` en **todas** las animaciones.
- Accesibilidad: `<button>` y `<a>` reales, `aria-label` en botones de solo ícono, foco visible, contraste mínimo de 4.5:1.
- Objetivo de rendimiento: Lighthouse móvil ≥ 95. Imágenes con `astro:assets` (AVIF/WebP), Calendly cargado de forma diferida.
- Actualiza también `/en` con la misma estructura (traduce los textos).

## Secciones (en orden)

1. **Menú flotante liquid glass**: píldora fija arriba (max 1120 px) con `backdrop-filter: blur(22px) saturate(180%)`, borde y brillo interior. Logo "CA" en círculo + "Camilo Acosta", enlaces, EN y el CTA "Agenda una llamada" (azul Mediterráneo, con un relleno aguamarina desde abajo al hacer hover).
   - **Cambio de color según el fondo**: cada sección lleva `data-nav="dark|light"`; con JS se detecta qué sección está bajo el menú (a ~48 px del top) y se aplica `.on-dark` o `.on-light`. Sobre claro, el vidrio se vuelve blanco esmerilado y el texto azul profundo.
   - **CTA dinámico**: el texto del botón cambia según la sección (trabajo → "Quiero una web así", proceso → "Empezar en 7 días", paquetes → "Elegir mi paquete", resto → "Agenda una llamada"), con un fade y un brillo aguamarina en cada cambio.
   - **Barra de progreso**: línea de 2 px en el borde inferior de la píldora (degradado de mediterráneo a aqua) que se llena con el scroll; al 100 % el CTA hace un destello.
   - En móvil: solo logo + botón de menú, que abre un **menú a pantalla completa** de vidrio azul con los enlaces grandes y el CTA.
2. **Hero** (fondo `mar`): a la izquierda, píldora "Disponible · [N] cupos este mes", el H1 "Tu talento ya tiene seguidores. Hagamos que te *elijan.*" ("elijan." en Dancing Script aqua), un subtítulo, el CTA principal (píldora crema con un círculo azul con flecha), el enlace "Ver trabajos" con una flecha dibujada a mano y "Hola, soy Camilo" con avatar.
   - A la derecha: la foto **sin fondo** con un halo radial celeste y dos anillos finos detrás; un **móvil flotante** (mockup construido en HTML/CSS con la web de una psicóloga de ejemplo) abajo a la izquierda; **3 tarjetas de vidrio** repartidas alrededor (01 Mensaje claro, 02 Agenda integrada, 03 WhatsApp a un toque) que aparecen escalonadas.
   - Manchas de luz azul y aqua desenfocadas que flotan lentamente. Barra inferior: "[ Cartagena, CO — GMT−5 ]", "Desliza para explorar" con una línea animada y "[ 15+ webs entregadas ]".
3. **Presentación** (crema): un párrafo grande con "clientes agendados" en azul, 3 dolores numerados y un **botón circular magnético** (180 px, sigue el cursor) "Agenda tu llamada gratis".
4. **Bento "Lo que recibes"**: grid de 4 columnas con 7 celdas (caso real con mockups, 7 días, testimonio en cielo, 15+, todo en uno, disponibilidad y una celda CTA azul). **Spotlight**: un `radial-gradient` aqua que sigue el cursor por el fondo del grid y se ve en los espacios entre celdas.
5. **Casos reales**: mezcla de acordeón y galería horizontal (sin fijar el scroll de la página). Franjas altas en una cinta horizontal con scroll propio y snap; la activa se expande (`flex-basis` animado) y muestra la captura, el nicho, el título, el resultado y "Ver caso →"; las demás muestran el número y el nombre en vertical. Flechas ← → con contador "01 / 04" y barra de progreso. Sobre la franja abierta, el cursor se convierte en un **círculo de vidrio "Ver caso"** que lo sigue. La última franja es un CTA aqua: "¿El próximo eres tú?" / "Tu marca podría estar aquí". Debajo, la barra CTA "¿Quieres una web así para tu marca?". En móvil, la primera vez que tocas una franja se abre y la segunda entra al caso.
6. **Proceso** (fondo `mar`, se escala al entrar): 4 pasos (Día 1 / 2–3 / 4–6 / 7). Al final: "Si empezamos hoy, tu web estaría lista el {fecha de hoy + 7 días}" con el botón aqua "Empezar ahora". En móvil va como línea de tiempo vertical.
7. **Paquetes**: 3 tarjetas (Landing, Sitio profesional destacado en azul, Acompañamiento) que se invierten a azul profundo al hacer hover. En móvil, carrusel con snap y puntos indicadores.
8. **Preguntas frecuentes**: acordeón en 2 columnas, con la tarjeta "¿Te quedó otra duda?" y el botón de WhatsApp debajo del título.
9. **Cierre "Trabajemos juntos"** (fondo `mar`, con una curva crema arriba): avatar + título grande, botón circular magnético de 200 px sobre una línea, chips "¿Qué necesitas?" (Landing / Sitio completo / Rediseño), botones de email y WhatsApp, y un footer con la versión, la **hora local de Cartagena en vivo** y las redes.

## Efectos globales

- Bloques con fade-up de 40 px al entrar en pantalla (`animation-timeline: view()`).
- **Botones que respiran**: los CTAs principales hacen un latido (escala 1.03 + anillo aqua) al entrar en pantalla.
- Botones circulares magnéticos (translate del 35 % del offset del cursor, vuelven con easing).
- Botones con relleno aqua desde abajo al hacer hover (`::before`).
- **Móvil**: barra fija inferior de vidrio con "Agenda tu llamada gratis" (con el mismo texto dinámico) y WhatsApp; se oculta al llegar al cierre.

## Pasos sugeridos

1. Revisa la estructura actual del proyecto y crea una rama `redesign/funnel`.
2. Configura los tokens y las fuentes.
3. Construye las secciones en orden, comparando con `referencia/desktop.dc.html`.
4. Ajusta el móvil según `referencia/mobile.dc.html`.
5. Agrega analítica de eventos: clic en Agendar, clic en WhatsApp y envío del formulario.
6. Verifica Lighthouse, la navegación con teclado y `prefers-reduced-motion`, y muestra capturas de escritorio y móvil antes de hacer merge.
