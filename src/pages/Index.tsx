import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { ChatInterface } from '@/components/ChatInterface';
import { PersonalizationPanel } from '@/components/PersonalizationPanel';
import { InteractiveCampusMap } from '@/components/InteractiveCampusMap';
import { EventsNewsSection } from '@/components/EventsNewsSection';
import { FacilityBookingSystem } from '@/components/FacilityBookingSystem';
import { FeedbackSupport } from '@/components/FeedbackSupport';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Utensils, Clock, MapPin, FileText, Users, User, Calendar, MessageSquare } from 'lucide-react';
import campusLibrary from '@/assets/campus-library.jpg';

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

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'chat' | 'profile' | 'map' | 'events' | 'booking' | 'feedback'>('home');
  const [user, setUser] = useState<UserProfile | null>(null);

  const handleStartChat = () => {
    setCurrentView('chat');
  };

  const handleLogin = (userProfile: UserProfile) => {
    setUser(userProfile);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('home');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
  };

  const renderNavigation = () => (
    <Navigation 
      onStartChat={handleStartChat} 
      isInChat={currentView !== 'home'}
    />
  );

  const renderBackButton = () => (
    <Button 
      variant="ghost" 
      onClick={handleBackToHome}
      className="mb-4 text-muted-foreground hover:text-foreground"
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back to Home
    </Button>
  );

  // Chat View
  if (currentView === 'chat') {
    return (
      <div className="min-h-screen">
        {renderNavigation()}
        
        <div className="pt-20 min-h-screen">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${campusLibrary})` }}
          />
          
          <div className="relative z-10 container mx-auto px-6 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                {renderBackButton()}
                
                <div className="text-center mb-6">
                  <h1 className="text-3xl font-bold text-foreground mb-2">Smart Campus Assistant</h1>
                  <p className="text-muted-foreground">Ask me anything about campus life, services, and facilities</p>
                </div>
              </div>

              <ChatInterface />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Profile View
  if (currentView === 'profile') {
    return (
      <div className="min-h-screen">
        {renderNavigation()}
        
        <div className="pt-20 min-h-screen bg-gradient-chat">
          <div className="container mx-auto px-6 py-8">
            {renderBackButton()}
            
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-foreground mb-2">User Profile & Personalization</h1>
              <p className="text-muted-foreground">Manage your profile, courses, and favorites</p>
            </div>
            
            <PersonalizationPanel 
              user={user} 
              onLogin={handleLogin} 
              onLogout={handleLogout} 
            />
          </div>
        </div>
      </div>
    );
  }

  // Campus Map View
  if (currentView === 'map') {
    return (
      <div className="min-h-screen">
        {renderNavigation()}
        
        <div className="pt-20 min-h-screen bg-gradient-chat">
          <div className="container mx-auto px-6 py-8">
            {renderBackButton()}
            
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-foreground mb-2">Interactive Campus Map</h1>
              <p className="text-muted-foreground">Navigate campus with real-time information and directions</p>
            </div>
            
            <InteractiveCampusMap />
          </div>
        </div>
      </div>
    );
  }

  // Events & News View
  if (currentView === 'events') {
    return (
      <div className="min-h-screen">
        {renderNavigation()}
        
        <div className="pt-20 min-h-screen bg-gradient-chat">
          <div className="container mx-auto px-6 py-8">
            {renderBackButton()}
            
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-foreground mb-2">Campus Events & News</h1>
              <p className="text-muted-foreground">Stay updated with campus events, announcements, and important news</p>
            </div>
            
            <EventsNewsSection />
          </div>
        </div>
      </div>
    );
  }

  // Facility Booking View
  if (currentView === 'booking') {
    return (
      <div className="min-h-screen">
        {renderNavigation()}
        
        <div className="pt-20 min-h-screen bg-gradient-chat">
          <div className="container mx-auto px-6 py-8">
            {renderBackButton()}
            
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-foreground mb-2">Facility Booking System</h1>
              <p className="text-muted-foreground">Reserve study rooms, labs, sports facilities, and equipment</p>
            </div>
            
            <FacilityBookingSystem />
          </div>
        </div>
      </div>
    );
  }

  // Feedback & Support View
  if (currentView === 'feedback') {
    return (
      <div className="min-h-screen">
        {renderNavigation()}
        
        <div className="pt-20 min-h-screen bg-gradient-chat">
          <div className="container mx-auto px-6 py-8">
            {renderBackButton()}
            
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-foreground mb-2">Feedback & Support</h1>
              <p className="text-muted-foreground">Share feedback, report issues, and get support</p>
            </div>
            
            <FeedbackSupport />
          </div>
        </div>
      </div>
    );
  }

  // Home View
  return (
    <div className="min-h-screen">
      {renderNavigation()}
      
      <HeroSection onStartChat={handleStartChat} />
      
      <section id="features" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Comprehensive Campus Assistant Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the future of campus interaction with AI-powered personalization, real-time information, and seamless service integration
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <User className="w-8 h-8" />,
                title: "User Personalization",
                description: "Personalized dashboard, profile management, course tracking, and favorite locations",
                action: () => setCurrentView('profile'),
                buttonText: "Manage Profile"
              },
              {
                icon: <MapPin className="w-8 h-8" />,
                title: "Interactive Campus Map",
                description: "Real-time navigation, facility occupancy, clickable locations, and smart directions",
                action: () => setCurrentView('map'),
                buttonText: "Explore Map"
              },
              {
                icon: <Calendar className="w-8 h-8" />,
                title: "Events & News Hub",
                description: "Campus events, workshops, announcements, and personalized notifications",
                action: () => setCurrentView('events'),
                buttonText: "View Events"
              },
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: "Smart Facility Booking",
                description: "Reserve study rooms, labs, sports facilities with real-time availability",
                action: () => setCurrentView('booking'),
                buttonText: "Book Now"
              },
              {
                icon: <MessageSquare className="w-8 h-8" />,
                title: "AI-Powered Chat",
                description: "Voice commands, smart suggestions, FAQ auto-responder, and contextual help",
                action: handleStartChat,
                buttonText: "Start Chatting"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Feedback & Support",
                description: "Submit feedback, report issues, track requests, and get campus support",
                action: () => setCurrentView('feedback'),
                buttonText: "Get Support"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-card p-6 rounded-2xl shadow-campus hover:shadow-elevated transition-all duration-300 group border border-border/20"
              >
                <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <Button 
                  onClick={feature.action}
                  variant="outline" 
                  size="sm"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                >
                  {feature.buttonText}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-campus text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Campus Experience?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join thousands using our comprehensive Smart Campus Assistant for personalized, AI-powered campus support
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={handleStartChat}
              className="bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-8 py-3 text-lg font-semibold"
            >
              Start Your Conversation
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => setCurrentView('profile')}
              className="border-white text-white hover:bg-white hover:text-primary transition-all duration-300 px-8 py-3 text-lg font-semibold"
            >
              Create Your Profile
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
