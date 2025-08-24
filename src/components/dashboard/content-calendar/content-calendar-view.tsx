'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock,
  MoreHorizontal 
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ScheduledPost {
  id: string;
  content: string;
  platforms: string[];
  time: string;
  status: 'scheduled' | 'posted' | 'failed';
}

const mockScheduledPosts: Record<string, ScheduledPost[]> = {
  '2024-01-15': [
    {
      id: '1',
      content: 'Morning motivation: Start your week strong! 💪',
      platforms: ['twitter', 'instagram'],
      time: '09:00',
      status: 'scheduled',
    },
    {
      id: '2',
      content: 'New blog post about AI trends in 2024',
      platforms: ['linkedin'],
      time: '14:00',
      status: 'scheduled',
    },
  ],
  '2024-01-16': [
    {
      id: '3',
      content: 'Behind the scenes of our development process',
      platforms: ['instagram', 'facebook'],
      time: '11:00',
      status: 'scheduled',
    },
  ],
  '2024-01-17': [
    {
      id: '4',
      content: 'Weekly tips for social media success',
      platforms: ['twitter', 'linkedin'],
      time: '16:00',
      status: 'scheduled',
    },
  ],
};

function getPlatformColor(platform: string) {
  switch (platform.toLowerCase()) {
    case 'twitter':
      return 'bg-blue-500';
    case 'linkedin':
      return 'bg-blue-700';
    case 'instagram':
      return 'bg-purple-500';
    case 'facebook':
      return 'bg-blue-600';
    default:
      return 'bg-gray-500';
  }
}

function generateCalendarDays() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  
  const days = [];
  const currentDate = new Date(startDate);
  
  for (let i = 0; i < 42; i++) {
    days.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return days;
}

function formatDateKey(date: Date) {
  return date.toISOString().split('T')[0];
}

export function ContentCalendarView() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const calendarDays = generateCalendarDays();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  
  const today = new Date();
  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };
  
  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth.getMonth();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-2xl font-bold">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h2>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Schedule Post
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Content Calendar</span>
          </CardTitle>
          <CardDescription>
            View and manage your scheduled social media posts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((date, index) => {
              const dateKey = formatDateKey(date);
              const posts = mockScheduledPosts[dateKey] || [];
              
              return (
                <div
                  key={index}
                  className={`
                    min-h-[120px] p-2 border rounded-lg
                    ${isCurrentMonth(date) ? 'bg-background' : 'bg-muted/30'}
                    ${isToday(date) ? 'ring-2 ring-primary' : ''}
                  `}
                >
                  <div className={`
                    text-sm font-medium mb-2
                    ${isCurrentMonth(date) ? 'text-foreground' : 'text-muted-foreground'}
                    ${isToday(date) ? 'text-primary font-bold' : ''}
                  `}>
                    {date.getDate()}
                  </div>
                  
                  <div className="space-y-1">
                    {posts.slice(0, 2).map((post) => (
                      <div
                        key={post.id}
                        className="p-1 rounded text-xs bg-primary/10 border cursor-pointer hover:bg-primary/20"
                      >
                        <div className="flex items-center space-x-1 mb-1">
                          <Clock className="h-3 w-3" />
                          <span className="font-medium">{post.time}</span>
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {post.content}
                        </div>
                        <div className="flex space-x-1 mt-1">
                          {post.platforms.slice(0, 2).map((platform) => (
                            <Avatar key={platform} className="h-4 w-4">
                              <AvatarFallback className={`${getPlatformColor(platform)} text-white text-xs`}>
                                {platform.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {post.platforms.length > 2 && (
                            <span className="text-xs text-muted-foreground">
                              +{post.platforms.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                    {posts.length > 2 && (
                      <div className="text-xs text-muted-foreground text-center py-1">
                        +{posts.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
