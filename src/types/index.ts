export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}

// Appointment type definition
export interface Appointment {
  id: string;
  name: string;
  email: string;
  service: string;
  date: string;
  time: string;
  createdAt: string;
}

// Service type definition
export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  duration: string;
}

// Booking form data
export interface BookingFormData {
  name: string;
  email: string;
  service: string;
  date: string;
  time: string;
}

