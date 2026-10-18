import { Resend } from 'resend';
import { NEEDS, NICHES, TIMELINES } from '../../src/data/lead';

interface Env {
  RESEND_API_KEY: string;
  RESEND_TO: string;
  RESEND_FROM?: string;
}

interface ContactData {
  need: string;
  niche: string;
  nicheOther: string;
  timeline: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  website: string; // honeypot: los humanos no lo ven, los bots lo llenan
}

const LIMITS = { name: 100, email: 254, phone: 20, nicheOther: 80, message: 5000 };
const EMAIL_RE = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/;
const PHONE_RE = /^[\d\s+-]*$/;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const has = <T extends object>(obj: T, key: string): key is Extract<keyof T, string> =>
  Object.prototype.hasOwnProperty.call(obj, key);

// Acepta JSON (envío con JS) y formulario clásico (sin JS)
async function readData(request: Request): Promise<ContactData> {
  const type = request.headers.get('Content-Type') ?? '';
  let raw: Record<string, unknown>;

  if (type.includes('application/json')) {
    raw = await request.json();
  } else {
    raw = Object.fromEntries(await request.formData());
  }

  const field = (key: string) => (typeof raw[key] === 'string' ? (raw[key] as string).trim() : '');
  return {
    need: field('need'),
    niche: field('niche'),
    nicheOther: field('nicheOther'),
    timeline: field('timeline'),
    name: field('name'),
    email: field('email'),
    phone: field('phone'),
    message: field('message'),
    website: field('website'),
  };
}

// Número para wa.me: solo dígitos; si parece un celular colombiano sin indicativo, se agrega el 57
function whatsappNumber(phone: string) {
  const digits = phone.replace(/\D/g, '');
  if (!digits) return '';
  return digits.length === 10 && !phone.trim().startsWith('+') ? `57${digits}` : digits;
}

// TODO: enviar el lead también a Fidelius cuando exponga un webhook.
async function sendToCrm(_lead: ContactData, _env: Env): Promise<void> {}

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
  }

  const isForm = !(request.headers.get('Content-Type') ?? '').includes('application/json');
  // Sin JS no podemos mostrar el mensaje en la página: volvemos al formulario
  const back = () => {
    const referer = request.headers.get('Referer');
    const target = referer && new URL(referer).origin === new URL(request.url).origin ? referer : '/';
    return Response.redirect(new URL('#contacto', target).toString(), 303);
  };

  let data: ContactData;
  try {
    data = await readData(request);
  } catch {
    return json({ error: 'Solicitud inválida.' }, 400);
  }

  // Bot detectado: respondemos como si todo hubiera salido bien
  if (data.website) return isForm ? back() : json({ ok: true });

  const { need, niche, nicheOther, timeline, name, email, phone, message } = data;

  if (!need || !niche || !timeline || !name || !email) {
    return json({ error: 'Faltan campos obligatorios.' }, 400);
  }

  if (
    !has(NEEDS, need) ||
    !has(NICHES, niche) ||
    !has(TIMELINES, timeline) ||
    (niche === 'other' && !nicheOther) ||
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    phone.length > LIMITS.phone ||
    nicheOther.length > LIMITS.nicheOther ||
    message.length > LIMITS.message ||
    !EMAIL_RE.test(email) ||
    !PHONE_RE.test(phone)
  ) {
    return json({ error: 'Revisa los datos del formulario.' }, 400);
  }

  const needLabel   = NEEDS[need].es;
  const nicheLabel  = niche === 'other' ? `Otro: ${nicheOther}` : NICHES[niche].es;
  const timelineLabel = TIMELINES[timeline].es;
  const waNumber    = whatsappNumber(phone);

  // [etiqueta, texto plano, HTML]
  const rows: [string, string, string][] = [
    ['Necesita', needLabel, escapeHtml(needLabel)],
    ['Se dedica a', nicheLabel, escapeHtml(nicheLabel)],
    ['Para cuándo', timelineLabel, escapeHtml(timelineLabel)],
    ['Nombre', name, escapeHtml(name)],
    ['Email', email, `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>`],
    [
      'WhatsApp',
      phone || 'No lo dejó',
      waNumber ? `<a href="https://wa.me/${waNumber}">${escapeHtml(phone)}</a>` : 'No lo dejó',
    ],
    ['Mensaje', message || '—', message ? escapeHtml(message).replace(/\n/g, '<br>') : '—'],
  ];

  const resend = new Resend(env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: env.RESEND_FROM || 'Formulario Web <onboarding@resend.dev>',
      to: env.RESEND_TO,
      replyTo: email,
      subject: `Nuevo lead: ${needLabel} · ${nicheLabel} · ${timelineLabel} — ${name}`.replace(/[\r\n]+/g, ' '),
      text: [
        ...rows.map(([k, plain]) => `${k}: ${plain}`),
        waNumber ? `\nEscribirle por WhatsApp: https://wa.me/${waNumber}` : '',
      ].join('\n'),
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
          <h2 style="color:#1D5FAE">Nuevo lead desde camiloacosta.dev</h2>
          <table style="width:100%;border-collapse:collapse;margin-top:16px">
            ${rows
              .map(
                ([k, , html]) => `
            <tr>
              <td style="padding:10px;background:#f4f4f5;font-weight:600;width:120px;vertical-align:top">${k}</td>
              <td style="padding:10px;border-bottom:1px solid #e4e4e7;line-height:1.6">${html}</td>
            </tr>`,
              )
              .join('')}
          </table>
          ${
            waNumber
              ? `<p style="margin-top:20px"><a href="https://wa.me/${waNumber}" style="display:inline-block;padding:12px 20px;border-radius:9999px;background:#25D366;color:#fff;text-decoration:none;font-weight:600">Escribirle por WhatsApp</a></p>`
              : ''
          }
        </div>
      `,
    });

    // Resend no lanza excepción: devuelve el error en la respuesta
    if (error) {
      console.error('Resend error:', error);
      return json({ error: 'Error al enviar el mensaje. Intenta de nuevo.' }, 502);
    }

    try {
      await sendToCrm(data, env);
    } catch (err) {
      console.error('CRM error:', err);
    }

    return isForm ? back() : json({ ok: true });
  } catch (err) {
    console.error('Contact error:', err);
    return json({ error: 'Error al enviar el mensaje. Intenta de nuevo.' }, 500);
  }
};
