'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle, XCircle, Plus, Settings } from 'lucide-react';

interface Platform {
  name: string;
  connected: boolean;
  username?: string;
  followers?: number;
  lastSync?: string;
  icon: string;
}

const platforms: Platform[] = [
  {
    name: 'Twitter',
    connected: true,
    username: '@yourhandle',
    followers: 2340,
    lastSync: '2 minutes ago',
    icon: '𝕏',
  },
  {
    name: 'Instagram',
    connected: true,
    username: '@yourhandle',
    followers: 8920,
    lastSync: '5 minutes ago',
    icon: '📷',
  },
  {
    name: 'LinkedIn',
    connected: true,
    username: 'Your Name',
    followers: 1250,
    lastSync: '1 hour ago',
    icon: '💼',
  },
  {
    name: 'Facebook',
    connected: false,
    icon: '👥',
  },
  {
    name: 'TikTok',
    connected: false,
    icon: '🎵',
  },
  {
    name: 'YouTube',
    connected: false,
    icon: '📺',
  },
];

export function ConnectedPlatforms() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Connected Platforms</CardTitle>
          <CardDescription>Manage your social media accounts</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Add Platform
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {platforms.map((platform, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{platform.icon}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{platform.name}</span>
                  {platform.connected ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>
                {platform.connected && platform.username && (
                  <div className="text-sm text-muted-foreground">
                    {platform.username} • {platform.followers?.toLocaleString()} followers
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {platform.connected && (
                <Badge variant="secondary" className="text-xs">
                  {platform.lastSync}
                </Badge>
              )}
              <Button variant="ghost" size="sm">
                {platform.connected ? <Settings className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
