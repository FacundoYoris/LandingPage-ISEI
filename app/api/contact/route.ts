import { NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_TO = process.env.EMAIL_TO || "isei.ingelectrica@gmail.com";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, email, telefono, empresa, mensaje } = body;

    if (!nombre || !email || !empresa || !mensaje) {
      return NextResponse.json(
        { error: "Por favor complete todos los campos obligatorios" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Por favor ingrese un email válido" },
        { status: 400 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: "ISEI Ingeniería <onboarding@resend.dev>",
      to: EMAIL_TO,
      replyTo: email,
      subject: `Nueva consulta de ${empresa} - ${nombre}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1e3a8a 0%, #06b6d4 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">ISEI Ingeniería</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 5px 0 0;">Nueva consulta recibida</p>
          </div>
          
          <div style="padding: 30px; background: #f8fafc;">
            <h2 style="color: #1e3a8a; border-bottom: 2px solid #06b6d4; padding-bottom: 10px;">
              Datos del Contacto
            </h2>
            
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">
                  Nombre:
                </td>
                <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #1e293b;">
                  ${nombre}
                </td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">
                  Email:
                </td>
                <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #1e293b;">
                  <a href="mailto:${email}" style="color: #06b6d4;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">
                  Teléfono:
                </td>
                <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #1e293b;">
                  ${telefono || "No proporcionado"}
                </td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">
                  Empresa:
                </td>
                <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #1e293b;">
                  ${empresa}
                </td>
              </tr>
            </table>
            
            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #06b6d4;">
              <h3 style="color: #1e3a8a; margin: 0 0 10px;">Mensaje:</h3>
              <p style="color: #475569; line-height: 1.6; margin: 0;">${mensaje.replace(/\n/g, "<br>")}</p>
            </div>
            
            <div style="margin-top: 30px; text-align: center;">
              <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #1e3a8a 0%, #06b6d4 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold;">
                Responder a ${nombre}
              </a>
            </div>
          </div>
          
          <div style="padding: 20px; background: #1e293b; text-align: center;">
            <p style="color: #94a3b8; margin: 0; font-size: 12px;">
              ISEI Ingeniería - Sistemas Eléctricos Industriales<br>
              Santa Fe, Argentina
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Error sending email:", error);
      return NextResponse.json(
        { error: "Error al enviar el mensaje. Intente nuevamente." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Mensaje enviado correctamente. Nos contactaremos a la brevedad.",
    });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Error al procesar el formulario. Intente nuevamente." },
      { status: 500 }
    );
  }
}
