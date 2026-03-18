import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getServicesBySalon } from '@/services/serviceService';
import type { Service, Salon } from '@/types/index';

interface ServiceSelectorProps {
  salon: Salon;
  onServiceSelect: (service: Service) => void;
  selectedService: Service | null;
}

const ServiceSelector: React.FC<ServiceSelectorProps> = ({ salon, onServiceSelect, selectedService }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate AJAX loading
    setIsLoading(true);
    
    setTimeout(() => {
      const salonServices = getServicesBySalon(salon.id);
      setServices(salonServices);
      setIsLoading(false);
    }, 400);
  }, [salon.id]);

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <Card className="border-2 border-gold/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl md:text-3xl">
              Loading Services...
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-24 w-full bg-muted" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="border-2 border-gold/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl">
            Select a <span className="gradient-text">Service</span>
          </CardTitle>
          <CardDescription>
            Available services at {salon.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => (
              <Card
                key={service.id}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedService?.id === service.id
                    ? 'border-2 border-gold bg-gold/5'
                    : 'border-2 hover:border-gold/50 hover:shadow-lg'
                }`}
                onClick={() => onServiceSelect(service)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{service.icon}</span>
                      <h3 className="font-bold text-lg">{service.serviceName}</h3>
                    </div>
                    {selectedService?.id === service.id && (
                      <Badge className="bg-gold text-gold-foreground">✓</Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{service.duration}</span>
                    <span className="font-bold text-gold">₹{service.price}</span>
                  </div>
                  <Button
                    size="sm"
                    className={`w-full mt-3 ${
                      selectedService?.id === service.id
                        ? 'bg-gold hover:bg-gold/90 text-gold-foreground'
                        : ''
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onServiceSelect(service);
                    }}
                  >
                    {selectedService?.id === service.id ? 'Selected' : 'Select'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceSelector;
