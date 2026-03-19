import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import CitySearch from './CitySearch';
import SalonList from './SalonList';
import ServiceSelector from './ServiceSelector';
import BookingDetailsForm from './BookingDetailsForm';
import { createAppointment } from '@/services/appointmentService';
import { sendBookingConfirmationEmail } from '@/services/emailService';
import { getSalonById } from '@/services/salonService';
import { getServiceById } from '@/services/serviceService';
import type { City, Salon, Service, BookingFormData } from '@/types/index';

const BookingWizard: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    setSelectedSalon(null);
    setSelectedService(null);
    setStep(2);
  };

  const handleSalonSelect = (salon: Salon) => {
    setSelectedSalon(salon);
    setSelectedService(null);
    setStep(3);
  };

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setStep(4);
  };

  const handleBookingSubmit = async (data: { date: string; time: string }) => {
    if (!selectedCity || !selectedSalon || !selectedService) {
      toast.error('Please complete all booking steps');
      return;
    }

    setIsSubmitting(true);

    try {
      const bookingData: BookingFormData = {
        cityId: selectedCity.id,
        salonId: selectedSalon.id,
        serviceId: selectedService.id,
        date: data.date,
        time: data.time
      };

      const result = createAppointment(bookingData);

      if (result.success && result.appointment) {
        // Send email notification
        const salon = getSalonById(selectedSalon.id);
        const service = getServiceById(selectedService.id);
        
        if (salon && service) {
          const emailResult = await sendBookingConfirmationEmail({
            userName: result.appointment.userName,
            userEmail: result.appointment.userEmail,
            cityName: selectedCity.name,
            salonName: salon.name,
            salonLocation: salon.location,
            serviceName: service.serviceName,
            servicePrice: service.price,
            date: data.date,
            time: data.time
          });

          if (emailResult.success) {
            toast.success(result.message, { duration: 5000 });
            toast.info(emailResult.message, { duration: 4000 });
          } else {
            toast.success(result.message, { duration: 5000 });
            toast.warning('Booking confirmed, but email notification failed', { duration: 3000 });
          }
        } else {
          toast.success(result.message, { duration: 5000 });
        }
        
        // Reset wizard
        setTimeout(() => {
          setStep(1);
          setSelectedCity(null);
          setSelectedSalon(null);
          setSelectedService(null);
        }, 2000);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      if (step === 2) {
        setSelectedCity(null);
        setSelectedSalon(null);
        setSelectedService(null);
      } else if (step === 3) {
        setSelectedSalon(null);
        setSelectedService(null);
      } else if (step === 4) {
        setSelectedService(null);
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Progress indicator */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  s <= step
                    ? 'bg-gold text-gold-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {s}
              </div>
              {s < 4 && (
                <div
                  className={`flex-1 h-1 mx-2 transition-all ${
                    s < step ? 'bg-gold' : 'bg-muted'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>City</span>
          <span>Salon</span>
          <span>Service</span>
          <span>Details</span>
        </div>
      </div>

      {/* Back button */}
      {step > 1 && (
        <div className="max-w-4xl mx-auto">
          <Button variant="outline" onClick={handleBack} className="border-gold hover:bg-gold/10">
            ← Back
          </Button>
        </div>
      )}

      {/* Step content */}
      <div className="min-h-[400px]">
        {step === 1 && (
          <CitySearch onCitySelect={handleCitySelect} selectedCity={selectedCity} />
        )}

        {step === 2 && selectedCity && (
          <SalonList
            city={selectedCity}
            onSalonSelect={handleSalonSelect}
            selectedSalon={selectedSalon}
          />
        )}

        {step === 3 && selectedSalon && (
          <ServiceSelector
            salon={selectedSalon}
            onServiceSelect={handleServiceSelect}
            selectedService={selectedService}
          />
        )}

        {step === 4 && selectedCity && selectedSalon && selectedService && (
          <BookingDetailsForm
            city={selectedCity}
            salon={selectedSalon}
            service={selectedService}
            onSubmit={handleBookingSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
};

export default BookingWizard;
