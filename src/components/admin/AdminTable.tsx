import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { getAllAppointments, deleteAppointment } from '@/services/appointmentService';
import type { Appointment } from '@/types/index';

const AdminTable: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadAppointments = () => {
    setIsLoading(true);
    const data = getAllAppointments();
    // Sort by date and time (most recent first)
    const sorted = data.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateB.getTime() - dateA.getTime();
    });
    setAppointments(sorted);
    setIsLoading(false);
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      const success = deleteAppointment(id);
      if (success) {
        toast.success('Appointment deleted successfully');
        loadAppointments();
      } else {
        toast.error('Failed to delete appointment');
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
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Loading appointments...</p>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center space-y-2">
            <p className="text-lg font-medium">No appointments yet</p>
            <p className="text-sm text-muted-foreground">
              Appointments will appear here once customers start booking
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Appointments</CardTitle>
        <CardDescription>
          Total bookings: {appointments.length}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
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
                  <TableCell className="font-medium">{appointment.name}</TableCell>
                  <TableCell>{appointment.email}</TableCell>
                  <TableCell>{appointment.service}</TableCell>
                  <TableCell>{formatDate(appointment.date)}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>
                    {isUpcoming(appointment.date, appointment.time) ? (
                      <Badge className="bg-gold text-gold-foreground">Upcoming</Badge>
                    ) : (
                      <Badge variant="secondary">Past</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(appointment.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminTable;
