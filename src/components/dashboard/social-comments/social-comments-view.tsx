'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageSquare, 
  Heart, 
  Reply, 
  ThumbsUp, 
  ThumbsDown, 
  Flag, 
  MoreHorizontal,
  Search,
  Filter,
  CheckCircle,
  Clock,
  TrendingUp
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Comment {
  id: string;
  postId: string;
  postTitle: string;
  platform: string;
  platformIcon: string;
  commenter: {
    name: string;
    username: string;
    avatar?: string;
    verified?: boolean;
  };
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  isRead: boolean;
  responded: boolean;
  flagged: boolean;
}

const mockComments: Comment[] = [
  {
    id: '1',
    postId: 'post-1',
    postTitle: 'AI trends in 2024: What to expect',
    platform: 'LinkedIn',
    platformIcon: '💼',
    commenter: {
      name: 'David Kim',
      username: '@davidkim',
      verified: true,
    },
    content: 'This is exactly what our team has been discussing! The AI automation trends you mentioned are already transforming our workflow. Would love to hear more about implementation strategies.',
    timestamp: '2 hours ago',
    likes: 24,
    replies: 3,
    sentiment: 'positive',
    isRead: false,
    responded: false,
    flagged: false,
  },
  {
    id: '2',
    postId: 'post-2',
    postTitle: 'Social media automation best practices',
    platform: 'Twitter',
    platformIcon: '𝕏',
    commenter: {
      name: 'Marketing Pro',
      username: '@marketingpro',
    },
    content: 'Great tips! However, I think automation can sometimes make content feel less authentic. How do you balance efficiency with genuine engagement?',
    timestamp: '4 hours ago',
    likes: 12,
    replies: 1,
    sentiment: 'neutral',
    isRead: false,
    responded: false,
    flagged: false,
  },
  {
    id: '3',
    postId: 'post-1',
    postTitle: 'AI trends in 2024: What to expect',
    platform: 'Instagram',
    platformIcon: '📷',
    commenter: {
      name: 'Tech Enthusiast',
      username: '@techenthusiast',
    },
    content: '🔥🔥🔥 This post is fire! The insights about machine learning applications are spot on. Keep up the amazing work!',
    timestamp: '6 hours ago',
    likes: 45,
    replies: 0,
    sentiment: 'positive',
    isRead: true,
    responded: true,
    flagged: false,
  },
  {
    id: '4',
    postId: 'post-3',
    postTitle: 'Building a successful startup',
    platform: 'LinkedIn',
    platformIcon: '💼',
    commenter: {
      name: 'Startup Founder',
      username: '@startupfounder',
    },
    content: 'I disagree with some of these points. The funding landscape has changed significantly, and these strategies might not work in the current market conditions.',
    timestamp: '1 day ago',
    likes: 8,
    replies: 2,
    sentiment: 'negative',
    isRead: true,
    responded: false,
    flagged: false,
  },
  {
    id: '5',
    postId: 'post-4',
    postTitle: 'Weekly team update',
    platform: 'Facebook',
    platformIcon: '👥',
    commenter: {
      name: 'Jane Smith',
      username: '@janesmith',
    },
    content: 'Congratulations on the product launch! We\'ve been using it for the past week and the results are impressive. The automation features saved us hours of work.',
    timestamp: '2 days ago',
    likes: 18,
    replies: 1,
    sentiment: 'positive',
    isRead: true,
    responded: true,
    flagged: false,
  },
];

function getSentimentColor(sentiment: string) {
  switch (sentiment) {
    case 'positive':
      return 'text-green-500';
    case 'negative':
      return 'text-red-500';
    case 'neutral':
      return 'text-yellow-500';
    default:
      return 'text-gray-500';
  }
}

function getSentimentIcon(sentiment: string) {
  switch (sentiment) {
    case 'positive':
      return <ThumbsUp className="h-4 w-4" />;
    case 'negative':
      return <ThumbsDown className="h-4 w-4" />;
    case 'neutral':
      return <MessageSquare className="h-4 w-4" />;
    default:
      return <MessageSquare className="h-4 w-4" />;
  }
}

