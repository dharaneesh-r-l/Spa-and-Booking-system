import React from 'react';
import Hero from '@/components/spa/Hero';
import Services from '@/components/spa/Services';
import BookingForm from '@/components/spa/BookingForm';
import Footer from '@/components/spa/Footer';

const HomePage: React.FC = () => {
  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <Hero onBookNow={scrollToBooking} />
      <Services />
      <BookingForm />
      <Footer />
    </div>
  );
};

export default HomePage;
