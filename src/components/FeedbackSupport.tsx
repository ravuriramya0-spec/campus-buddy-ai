import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Star, MessageSquare, AlertCircle, CheckCircle, Clock, Send } from 'lucide-react';

interface FeedbackItem {
  id: string;
  type: 'feedback' | 'issue';
  category: 'dining' | 'facilities' | 'academic' | 'it' | 'maintenance' | 'general';
  title: string;
  content: string;
  rating?: number;
  status: 'submitted' | 'in-progress' | 'resolved' | 'closed';
  date: Date;
  response?: string;
}

const mockFeedback: FeedbackItem[] = [
  {
    id: '1',
    type: 'feedback',
    category: 'dining',
    title: 'Great new vegetarian options',
    content: 'Really appreciate the new plant-based meals in the cafeteria. More variety would be wonderful!',
    rating: 5,
    status: 'resolved',
    date: new Date('2024-01-10'),
    response: 'Thank you for the positive feedback! We\'re planning to add more vegetarian options next month.'
  },
  {
    id: '2',
    type: 'issue',
    category: 'it',
    title: 'WiFi issues in Computer Lab 2',
    content: 'The internet connection keeps dropping during programming sessions. This affects our coursework.',
    status: 'in-progress',
    date: new Date('2024-01-12'),
    response: 'IT department is investigating. Expected resolution by end of week.'
  },
  {
    id: '3',
    type: 'issue',
    category: 'maintenance',
    title: 'Broken air conditioning in Library',
    content: 'Study Room B has no air conditioning. It\'s very uncomfortable during study sessions.',
    status: 'submitted',
    date: new Date('2024-01-14')
  }
];

export const FeedbackSupport: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'submit' | 'my-submissions'>('submit');
  const [feedbackType, setFeedbackType] = useState<'feedback' | 'issue'>('feedback');
  const [category, setCategory] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [rating, setRating] = useState<number>(0);

  const getStatusColor = (status: FeedbackItem['status']) => {
    const colors = {
      submitted: 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800'
    };
    return colors[status];
  };

  const getStatusIcon = (status: FeedbackItem['status']) => {
    const icons = {
      submitted: <Clock className="w-4 h-4" />,
      'in-progress': <AlertCircle className="w-4 h-4" />,
      resolved: <CheckCircle className="w-4 h-4" />,
      closed: <CheckCircle className="w-4 h-4" />
    };
    return icons[status];
  };

  const getCategoryOptions = () => [
    'dining', 'facilities', 'academic', 'it', 'maintenance', 'general'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !title.trim() || !content.trim()) return;

    // Mock submission
    alert(`${feedbackType === 'feedback' ? 'Feedback' : 'Issue'} submitted successfully! You'll receive updates via email.`);
    
    // Reset form
    setCategory('');
    setTitle('');
    setContent('');
    setRating(0);
    setActiveTab('my-submissions');
  };

  const renderStarRating = (currentRating: number, interactive: boolean = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= currentRating 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={interactive ? () => setRating(star) : undefined}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Feedback & Support Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button
              variant={activeTab === 'submit' ? 'default' : 'outline'}
              onClick={() => setActiveTab('submit')}
            >
              Submit Feedback/Issue
            </Button>
            <Button
              variant={activeTab === 'my-submissions' ? 'default' : 'outline'}
              onClick={() => setActiveTab('my-submissions')}
            >
              My Submissions
            </Button>
          </div>
        </CardContent>
      </Card>

      {activeTab === 'submit' && (
        <Card>
          <CardHeader>
            <CardTitle>Submit New {feedbackType === 'feedback' ? 'Feedback' : 'Issue Report'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Type Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Type</label>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant={feedbackType === 'feedback' ? 'default' : 'outline'}
                    onClick={() => setFeedbackType('feedback')}
                    className="flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Feedback
                  </Button>
                  <Button
                    type="button"
                    variant={feedbackType === 'issue' ? 'default' : 'outline'}
                    onClick={() => setFeedbackType('issue')}
                    className="flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4" />
                    Report Issue
                  </Button>
                </div>
              </div>

              {/* Category Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Category</label>
                <div className="grid grid-cols-3 gap-2">
                  {getCategoryOptions().map((cat) => (
                    <Button
                      key={cat}
                      type="button"
                      variant={category === cat ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCategory(cat)}
                      className="capitalize"
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {feedbackType === 'feedback' ? 'Feedback Title' : 'Issue Summary'}
                </label>
                <Input
                  placeholder={feedbackType === 'feedback' ? 'Brief summary of your feedback...' : 'Brief description of the issue...'}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {feedbackType === 'feedback' ? 'Detailed Feedback' : 'Issue Details'}
                </label>
                <Textarea
                  placeholder={feedbackType === 'feedback' 
                    ? 'Please provide detailed feedback about your experience...' 
                    : 'Please describe the issue in detail, including when it occurred and any error messages...'
                  }
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[120px]"
                  required
                />
              </div>

              {/* Rating (for feedback only) */}
              {feedbackType === 'feedback' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Overall Rating</label>
                  <div className="flex items-center gap-3">
                    {renderStarRating(rating, true)}
                    <span className="text-sm text-muted-foreground">
                      {rating > 0 ? `${rating}/5 stars` : 'Click to rate'}
                    </span>
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                <Send className="w-4 h-4 mr-2" />
                Submit {feedbackType === 'feedback' ? 'Feedback' : 'Issue Report'}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {activeTab === 'my-submissions' && (
        <div className="space-y-4">
          {mockFeedback.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <Badge variant="outline" className="capitalize">
                        {item.type}
                      </Badge>
                      <Badge variant="secondary" className="capitalize">
                        {item.category}
                      </Badge>
                    </div>
                    
                    {item.rating && (
                      <div className="flex items-center gap-2 mb-2">
                        {renderStarRating(item.rating)}
                        <span className="text-sm text-muted-foreground">Your rating</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {getStatusIcon(item.status)}
                    <Badge className={getStatusColor(item.status)}>
                      {item.status.replace('-', ' ')}
                    </Badge>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">{item.content}</p>

                {item.response && (
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium text-sm mb-2">Response from Support Team:</h4>
                    <p className="text-sm">{item.response}</p>
                  </div>
                )}

                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <span className="text-sm text-muted-foreground">
                    Submitted on {item.date.toLocaleDateString()}
                  </span>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    {item.status === 'resolved' && (
                      <Button variant="outline" size="sm">
                        Mark as Closed
                      </Button>
                    )}
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