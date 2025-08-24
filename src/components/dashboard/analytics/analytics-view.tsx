'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Heart,
  MessageCircle,
  Share2,
  Eye,
  Calendar,
  Download,
} from 'lucide-react';

interface AnalyticsMetric {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ReactNode;
}

interface PlatformPerformance {
  platform: string;
  icon: string;
  followers: number;
  engagement: number;
  posts: number;
  reach: number;
}

const overviewMetrics: AnalyticsMetric[] = [
  {
    title: 'Total Reach',
    value: '145.2K',
    change: '+18.3%',
    changeType: 'increase',
    icon: <Eye className="h-4 w-4" />,
  },
  {
    title: 'Engagement Rate',
    value: '6.4%',
    change: '+2.1%',
    changeType: 'increase',
    icon: <Heart className="h-4 w-4" />,
  },
  {
    title: 'New Followers',
    value: '2.8K',
    change: '+24.5%',
    changeType: 'increase',
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: 'Total Interactions',
    value: '9.3K',
    change: '-3.2%',
    changeType: 'decrease',
    icon: <MessageCircle className="h-4 w-4" />,
  },
];

const platformPerformance: PlatformPerformance[] = [
  {
    platform: 'Instagram',
    icon: '📷',
    followers: 8920,
    engagement: 7.2,
    posts: 45,
    reach: 52000,
  },
  {
    platform: 'Twitter',
    icon: '𝕏',
    followers: 2340,
    engagement: 4.8,
    posts: 128,
    reach: 18500,
  },
  {
    platform: 'LinkedIn',
    icon: '💼',
    followers: 1250,
    engagement: 8.9,
    posts: 22,
    reach: 15800,
  },
  {
    platform: 'Facebook',
    icon: '👥',
    followers: 3450,
    engagement: 3.2,
    posts: 18,
    reach: 28900,
  },
];

const topPosts = [
  {
    id: '1',
    content: 'AI automation is revolutionizing social media management...',
    platform: 'LinkedIn',
    platformIcon: '💼',
    likes: 247,
    comments: 56,
    shares: 89,
    reach: 12400,
  },
  {
    id: '2',
    content: 'Behind the scenes of our development process 🚀',
    platform: 'Instagram',
    platformIcon: '📷',
    likes: 892,
    comments: 124,
    shares: 67,
    reach: 18900,
  },
  {
    id: '3',
    content: 'Quick tip: Schedule your posts for maximum engagement',
    platform: 'Twitter',
    platformIcon: '𝕏',
    likes: 156,
    comments: 32,
    shares: 78,
    reach: 5600,
  },
];

export function AnalyticsView() {
  return (
    <div className="space-y-6">
      {/* Overview Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {overviewMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              {metric.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center space-x-1 text-xs">
                {metric.changeType === 'increase' ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <span className={metric.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}>
                  {metric.change}
                </span>
                <span className="text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Platform Performance */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Platform Performance</CardTitle>
                <CardDescription>Engagement metrics across all platforms</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {platformPerformance.map((platform, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{platform.icon}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-medium">{platform.platform}</h3>
                      <div className="grid grid-cols-4 gap-4 mt-2 text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium text-foreground">{platform.followers.toLocaleString()}</span>
                          <p>Followers</p>
                        </div>
                        <div>
                          <span className="font-medium text-foreground">{platform.engagement}%</span>
                          <p>Engagement</p>
                        </div>
                        <div>
                          <span className="font-medium text-foreground">{platform.posts}</span>
                          <p>Posts</p>
                        </div>
                        <div>
                          <span className="font-medium text-foreground">{platform.reach.toLocaleString()}</span>
                          <p>Reach</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Performing Posts */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Top Posts</CardTitle>
              <CardDescription>Your best performing content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {topPosts.map((post, index) => (
                <div key={post.id} className="p-3 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">{post.platformIcon}</AvatarFallback>
                    </Avatar>
                    <Badge variant="outline" className="text-xs">
                      {post.platform}
                    </Badge>
                  </div>
                  <p className="text-sm mb-3 line-clamp-2">{post.content}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-3 w-3" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-3 w-3" />
                      <span>{post.comments}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Share2 className="h-3 w-3" />
                      <span>{post.shares}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{post.reach.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Detailed Analytics Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Detailed Analytics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="engagement" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
              <TabsTrigger value="reach">Reach</TabsTrigger>
              <TabsTrigger value="followers">Followers</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
            </TabsList>
            <TabsContent value="engagement" className="mt-6">
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Engagement analytics chart would go here</p>
                  <p className="text-sm text-muted-foreground mt-1">Integrate with charting library</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reach" className="mt-6">
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
                <div className="text-center">
                  <Eye className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Reach analytics chart would go here</p>
                  <p className="text-sm text-muted-foreground mt-1">Integrate with charting library</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="followers" className="mt-6">
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
                <div className="text-center">
                  <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Follower growth chart would go here</p>
                  <p className="text-sm text-muted-foreground mt-1">Integrate with charting library</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="content" className="mt-6">
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
                <div className="text-center">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Content performance chart would go here</p>
                  <p className="text-sm text-muted-foreground mt-1">Integrate with charting library</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
