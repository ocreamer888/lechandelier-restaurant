export const runtime = "nodejs";
import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase.client';
import { validateReservationForm } from '@/lib/validation';
import {
  sendCustomerConfirmationEmail,
  sendAdminNotificationEmail,
} from '@/lib/email';
import type { ReservationFormData, ReservationResponse, ReservationInsert } from '@/types/reservation';

export async function POST(request: NextRequest) {
  try {
    // Check environment variables first
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')) {
      console.error('❌ SUPABASE_URL not configured');
      return NextResponse.json(
        {
          success: false,
          message: 'Server configuration error',
          error: 'Database not configured',
        } as ReservationResponse,
        { status: 500 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('❌ RESEND_API_KEY not configured');
      // Continue anyway if you want to test DB without emails
    }

    const body: ReservationFormData = await request.json();
    console.log('📝 Received reservation request:', { ...body, email: '***', phone: '***' });

    // Validate the form data
    const validation = validateReservationForm(body);
    if (!validation.isValid) {
      console.error('❌ Validation failed:', validation.errors);
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          error: validation.errors.map((e) => e.message).join(', '),
        } as ReservationResponse,
        { status: 400 }
      );
    }

    // Get server-side Supabase client
    const supabase = getServerSupabase();
    console.log('✅ Supabase client created');

    // Insert reservation into database
    const insertData: ReservationInsert = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.trim(),
      guests: body.guests,
      date: body.date,
      time: body.time,
      status: 'pending' as const,
    };

    const { data: reservation, error: dbError } = await supabase
      .from('reservations')
      .insert(insertData)
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to create reservation',
          error: dbError.message,
        } as ReservationResponse,
        { status: 500 }
      );
    }

    // Send confirmation emails (don't block the response if emails fail)
    Promise.all([
      sendCustomerConfirmationEmail(reservation),
      sendAdminNotificationEmail(reservation),
    ]).catch((emailError) => {
      console.error('Error sending emails:', emailError);
      // Log but don't fail the request
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Reservation created successfully',
        reservation,
      } as ReservationResponse,
      { status: 201 }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred',
        error: error instanceof Error ? error.message : 'Unknown error',
      } as ReservationResponse,
      { status: 500 }
    );
  }
}

