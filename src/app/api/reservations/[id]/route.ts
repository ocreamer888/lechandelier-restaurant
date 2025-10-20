export const runtime = "nodejs";
import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase.client';
import type { CancelReservationResponse } from '@/types/reservation';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const supabase = getServerSupabase();

    const { data: reservation, error } = await supabase
      .from('reservations')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !reservation) {
      return NextResponse.json(
        {
          success: false,
          message: 'Reservation not found',
          error: error?.message || 'Not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        reservation,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching reservation:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch reservation',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    // Only allow updating status to cancelled
    if (body.status !== 'cancelled') {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid operation',
          error: 'Only cancellation is allowed',
        } as CancelReservationResponse,
        { status: 400 }
      );
    }

    const supabase = getServerSupabase();

    // Check if reservation exists and is not already cancelled
    const { data: existing, error: fetchError } = await supabase
      .from('reservations')
      .select('status')
      .eq('id', id)
      .single();

    if (fetchError || !existing) {
      return NextResponse.json(
        {
          success: false,
          message: 'Reservation not found',
          error: fetchError?.message || 'Not found',
        } as CancelReservationResponse,
        { status: 404 }
      );
    }

    // Type assertion for existing record
    const existingStatus = existing as { status: string };
    
    if (existingStatus.status === 'cancelled') {
      return NextResponse.json(
        {
          success: false,
          message: 'Reservation is already cancelled',
          error: 'Already cancelled',
        } as CancelReservationResponse,
        { status: 400 }
      );
    }

    // Update reservation status
    const { error: updateError } = await supabase
      .from('reservations')
      .update({
        status: 'cancelled',
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (updateError) {
      console.error('Database error:', updateError);
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to cancel reservation',
          error: updateError.message,
        } as CancelReservationResponse,
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Reservation cancelled successfully',
      } as CancelReservationResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred',
        error: error instanceof Error ? error.message : 'Unknown error',
      } as CancelReservationResponse,
      { status: 500 }
    );
  }
}

