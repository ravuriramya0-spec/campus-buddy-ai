import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, BookOpen, Calendar, MapPin, Settings, Star, Clock, Bell } from 'lucide-react';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'staff' | 'visitor';
  avatar?: string;
  department?: string;
  year?: string;
  enrolledCourses?: string[];
  favorites?: string[];
}

interface PersonalizationProps {
  user: UserProfile | null;
  onLogin: (user: UserProfile) => void;
  onLogout: () => void;
}

const mockUser: UserProfile = {
  id: '1',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@university.edu',
  role: 'student',
  department: 'Computer Science',
  year: '3rd Year',
  enrolledCourses: ['CS-301 Data Structures', 'CS-305 Web Development', 'MATH-201 Calculus III'],
  favorites: ['Library Study Room A', 'CS Lab 2', 'Main Cafeteria']
};

export const PersonalizationPanel: React.FC<PersonalizationProps> = ({ user, onLogin, onLogout }) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app this would authenticate with backend
    onLogin(mockUser);
  };

  if (!user) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center flex items-center gap-2">
            <User className="w-5 h-5" />
            Login to Campus Assistant
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="University Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              Login
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Demo: Use any email/password to login
            </p>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
                <Badge variant="secondary" className="mt-1">
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </Badge>
              </div>
            </div>
            <Button variant="outline" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Today's Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                  <Clock className="w-4 h-4 text-primary" />
                  <div>
                    <p className="font-medium">CS-301 Data Structures</p>
                    <p className="text-sm text-muted-foreground">9:00 AM - Room 301</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                  <Clock className="w-4 h-4 text-primary" />
                  <div>
                    <p className="font-medium">MATH-201 Calculus III</p>
                    <p className="text-sm text-muted-foreground">2:00 PM - Room 105</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Recent Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border border-primary/20 rounded-lg bg-primary/5">
                  <p className="font-medium text-sm">Assignment Due Tomorrow</p>
                  <p className="text-xs text-muted-foreground">CS-305 Project Submission</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-sm">Library Book Ready</p>
                  <p className="text-xs text-muted-foreground">"Clean Code" is available for pickup</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <div className="grid gap-4">
            {user.enrolledCourses?.map((course, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-primary" />
                      <div>
                        <h3 className="font-semibold">{course}</h3>
                        <p className="text-sm text-muted-foreground">Semester Progress: 65%</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="favorites" className="space-y-4">
          <div className="grid gap-4">
            {user.favorites?.map((favorite, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <div>
                        <h3 className="font-semibold">{favorite}</h3>
                        <p className="text-sm text-muted-foreground">Bookmarked location</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        Navigate
                      </Button>
                      <Button variant="ghost" size="sm">Remove</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Profile Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <Input value={user.name} readOnly />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input value={user.email} readOnly />
                </div>
                <div>
                  <label className="text-sm font-medium">Department</label>
                  <Input value={user.department || ''} readOnly />
                </div>
                <div>
                  <label className="text-sm font-medium">Year</label>
                  <Input value={user.year || ''} readOnly />
                </div>
              </div>
              <Button className="bg-primary hover:bg-primary/90">Update Profile</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};