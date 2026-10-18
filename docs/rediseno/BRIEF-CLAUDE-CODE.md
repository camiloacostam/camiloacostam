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
9. **Cierre "Trabajemos juntos"** (fondo `mar`, con una curva crema arriba): avatar + título grande, botón circular magnético de 200 px sobre una línea, el **formulario de contacto por pasos** (ver la sección siguiente, que reemplaza los chips sueltos "¿Qué necesitas?"), los enlaces de email y WhatsApp, y un footer con la versión, la **hora local de Cartagena en vivo** y las redes.

## Cierre: formulario de contacto por pasos (IMPORTANTE)

**Problema actual:** en el cierre quedaron unos chips "¿Qué necesitas?" (Landing / Sitio completo / Rediseño) que no envían nada; solo cambian el texto prellenado de los enlaces de email y WhatsApp. Para el usuario parecen botones sin función. **Elimínalos como elemento suelto** y reemplázalos por este flujo, que alimenta a Calendly en vez de competir con él.

### Ubicación y aspecto

- Una tarjeta de vidrio (`.glass`, radio 28 px, padding 32 px; en móvil 20 px) en el cierre, debajo de la línea del botón circular y a la izquierda en escritorio (máx. 560 px de ancho). El botón circular sigue abriendo Calendly directo, para quien no quiere llenar nada.
- Arriba de la tarjeta: "Paso 1 de 3" (12 px, mayúsculas, `ink-muted-dark`) y una barra de progreso de 2 px (degradado de mediterráneo a aqua) que avanza al 33 / 66 / 100 %.
- Transición entre pasos: fade + 12 px de desplazamiento horizontal, 300 ms. Botón "← Atrás" como enlace de texto a partir del paso 2.

### Pasos

| Paso | Pregunta | Campo | Opciones / tipo | Obligatorio |
| --- | --- | --- | --- | --- |
| 1 | ¿Qué necesitas? | `need` | Chips de selección única: `Landing page`, `Sitio completo`, `Rediseño`, `Aún no lo sé`. Al tocar un chip avanza solo al paso 2. | Sí |
| 2 | ¿A qué te dedicas? | `niche` | Chips: `Psicología`, `Coaching`, `Wedding planner`, `Salud / bienestar`, `Otro` (si elige "Otro", aparece un input de texto de una línea). | Sí |
| 2 | ¿Para cuándo la necesitas? | `timeline` | Chips debajo del nicho: `Lo antes posible`, `Este mes`, `En 1–3 meses`, `Solo estoy explorando`. Botón "Continuar". **No se pregunta presupuesto en el formulario**: se habla en la llamada de descubrimiento, y los precios "desde" de la sección Paquetes ya sirven de referencia. | Sí |
| 3 | Tus datos | `name`, `email`, `phone`, `message` | Inputs con `<label>` visible: Nombre, Email, WhatsApp (opcional, con prefijo +57) y "¿Algo más que deba saber?" (textarea opcional, 3 filas). Mantener el honeypot `website` oculto. Botón aqua "Enviar y elegir horario". | Nombre y email |

Los chips son `<button type="button" aria-pressed>` dentro de un `role="group"` con `aria-labelledby`. Todo el flujo funciona con teclado.

### Al enviar

1. Estado de carga en el botón ("Enviando…"), deshabilitado.
2. `POST /api/contact` en JSON con `{ need, niche, nicheOther, timeline, name, email, phone, message, website }`.
3. **Éxito:** la tarjeta cambia a un estado de confirmación con un check aqua animado: "¡Listo, {nombre}! Ahora elige tu horario." y el botón "Elegir horario en Calendly". Ese botón abre el popup de Calendly **prellenado**: `https://calendly.com/hello-camiloacosta/30min?name={name}&email={email}&a1={need} · {niche}` (URL-encoded; `a1` es la primera pregunta personalizada del evento en Calendly). Abrirlo automáticamente 600 ms después del éxito, y dejar el botón por si el usuario lo cierra.
4. Debajo de la confirmación, un enlace secundario: "¿Prefieres WhatsApp? Escríbeme" con el texto prellenado: `Hola Camilo, soy {name}. Me interesa {need} para mi marca de {niche}.`
5. **Error:** mensaje en la tarjeta, "No se pudo enviar. Intenta de nuevo o escríbeme por WhatsApp.", con los datos conservados.

### Backend (`functions/api/contact.ts`)

- Ampliar `ContactData` con `need`, `niche`, `nicheOther`, `timeline` y `phone`. Validar `need`, `niche` y `timeline` contra las listas permitidas, `phone` con máximo 20 caracteres (solo dígitos, espacios, + y -), y `message` deja de ser obligatorio.
- Asunto del correo: `Nuevo lead: {need} · {niche} · {timeline} — {name}`. Cuerpo en una tabla con todos los campos y un enlace directo a WhatsApp si dejó su número.
- Mantener el escape de HTML, el honeypot, el `replyTo` y la respuesta 405 actuales.
- Opcional, a futuro: enviar el lead también a Fidelius (CRM) si expone un webhook; dejar una función `sendToCrm()` vacía con un TODO.

