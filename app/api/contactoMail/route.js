import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    const { name, email, message } = await request.json();

    try {
        const emailContent = `
      <html>
        <body>
          <h1>Contacto de Club Social y Deportivo Villa Serranade</h1>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Correo:</strong> ${email}</p>
          <p><strong>Mensaje:</strong> ${message}</p>
        </body>
      </html>
    `;

        await resend.emails.send({
            from: " Contacto de Club Social y Deportivo Villa Serrana <onboarding@resend.dev>",
            to: ["tomirodriguez3101@gmail.com"],
            subject: `Club Social y Deportivo Villa Serrana`,
            html: emailContent,
        });

        return NextResponse.json({
            code: 200,
            message: "Formulario enviado correctamente.",
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            code: 500,
            message: "No se pudo enviar el formulario.",
        });
    }
}
