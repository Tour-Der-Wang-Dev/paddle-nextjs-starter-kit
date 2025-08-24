'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Calendar, Clock, Image as ImageIcon, Video, FileText, X, Send, Save, Sparkles } from 'lucide-react';

interface Platform {
  id: string;
  name: string;
  icon: string;
  selected: boolean;
  characterLimit: number;
}

interface MediaFile {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document';
  url: string;
  size: string;
}

const platforms: Platform[] = [
  { id: 'twitter', name: 'Twitter', icon: '𝕏', selected: false, characterLimit: 280 },
  { id: 'instagram', name: 'Instagram', icon: '📷', selected: false, characterLimit: 2200 },
  { id: 'linkedin', name: 'LinkedIn', icon: '💼', selected: false, characterLimit: 3000 },
  { id: 'facebook', name: 'Facebook', icon: '👥', selected: false, characterLimit: 63206 },
  { id: 'tiktok', name: 'TikTok', icon: '🎵', selected: false, characterLimit: 150 },
  { id: 'youtube', name: 'YouTube', icon: '📺', selected: false, characterLimit: 1000 },
];

export function UploadPostsForm() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(platforms);
  const [postContent, setPostContent] = useState('');
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [scheduleType, setScheduleType] = useState<'now' | 'schedule'>('now');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.map((platform) => (platform.id === platformId ? { ...platform, selected: !platform.selected } : platform)),
    );
  };

  const selectedPlatformsList = selectedPlatforms.filter((p) => p.selected);
  const minCharacterLimit =
    selectedPlatformsList.length > 0 ? Math.min(...selectedPlatformsList.map((p) => p.characterLimit)) : 0;

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newFiles: MediaFile[] = files.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      name: file.name,
      type: file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'document',
      url: URL.createObjectURL(file),
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
    }));
    setMediaFiles((prev) => [...prev, ...newFiles]);
  };

  const removeMedia = (fileId: string) => {
    setMediaFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const generateAIContent = () => {
    // Mock AI content generation
    const aiSuggestions = [
      "🚀 Exciting news! We're thrilled to announce our latest feature that will revolutionize your social media experience. Stay tuned for more updates!",
      '💡 Pro tip: Consistency is key to social media success. Plan your content in advance and engage with your audience regularly for better results.',
      '🌟 Behind the scenes: Our team has been working tirelessly to bring you the best social media automation tools. Thank you for your continued support!',
    ];
    const randomSuggestion = aiSuggestions[Math.floor(Math.random() * aiSuggestions.length)];
    setPostContent(randomSuggestion);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Create Post</CardTitle>
            <CardDescription>Compose and schedule your social media posts across multiple platforms</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Platform Selection */}
            <div className="space-y-3">
              <Label>Select Platforms</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {selectedPlatforms.map((platform) => (
                  <Button
                    key={platform.id}
                    variant={platform.selected ? 'default' : 'outline'}
                    className="h-auto p-3 justify-start"
                    onClick={() => togglePlatform(platform.id)}
                  >
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarFallback className="text-xs">{platform.icon}</AvatarFallback>
                    </Avatar>
                    {platform.name}
                  </Button>
                ))}
              </div>
              {selectedPlatformsList.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  Selected: {selectedPlatformsList.map((p) => p.name).join(', ')}
                </div>
              )}
            </div>

            {/* Post Content */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Post Content</Label>
                <Button variant="outline" size="sm" onClick={generateAIContent}>
                  <Sparkles className="h-4 w-4 mr-1" />
                  AI Generate
                </Button>
              </div>
              <Textarea
                placeholder="What's on your mind?"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className="min-h-[120px] resize-none"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{postContent.length} characters</span>
                {minCharacterLimit > 0 && (
                  <span className={postContent.length > minCharacterLimit ? 'text-red-500' : ''}>
                    Limit: {minCharacterLimit}
                  </span>
                )}
              </div>
            </div>

            {/* Media Upload */}
            <div className="space-y-3">
              <Label>Media Files</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleMediaUpload}
                  className="hidden"
                  id="media-upload"
                />
                <label htmlFor="media-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground mt-1">Images, videos, and documents</p>
                </label>
              </div>

              {mediaFiles.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {mediaFiles.map((file) => (
                    <div key={file.id} className="relative border rounded-lg p-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                        onClick={() => removeMedia(file.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      <div className="flex items-center space-x-2">
                        {file.type === 'image' && <ImageIcon className="h-4 w-4" />}
                        {file.type === 'video' && <Video className="h-4 w-4" />}
                        {file.type === 'document' && <FileText className="h-4 w-4" />}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{file.size}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Schedule Options */}
            <div className="space-y-3">
              <Label>Publishing Options</Label>
              <Tabs value={scheduleType} onValueChange={(value) => setScheduleType(value as 'now' | 'schedule')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="now">Post Now</TabsTrigger>
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                </TabsList>
                <TabsContent value="schedule" className="space-y-3 mt-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="schedule-date">Date</Label>
                      <Input
                        id="schedule-date"
                        type="date"
                        value={scheduleDate}
                        onChange={(e) => setScheduleDate(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="schedule-time">Time</Label>
                      <Input
                        id="schedule-time"
                        type="time"
                        value={scheduleTime}
                        onChange={(e) => setScheduleTime(e.target.value)}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button className="flex-1">
                {scheduleType === 'now' ? (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Post Now
                  </>
                ) : (
                  <>
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Post
                  </>
                )}
              </Button>
              <Button variant="outline">
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview Sidebar */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>How your post will appear</CardDescription>
          </CardHeader>
          <CardContent>
            {selectedPlatformsList.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">Select platforms to see preview</p>
            ) : (
              <div className="space-y-4">
                {selectedPlatformsList.map((platform) => (
                  <div key={platform.id} className="border rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Avatar className="h-5 w-5">
                        <AvatarFallback className="text-xs">{platform.icon}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{platform.name}</span>
                    </div>
                    <div className="text-sm">{postContent || 'Your post content will appear here...'}</div>
                    {mediaFiles.length > 0 && (
                      <div className="mt-2 text-xs text-muted-foreground">
                        📎 {mediaFiles.length} media file{mediaFiles.length !== 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Post Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span>Auto-shorten links</span>
              <Button variant="outline" size="sm">
                Enable
              </Button>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Add hashtags</span>
              <Button variant="outline" size="sm">
                Suggest
              </Button>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Track analytics</span>
              <Button variant="outline" size="sm">
                Enable
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
