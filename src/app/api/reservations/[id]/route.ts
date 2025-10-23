export const runtime = "nodejs";
import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase.client';
import type { CancelReservationResponse } from '@/types/reservation';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // TODO: Add authentication check
    // const user = await validateSession(request);
    
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // TODO: Add authentication check
    // const user = await validateSession(request);

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

    // Single optimized query: update only if not already cancelled
    const { error } = await supabase
      .from('reservations')
      .update({
        status: 'cancelled',
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .neq('status', 'cancelled') // Prevents re-cancellation
      .select()
      .single();

    if (error) {
      // PGRST116 means no rows returned (not found or already cancelled)
      if (error.code === 'PGRST116') {
        // Check if it exists at all or is already cancelled
        const { data: existing } = await supabase
          .from('reservations')
          .select('status')
          .eq('id', id)
          .single();

        if (!existing) {
          return NextResponse.json(
            {
              success: false,
              message: 'Reservation not found',
              error: 'Not found',
            } as CancelReservationResponse,
            { status: 404 }
          );
        }

        return NextResponse.json(
          {
            success: false,
            message: 'Reservation is already cancelled',
            error: 'Already cancelled',
          } as CancelReservationResponse,
          { status: 400 }
        );
      }

      console.error('Database error:', error);
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to cancel reservation',
          error: error.message,
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

