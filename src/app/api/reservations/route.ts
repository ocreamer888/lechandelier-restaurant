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

    // After line 35, add server-side date validation
    const validateDateServerSide = (dateString: string, timeString: string): boolean => {
      // Parse date and time components separately
      const [year, month, day] = dateString.split('-').map(Number);
      const [hours, minutes] = timeString.split(':').map(Number);

      // Create date in local timezone (server's timezone)
      const reservationDateTime = new Date(year, month - 1, day, hours, minutes, 0, 0);
      const now = new Date();
      const minimumTime = new Date(now.getTime() + 15 * 60 * 1000);

      return !isNaN(reservationDateTime.getTime()) && reservationDateTime >= minimumTime;
    };

    // In the POST function, after validation check:
    if (!validateDateServerSide(body.date, body.time)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          error: 'Please select a date and time at least 15 minutes in the future',
        } as ReservationResponse,
        { status: 400 }
      );
    }

    // Get server-side Supabase client
    const supabase = getServerSupabase();

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

    // Before inserting, check for existing reservations at the same time
    const { data: existingReservations, error: checkError } = await supabase
      .from('reservations')
      .select('id')
      .eq('date', body.date)
      .eq('time', body.time)
      .eq('status', 'pending')
      .or('status.eq.confirmed')
      .limit(1);

    if (checkError) {
      console.error('Error checking availability:', checkError);
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to check availability',
          error: checkError.message,
        } as ReservationResponse,
        { status: 500 }
      );
    }

    // Optional: Check if there are too many reservations at this time
    // (You might want to limit based on restaurant capacity)
    if (existingReservations && existingReservations.length > 0) {
      // You could either reject or allow multiple reservations
      // For now, we'll allow but you might want to add capacity logic
    }

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

    // Send confirmation emails (non-blocking but tracked)
    const emailResults = await Promise.allSettled([
      sendCustomerConfirmationEmail(reservation),
      sendAdminNotificationEmail(reservation),
    ]);

    emailResults.forEach((result, index) => {
      if (result.status === 'rejected') {
        const emailType = index === 0 ? 'customer' : 'admin';
        console.error(`Failed to send ${emailType} email:`, result.reason);
      } else if (result.status === 'fulfilled' && !result.value.success) {
        const emailType = index === 0 ? 'customer' : 'admin';
        console.error(`Failed to send ${emailType} email:`, result.value.error);
      }
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

