import SocialMediaAPI from '../../../social-media-api/index.js';

// Initialize Ayrshare client
export function createAyrshareClient(apiKey?: string) {
  if (!apiKey) {
    throw new Error('Ayrshare API key is required');
  }

  return new SocialMediaAPI(apiKey);
}

// Get client instance with error handling
export function getAyrshareClient() {
  const apiKey = process.env.AYRSHARE_API_KEY;

  if (!apiKey) {
    console.warn('AYRSHARE_API_KEY not found in environment variables');
    return null;
  }

  return createAyrshareClient(apiKey);
}

// Types for Ayrshare API responses
export interface PostData {
  post: string;
  platforms: string[];
  media_urls?: string[];
  shorten_links?: boolean;
  shortenLinks?: boolean;
  scheduleDate?: string;
}

export interface ProfileAnalytics {
  platform: string;
  followers: number;
  following: number;
  posts: number;
}

export interface PostAnalytics {
  id: string;
  platform: string;
  likes: number;
  comments: number;
  shares: number;
  clicks: number;
  impressions: number;
}

export interface ScheduledPost {
  id: string;
  post: string;
  platforms: string[];
  scheduleDate: string;
  status: 'scheduled' | 'posted' | 'failed';
}
