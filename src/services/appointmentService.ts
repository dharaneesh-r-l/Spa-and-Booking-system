import type { Appointment, BookingFormData } from '@/types/index';
import { getCityById } from './cityService';
import { getSalonById } from './salonService';
import { getServiceById } from './serviceService';

const STORAGE_KEY = 'spa_appointments';

// Get all appointments from localStorage
export const getAllAppointments = (): Appointment[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading appointments:', error);
    return [];
  }
};

// Check if a time slot is already booked for a specific salon
export const isTimeSlotAvailable = (salonId: string, date: string, time: string): boolean => {
  const appointments = getAllAppointments();
  return !appointments.some(
    (apt) => apt.salonId === salonId && apt.date === date && apt.time === time
  );
};

// Create a new appointment
export const createAppointment = (formData: BookingFormData): { success: boolean; message: string; appointment?: Appointment } => {
  try {
    // Check if time slot is available for this salon
    if (!isTimeSlotAvailable(formData.salonId, formData.date, formData.time)) {
      return {
        success: false,
        message: 'This time slot is already booked at this salon. Please choose another time.'
      };
    }

    // Get related data
    const city = getCityById(formData.cityId);
    const salon = getSalonById(formData.salonId);
    const service = getServiceById(formData.serviceId);

    if (!city || !salon || !service) {
      return {
        success: false,
        message: 'Invalid booking data. Please try again.'
      };
    }

    // Create new appointment
    const newAppointment: Appointment = {
      id: crypto.randomUUID(),
      name: formData.name,
      email: formData.email,
      cityId: formData.cityId,
      cityName: city.name,
      salonId: formData.salonId,
      salonName: salon.name,
      serviceId: formData.serviceId,
      serviceName: service.serviceName,
      date: formData.date,
      time: formData.time,
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    const appointments = getAllAppointments();
    appointments.push(newAppointment);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));

    return {
      success: true,
      message: `Appointment booked successfully at ${salon.name}! A confirmation email has been sent to ${formData.email}.`,
      appointment: newAppointment
    };
  } catch (error) {
    console.error('Error creating appointment:', error);
    return {
      success: false,
      message: 'Failed to book appointment. Please try again.'
    };
  }
};

// Delete an appointment (for admin)
export const deleteAppointment = (id: string): boolean => {
  try {
    const appointments = getAllAppointments();
    const filtered = appointments.filter((apt) => apt.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting appointment:', error);
    return false;
  }
};

// Get appointments by city
export const getAppointmentsByCity = (cityId: string): Appointment[] => {
  const appointments = getAllAppointments();
  return appointments.filter((apt) => apt.cityId === cityId);
};

// Get appointments by salon
export const getAppointmentsBySalon = (salonId: string): Appointment[] => {
  const appointments = getAllAppointments();
  return appointments.filter((apt) => apt.salonId === salonId);
};

// Get appointments by date
export const getAppointmentsByDate = (date: string): Appointment[] => {
  const appointments = getAllAppointments();
  return appointments.filter((apt) => apt.date === date);
};

