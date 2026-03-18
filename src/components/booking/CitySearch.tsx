import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { searchCities } from '@/services/cityService';
import type { City } from '@/types/index';

interface CitySearchProps {
  onCitySelect: (city: City) => void;
  selectedCity: City | null;
}

const CitySearch: React.FC<CitySearchProps> = ({ onCitySelect, selectedCity }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cities, setCities] = useState<City[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // Load all cities initially
    const allCities = searchCities('');
    setCities(allCities);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const results = searchCities(query);
    setCities(results);
    setShowResults(true);
  };

  const handleCitySelect = (city: City) => {
    onCitySelect(city);
    setSearchQuery(city.name);
    setShowResults(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="border-2 border-gold/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl">
            Select Your <span className="gradient-text">City</span>
          </CardTitle>
          <CardDescription>
            Search for your city to discover nearby salons
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for a city (e.g., Chennai, Mumbai, Delhi)..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => setShowResults(true)}
              className="text-lg py-6"
            />
            
            {/* Search results dropdown */}
            {showResults && cities.length > 0 && (
              <div className="absolute z-10 w-full mt-2 bg-card border-2 border-border rounded-lg shadow-lg max-h-64 overflow-y-auto">
                {cities.map((city) => (
                  <button
                    key={city.id}
                    type="button"
                    onClick={() => handleCitySelect(city)}
                    className="w-full text-left px-4 py-3 hover:bg-accent transition-colors border-b border-border last:border-b-0"
                  >
                    <span className="font-medium">{city.name}</span>
                  </button>
                ))}
              </div>
            )}
            
            {/* No results message */}
            {showResults && searchQuery && cities.length === 0 && (
              <div className="absolute z-10 w-full mt-2 bg-card border-2 border-border rounded-lg shadow-lg p-4">
                <p className="text-muted-foreground text-center">
                  No cities found. Try a different search term.
                </p>
              </div>
            )}
          </div>

          {/* Selected city display */}
          {selectedCity && (
            <div className="p-4 bg-gold/10 border-2 border-gold rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Selected City:</p>
              <p className="text-xl font-bold text-gold">{selectedCity.name}</p>
            </div>
          )}

          {/* Popular cities */}
          {!selectedCity && (
            <div className="pt-4">
              <p className="text-sm text-muted-foreground mb-3">Popular Cities:</p>
              <div className="flex flex-wrap gap-2">
                {cities.slice(0, 5).map((city) => (
                  <Button
                    key={city.id}
                    variant="outline"
                    size="sm"
                    onClick={() => handleCitySelect(city)}
                    className="border-gold/50 hover:bg-gold/10"
                  >
                    {city.name}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CitySearch;
