import { Resend } from 'resend';
import type { ReservationRecord } from '@/types/reservation';

// Crear instancia de Resend solo cuando la clave API esté disponible
const getResendInstance = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new Resend(apiKey);
};

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};

export const sendCustomerConfirmationEmail = async (
  reservation: ReservationRecord
): Promise<{ success: boolean; error?: string }> => {
  try {
    const resend = getResendInstance();
    if (!resend) {
      console.warn('Clave API de Resend no configurada, omitiendo email al cliente');
      return { success: true };
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lechandelier.restaurant';
    const cancelUrl = `${siteUrl}/reservations/${reservation.id}`;
    
    const { error } = await resend.emails.send({
      from: 'Le Chandelier <reservaciones@lechandelier.restaurant>',
      to: [reservation.email],
      subject: 'Confirmación de Reserva - Le Chandelier',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Confirmación de Reserva</title>
          </head>
          <body style="font-family: 'Georgia', serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background-color: #1a1a1a; color: #E8DCC8; padding: 40px 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="margin: 0; font-size: 36px; font-weight: 300; letter-spacing: 2px;">Le Chandelier</h1>
              <p style="margin: 10px 0 0; font-size: 14px; letter-spacing: 1px; opacity: 0.9;">COCINA FRANCO-SUIZA</p>
            </div>
            
            <div style="background-color: white; padding: 40px 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #1a1a1a; margin-top: 0; font-size: 24px; font-weight: 400;">Reserva Confirmada</h2>
              
              <p style="font-size: 16px; color: #555;">Estimado/a ${reservation.name},</p>
              
              <p style="font-size: 16px; color: #555;">
                Gracias por elegir Le Chandelier. Nos complace confirmar su reserva.
              </p>
              
              <div style="background-color: #f5f5f5; padding: 25px; margin: 30px 0; border-left: 4px solid #E8DCC8; border-radius: 4px;">
                <h3 style="margin-top: 0; color: #1a1a1a; font-size: 18px; font-weight: 600;">Detalles de la Reserva</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-weight: 600;">Fecha:</td>
                    <td style="padding: 8px 0; color: #333;">${formatDate(reservation.date)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-weight: 600;">Hora:</td>
                    <td style="padding: 8px 0; color: #333;">${formatTime(reservation.time)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-weight: 600;">Comensales:</td>
                    <td style="padding: 8px 0; color: #333;">${reservation.guests} ${reservation.guests === 1 ? 'persona' : 'personas'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-weight: 600;">ID de Reserva:</td>
                    <td style="padding: 8px 0; color: #333; font-family: monospace; font-size: 12px;">${reservation.id.substring(0, 8)}</td>
                  </tr>
                </table>
              </div>
              
              <p style="font-size: 16px; color: #555;">
                Esperamos darle la bienvenida a nuestro restaurante. Si necesita realizar algún cambio o cancelar su reserva, por favor utilice el enlace a continuación.
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${cancelUrl}" style="display: inline-block; background-color: #E8DCC8; color: #1a1a1a; padding: 14px 32px; text-decoration: none; border-radius: 50px; font-weight: 600; letter-spacing: 1px; font-size: 14px;">
                  GESTIONAR RESERVA
                </a>
              </div>
              
              <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #e0e0e0;">
                <p style="font-size: 14px; color: #666; margin: 5px 0;"><strong>Le Chandelier</strong></p>
                <p style="font-size: 14px; color: #666; margin: 5px 0;">Restaurante Franco-Suizo</p>
                <p style="font-size: 14px; color: #666; margin: 5px 0;">Teléfono: +506 7130 0911</p>
                <p style="font-size: 14px; color: #666; margin: 5px 0;">Email: reservaciones@lechandelier.restaurant</p>
              </div>
            </div>
            
            <div style="text-align: center; padding: 20px; font-size: 12px; color: #999;">
              <p>Este es un mensaje automatizado. Por favor no responda a este correo.</p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Error al enviar email al cliente:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error al enviar email al cliente:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
    };
  }
};

export const sendAdminNotificationEmail = async (
  reservation: ReservationRecord
): Promise<{ success: boolean; error?: string }> => {
  try {
    const resend = getResendInstance();
    if (!resend) {
      console.warn('Clave API de Resend no configurada, omitiendo email de notificación al administrador');
      return { success: true };
    }

    const adminEmail = process.env.RESTAURANT_ADMIN_EMAIL;
    
    if (!adminEmail) {
      console.warn('RESTAURANT_ADMIN_EMAIL no configurado, omitiendo notificación al administrador');
      return { success: true };
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lechandelier.restaurant';
    const viewUrl = `${siteUrl}/reservations/${reservation.id}`;
    
    const { error } = await resend.emails.send({
      from: 'Le Chandelier <reservaciones@lechandelier.restaurant>',
      to: [adminEmail],
      subject: `Nueva Reserva - ${reservation.name} - ${formatDate(reservation.date)}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nueva Reserva</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #1a1a1a; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; font-size: 24px;">Alerta de Nueva Reserva</h1>
            </div>
            
            <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px;">
              <h2 style="color: #1a1a1a; margin-top: 0;">Detalles de la Reserva</h2>
              
              <table style="width: 100%; border-collapse: collapse; background-color: white; border-radius: 4px; overflow: hidden;">
                <tr style="background-color: #f5f5f5;">
                  <td style="padding: 12px; font-weight: bold; border-bottom: 1px solid #e0e0e0;">Nombre del Cliente</td>
                  <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;">${reservation.name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; font-weight: bold; border-bottom: 1px solid #e0e0e0;">Correo Electrónico</td>
                  <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;"><a href="mailto:${reservation.email}">${reservation.email}</a></td>
                </tr>
                <tr style="background-color: #f5f5f5;">
                  <td style="padding: 12px; font-weight: bold; border-bottom: 1px solid #e0e0e0;">Teléfono</td>
                  <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;"><a href="tel:${reservation.phone}">${reservation.phone}</a></td>
                </tr>
                <tr>
                  <td style="padding: 12px; font-weight: bold; border-bottom: 1px solid #e0e0e0;">Fecha</td>
                  <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;">${formatDate(reservation.date)}</td>
                </tr>
                <tr style="background-color: #f5f5f5;">
                  <td style="padding: 12px; font-weight: bold; border-bottom: 1px solid #e0e0e0;">Hora</td>
                  <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;">${formatTime(reservation.time)}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; font-weight: bold; border-bottom: 1px solid #e0e0e0;">Número de Comensales</td>
                  <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;">${reservation.guests}</td>
                </tr>
                <tr style="background-color: #f5f5f5;">
                  <td style="padding: 12px; font-weight: bold;">ID de Reserva</td>
                  <td style="padding: 12px; font-family: monospace; font-size: 12px;">${reservation.id}</td>
                </tr>
              </table>
              
              <div style="margin-top: 30px; text-align: center;">
                <a href="${viewUrl}" style="display: inline-block; background-color: #1a1a1a; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold;">
                  Ver Reserva
                </a>
              </div>
              
              <p style="margin-top: 30px; font-size: 12px; color: #666; text-align: center;">
                Recibido el ${new Date().toLocaleString('es-ES', { dateStyle: 'full', timeStyle: 'short' })}
              </p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Error al enviar email al administrador:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error al enviar email al administrador:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
    };
  }
};

