import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { services } from '@/data/services';

const Services: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Our <span className="gradient-text">Premium Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Indulge in our carefully curated selection of luxury treatments
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service) => (
            <Card 
              key={service.id}
              className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-gold bg-card hover:scale-105"
            >
              <CardHeader className="text-center pb-4">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <CardTitle className="text-xl font-bold group-hover:text-gold transition-colors">
                  {service.name}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  {service.duration}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
