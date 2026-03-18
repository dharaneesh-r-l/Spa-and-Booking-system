import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { getAllAppointments, deleteAppointment } from '@/services/appointmentService';
import { getAllCities } from '@/services/cityService';
import type { Appointment, City } from '@/types/index';

const AdminTable: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cities, setCities] = useState<City[]>([]);
  const [filterCity, setFilterCity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

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
    setFilteredAppointments(sorted);
    setIsLoading(false);
  };

  useEffect(() => {
    loadAppointments();
    const allCities = getAllCities();
    setCities(allCities);
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = [...appointments];

    // Filter by city
    if (filterCity !== 'all') {
      filtered = filtered.filter(apt => apt.cityId === filterCity);
    }

    // Filter by search query (name, email, salon, service)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(apt =>
        apt.name.toLowerCase().includes(query) ||
        apt.email.toLowerCase().includes(query) ||
        apt.salonName.toLowerCase().includes(query) ||
        apt.serviceName.toLowerCase().includes(query)
      );
    }

    setFilteredAppointments(filtered);
  }, [filterCity, searchQuery, appointments]);

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Appointments</CardTitle>
        <CardDescription>
          Total bookings: {appointments.length} | Showing: {filteredAppointments.length}
        </CardDescription>
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 pt-4">
          <div className="flex-1">
            <Input
              placeholder="Search by name, email, salon, or service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="w-full md:w-64">
            <Select value={filterCity} onValueChange={setFilterCity}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city.id} value={city.id}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredAppointments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg font-medium">No appointments found</p>
            <p className="text-sm text-muted-foreground mt-2">
              {appointments.length === 0
                ? 'Appointments will appear here once customers start booking'
                : 'Try adjusting your filters'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
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
                {filteredAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell className="font-medium">{appointment.name}</TableCell>
                    <TableCell>{appointment.email}</TableCell>
                    <TableCell>{appointment.cityName}</TableCell>
                    <TableCell>{appointment.salonName}</TableCell>
                    <TableCell>{appointment.serviceName}</TableCell>
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
        )}
      </CardContent>
    </Card>
  );
};

export default AdminTable;
