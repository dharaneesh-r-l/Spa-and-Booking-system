import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface HeroProps {
  onBookNow: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBookNow }) => {
  const { isAuthenticated, user, isAdmin, logout } = useAuth();

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center bg-gradient-to-br from-beige via-background to-secondary overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      {/* Navigation Bar */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold gradient-text">
              Spa & Salon
            </Link>
            
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <span className="text-sm text-muted-foreground hidden md:block">
                    Welcome, <span className="font-medium text-foreground">{user?.name}</span>
                  </span>
                  <Link to="/my-bookings">
                    <Button variant="outline" className="border-gold hover:bg-gold/10" asChild>
                      <span>My Bookings</span>
                    </Button>
                  </Link>
                  {isAdmin && (
                    <Link to="/admin">
                      <Button variant="outline" className="border-gold hover:bg-gold/10" asChild>
                        <span>Admin</span>
                      </Button>
                    </Link>
                  )}
                  <Button 
                    variant="outline" 
                    className="border-gold hover:bg-gold/10" 
                    onClick={() => logout()}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" className="border-gold hover:bg-gold/10" asChild>
                      <span>Login</span>
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="bg-gold hover:bg-gold/90 text-gold-foreground" asChild>
                      <span>Register</span>
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="block text-foreground mb-2">Transform Your</span>
            <span className="block gradient-text text-5xl md:text-7xl lg:text-8xl">
              Hair Story
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Experience luxury spa and salon services designed to bring out your natural beauty. 
            Book your transformation today.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              className="bg-gold hover:bg-gold/90 text-gold-foreground px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              onClick={onBookNow}
            >
              Book Appointment
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-gold text-primary hover:bg-gold/10 px-8 py-6 text-lg font-semibold"
              onClick={onBookNow}
            >
              View Services
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-8 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="text-gold text-xl">⭐</span>
              <span>Premium Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gold text-xl">👥</span>
              <span>Expert Stylists</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gold text-xl">🏆</span>
              <span>Award Winning</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
