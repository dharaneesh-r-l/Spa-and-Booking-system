import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { createAppointment } from '@/services/appointmentService';
import { services } from '@/data/services';
import type { BookingFormData } from '@/types/index';

const BookingForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BookingFormData>({
    defaultValues: {
      name: '',
      email: '',
      service: '',
      date: '',
      time: ''
    }
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);

    try {
      // Validate date is not in the past
      const selectedDate = new Date(data.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        toast.error('Please select a future date');
        setIsSubmitting(false);
        return;
      }

      // Create appointment
      const result = createAppointment(data);

      if (result.success) {
        toast.success(result.message);
        form.reset();
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

  return (
    <section id="booking" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-gold/20 shadow-2xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl md:text-4xl font-bold">
                Book Your <span className="gradient-text">Appointment</span>
              </CardTitle>
              <CardDescription className="text-base">
                Fill in the details below to reserve your spot
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

                  {/* Service selection */}
                  <FormField
                    control={form.control}
                    name="service"
                    rules={{ required: 'Please select a service' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem key={service.id} value={service.name}>
                                {service.icon} {service.name} ({service.duration})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                        <FormLabel>Date</FormLabel>
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
                        <FormLabel>Time</FormLabel>
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
                    {isSubmitting ? 'Booking...' : 'Book Appointment'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
