import type { City } from '@/types/index';

const STORAGE_KEY = 'spa_cities';

// Get all cities
export const getAllCities = (): City[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading cities:', error);
    return [];
  }
};

// Search cities by name
export const searchCities = (query: string): City[] => {
  const cities = getAllCities();
  if (!query.trim()) {
    return cities;
  }
  
  const lowerQuery = query.toLowerCase();
  return cities.filter(city => 
    city.name.toLowerCase().includes(lowerQuery)
  );
};

// Get city by ID
export const getCityById = (id: string): City | null => {
  const cities = getAllCities();
  return cities.find(city => city.id === id) || null;
};
