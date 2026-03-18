import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import SalonCard from './SalonCard';
import { getSalonsByCity } from '@/services/salonService';
import type { Salon, City } from '@/types/index';

interface SalonListProps {
  city: City;
  onSalonSelect: (salon: Salon) => void;
  selectedSalon: Salon | null;
}

const SalonList: React.FC<SalonListProps> = ({ city, onSalonSelect, selectedSalon }) => {
  const [salons, setSalons] = useState<Salon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate AJAX loading
    setIsLoading(true);
    
    setTimeout(() => {
      const citySalons = getSalonsByCity(city.id);
      setSalons(citySalons);
      setIsLoading(false);
    }, 500);
  }, [city.id]);

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto">
        <Card className="border-2 border-gold/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl md:text-3xl">
              Loading Salons in <span className="gradient-text">{city.name}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="border-2">
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4 bg-muted" />
                    <Skeleton className="h-4 w-1/2 bg-muted mt-2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full bg-muted" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (salons.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto">
        <Card className="border-2 border-gold/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl md:text-3xl">
              Salons in <span className="gradient-text">{city.name}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground mb-2">
                No salons available in this city
              </p>
              <p className="text-sm text-muted-foreground">
                Please try selecting a different city
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card className="border-2 border-gold/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl">
            Choose Your <span className="gradient-text">Salon</span> in {city.name}
          </CardTitle>
          <CardDescription>
            {salons.length} salon{salons.length !== 1 ? 's' : ''} available
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {salons.map((salon) => (
              <SalonCard
                key={salon.id}
                salon={salon}
                onSelect={onSalonSelect}
                isSelected={selectedSalon?.id === salon.id}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonList;
