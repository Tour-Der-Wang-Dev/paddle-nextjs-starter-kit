'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Calendar, MessageCircle, BarChart3, Settings, Plus } from 'lucide-react';
import Link from 'next/link';

interface QuickAction {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  variant: 'default' | 'outline' | 'secondary';
}

const quickActions: QuickAction[] = [
  {
    title: 'Create Post',
    description: 'Upload and schedule new content',
    icon: <Upload className="h-4 w-4" />,
    href: '/dashboard/upload-posts',
    variant: 'default',
  },
  {
    title: 'Schedule Content',
    description: 'Plan your content calendar',
    icon: <Calendar className="h-4 w-4" />,
    href: '/dashboard/content-calendar',
    variant: 'outline',
  },
  {
    title: 'Check Messages',
    description: 'Respond to DMs and mentions',
    icon: <MessageCircle className="h-4 w-4" />,
    href: '/dashboard/social-messages',
    variant: 'outline',
  },
  {
    title: 'View Analytics',
    description: 'Track your performance',
    icon: <BarChart3 className="h-4 w-4" />,
    href: '/dashboard/analytics',
    variant: 'outline',
  },
];

export function SocialQuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href}>
              <Button variant={action.variant} className="w-full justify-start h-auto p-4">
                <div className="flex items-center space-x-3">
                  {action.icon}
                  <div className="text-left">
                    <div className="font-medium">{action.title}</div>
                    <div className="text-xs text-muted-foreground">{action.description}</div>
                  </div>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
