import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-foreground text-background py-8">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold gradient-text">Spa & Salon</h3>
          <p className="text-sm opacity-80">
            Transform your beauty experience with our premium services
          </p>
          <div className="flex justify-center gap-6 text-sm flex-wrap">
            <a href="#" className="hover:text-gold transition-colors">About</a>
            <a href="#" className="hover:text-gold transition-colors">Services</a>
            <a href="#" className="hover:text-gold transition-colors">Contact</a>
            <a href="/admin-login" className="hover:text-gold transition-colors">Admin</a>
          </div>
          
          {/* Setup Information */}
          <div className="pt-4 border-t border-background/20 mt-4">
            <p className="text-xs opacity-60">
              💻 Running locally? Check README.md for Windows CMD setup instructions
            </p>
            <p className="text-xs opacity-60 mt-1">
              📧 Email notifications enabled - Check browser console for email content
            </p>
          </div>
          
          <p className="text-xs opacity-60 pt-2">
            © 2026 Spa & Salon Booking System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
