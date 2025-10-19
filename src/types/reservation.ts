import type { Database } from './database';

export type ReservationRecord = Database['public']['Tables']['reservations']['Row'];
export type ReservationInsert = Database['public']['Tables']['reservations']['Insert'];
export type ReservationUpdate = Database['public']['Tables']['reservations']['Update'];

export interface ReservationFormData {
  name: string;
  email: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
}

export interface ReservationResponse {
  success: boolean;
  message: string;
  reservation?: ReservationRecord;
  error?: string;
}

export interface CancelReservationResponse {
  success: boolean;
  message: string;
  error?: string;
}

