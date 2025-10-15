export interface ReservationFormData {
  name: string;
  phone: string;
  email: string;
  guests: number;
  date: string;
  time: string;
}

export interface BarrelPickerProps<T> {
  value: T;
  onChange: (value: T) => void;
}

export interface BarrelStyle {
  opacity: number;
  scale: number;
  rotateX: number;
}

