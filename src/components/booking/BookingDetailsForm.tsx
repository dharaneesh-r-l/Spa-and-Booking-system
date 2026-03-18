import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { City, Salon, Service } from '@/types/index';

interface BookingDetailsFormProps {
  city: City;
  salon: Salon;
  service: Service;
  onSubmit: (data: { name: string; email: string; date: string; time: string }) => void;
  isSubmitting: boolean;
}

interface FormData {
  name: string;
  email: string;
  date: string;
  time: string;
}

const BookingDetailsForm: React.FC<BookingDetailsFormProps> = ({
  city,
  salon,
  service,
  onSubmit,
  isSubmitting
}) => {
  const form = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      date: '',
      time: ''
    }
  });

  // Generate time slots (9 AM to 6 PM, 30-minute intervals)
  const timeSlots: string[] = [];
  for (let hour = 9; hour <= 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      if (hour === 18 && minute > 0) break;
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      timeSlots.push(time);
    }
  }

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = (data: FormData) => {
    // Validate date is not in the past
    const selectedDate = new Date(data.date);
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    if (selectedDate < todayDate) {
      form.setError('date', { message: 'Please select a future date' });
      return;
    }

    onSubmit(data);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="border-2 border-gold/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl">
            Complete Your <span className="gradient-text">Booking</span>
          </CardTitle>
          <CardDescription>
            Fill in your details to confirm the appointment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Booking Summary */}
          <div className="bg-secondary/30 rounded-lg p-4 space-y-2">
            <h3 className="font-bold text-lg mb-3">Booking Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">City:</span>
                <p className="font-medium">{city.name}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Salon:</span>
                <p className="font-medium">{salon.name}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Location:</span>
                <p className="font-medium">{salon.location}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Service:</span>
                <p className="font-medium">{service.serviceName}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Duration:</span>
                <p className="font-medium">{service.duration}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Price:</span>
                <Badge className="bg-gold text-gold-foreground">₹{service.price}</Badge>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              {/* Name field */}
              <FormField
                control={form.control}
                name="name"
                rules={{ required: 'Name is required' }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email field */}
              <FormField
                control={form.control}
                name="email"
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date picker */}
              <FormField
                control={form.control}
                name="date"
                rules={{ required: 'Please select a date' }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Appointment Date</FormLabel>
                    <FormControl>
                      <Input type="date" min={today} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Time selection */}
              <FormField
                control={form.control}
                name="time"
                rules={{ required: 'Please select a time' }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Appointment Time</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a time slot" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit button */}
              <Button
                type="submit"
                className="w-full bg-gold hover:bg-gold/90 text-gold-foreground py-6 text-lg font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Booking...' : 'Confirm Booking'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingDetailsForm;
