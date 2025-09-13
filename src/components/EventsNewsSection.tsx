import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Bell, Users, MapPin, Clock, Search, Filter } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  type: 'workshop' | 'seminar' | 'exam' | 'social' | 'sports' | 'admin';
  date: Date;
  time: string;
  location: string;
  description: string;
  organizer: string;
  capacity?: number;
  registered?: number;
  isRegistered?: boolean;
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'academic' | 'administrative' | 'emergency' | 'general';
  date: Date;
  author: string;
  priority: 'low' | 'medium' | 'high';
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'React Workshop: Building Modern Web Apps',
    type: 'workshop',
    date: new Date('2024-01-15'),
    time: '2:00 PM - 4:00 PM',
    location: 'CS Lab 2',
    description: 'Learn the fundamentals of React and build your first interactive web application.',
    organizer: 'Computer Science Department',
    capacity: 30,
    registered: 18,
    isRegistered: false
  },
  {
    id: '2',
    title: 'Final Exam - Data Structures',
    type: 'exam',
    date: new Date('2024-01-20'),
    time: '9:00 AM - 12:00 PM',
    location: 'Main Auditorium',
    description: 'Comprehensive exam covering all topics from the semester.',
    organizer: 'Prof. Johnson',
    capacity: 150,
    registered: 142
  },
  {
    id: '3',
    title: 'Career Fair 2024',
    type: 'social',
    date: new Date('2024-01-25'),
    time: '10:00 AM - 6:00 PM',
    location: 'Student Center',
    description: 'Meet potential employers and explore career opportunities.',
    organizer: 'Career Services',
    capacity: 500,
    registered: 287
  },
  {
    id: '4',
    title: 'Basketball Championship',
    type: 'sports',
    date: new Date('2024-01-18'),
    time: '7:00 PM - 9:00 PM',
    location: 'Sports Complex',
    description: 'Annual basketball championship finals.',
    organizer: 'Sports Department',
    capacity: 200,
    registered: 156
  }
];

const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Library Extended Hours During Exam Week',
    content: 'The main library will be open 24/7 starting January 15th through January 30th to support students during final exams.',
    type: 'academic',
    date: new Date('2024-01-10'),
    author: 'Library Administration',
    priority: 'medium'
  },
  {
    id: '2',
    title: 'Parking Lot Maintenance - January 22nd',
    content: 'North parking lot will be closed for maintenance on January 22nd. Please use alternative parking areas.',
    type: 'administrative',
    date: new Date('2024-01-12'),
    author: 'Facilities Management',
    priority: 'high'
  },
  {
    id: '3',
    title: 'New Food Trucks on Campus',
    content: 'Two new food trucks will be available near the student center starting Monday. Enjoy diverse dining options!',
    type: 'general',
    date: new Date('2024-01-11'),
    author: 'Student Affairs',
    priority: 'low'
  }
];

export const EventsNewsSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEventType, setSelectedEventType] = useState<string>('all');
  const [selectedAnnouncementType, setSelectedAnnouncementType] = useState<string>('all');

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedEventType === 'all' || event.type === selectedEventType;
    return matchesSearch && matchesType;
  });

  const filteredAnnouncements = mockAnnouncements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedAnnouncementType === 'all' || announcement.type === selectedAnnouncementType;
    return matchesSearch && matchesType;
  });

  const getEventTypeColor = (type: Event['type']) => {
    const colors = {
      workshop: 'bg-blue-100 text-blue-800',
      seminar: 'bg-purple-100 text-purple-800',
      exam: 'bg-red-100 text-red-800',
      social: 'bg-green-100 text-green-800',
      sports: 'bg-orange-100 text-orange-800',
      admin: 'bg-gray-100 text-gray-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: Announcement['priority']) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };
    return colors[priority];
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const isUpcoming = (date: Date) => {
    return date > new Date();
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Campus Events & News
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search events and announcements..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="events" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="events">Upcoming Events</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="space-y-6">
          {/* Event Filters */}
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedEventType === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedEventType('all')}
            >
              All Events
            </Button>
            {['workshop', 'seminar', 'exam', 'social', 'sports'].map((type) => (
              <Button
                key={type}
                variant={selectedEventType === type ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedEventType(type)}
                className="capitalize"
              >
                {type}
              </Button>
            ))}
          </div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg leading-tight">{event.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{event.organizer}</p>
                    </div>
                    <Badge className={getEventTypeColor(event.type)}>
                      {event.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className={isUpcoming(event.date) ? 'text-primary font-medium' : 'text-muted-foreground'}>
                        {formatDate(event.date)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{event.location}</span>
                    </div>
                    {event.capacity && (
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{event.registered}/{event.capacity} registered</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      size="sm" 
                      className={event.isRegistered ? 'bg-green-600 hover:bg-green-700' : 'bg-primary hover:bg-primary/90'}
                      disabled={event.type === 'exam'}
                    >
                      {event.isRegistered ? 'Registered' : 'Register'}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Bell className="w-4 h-4 mr-1" />
                      Remind Me
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="announcements" className="space-y-6">
          {/* Announcement Filters */}
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedAnnouncementType === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedAnnouncementType('all')}
            >
              All Announcements
            </Button>
            {['academic', 'administrative', 'emergency', 'general'].map((type) => (
              <Button
                key={type}
                variant={selectedAnnouncementType === type ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedAnnouncementType(type)}
                className="capitalize"
              >
                {type}
              </Button>
            ))}
          </div>

          {/* Announcements List */}
          <div className="space-y-4">
            {filteredAnnouncements.map((announcement) => (
              <Card key={announcement.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-lg">{announcement.title}</h3>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="capitalize">
                        {announcement.type}
                      </Badge>
                      <Badge className={getPriorityColor(announcement.priority)}>
                        {announcement.priority}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{announcement.content}</p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>By {announcement.author}</span>
                    <span>{formatDate(announcement.date)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};