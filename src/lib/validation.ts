import type { ReservationFormData } from '@/types/reservation';

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // Basic phone validation - accepts various formats
  // Allows: +1234567890, (123) 456-7890, 123-456-7890, etc.
  const phoneRegex = /^[\d\s\-\+\(\)]{10,20}$/;
  return phoneRegex.test(phone);
};

export const validateDate = (dateString: string, timeString: string): boolean => {
  // Combine date and time into a DateTime object
  const reservationDateTime = new Date(`${dateString}T${timeString}`);
  const now = new Date();
  const minimumTime = new Date(now.getTime() + 15 * 60 * 1000); // 15 minutes from now
  
  // Check if datetime is valid and at least 15 minutes in the future
  return !isNaN(reservationDateTime.getTime()) && reservationDateTime >= minimumTime;
};

export const validateGuests = (guests: number): boolean => {
  return guests >= 1 && guests <= 20;
};

export const validateReservationForm = (
  data: ReservationFormData
): ValidationResult => {
  const errors: ValidationError[] = [];

  // Validate name
  if (!data.name || data.name.trim().length < 2) {
    errors.push({
      field: 'name',
      message: 'Name must be at least 2 characters long',
    });
  }

  // Validate email
  if (!data.email || !validateEmail(data.email)) {
    errors.push({
      field: 'email',
      message: 'Please enter a valid email address',
    });
  }

  // Validate phone
  if (!data.phone || !validatePhone(data.phone)) {
    errors.push({
      field: 'phone',
      message: 'Please enter a valid phone number',
    });
  }

  // Validate guests
  if (!validateGuests(data.guests)) {
    errors.push({
      field: 'guests',
      message: 'Number of guests must be between 1 and 20',
    });
  }

  // Validate date
  if (!data.date || !validateDate(data.date, data.time)) {
    errors.push({
      field: 'date',
      message: 'Please select a date and time at least 15 minutes in the future',
    });
  }

  // Validate time
  if (!data.time) {
    errors.push({
      field: 'time',
      message: 'Please select a time for your reservation',
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

