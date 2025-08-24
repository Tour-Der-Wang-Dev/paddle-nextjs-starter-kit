'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, MessageCircle, Heart, Share2 } from 'lucide-react';

interface RecentPost {
  id: string;
  content: string;
  platform: string;
  timeAgo: string;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
  status: 'posted' | 'scheduled' | 'failed';
}

const mockRecentPosts: RecentPost[] = [
  {
    id: '1',
    content: 'Just launched our new AI-powered social media dashboard! 🚀',
    platform: 'Twitter',
    timeAgo: '2 hours ago',
    engagement: { likes: 24, comments: 8, shares: 5 },
    status: 'posted',
  },
  {
    id: '2',
    content: 'Behind the scenes of our development process...',
    platform: 'LinkedIn',
    timeAgo: '5 hours ago',
    engagement: { likes: 156, comments: 23, shares: 12 },
    status: 'posted',
  },
  {
    id: '3',
    content: 'Exciting announcement coming tomorrow! Stay tuned 👀',
    platform: 'Instagram',
    timeAgo: 'Tomorrow at 9:00 AM',
    engagement: { likes: 0, comments: 0, shares: 0 },
    status: 'scheduled',
  },
];

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

function getStatusColor(status: string) {
  switch (status) {
    case 'posted':
      return 'bg-green-500';
    case 'scheduled':
      return 'bg-yellow-500';
    case 'failed':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
}

export function RecentPostsActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest posts and their performance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockRecentPosts.map((post) => (
          <div key={post.id} className="flex items-start space-x-4 p-3 rounded-lg border">
            <Avatar className="h-8 w-8">
              <AvatarFallback className={getPlatformColor(post.platform)}>
                {post.platform.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{post.platform}</p>
                <Badge variant="outline" className={`text-xs ${getStatusColor(post.status)} text-white`}>
                  {post.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{post.content}</p>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{post.timeAgo}</span>
                </div>
                {post.status === 'posted' && (
                  <>
                    <div className="flex items-center space-x-1">
                      <Heart className="h-3 w-3" />
                      <span>{post.engagement.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-3 w-3" />
                      <span>{post.engagement.comments}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Share2 className="h-3 w-3" />
                      <span>{post.engagement.shares}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
