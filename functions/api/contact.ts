import { Resend } from 'resend';

interface Env {
  RESEND_API_KEY: string;
  RESEND_TO: string;
  RESEND_FROM?: string;
}

interface ContactData {
  name: string;
  email: string;
  message: string;
  website: string; // honeypot: los humanos no lo ven, los bots lo llenan
}

const LIMITS = { name: 100, email: 254, message: 5000 };
const EMAIL_RE = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/;

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
    name: field('name'),
    email: field('email'),
    message: field('message'),
    website: field('website'),
  };
}

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

  const { name, email, message } = data;

  if (!name || !email || !message) {
    return json({ error: 'Todos los campos son obligatorios.' }, 400);
  }

  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    message.length > LIMITS.message ||
    !EMAIL_RE.test(email)
  ) {
    return json({ error: 'Revisa los datos del formulario.' }, 400);
  }

  const resend = new Resend(env.RESEND_API_KEY);
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);

  try {
    const { error } = await resend.emails.send({
      from: env.RESEND_FROM || 'Formulario Web <onboarding@resend.dev>',
      to: env.RESEND_TO,
      replyTo: email,
      subject: `Nuevo mensaje de ${name.replace(/[\r\n]+/g, ' ')}`,
      text: `Nombre: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
          <h2 style="color:#2563EB">Nuevo mensaje desde camiloacosta.dev</h2>
          <table style="width:100%;border-collapse:collapse;margin-top:16px">
            <tr>
              <td style="padding:10px;background:#f4f4f5;font-weight:600;width:100px">Nombre</td>
              <td style="padding:10px;border-bottom:1px solid #e4e4e7">${safeName}</td>
            </tr>
            <tr>
              <td style="padding:10px;background:#f4f4f5;font-weight:600">Email</td>
              <td style="padding:10px;border-bottom:1px solid #e4e4e7">
                <a href="mailto:${safeEmail}">${safeEmail}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:10px;background:#f4f4f5;font-weight:600;vertical-align:top">Mensaje</td>
              <td style="padding:10px;line-height:1.6">${escapeHtml(message).replace(/\n/g, '<br>')}</td>
            </tr>
          </table>
        </div>
      `,
    });

    // Resend no lanza excepción: devuelve el error en la respuesta
    if (error) {
      console.error('Resend error:', error);
      return json({ error: 'Error al enviar el mensaje. Intenta de nuevo.' }, 502);
    }

    return isForm ? back() : json({ ok: true });
  } catch (err) {
    console.error('Contact error:', err);
    return json({ error: 'Error al enviar el mensaje. Intenta de nuevo.' }, 500);
  }
};
