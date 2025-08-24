# Ayrshare API Integration Guide

This social media automation app is built with the [Ayrshare API](https://www.ayrshare.com/), which provides comprehensive social media management capabilities across multiple platforms.

## Supported Platforms

- **Twitter/X** - Posts, replies, analytics
- **Instagram** - Posts, stories, analytics
- **LinkedIn** - Posts, analytics
- **Facebook** - Posts, analytics
- **TikTok** - Posts, analytics
- **YouTube** - Posts, analytics
- **Reddit** - Posts, analytics
- **Telegram** - Posts, analytics
- **Google Business Profile** - Posts, analytics

## Setup Instructions

### 1. Get Your Ayrshare API Key

1. Sign up for an account at [Ayrshare.com](https://www.ayrshare.com/)
2. Navigate to your dashboard and copy your API key
3. Choose your plan based on your needs (Free tier available)

### 2. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

2. Add your Ayrshare API key:
   ```
   AYRSHARE_API_KEY=your_ayrshare_api_key_here
   ```

### 3. Connect Your Social Media Accounts

1. Use the Ayrshare dashboard to connect your social media accounts
2. Follow the OAuth flow for each platform you want to automate
3. Your connected accounts will appear in the app's "Connected Platforms" section

## Features Included

### 📝 Content Creation & Scheduling

- Multi-platform post composition
- Image and video upload support
- AI-powered content generation
- Scheduled publishing
- Bulk content upload

### 📅 Content Calendar

- Visual calendar interface
- Drag-and-drop scheduling
- Post preview across platforms
- Optimal timing suggestions

### 📊 Analytics & Insights

- Cross-platform analytics dashboard
- Engagement metrics tracking
- Follower growth analysis
- Post performance insights
- Exportable reports

### 💬 Social Engagement

- Unified inbox for messages and mentions
- Comment management across platforms
- Automated response templates
- Sentiment analysis

### 🤖 AI-Powered Features

- Content generation based on prompts
- Hashtag suggestions
- Image alt-text generation
- Content optimization recommendations

## API Usage Examples

### Creating a Post

```typescript
import { createPost } from '@/utils/ayrshare/services';

const postData = {
  post: 'Your post content here',
  platforms: ['twitter', 'instagram', 'linkedin'],
  media_urls: ['https://example.com/image.jpg'],
  shorten_links: true,
};

const result = await createPost(postData);
```

### Scheduling a Post

```typescript
import { schedulePost } from '@/utils/ayrshare/services';

const scheduledPost = {
  post: 'Scheduled content',
  platforms: ['twitter', 'linkedin'],
  scheduleDate: '2024-01-15T10:00:00Z',
};

const result = await schedulePost(scheduledPost);
```

### Getting Analytics

```typescript
import { getProfileAnalytics } from '@/utils/ayrshare/services';

const analytics = await getProfileAnalytics(['twitter', 'instagram']);
```

## Available API Endpoints

### Post Management

- `createPost()` - Create and publish posts
- `schedulePost()` - Schedule posts for future publishing
- `getScheduledPosts()` - Retrieve scheduled posts
- `deletePost()` - Delete scheduled posts

### Analytics

- `getProfileAnalytics()` - Get profile statistics
- `getPostAnalytics()` - Get individual post performance
- `getSocialAnalytics()` - Get comprehensive social media analytics

### Content Tools

- `generateContent()` - AI content generation
- `generateHashtags()` - AI hashtag suggestions
- `shortenUrl()` - URL shortening service
- `uploadMedia()` - Media file uploads

### Engagement

- `getComments()` - Retrieve comments and mentions
- `replyToComment()` - Reply to comments
- `getUser()` - Get user profile information

## Rate Limits

Ayrshare implements rate limiting to ensure fair usage:

- **Free Plan**: 5 posts per month
- **Starter Plan**: 50 posts per month
- **Professional Plan**: 500 posts per month
- **Business Plan**: 2000 posts per month

## Error Handling

All API functions include comprehensive error handling:

```typescript
try {
  const result = await createPost(postData);
  console.log('Post created successfully:', result);
} catch (error) {
  console.error('Failed to create post:', error.message);
  // Handle error appropriately
}
```

## Security Best Practices

1. **Never commit your API key** to version control
2. **Use environment variables** for sensitive configuration
3. **Validate user input** before sending to API
4. **Implement proper error handling** for failed requests
5. **Monitor API usage** to stay within rate limits

## Support

- **Ayrshare Documentation**: [https://docs.ayrshare.com](https://docs.ayrshare.com)
- **API Reference**: [https://docs.ayrshare.com/rest-api/endpoints](https://docs.ayrshare.com/rest-api/endpoints)
- **Support Email**: support@ayrshare.com

## Troubleshooting

### Common Issues

1. **"Ayrshare client not available"**
   - Check that `AYRSHARE_API_KEY` is set in your environment variables
   - Verify your API key is valid and active

2. **"Platform not connected"**
   - Connect your social media accounts through the Ayrshare dashboard
   - Ensure OAuth authorization is complete

3. **"Rate limit exceeded"**
   - Check your current plan limits
   - Implement request throttling in your application

4. **"Invalid post format"**
   - Verify post content meets platform requirements
   - Check character limits and media format restrictions

## Development Tips

1. **Use the sandbox environment** for testing
2. **Start with the free tier** to familiarize yourself with the API
3. **Implement caching** for analytics data to reduce API calls
4. **Use webhooks** for real-time notifications (Pro+ plans)
5. **Monitor your API usage** through the Ayrshare dashboard

This integration provides a solid foundation for building comprehensive social media management applications with enterprise-grade reliability and extensive platform support.
