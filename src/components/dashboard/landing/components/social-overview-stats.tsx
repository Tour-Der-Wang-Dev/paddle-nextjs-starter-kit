'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Users, MessageSquare, Heart, Share2 } from 'lucide-react';

interface SocialStat {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ReactNode;
}

const mockStats: SocialStat[] = [
  {
    title: 'Total Followers',
    value: '12.5K',
    change: '+8.2%',
    changeType: 'increase',
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: 'Engagement Rate',
    value: '4.2%',
    change: '+12.1%',
    changeType: 'increase',
    icon: <Heart className="h-4 w-4" />,
  },
  {
    title: 'Total Posts',
    value: '284',
    change: '+15',
    changeType: 'increase',
    icon: <MessageSquare className="h-4 w-4" />,
  },
  {
    title: 'Shares',
    value: '1.2K',
    change: '-2.4%',
    changeType: 'decrease',
    icon: <Share2 className="h-4 w-4" />,
  },
];

export function SocialOverviewStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {mockStats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center space-x-1 text-xs">
              {stat.changeType === 'increase' ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span className={stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}>{stat.change}</span>
              <span className="text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
