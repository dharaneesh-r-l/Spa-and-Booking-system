import type { City, Salon, Service } from '@/types/index';

// Sample cities data
export const cities: City[] = [
  { id: '1', name: 'Chennai' },
  { id: '2', name: 'Coimbatore' },
  { id: '3', name: 'Bangalore' },
  { id: '4', name: 'Mumbai' },
  { id: '5', name: 'Delhi' },
  { id: '6', name: 'Hyderabad' },
  { id: '7', name: 'Pune' },
  { id: '8', name: 'Kolkata' }
];

// Sample salons data
export const salons: Salon[] = [
  // Chennai salons
  {
    id: 's1',
    name: 'Luxury Spa Chennai',
    cityId: '1',
    location: 'Anna Nagar, Chennai',
    rating: 4.8,
    services: ['Hair Spa', 'Haircut', 'Facial', 'Massage']
  },
  {
    id: 's2',
    name: 'Elite Hair Studio',
    cityId: '1',
    location: 'T Nagar, Chennai',
    rating: 4.6,
    services: ['Haircut', 'Coloring', 'Styling']
  },
  {
    id: 's3',
    name: 'Glamour Salon',
    cityId: '1',
    location: 'Velachery, Chennai',
    rating: 4.7,
    services: ['Hair Spa', 'Facial', 'Manicure', 'Pedicure']
  },
  
  // Coimbatore salons
  {
    id: 's4',
    name: 'Royal Beauty Lounge',
    cityId: '2',
    location: 'RS Puram, Coimbatore',
    rating: 4.5,
    services: ['Hair Spa', 'Haircut', 'Facial', 'Bridal Makeup']
  },
  {
    id: 's5',
    name: 'Style Icon Salon',
    cityId: '2',
    location: 'Gandhipuram, Coimbatore',
    rating: 4.4,
    services: ['Haircut', 'Coloring', 'Keratin Treatment']
  },
  
  // Bangalore salons
  {
    id: 's6',
    name: 'Bliss Spa & Salon',
    cityId: '3',
    location: 'Koramangala, Bangalore',
    rating: 4.9,
    services: ['Hair Spa', 'Haircut', 'Facial', 'Massage', 'Body Scrub']
  },
  {
    id: 's7',
    name: 'Urban Cuts',
    cityId: '3',
    location: 'Indiranagar, Bangalore',
    rating: 4.7,
    services: ['Haircut', 'Beard Grooming', 'Hair Coloring']
  },
  {
    id: 's8',
    name: 'Serenity Wellness',
    cityId: '3',
    location: 'Whitefield, Bangalore',
    rating: 4.8,
    services: ['Facial', 'Massage', 'Body Wrap', 'Aromatherapy']
  },
  
  // Mumbai salons
  {
    id: 's9',
    name: 'Glamour Studio Mumbai',
    cityId: '4',
    location: 'Bandra West, Mumbai',
    rating: 4.9,
    services: ['Hair Spa', 'Haircut', 'Coloring', 'Styling', 'Makeup']
  },
  {
    id: 's10',
    name: 'The Hair Factory',
    cityId: '4',
    location: 'Andheri, Mumbai',
    rating: 4.6,
    services: ['Haircut', 'Coloring', 'Smoothening', 'Rebonding']
  },
  {
    id: 's11',
    name: 'Spa Nirvana',
    cityId: '4',
    location: 'Juhu, Mumbai',
    rating: 4.8,
    services: ['Facial', 'Massage', 'Body Polish', 'Manicure', 'Pedicure']
  },
  
  // Delhi salons
  {
    id: 's12',
    name: 'Capital Salon & Spa',
    cityId: '5',
    location: 'Connaught Place, Delhi',
    rating: 4.7,
    services: ['Hair Spa', 'Haircut', 'Facial', 'Massage', 'Waxing']
  },
  {
    id: 's13',
    name: 'Trendz Hair Studio',
    cityId: '5',
    location: 'Saket, Delhi',
    rating: 4.5,
    services: ['Haircut', 'Coloring', 'Highlights', 'Styling']
  },
  {
    id: 's14',
    name: 'Radiance Spa',
    cityId: '5',
    location: 'Vasant Kunj, Delhi',
    rating: 4.8,
    services: ['Facial', 'Massage', 'Body Scrub', 'Aromatherapy']
  },
  
  // Hyderabad salons
  {
    id: 's15',
    name: 'Pearl City Salon',
    cityId: '6',
    location: 'Banjara Hills, Hyderabad',
    rating: 4.6,
    services: ['Hair Spa', 'Haircut', 'Facial', 'Bridal Services']
  },
  {
    id: 's16',
    name: 'Chic Salon',
    cityId: '6',
    location: 'Hitech City, Hyderabad',
    rating: 4.5,
    services: ['Haircut', 'Coloring', 'Keratin Treatment']
  },
  
  // Pune salons
  {
    id: 's17',
    name: 'Elegance Salon & Spa',
    cityId: '7',
    location: 'Koregaon Park, Pune',
    rating: 4.7,
    services: ['Hair Spa', 'Haircut', 'Facial', 'Massage']
  },
  {
    id: 's18',
    name: 'Style Mantra',
    cityId: '7',
    location: 'Hinjewadi, Pune',
    rating: 4.4,
    services: ['Haircut', 'Coloring', 'Styling']
  },
  
  // Kolkata salons
  {
    id: 's19',
    name: 'Bengal Beauty Hub',
    cityId: '8',
    location: 'Park Street, Kolkata',
    rating: 4.6,
    services: ['Hair Spa', 'Haircut', 'Facial', 'Makeup']
  },
  {
    id: 's20',
    name: 'Salon De Paris',
    cityId: '8',
    location: 'Salt Lake, Kolkata',
    rating: 4.5,
    services: ['Haircut', 'Coloring', 'Smoothening']
  }
];

