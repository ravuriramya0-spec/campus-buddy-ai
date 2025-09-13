import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send, Bot, User, Clock, MapPin, BookOpen, Utensils, Building2 } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface QuickReply {
  text: string;
  icon: React.ReactNode;
  category: string;
}

const quickReplies: QuickReply[] = [
  { text: "Library hours", icon: <BookOpen className="w-4 h-4" />, category: "library" },
  { text: "Dining menu", icon: <Utensils className="w-4 h-4" />, category: "dining" },
  { text: "Class schedule", icon: <Clock className="w-4 h-4" />, category: "schedule" },
  { text: "Campus map", icon: <MapPin className="w-4 h-4" />, category: "facilities" },
  { text: "Lab booking", icon: <Building2 className="w-4 h-4" />, category: "facilities" },
];

// Mock responses for demonstration
const mockResponses: Record<string, string> = {
  "library hours": "📚 The campus library is open:\n• Monday-Friday: 7:00 AM - 11:00 PM\n• Saturday: 9:00 AM - 9:00 PM\n• Sunday: 10:00 AM - 10:00 PM\n\nStudy rooms can be booked online through the library portal.",
  "dining menu": "🍽️ Today's dining options:\n\n**Main Cafeteria:**\n• Grilled chicken with rice\n• Vegetarian pasta\n• Fresh salad bar\n\n**Food Court:**\n• Pizza corner (11 AM - 9 PM)\n• Sandwich station (8 AM - 6 PM)\n• Coffee shop (7 AM - 8 PM)",
  "class schedule": "📅 To check your class schedule:\n1. Log into the student portal\n2. Navigate to 'Academic' → 'Schedule'\n3. Select current semester\n\nFor quick access, download the Campus Mobile app for real-time schedule updates and notifications.",
  "campus map": "🗺️ Campus navigation help:\n• Interactive map: campus.edu/map\n• Main buildings: Academic Center (AC), Library (LB), Student Center (SC)\n• Parking: Lots A-D available, Lot A closest to main campus\n• Emergency phones located every 100 meters on main pathways",
  "lab booking": "🔬 Lab booking system:\n• Computer labs: Book through IT portal\n• Science labs: Contact department directly\n• Available slots: Check real-time availability\n• Booking window: Up to 7 days in advance\n\nNeed help with specific lab requirements? Let me know which type of lab you need!"
};

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your Smart Campus Assistant. I can help you with class schedules, library services, dining options, campus facilities, and administrative procedures. What would you like to know?",
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for keyword matches
    for (const [key, response] of Object.entries(mockResponses)) {
      if (lowerMessage.includes(key.toLowerCase())) {
        return response;
      }
    }
    
    // Generic helpful response
    return "I'm here to help with campus information! I can assist you with:\n\n🕒 **Schedules** - Class times, exam dates, events\n📚 **Library** - Hours, book search, study rooms\n🍽️ **Dining** - Menus, hours, meal plans\n🏢 **Facilities** - Labs, sports, parking, health center\n📋 **Admin** - Forms, registration, procedures\n\nTry asking about library hours, dining options, or use the quick buttons below!";
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(content),
        sender: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickReply = (reply: QuickReply) => {
    handleSendMessage(reply.text);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  return (
    <Card className="flex flex-col h-full max-h-[600px] shadow-elevated border-0 bg-card/95 backdrop-blur">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} chat-bubble-enter`}
          >
            <div className={`flex items-start gap-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                message.sender === 'user' 
                  ? 'bg-chat-user text-chat-user-foreground' 
                  : 'bg-chat-assistant text-chat-assistant-foreground'
              }`}>
                {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`rounded-2xl px-4 py-3 shadow-chat transition-all duration-200 hover:shadow-md ${
                message.sender === 'user'
                  ? 'bg-chat-user text-chat-user-foreground'
                  : 'bg-chat-assistant text-chat-assistant-foreground border border-border/20'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start chat-bubble-enter">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-chat-assistant text-chat-assistant-foreground flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-chat-assistant text-chat-assistant-foreground rounded-2xl px-4 py-3 border border-border/20">
                <div className="flex gap-1 typing-indicator">
                  <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      <div className="px-4 py-2 border-t border-border/20">
        <p className="text-sm text-muted-foreground mb-2">Quick questions:</p>
        <div className="flex flex-wrap gap-2">
          {quickReplies.map((reply, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleQuickReply(reply)}
              className="text-xs h-8 bg-secondary/50 hover:bg-secondary border-border/30 hover:border-border/50 transition-all duration-200"
            >
              {reply.icon}
              <span className="ml-1">{reply.text}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-border/20">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about campus..."
            className="flex-1 bg-secondary/30 border-border/30 focus:border-primary/50 focus:bg-background transition-all duration-200"
            disabled={isTyping}
          />
          <Button 
            type="submit" 
            size="icon"
            disabled={!input.trim() || isTyping}
            className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </Card>
  );
};