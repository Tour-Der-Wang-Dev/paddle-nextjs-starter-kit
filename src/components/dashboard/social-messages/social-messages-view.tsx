'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageCircle, 
  Send, 
  Search, 
  Filter,
  MoreHorizontal,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Message {
  id: string;
  type: 'dm' | 'mention' | 'comment';
  platform: string;
  platformIcon: string;
  sender: {
    name: string;
    username: string;
    avatar?: string;
  };
  content: string;
  timestamp: string;
  isRead: boolean;
  priority: 'high' | 'medium' | 'low';
  replies?: number;
}

const mockMessages: Message[] = [
  {
    id: '1',
    type: 'dm',
    platform: 'Twitter',
    platformIcon: '𝕏',
    sender: {
      name: 'Sarah Johnson',
      username: '@sarahjohnson',
      avatar: '/api/placeholder/32/32',
    },
    content: 'Hi! I love your latest post about AI trends. Could you share more insights about machine learning applications?',
    timestamp: '2 minutes ago',
    isRead: false,
    priority: 'high',
  },
  {
    id: '2',
    type: 'mention',
    platform: 'Instagram',
    platformIcon: '📷',
    sender: {
      name: 'Tech Reviewer',
      username: '@techreviewer',
    },
    content: 'Just tried @yourhandle amazing social media tool! The automation features are game-changing. Highly recommended! 🚀',
    timestamp: '15 minutes ago',
    isRead: false,
    priority: 'medium',
  },
  {
    id: '3',
    type: 'comment',
    platform: 'LinkedIn',
    platformIcon: '💼',
    sender: {
      name: 'Mike Chen',
      username: 'mikec',
    },
    content: 'Great article! This is exactly what our marketing team needed. Do you offer enterprise plans?',
    timestamp: '1 hour ago',
    isRead: true,
    priority: 'high',
    replies: 2,
  },
  {
    id: '4',
    type: 'dm',
    platform: 'Instagram',
    platformIcon: '📷',
    sender: {
      name: 'Emily Rodriguez',
      username: '@emilyrod',
    },
    content: 'Could you help me with setting up automated posting? I\'m having trouble with the scheduling feature.',
    timestamp: '3 hours ago',
    isRead: true,
    priority: 'medium',
  },
  {
    id: '5',
    type: 'mention',
    platform: 'Twitter',
    platformIcon: '𝕏',
    sender: {
      name: 'Startup News',
      username: '@startupnews',
    },
    content: 'Featured in our weekly roundup: @yourhandle social media automation platform is revolutionizing content management!',
    timestamp: '1 day ago',
    isRead: true,
    priority: 'low',
  },
];

function getPriorityColor(priority: string) {
  switch (priority) {
    case 'high':
      return 'bg-red-500';
    case 'medium':
      return 'bg-yellow-500';
    case 'low':
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
}

function getTypeIcon(type: string) {
  switch (type) {
    case 'dm':
      return <MessageCircle className="h-4 w-4" />;
    case 'mention':
      return <AlertCircle className="h-4 w-4" />;
    case 'comment':
      return <MessageCircle className="h-4 w-4" />;
    default:
      return <MessageCircle className="h-4 w-4" />;
  }
}

export function SocialMessagesView() {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(mockMessages[0]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [replyText, setReplyText] = useState('');

  const filteredMessages = mockMessages.filter(message => {
    const matchesSearch = message.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.sender.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'unread') return matchesSearch && !message.isRead;
    if (activeTab === 'dms') return matchesSearch && message.type === 'dm';
    if (activeTab === 'mentions') return matchesSearch && message.type === 'mention';
    
    return matchesSearch;
  });

  const unreadCount = mockMessages.filter(m => !m.isRead).length;

  const handleSendReply = () => {
    if (replyText.trim()) {
      // Handle sending reply
      console.log('Sending reply:', replyText);
      setReplyText('');
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3 h-[calc(100vh-200px)]">
      {/* Messages List */}
      <div className="lg:col-span-1">
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <span>Messages</span>
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Sort by date</DropdownMenuItem>
                  <DropdownMenuItem>Sort by priority</DropdownMenuItem>
                  <DropdownMenuItem>Sort by platform</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 m-4 mb-0">
                <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                <TabsTrigger value="unread" className="text-xs">Unread</TabsTrigger>
                <TabsTrigger value="dms" className="text-xs">DMs</TabsTrigger>
                <TabsTrigger value="mentions" className="text-xs">@</TabsTrigger>
              </TabsList>
              <TabsContent value={activeTab} className="mt-0">
                <div className="space-y-0 max-h-[500px] overflow-y-auto">
                  {filteredMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`
                        p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors
                        ${selectedMessage?.id === message.id ? 'bg-muted' : ''}
                        ${!message.isRead ? 'border-l-4 border-l-primary' : ''}
                      `}
                      onClick={() => setSelectedMessage(message)}
                    >
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {message.platformIcon}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium truncate">
                              {message.sender.name}
                            </span>
                            <div className={`w-2 h-2 rounded-full ${getPriorityColor(message.priority)}`} />
                            {getTypeIcon(message.type)}
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {message.content}
                          </p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-muted-foreground">
                              {message.timestamp}
                            </span>
                            {message.replies && (
                              <span className="text-xs text-muted-foreground">
                                {message.replies} replies
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Message Detail */}
      <div className="lg:col-span-2">
        {selectedMessage ? (
          <Card className="h-full flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{selectedMessage.platformIcon}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{selectedMessage.sender.name}</CardTitle>
                    <CardDescription className="flex items-center space-x-2">
                      <span>{selectedMessage.sender.username}</span>
                      <Badge variant="outline" className="text-xs">
                        {selectedMessage.platform}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {selectedMessage.type}
                      </Badge>
                    </CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Mark as read</DropdownMenuItem>
                    <DropdownMenuItem>Set priority</DropdownMenuItem>
                    <DropdownMenuItem>Block user</DropdownMenuItem>
                    <DropdownMenuItem>Report</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="flex-1 mb-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {selectedMessage.timestamp}
                    </span>
                    <div className={`w-2 h-2 rounded-full ${getPriorityColor(selectedMessage.priority)}`} />
                    <span className="text-xs text-muted-foreground capitalize">
                      {selectedMessage.priority} priority
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed">
                    {selectedMessage.content}
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Type your reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendReply()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendReply} disabled={!replyText.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Mark as Read
                  </Button>
                  <Button variant="outline" size="sm">
                    Quick Reply
                  </Button>
                  <Button variant="outline" size="sm">
                    Set Reminder
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="h-full flex items-center justify-center">
            <CardContent className="text-center">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Select a message</h3>
              <p className="text-muted-foreground">
                Choose a message from the list to view and respond
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
