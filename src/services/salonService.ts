import type { Salon } from '@/types/index';
import { getCityById } from './cityService';

const STORAGE_KEY = 'spa_salons';

// Get all salons
export const getAllSalons = (): Salon[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading salons:', error);
    return [];
  }
};

// Get salons by city ID
export const getSalonsByCity = (cityId: string): Salon[] => {
  const salons = getAllSalons();
  const city = getCityById(cityId);
  
  const filteredSalons = salons.filter(salon => salon.cityId === cityId);
  
  // Add city name to each salon
  return filteredSalons.map(salon => ({
    ...salon,
    cityName: city?.name || ''
  }));
};

// Get salon by ID
export const getSalonById = (id: string): Salon | null => {
  const salons = getAllSalons();
  const salon = salons.find(s => s.id === id);
  
  if (salon) {
    const city = getCityById(salon.cityId);
    return {
      ...salon,
      cityName: city?.name || ''
    };
  }
  
  return null;
};

// Search salons by name
export const searchSalons = (query: string, cityId?: string): Salon[] => {
  let salons = getAllSalons();
  
  // Filter by city if provided
  if (cityId) {
    salons = salons.filter(salon => salon.cityId === cityId);
  }
  
  // Filter by search query
  if (query.trim()) {
    const lowerQuery = query.toLowerCase();
    salons = salons.filter(salon => 
      salon.name.toLowerCase().includes(lowerQuery) ||
      salon.location.toLowerCase().includes(lowerQuery)
    );
  }
  
  return salons;
};
