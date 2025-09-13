import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock, MapPin, Users, Search, BookOpen, Dumbbell, Microscope } from 'lucide-react';
import { format } from 'date-fns';

interface Facility {
  id: string;
  name: string;
  type: 'study_room' | 'computer_lab' | 'sports' | 'equipment' | 'meeting_room';
  capacity: number;
  amenities: string[];
  hourlyRate?: number;
  location: string;
  availability: { [date: string]: { [time: string]: boolean } };
}

interface Booking {
  id: string;
  facilityId: string;
  facilityName: string;
  date: Date;
  time: string;
  duration: number;
  purpose: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

const mockFacilities: Facility[] = [
  {
    id: '1',
    name: 'Study Room A',
    type: 'study_room',
    capacity: 8,
    amenities: ['Whiteboard', 'WiFi', 'Power Outlets', 'Air Conditioning'],
    location: 'Library Level 2',
    availability: {
      '2024-01-15': { '09:00': true, '10:00': false, '11:00': true, '14:00': true },
      '2024-01-16': { '09:00': true, '10:00': true, '11:00': false, '14:00': true }
    }
  },
  {
    id: '2',
    name: 'Computer Lab 1',
    type: 'computer_lab',
    capacity: 30,
    amenities: ['High-spec PCs', 'Programming Software', 'Projector', 'WiFi'],
    location: 'CS Building Floor 1',
    availability: {
      '2024-01-15': { '09:00': false, '10:00': true, '11:00': true, '14:00': false },
      '2024-01-16': { '09:00': true, '10:00': true, '11:00': true, '14:00': true }
    }
  },
  {
    id: '3',
    name: 'Basketball Court',
    type: 'sports',
    capacity: 20,
    amenities: ['Professional Court', 'Scoreboard', 'Changing Rooms', 'Equipment Storage'],
    hourlyRate: 25,
    location: 'Sports Complex',
    availability: {
      '2024-01-15': { '16:00': true, '17:00': true, '18:00': false, '19:00': true },
      '2024-01-16': { '16:00': false, '17:00': true, '18:00': true, '19:00': true }
    }
  },
  {
    id: '4',
    name: 'Microscopy Lab',
    type: 'equipment',
    capacity: 12,
    amenities: ['Digital Microscopes', 'Sample Preparation Area', 'Image Analysis Software'],
    location: 'Science Building Floor 3',
    availability: {
      '2024-01-15': { '09:00': true, '10:00': true, '13:00': false, '14:00': true },
      '2024-01-16': { '09:00': false, '10:00': true, '13:00': true, '14:00': true }
    }
  }
];

const mockBookings: Booking[] = [
  {
    id: '1',
    facilityId: '1',
    facilityName: 'Study Room A',
    date: new Date('2024-01-15'),
    time: '10:00',
    duration: 2,
    purpose: 'Group project discussion',
    status: 'confirmed'
  },
  {
    id: '2',
    facilityId: '3',
    facilityName: 'Basketball Court',
    date: new Date('2024-01-16'),
    time: '18:00',
    duration: 1,
    purpose: 'Basketball practice',
    status: 'pending'
  }
];

export const FacilityBookingSystem: React.FC = () => {
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [duration, setDuration] = useState<number>(1);
  const [purpose, setPurpose] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'browse' | 'book' | 'my-bookings'>('browse');

  const filteredFacilities = mockFacilities.filter(facility => {
    const matchesSearch = facility.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || facility.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getFacilityIcon = (type: Facility['type']) => {
    const icons = {
      study_room: <BookOpen className="w-5 h-5" />,
      computer_lab: <Microscope className="w-5 h-5" />,
      sports: <Dumbbell className="w-5 h-5" />,
      equipment: <Microscope className="w-5 h-5" />,
      meeting_room: <Users className="w-5 h-5" />
    };
    return icons[type] || <BookOpen className="w-5 h-5" />;
  };

  const getStatusColor = (status: Booking['status']) => {
    const colors = {
      confirmed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status];
  };

  const getAvailableTimeSlots = (facility: Facility, date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const availability = facility.availability[dateStr] || {};
    return Object.entries(availability)
      .filter(([_, available]) => available)
      .map(([time]) => time);
  };

  const handleBooking = () => {
    if (!selectedFacility || !selectedTime) return;
    
    // Mock booking creation
    alert(`Booking request submitted for ${selectedFacility.name} on ${format(selectedDate, 'MMM dd, yyyy')} at ${selectedTime} for ${duration} hour(s)`);
    
    // Reset form
    setSelectedFacility(null);
    setSelectedTime('');
    setPurpose('');
    setActiveTab('my-bookings');
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Facility Booking System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Button
              variant={activeTab === 'browse' ? 'default' : 'outline'}
              onClick={() => setActiveTab('browse')}
            >
              Browse Facilities
            </Button>
            <Button
              variant={activeTab === 'book' ? 'default' : 'outline'}
              onClick={() => setActiveTab('book')}
              disabled={!selectedFacility}
            >
              Book Facility
            </Button>
            <Button
              variant={activeTab === 'my-bookings' ? 'default' : 'outline'}
              onClick={() => setActiveTab('my-bookings')}
            >
              My Bookings
            </Button>
          </div>
        </CardContent>
      </Card>

      {activeTab === 'browse' && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search facilities..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {['all', 'study_room', 'computer_lab', 'sports', 'equipment'].map((type) => (
                    <Button
                      key={type}
                      variant={selectedType === type ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedType(type)}
                      className="capitalize"
                    >
                      {type.replace('_', ' ')}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Facilities Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFacilities.map((facility) => (
              <Card 
                key={facility.id} 
                className={`hover:shadow-lg transition-all cursor-pointer ${
                  selectedFacility?.id === facility.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedFacility(facility)}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="text-primary">
                      {getFacilityIcon(facility.type)}
                    </div>
                    <div>
                      <h3 className="font-semibold">{facility.name}</h3>
                      <p className="text-sm text-muted-foreground capitalize">
                        {facility.type.replace('_', ' ')}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{facility.capacity} people</span>
                    </div>
                    {facility.hourlyRate && (
                      <div className="flex items-center gap-1">
                        <span className="text-primary font-medium">${facility.hourlyRate}/hr</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{facility.location}</span>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Amenities:</p>
                    <div className="flex flex-wrap gap-1">
                      {facility.amenities.slice(0, 3).map((amenity, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                      {facility.amenities.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{facility.amenities.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFacility(facility);
                      setActiveTab('book');
                    }}
                  >
                    Book This Facility
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'book' && selectedFacility && (
        <Card>
          <CardHeader>
            <CardTitle>Book {selectedFacility.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Select Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(selectedDate, 'PPP')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => date && setSelectedDate(date)}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <label className="text-sm font-medium">Available Time Slots</label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {getAvailableTimeSlots(selectedFacility, selectedDate).map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Duration (hours)</label>
                  <Select value={duration.toString()} onValueChange={(value) => setDuration(parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 hour</SelectItem>
                      <SelectItem value="2">2 hours</SelectItem>
                      <SelectItem value="3">3 hours</SelectItem>
                      <SelectItem value="4">4 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Purpose</label>
                  <Textarea
                    placeholder="Brief description of the purpose..."
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Booking Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Facility:</span>
                      <span>{selectedFacility.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span>{format(selectedDate, 'MMM dd, yyyy')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time:</span>
                      <span>{selectedTime || 'Not selected'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span>{duration} hour(s)</span>
                    </div>
                    {selectedFacility.hourlyRate && (
                      <div className="flex justify-between font-medium">
                        <span>Total Cost:</span>
                        <span>${selectedFacility.hourlyRate * duration}</span>
                      </div>
                    )}
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  onClick={handleBooking}
                  disabled={!selectedTime || !purpose.trim()}
                >
                  Confirm Booking
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'my-bookings' && (
        <div className="space-y-4">
          {mockBookings.map((booking) => (
            <Card key={booking.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{booking.facilityName}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{format(booking.date, 'MMM dd, yyyy')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{booking.time} ({booking.duration}h)</span>
                      </div>
                    </div>
                    <p className="text-sm mt-2">{booking.purpose}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      Modify
                    </Button>
                    <Button variant="outline" size="sm">
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};