export function SocialCommentsView() {
  const [selectedComment, setSelectedComment] = useState<Comment | null>(mockComments[0]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [replyText, setReplyText] = useState('');

  const filteredComments = mockComments.filter(comment => {
    const matchesSearch = comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         comment.commenter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         comment.postTitle.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'unread') return matchesSearch && !comment.isRead;
    if (activeTab === 'positive') return matchesSearch && comment.sentiment === 'positive';
    if (activeTab === 'negative') return matchesSearch && comment.sentiment === 'negative';
    
    return matchesSearch;
  });

  const unreadCount = mockComments.filter(c => !c.isRead).length;
  const positiveCount = mockComments.filter(c => c.sentiment === 'positive').length;
  const negativeCount = mockComments.filter(c => c.sentiment === 'negative').length;

  const handleSendReply = () => {
    if (replyText.trim()) {
      console.log('Sending reply:', replyText);
      setReplyText('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{mockComments.length}</p>
                <p className="text-sm text-muted-foreground">Total Comments</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ThumbsUp className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{positiveCount}</p>
                <p className="text-sm text-muted-foreground">Positive</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ThumbsDown className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-2xl font-bold">{negativeCount}</p>
                <p className="text-sm text-muted-foreground">Negative</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">87%</p>
                <p className="text-sm text-muted-foreground">Response Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Comments List */}
        <div className="lg:col-span-1">
          <Card className="h-[600px]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Comments</span>
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
                    <DropdownMenuItem>Sort by sentiment</DropdownMenuItem>
                    <DropdownMenuItem>Sort by engagement</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search comments..."
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
                  <TabsTrigger value="unread" className="text-xs">New</TabsTrigger>
                  <TabsTrigger value="positive" className="text-xs">😊</TabsTrigger>
                  <TabsTrigger value="negative" className="text-xs">😞</TabsTrigger>
                </TabsList>
                <TabsContent value={activeTab} className="mt-0">
                  <div className="space-y-0 max-h-[400px] overflow-y-auto">
                    {filteredComments.map((comment) => (
                      <div
                        key={comment.id}
                        className={`
                          p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors
                          ${selectedComment?.id === comment.id ? 'bg-muted' : ''}
                          ${!comment.isRead ? 'border-l-4 border-l-primary' : ''}
                        `}
                        onClick={() => setSelectedComment(comment)}
                      >
                        <div className="flex items-start space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {comment.platformIcon}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-sm font-medium truncate">
                                {comment.commenter.name}
                              </span>
                              {comment.commenter.verified && (
                                <CheckCircle className="h-3 w-3 text-blue-500" />
                              )}
                              <div className={getSentimentColor(comment.sentiment)}>
                                {getSentimentIcon(comment.sentiment)}
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground mb-1 truncate">
                              {comment.postTitle}
                            </p>
                            <p className="text-sm text-muted-foreground truncate">
                              {comment.content}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-muted-foreground">
                                {comment.timestamp}
                              </span>
                              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                <span className="flex items-center space-x-1">
                                  <Heart className="h-3 w-3" />
                                  <span>{comment.likes}</span>
                                </span>
                                {comment.replies > 0 && (
                                  <span className="flex items-center space-x-1">
                                    <Reply className="h-3 w-3" />
                                    <span>{comment.replies}</span>
                                  </span>
                                )}
                              </div>
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

        {/* Comment Detail */}
        <div className="lg:col-span-2">
          {selectedComment ? (
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{selectedComment.platformIcon}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <span>{selectedComment.commenter.name}</span>
                        {selectedComment.commenter.verified && (
                          <CheckCircle className="h-4 w-4 text-blue-500" />
                        )}
                      </CardTitle>
                      <CardDescription className="flex items-center space-x-2">
                        <span>{selectedComment.commenter.username}</span>
                        <Badge variant="outline" className="text-xs">
                          {selectedComment.platform}
                        </Badge>
                        <div className={`flex items-center space-x-1 ${getSentimentColor(selectedComment.sentiment)}`}>
                          {getSentimentIcon(selectedComment.sentiment)}
                          <span className="text-xs capitalize">{selectedComment.sentiment}</span>
                        </div>
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
                      <DropdownMenuItem>Hide comment</DropdownMenuItem>
                      <DropdownMenuItem>Report spam</DropdownMenuItem>
                      <DropdownMenuItem>Block user</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="text-sm text-muted-foreground">
                  Commented on: <span className="font-medium">{selectedComment.postTitle}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1 mb-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {selectedComment.timestamp}
                      </span>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Heart className="h-4 w-4" />
                        <span>{selectedComment.likes}</span>
                        {selectedComment.replies > 0 && (
                          <>
                            <Reply className="h-4 w-4" />
                            <span>{selectedComment.replies} replies</span>
                          </>
                        )}
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed">
                      {selectedComment.content}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Write a reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendReply()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendReply} disabled={!replyText.trim()}>
                      <Reply className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4 mr-1" />
                      Like
                    </Button>
                    <Button variant="outline" size="sm">
                      Quick Reply
                    </Button>
                    <Button variant="outline" size="sm">
                      <Flag className="h-4 w-4 mr-1" />
                      Flag
                    </Button>
                    <Button variant="outline" size="sm">
                      Hide
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-[600px] flex items-center justify-center">
              <CardContent className="text-center">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Select a comment</h3>
                <p className="text-muted-foreground">
                  Choose a comment from the list to view and respond
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