// Sample services data (detailed services for each salon)
export const services: Service[] = [
  // Luxury Spa Chennai (s1)
  { id: 'sv1', salonId: 's1', serviceName: 'Hair Spa', price: 1500, duration: '60 min', icon: '✨' },
  { id: 'sv2', salonId: 's1', serviceName: 'Haircut', price: 800, duration: '45 min', icon: '✂️' },
  { id: 'sv3', salonId: 's1', serviceName: 'Facial', price: 2000, duration: '75 min', icon: '💆' },
  { id: 'sv4', salonId: 's1', serviceName: 'Massage', price: 2500, duration: '90 min', icon: '💆‍♀️' },
  
  // Elite Hair Studio (s2)
  { id: 'sv5', salonId: 's2', serviceName: 'Haircut', price: 600, duration: '40 min', icon: '✂️' },
  { id: 'sv6', salonId: 's2', serviceName: 'Coloring', price: 3000, duration: '120 min', icon: '🎨' },
  { id: 'sv7', salonId: 's2', serviceName: 'Styling', price: 1000, duration: '30 min', icon: '💇' },
  
  // Glamour Salon (s3)
  { id: 'sv8', salonId: 's3', serviceName: 'Hair Spa', price: 1200, duration: '60 min', icon: '✨' },
  { id: 'sv9', salonId: 's3', serviceName: 'Facial', price: 1800, duration: '60 min', icon: '💆' },
  { id: 'sv10', salonId: 's3', serviceName: 'Manicure', price: 800, duration: '45 min', icon: '💅' },
  { id: 'sv11', salonId: 's3', serviceName: 'Pedicure', price: 1000, duration: '60 min', icon: '🦶' },
  
  // Royal Beauty Lounge (s4)
  { id: 'sv12', salonId: 's4', serviceName: 'Hair Spa', price: 1400, duration: '60 min', icon: '✨' },
  { id: 'sv13', salonId: 's4', serviceName: 'Haircut', price: 700, duration: '45 min', icon: '✂️' },
  { id: 'sv14', salonId: 's4', serviceName: 'Facial', price: 1900, duration: '75 min', icon: '💆' },
  { id: 'sv15', salonId: 's4', serviceName: 'Bridal Makeup', price: 8000, duration: '180 min', icon: '👰' },
  
  // Style Icon Salon (s5)
  { id: 'sv16', salonId: 's5', serviceName: 'Haircut', price: 650, duration: '40 min', icon: '✂️' },
  { id: 'sv17', salonId: 's5', serviceName: 'Coloring', price: 2800, duration: '120 min', icon: '🎨' },
  { id: 'sv18', salonId: 's5', serviceName: 'Keratin Treatment', price: 5000, duration: '150 min', icon: '💇‍♀️' },
  
  // Bliss Spa & Salon (s6)
  { id: 'sv19', salonId: 's6', serviceName: 'Hair Spa', price: 1800, duration: '60 min', icon: '✨' },
  { id: 'sv20', salonId: 's6', serviceName: 'Haircut', price: 900, duration: '45 min', icon: '✂️' },
  { id: 'sv21', salonId: 's6', serviceName: 'Facial', price: 2200, duration: '75 min', icon: '💆' },
  { id: 'sv22', salonId: 's6', serviceName: 'Massage', price: 3000, duration: '90 min', icon: '💆‍♀️' },
  { id: 'sv23', salonId: 's6', serviceName: 'Body Scrub', price: 2500, duration: '60 min', icon: '🧖' },
  
  // Urban Cuts (s7)
  { id: 'sv24', salonId: 's7', serviceName: 'Haircut', price: 800, duration: '45 min', icon: '✂️' },
  { id: 'sv25', salonId: 's7', serviceName: 'Beard Grooming', price: 500, duration: '30 min', icon: '🧔' },
  { id: 'sv26', salonId: 's7', serviceName: 'Hair Coloring', price: 3200, duration: '120 min', icon: '🎨' },
  
  // Serenity Wellness (s8)
  { id: 'sv27', salonId: 's8', serviceName: 'Facial', price: 2000, duration: '75 min', icon: '💆' },
  { id: 'sv28', salonId: 's8', serviceName: 'Massage', price: 2800, duration: '90 min', icon: '💆‍♀️' },
  { id: 'sv29', salonId: 's8', serviceName: 'Body Wrap', price: 3500, duration: '90 min', icon: '🧖‍♀️' },
  { id: 'sv30', salonId: 's8', serviceName: 'Aromatherapy', price: 3000, duration: '75 min', icon: '🌸' },
  
  // Glamour Studio Mumbai (s9)
  { id: 'sv31', salonId: 's9', serviceName: 'Hair Spa', price: 2000, duration: '60 min', icon: '✨' },
  { id: 'sv32', salonId: 's9', serviceName: 'Haircut', price: 1000, duration: '45 min', icon: '✂️' },
  { id: 'sv33', salonId: 's9', serviceName: 'Coloring', price: 3500, duration: '120 min', icon: '🎨' },
  { id: 'sv34', salonId: 's9', serviceName: 'Styling', price: 1200, duration: '30 min', icon: '💇' },
  { id: 'sv35', salonId: 's9', serviceName: 'Makeup', price: 4000, duration: '90 min', icon: '💄' },
  
  // The Hair Factory (s10)
  { id: 'sv36', salonId: 's10', serviceName: 'Haircut', price: 850, duration: '45 min', icon: '✂️' },
  { id: 'sv37', salonId: 's10', serviceName: 'Coloring', price: 3200, duration: '120 min', icon: '🎨' },
  { id: 'sv38', salonId: 's10', serviceName: 'Smoothening', price: 6000, duration: '180 min', icon: '💇‍♀️' },
  { id: 'sv39', salonId: 's10', serviceName: 'Rebonding', price: 7000, duration: '210 min', icon: '💇' },
  
  // Spa Nirvana (s11)
  { id: 'sv40', salonId: 's11', serviceName: 'Facial', price: 2500, duration: '75 min', icon: '💆' },
  { id: 'sv41', salonId: 's11', serviceName: 'Massage', price: 3500, duration: '90 min', icon: '💆‍♀️' },
  { id: 'sv42', salonId: 's11', serviceName: 'Body Polish', price: 3000, duration: '75 min', icon: '🧖' },
  { id: 'sv43', salonId: 's11', serviceName: 'Manicure', price: 1000, duration: '45 min', icon: '💅' },
  { id: 'sv44', salonId: 's11', serviceName: 'Pedicure', price: 1200, duration: '60 min', icon: '🦶' },
  
  // Capital Salon & Spa (s12)
  { id: 'sv45', salonId: 's12', serviceName: 'Hair Spa', price: 1700, duration: '60 min', icon: '✨' },
  { id: 'sv46', salonId: 's12', serviceName: 'Haircut', price: 900, duration: '45 min', icon: '✂️' },
  { id: 'sv47', salonId: 's12', serviceName: 'Facial', price: 2100, duration: '75 min', icon: '💆' },
  { id: 'sv48', salonId: 's12', serviceName: 'Massage', price: 2900, duration: '90 min', icon: '💆‍♀️' },
  { id: 'sv49', salonId: 's12', serviceName: 'Waxing', price: 1500, duration: '60 min', icon: '✨' },
  
  // Trendz Hair Studio (s13)
  { id: 'sv50', salonId: 's13', serviceName: 'Haircut', price: 750, duration: '45 min', icon: '✂️' },
  { id: 'sv51', salonId: 's13', serviceName: 'Coloring', price: 3000, duration: '120 min', icon: '🎨' },
  { id: 'sv52', salonId: 's13', serviceName: 'Highlights', price: 4000, duration: '150 min', icon: '🌟' },
  { id: 'sv53', salonId: 's13', serviceName: 'Styling', price: 1100, duration: '30 min', icon: '💇' },
  
  // Radiance Spa (s14)
  { id: 'sv54', salonId: 's14', serviceName: 'Facial', price: 2200, duration: '75 min', icon: '💆' },
  { id: 'sv55', salonId: 's14', serviceName: 'Massage', price: 3000, duration: '90 min', icon: '💆‍♀️' },
  { id: 'sv56', salonId: 's14', serviceName: 'Body Scrub', price: 2700, duration: '60 min', icon: '🧖' },
  { id: 'sv57', salonId: 's14', serviceName: 'Aromatherapy', price: 3200, duration: '75 min', icon: '🌸' },
  
  // Pearl City Salon (s15)
  { id: 'sv58', salonId: 's15', serviceName: 'Hair Spa', price: 1600, duration: '60 min', icon: '✨' },
  { id: 'sv59', salonId: 's15', serviceName: 'Haircut', price: 850, duration: '45 min', icon: '✂️' },
  { id: 'sv60', salonId: 's15', serviceName: 'Facial', price: 2000, duration: '75 min', icon: '💆' },
  { id: 'sv61', salonId: 's15', serviceName: 'Bridal Services', price: 10000, duration: '240 min', icon: '👰' },
  
  // Chic Salon (s16)
  { id: 'sv62', salonId: 's16', serviceName: 'Haircut', price: 700, duration: '45 min', icon: '✂️' },
  { id: 'sv63', salonId: 's16', serviceName: 'Coloring', price: 2900, duration: '120 min', icon: '🎨' },
  { id: 'sv64', salonId: 's16', serviceName: 'Keratin Treatment', price: 5500, duration: '150 min', icon: '💇‍♀️' },
  
  // Elegance Salon & Spa (s17)
  { id: 'sv65', salonId: 's17', serviceName: 'Hair Spa', price: 1500, duration: '60 min', icon: '✨' },
  { id: 'sv66', salonId: 's17', serviceName: 'Haircut', price: 800, duration: '45 min', icon: '✂️' },
  { id: 'sv67', salonId: 's17', serviceName: 'Facial', price: 1900, duration: '75 min', icon: '💆' },
  { id: 'sv68', salonId: 's17', serviceName: 'Massage', price: 2600, duration: '90 min', icon: '💆‍♀️' },
  
  // Style Mantra (s18)
  { id: 'sv69', salonId: 's18', serviceName: 'Haircut', price: 650, duration: '45 min', icon: '✂️' },
  { id: 'sv70', salonId: 's18', serviceName: 'Coloring', price: 2700, duration: '120 min', icon: '🎨' },
  { id: 'sv71', salonId: 's18', serviceName: 'Styling', price: 900, duration: '30 min', icon: '💇' },
  
  // Bengal Beauty Hub (s19)
  { id: 'sv72', salonId: 's19', serviceName: 'Hair Spa', price: 1400, duration: '60 min', icon: '✨' },
  { id: 'sv73', salonId: 's19', serviceName: 'Haircut', price: 750, duration: '45 min', icon: '✂️' },
  { id: 'sv74', salonId: 's19', serviceName: 'Facial', price: 1800, duration: '75 min', icon: '💆' },
  { id: 'sv75', salonId: 's19', serviceName: 'Makeup', price: 3500, duration: '90 min', icon: '💄' },
  
  // Salon De Paris (s20)
  { id: 'sv76', salonId: 's20', serviceName: 'Haircut', price: 700, duration: '45 min', icon: '✂️' },
  { id: 'sv77', salonId: 's20', serviceName: 'Coloring', price: 2800, duration: '120 min', icon: '🎨' },
  { id: 'sv78', salonId: 's20', serviceName: 'Smoothening', price: 5500, duration: '180 min', icon: '💇‍♀️' }
];

// Initialize data in localStorage
export const initializeSampleData = () => {
  if (!localStorage.getItem('spa_cities')) {
    localStorage.setItem('spa_cities', JSON.stringify(cities));
  }
  if (!localStorage.getItem('spa_salons')) {
    localStorage.setItem('spa_salons', JSON.stringify(salons));
  }
  if (!localStorage.getItem('spa_services')) {
    localStorage.setItem('spa_services', JSON.stringify(services));
  }
  if (!localStorage.getItem('spa_appointments')) {
    localStorage.setItem('spa_appointments', JSON.stringify([]));
  }
};
