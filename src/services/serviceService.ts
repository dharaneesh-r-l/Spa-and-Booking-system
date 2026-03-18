import type { Service } from '@/types/index';

const STORAGE_KEY = 'spa_services';

// Get all services
export const getAllServices = (): Service[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading services:', error);
    return [];
  }
};

// Get services by salon ID
export const getServicesBySalon = (salonId: string): Service[] => {
  const services = getAllServices();
  return services.filter(service => service.salonId === salonId);
};

// Get service by ID
export const getServiceById = (id: string): Service | null => {
  const services = getAllServices();
  return services.find(service => service.id === id) || null;
};