### Analítica

Eventos `data-track`: `form_step` (con el número del paso), `form_submit`, `form_success`, `calendly_open` (con `place: "form"`) y `whatsapp` (con `place: "form"`).

### Los otros botones del cierre

- Botón circular "Agenda tu llamada": abre Calendly directo (`data-calendly`), sin prellenar.
- Píldora de email: `mailto:hola@camiloacosta.dev?subject=Quiero%20una%20web%20para%20mi%20marca`.
- Píldora de WhatsApp: `https://wa.me/573007458843?text=Hola%20Camilo%2C%20quiero%20una%20web%20para%20mi%20marca`.
- Ningún enlace del sitio debe quedar con `href="#"`. Los "Ver caso →" sin página de caso todavía deben ocultarse o apuntar a `/proyectos`.

## Valores a definir (reemplazar los `[N]` y demás corchetes)

Todos viven en `src/data/home.ts` (y su versión en inglés). Los valores de la columna "Ejemplo" son **solo una guía** de formato: Camilo debe confirmar los reales antes de publicar. Una cifra que no se pueda respaldar se quita, no se inventa.

| Clave / dónde aparece | Qué es | Formato | Ejemplo |
| --- | --- | --- | --- |
| `stats.projects` (hero, bento, barra del hero) | Webs entregadas | número + "+" | `15+` |
| `stats.years` (bento, presentación, "Hola, soy Camilo") | Años de experiencia | número + "+" | `5+` |
| `stats.slots` (píldora "Disponible", celda de disponibilidad) | Cupos libres este mes | número entero | `3` → se lee "3 cupos este mes" |
| Paquete Landing `price` | Precio desde (**definido**) | "desde USD X" | `desde USD 200` |
| Paquete Sitio profesional `price` | Precio desde (**definido**) | "desde USD X" | `desde USD 500` |
| Paquete Sitio profesional `note` | Páginas incluidas | "Hasta N páginas" | `Hasta 5 páginas y SEO básico →` |
| Paquete Acompañamiento `price` | Mensualidad (**definido**) | "USD X /mes" | `USD 25 /mes` |
| FAQ "¿Cuánto cuesta…?" | Mismo precio de la landing (**definido**) | "desde USD X" | `desde USD 200` |
| FAQ "¿Incluye dominio y hosting?" | Qué incluye | una frase | `Sí: el primer año de dominio y hosting va incluido; desde el segundo año cuestan USD X al año.` |

**Precios definidos por Camilo:** Landing desde USD 200 · Sitio profesional desde USD 500 · Acompañamiento USD 25/mes. Úsalos tal cual en ES y EN (en inglés: `from USD 200`, `from USD 500`, `USD 25 /month`).

**Moneda:** todos los precios del sitio van en **USD**, en ES y EN. Mostrar debajo de la sección Paquetes una nota pequeña en `ink-muted`: "Precios en dólares (USD). Para clientes en Colombia se puede facturar en pesos a la TRM del día."
| Caso Nathalia `desc` (resultado) | Resultado medible | "N + métrica + periodo" | `12 consultas agendadas en el primer mes` |
| Caso Maura `desc` (resultado) | Resultado medible | "N + métrica + periodo" | `8 solicitudes de cotización al mes` |
| Bento, celda de caso real `eyebrow` | Nicho del caso | texto | `Caso real · Psicología` |
| Testimonio `quote`, `name`, `role` | Cita real del cliente | 1–2 frases + nombre + profesión | `“Ahora mis pacientes agendan solos desde Instagram.” — Nathalia Acosta, Psicóloga` |
| Mockup del móvil del hero `review` | Reseña de ejemplo dentro del mockup | frase corta | `“Me sentí escuchada desde la primera sesión.”` (es un ejemplo ilustrativo dentro del mockup, no un testimonio real) |
| Franja `[Próximo caso]` | Tercer proyecto | nombre + nicho + resultado | Si aún no existe, **eliminar la franja** y dejar solo los 2 casos reales + la franja CTA. |
| Garantía (si se muestra) | Promesa concreta | una frase | `Cambios ilimitados durante la etapa de diseño.` |
| `links.instagram` | URL de Instagram | URL completa | `https://instagram.com/camiloacosta.dev` (vacío = no se muestra) |
| `readyFallback` | Fecha si falla el cálculo | texto | `en 7 días` |

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
5. Implementa el formulario por pasos del cierre y amplía `functions/api/contact.ts` según la sección "Cierre: formulario de contacto por pasos". Elimina los chips sueltos.
6. Agrega analítica de eventos: clic en Agendar, clic en WhatsApp, pasos y envío del formulario.
7. Revisa que ningún enlace quede en `href="#"` y deja los valores pendientes listos para reemplazar según la tabla "Valores a definir".
8. Verifica Lighthouse, la navegación con teclado y `prefers-reduced-motion`, y muestra capturas de escritorio y móvil antes de hacer merge.
