export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}

// User type definition
export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // hashed
  role: 'user' | 'admin';
  createdAt: string;
}

// City type definition
export interface City {
  id: string;
  name: string;
}

// Salon type definition
export interface Salon {
  id: string;
  name: string;
  cityId: string;
  cityName?: string;
  location: string;
  rating: number;
  services: string[];
}

// Service type definition
export interface Service {
  id: string;
  salonId: string;
  serviceName: string;
  price: number;
  duration: string;
  icon?: string;
}

// Appointment type definition
export interface Appointment {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  cityId: string;
  cityName: string;
  salonId: string;
  salonName: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  createdAt: string;
}

// Booking form data
export interface BookingFormData {
  cityId: string;
  salonId: string;
  serviceId: string;
  date: string;
  time: string;
}

