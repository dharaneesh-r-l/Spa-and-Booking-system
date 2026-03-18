import React, { useEffect } from 'react';
import Hero from '@/components/spa/Hero';
import BookingWizard from '@/components/booking/BookingWizard';
import Footer from '@/components/spa/Footer';
import { initializeSampleData } from '@/data/sampleData';
import { initializeAdminUser } from '@/services/authService';

const HomePage: React.FC = () => {
  useEffect(() => {
    // Initialize sample data and admin user on component mount
    initializeSampleData();
    initializeAdminUser();
  }, []);

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <Hero onBookNow={scrollToBooking} />
      
      {/* Booking Section */}
      <section id="booking" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Book Your <span className="gradient-text">Appointment</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select your city, choose a salon, pick a service, and book your slot
            </p>
          </div>
          
          <BookingWizard />
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HomePage;
