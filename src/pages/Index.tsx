import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { ChatInterface } from '@/components/ChatInterface';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Utensils, Clock, MapPin, FileText, Users } from 'lucide-react';
import campusLibrary from '@/assets/campus-library.jpg';

const Index = () => {
  const [showChat, setShowChat] = useState(false);

  const handleStartChat = () => {
    setShowChat(true);
  };

  const handleBackToHome = () => {
    setShowChat(false);
  };

  if (showChat) {
    return (
      <div className="min-h-screen">
        <Navigation onStartChat={handleStartChat} isInChat={true} />
        
        {/* Chat Layout */}
        <div className="pt-20 min-h-screen">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${campusLibrary})` }}
          />
          
          <div className="relative z-10 container mx-auto px-6 py-8">
            <div className="max-w-4xl mx-auto">
              {/* Chat Header */}
              <div className="mb-6">
                <Button 
                  variant="ghost" 
                  onClick={handleBackToHome}
                  className="mb-4 text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
                
                <div className="text-center mb-6">
                  <h1 className="text-3xl font-bold text-foreground mb-2">Smart Campus Assistant</h1>
                  <p className="text-muted-foreground">Ask me anything about campus life, services, and facilities</p>
                </div>
              </div>

              {/* Chat Interface */}
              <ChatInterface />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation onStartChat={handleStartChat} isInChat={false} />
      
      {/* Hero Section */}
      <HeroSection onStartChat={handleStartChat} />
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Know About Campus
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI assistant provides instant, accurate information across all campus services
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Clock className="w-8 h-8" />,
                title: "Class Schedules",
                description: "Get your timetable, exam dates, and real-time schedule updates"
              },
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: "Library Services",
                description: "Find books, check hours, book study rooms, and access resources"
              },
              {
                icon: <Utensils className="w-8 h-8" />,
                title: "Dining Options",
                description: "View menus, check opening hours, and find meal plan information"
              },
              {
                icon: <MapPin className="w-8 h-8" />,
                title: "Campus Facilities",
                description: "Locate buildings, book labs, find parking, and access services"
              },
              {
                icon: <FileText className="w-8 h-8" />,
                title: "Administrative Help",
                description: "Forms, registration, fees, admissions, and procedural guidance"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Student Support",
                description: "Health services, counseling, academic support, and emergency contacts"
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
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-campus text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join thousands of students, staff, and visitors who use our Smart Campus Assistant daily
          </p>
          <Button 
            size="lg"
            onClick={handleStartChat}
            className="bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-8 py-3 text-lg font-semibold"
          >
            Start Your Conversation
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
