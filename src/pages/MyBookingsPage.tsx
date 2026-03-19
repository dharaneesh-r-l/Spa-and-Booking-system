import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { getAppointmentsByUser, deleteAppointment } from '@/services/appointmentService';
import type { Appointment } from '@/types/index';

const MyBookingsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const loadAppointments = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setIsLoading(true);
    const userAppointments = getAppointmentsByUser(user.id);
    
    // Sort by date and time (most recent first)
    const sorted = userAppointments.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateB.getTime() - dateA.getTime();
    });
    
    setAppointments(sorted);
    setIsLoading(false);
  };

  useEffect(() => {
    loadAppointments();
  }, [user]);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      const success = deleteAppointment(id, user?.id);
      if (success) {
        toast.success('Appointment cancelled successfully');
        loadAppointments();
      } else {
        toast.error('Failed to cancel appointment');
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const isUpcoming = (date: string, time: string) => {
    const appointmentDate = new Date(`${date} ${time}`);
    return appointmentDate > new Date();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-2xl md:text-3xl font-bold">
              My <span className="gradient-text">Bookings</span>
            </h1>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">Loading your bookings...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                My <span className="gradient-text">Bookings</span>
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                View and manage your appointments
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="border-gold hover:bg-gold/10"
              >
                ← Back to Home
              </Button>
              <Button
                variant="destructive"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Your Appointments</CardTitle>
            <CardDescription>
              Total bookings: {appointments.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {appointments.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg font-medium mb-2">No bookings yet</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Start by booking your first spa appointment
                </p>
                <Button
                  onClick={() => navigate('/')}
                  className="bg-gold hover:bg-gold/90 text-gold-foreground"
                >
                  Book Now
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>City</TableHead>
                      <TableHead>Salon</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">{appointment.cityName}</TableCell>
                        <TableCell>{appointment.salonName}</TableCell>
                        <TableCell>{appointment.serviceName}</TableCell>
                        <TableCell>{formatDate(appointment.date)}</TableCell>
                        <TableCell>{appointment.time}</TableCell>
                        <TableCell>
                          {isUpcoming(appointment.date, appointment.time) ? (
                            <Badge className="bg-gold text-gold-foreground">Upcoming</Badge>
                          ) : (
                            <Badge variant="secondary">Completed</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {isUpcoming(appointment.date, appointment.time) && (
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(appointment.id)}
                            >
                              Cancel
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default MyBookingsPage;
