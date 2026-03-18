import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Salon } from '@/types/index';

interface SalonCardProps {
  salon: Salon;
  onSelect: (salon: Salon) => void;
  isSelected: boolean;
}

const SalonCard: React.FC<SalonCardProps> = ({ salon, onSelect, isSelected }) => {
  return (
    <Card 
      className={`group hover:shadow-xl transition-all duration-300 cursor-pointer ${
        isSelected ? 'border-2 border-gold bg-gold/5' : 'border-2 hover:border-gold/50'
      }`}
      onClick={() => onSelect(salon)}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl group-hover:text-gold transition-colors">
              {salon.name}
            </CardTitle>
            <CardDescription className="mt-1 flex items-center gap-2">
              <span>📍</span>
              <span>{salon.location}</span>
            </CardDescription>
          </div>
          <Badge className="bg-gold text-gold-foreground">
            ⭐ {salon.rating}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Services Offered:</p>
            <div className="flex flex-wrap gap-2">
              {salon.services.slice(0, 4).map((service, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {service}
                </Badge>
              ))}
              {salon.services.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{salon.services.length - 4} more
                </Badge>
              )}
            </div>
          </div>
          
          <Button 
            className={`w-full ${
              isSelected 
                ? 'bg-gold hover:bg-gold/90 text-gold-foreground' 
                : 'bg-primary hover:bg-primary/90'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(salon);
            }}
          >
            {isSelected ? 'Selected ✓' : 'Select Salon'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalonCard;
