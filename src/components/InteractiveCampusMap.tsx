import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MapPin, Navigation, Clock, Users, Search, Bookmark } from 'lucide-react';

interface CampusLocation {
  id: string;
  name: string;
  type: 'academic' | 'library' | 'dining' | 'sports' | 'hostel' | 'parking' | 'admin';
  coordinates: [number, number];
  capacity?: number;
  currentOccupancy?: number;
  status: 'open' | 'closed' | 'busy';
  hours?: string;
  description?: string;
}

const mockLocations: CampusLocation[] = [
  {
    id: '1',
    name: 'Main Library',
    type: 'library',
    coordinates: [0, 0],
    capacity: 300,
    currentOccupancy: 180,
    status: 'open',
    hours: '7:00 AM - 11:00 PM',
    description: 'Central campus library with study rooms and computer labs'
  },
  {
    id: '2',
    name: 'Computer Science Building',
    type: 'academic',
    coordinates: [100, -50],
    capacity: 150,
    currentOccupancy: 45,
    status: 'open',
    hours: '6:00 AM - 10:00 PM',
    description: 'CS classrooms, labs, and faculty offices'
  },
  {
    id: '3',
    name: 'Main Cafeteria',
    type: 'dining',
    coordinates: [-80, 30],
    capacity: 200,
    currentOccupancy: 85,
    status: 'open',
    hours: '7:00 AM - 9:00 PM',
    description: 'Primary dining hall with diverse food options'
  },
  {
    id: '4',
    name: 'Sports Complex',
    type: 'sports',
    coordinates: [150, 100],
    capacity: 100,
    currentOccupancy: 25,
    status: 'open',
    hours: '5:00 AM - 11:00 PM',
    description: 'Gym, pool, and sports facilities'
  },
  {
    id: '5',
    name: 'North Parking',
    type: 'parking',
    coordinates: [-150, -100],
    capacity: 500,
    currentOccupancy: 320,
    status: 'open',
    hours: '24/7',
    description: 'Main parking area for students and staff'
  },
  {
    id: '6',
    name: 'Student Housing A',
    type: 'hostel',
    coordinates: [80, 150],
    status: 'open',
    hours: '24/7',
    description: 'Residential halls for undergraduate students'
  }
];

export const InteractiveCampusMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedLocation, setSelectedLocation] = useState<CampusLocation | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [userLocation, setUserLocation] = useState<[number, number]>([0, 0]);

  const filteredLocations = mockLocations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || location.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status: CampusLocation['status']) => {
    switch (status) {
      case 'open': return 'bg-green-500';
      case 'closed': return 'bg-red-500';
      case 'busy': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getOccupancyLevel = (location: CampusLocation) => {
    if (!location.capacity || !location.currentOccupancy) return 'N/A';
    const percentage = (location.currentOccupancy / location.capacity) * 100;
    return `${Math.round(percentage)}%`;
  };

  const getDirections = (from: [number, number], to: [number, number]) => {
    // Mock direction calculation
    const distance = Math.sqrt(Math.pow(to[0] - from[0], 2) + Math.pow(to[1] - from[1], 2));
    return `${Math.round(distance / 10)} min walk`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Interactive Campus Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {['all', 'academic', 'library', 'dining', 'sports', 'parking'].map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                  className="capitalize"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div 
                ref={mapRef}
                className="relative w-full h-96 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border overflow-hidden"
              >
                {/* Mock Campus Map */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
                  {/* Campus Pathways */}
                  <svg className="absolute inset-0 w-full h-full">
                    <path
                      d="M 50 200 Q 200 100 350 200 T 550 200"
                      stroke="#10b981"
                      strokeWidth="4"
                      fill="none"
                      className="opacity-30"
                    />
                    <path
                      d="M 200 50 Q 200 200 200 350"
                      stroke="#10b981"
                      strokeWidth="4"
                      fill="none"
                      className="opacity-30"
                    />
                  </svg>

                  {/* Location Markers */}
                  {filteredLocations.map((location) => (
                    <div
                      key={location.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110"
                      style={{
                        left: `${50 + location.coordinates[0] / 4}%`,
                        top: `${50 + location.coordinates[1] / 4}%`,
                      }}
                      onClick={() => setSelectedLocation(location)}
                    >
                      <div className={`w-4 h-4 rounded-full ${getStatusColor(location.status)} border-2 border-white shadow-lg`} />
                      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 text-xs font-medium text-center min-w-max">
                        <div className="bg-white px-2 py-1 rounded shadow-md border">
                          {location.name}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* User Location */}
                  <div
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${50 + userLocation[0] / 4}%`,
                      top: `${50 + userLocation[1] / 4}%`,
                    }}
                  >
                    <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs font-medium">
                      <div className="bg-blue-500 text-white px-2 py-1 rounded shadow-md">
                        You
                      </div>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md">
                  <div className="text-xs font-medium mb-2">Status</div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-xs">Open</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-xs">Busy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-xs">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Location Details */}
        <div className="space-y-4">
          {selectedLocation ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{selectedLocation.name}</span>
                  <Button variant="ghost" size="sm">
                    <Bookmark className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant={selectedLocation.status === 'open' ? 'default' : 'secondary'}>
                    {selectedLocation.status}
                  </Badge>
                  <Badge variant="outline" className="capitalize">
                    {selectedLocation.type}
                  </Badge>
                </div>

                {selectedLocation.description && (
                  <p className="text-sm text-muted-foreground">
                    {selectedLocation.description}
                  </p>
                )}

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{selectedLocation.hours}</span>
                  </div>

                  {selectedLocation.capacity && (
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">
                        Occupancy: {selectedLocation.currentOccupancy}/{selectedLocation.capacity} 
                        ({getOccupancyLevel(selectedLocation)})
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      {getDirections(userLocation, selectedLocation.coordinates)}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    <Navigation className="w-4 h-4 mr-1" />
                    Get Directions
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bookmark className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Click on a location marker to see details and get directions
                </p>
              </CardContent>
            </Card>
          )}

          {/* Quick Access Locations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Access</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {mockLocations.slice(0, 4).map((location) => (
                <Button
                  key={location.id}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setSelectedLocation(location)}
                >
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(location.status)} mr-2`} />
                  {location.name}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};