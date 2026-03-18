import type { Appointment, BookingFormData } from '@/types/index';

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

// Check if a time slot is already booked
export const isTimeSlotAvailable = (date: string, time: string): boolean => {
  const appointments = getAllAppointments();
  return !appointments.some(
    (apt) => apt.date === date && apt.time === time
  );
};

// Create a new appointment
export const createAppointment = (formData: BookingFormData): { success: boolean; message: string; appointment?: Appointment } => {
  try {
    // Check if time slot is available
    if (!isTimeSlotAvailable(formData.date, formData.time)) {
      return {
        success: false,
        message: 'This time slot is already booked. Please choose another time.'
      };
    }

    // Create new appointment
    const newAppointment: Appointment = {
      id: crypto.randomUUID(),
      ...formData,
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    const appointments = getAllAppointments();
    appointments.push(newAppointment);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));

    return {
      success: true,
      message: 'Appointment booked successfully! A confirmation email has been sent.',
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

// Get appointments by date (for filtering)
export const getAppointmentsByDate = (date: string): Appointment[] => {
  const appointments = getAllAppointments();
  return appointments.filter((apt) => apt.date === date);
};
