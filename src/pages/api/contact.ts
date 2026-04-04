import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Todos los campos son obligatorios.' }), {
        status: 400,
      });
    }

    await resend.emails.send({
      from: 'Formulario Web <onboarding@resend.dev>',
      to: import.meta.env.RESEND_TO,
      reply_to: email,
      subject: `Nuevo mensaje de ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
          <h2 style="color:#2563EB">Nuevo mensaje desde camiloacosta.dev</h2>
          <table style="width:100%;border-collapse:collapse;margin-top:16px">
            <tr>
              <td style="padding:10px;background:#f4f4f5;font-weight:600;width:100px">Nombre</td>
              <td style="padding:10px;border-bottom:1px solid #e4e4e7">${name}</td>
            </tr>
            <tr>
              <td style="padding:10px;background:#f4f4f5;font-weight:600">Email</td>
              <td style="padding:10px;border-bottom:1px solid #e4e4e7">
                <a href="mailto:${email}">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:10px;background:#f4f4f5;font-weight:600;vertical-align:top">Mensaje</td>
              <td style="padding:10px;line-height:1.6">${message.replace(/\n/g, '<br>')}</td>
            </tr>
          </table>
        </div>
      `,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: 'Error al enviar el mensaje. Intenta de nuevo.' }), {
      status: 500,
    });
  }
};
