import React from 'react';
import { Button } from '@/components/ui/button';
import { GraduationCap, MessageCircle, Sparkles } from 'lucide-react';
import campusHero from '@/assets/campus-hero.jpg';

interface HeroSectionProps {
  onStartChat: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartChat }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${campusHero})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-bounce">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center backdrop-blur">
          <GraduationCap className="w-8 h-8 text-primary" />
        </div>
      </div>
      <div className="absolute bottom-32 right-16 animate-pulse">
        <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center backdrop-blur">
          <Sparkles className="w-6 h-6 text-accent-foreground" />
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="mb-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur px-4 py-2 rounded-full text-sm text-primary font-medium mb-6">
            <MessageCircle className="w-4 h-4" />
            AI-Powered Campus Assistant
          </div>
        </div>
        
        <h1 className="campus-title mb-6 animate-fade-in-up">
          Smart Campus
          <br />
          Assistant
        </h1>
        
        <p className="campus-subtitle mb-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Get instant answers about class schedules, library services, dining options, 
          campus facilities, and administrative procedures. Your 24/7 campus companion.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Button 
            size="lg"
            onClick={onStartChat}
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-elevated hover:shadow-campus transition-all duration-300 transform hover:scale-105 px-8 py-3 text-lg font-semibold"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Start Chatting
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="bg-background/10 backdrop-blur border-primary/30 text-foreground hover:bg-background/20 hover:border-primary/50 transition-all duration-300 px-8 py-3 text-lg"
          >
            <GraduationCap className="w-5 h-5 mr-2" />
            Learn More
          </Button>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          {[
            '📚 Library Services',
            '🍽️ Dining Options', 
            '📅 Class Schedules',
            '🏢 Campus Facilities',
            '📋 Admin Support'
          ].map((feature, index) => (
            <div 
              key={index}
              className="bg-background/10 backdrop-blur px-4 py-2 rounded-full text-sm text-foreground border border-primary/20 hover:border-primary/40 transition-all duration-300"
            >
              {feature}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
      `}</style>
    </div>
  );
};