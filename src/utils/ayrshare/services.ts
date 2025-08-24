import { getAyrshareClient, PostData, ProfileAnalytics, PostAnalytics } from './client';

// Post management functions
export async function createPost(postData: PostData) {
  try {
    const client = getAyrshareClient();
    if (!client) {
      throw new Error('Ayrshare client not available');
    }

    const response = await client.post(postData);
    return response;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

export async function schedulePost(postData: PostData & { scheduleDate: string }) {
  try {
    const client = getAyrshareClient();
    if (!client) {
      throw new Error('Ayrshare client not available');
    }

    const response = await client.post({
      ...postData,
      scheduleDate: postData.scheduleDate,
    });
    return response;
  } catch (error) {
    console.error('Error scheduling post:', error);
    throw error;
  }
}

export async function getScheduledPosts() {
  try {
    const client = getAyrshareClient();
    if (!client) {
      throw new Error('Ayrshare client not available');
    }

    const response = await client.getPost();
    return response;
  } catch (error) {
    console.error('Error fetching scheduled posts:', error);
    throw error;
  }
}

export async function deletePost(postId: string) {
  try {
    const client = getAyrshareClient();
    if (!client) {
      throw new Error('Ayrshare client not available');
    }

    const response = await client.deletePost({ id: postId });
    return response;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
}

// Profile management functions
export async function getProfiles() {
  try {
    const client = getAyrshareClient();
    if (!client) {
      throw new Error('Ayrshare client not available');
    }

    const response = await client.getProfiles();
    return response;
  } catch (error) {
    console.error('Error fetching profiles:', error);
    throw error;
  }
}

export async function getProfileAnalytics(platforms: string[]) {
  try {
    const client = getAyrshareClient();
    if (!client) {
      throw new Error('Ayrshare client not available');
    }

    const response = await client.analyticsProfile({
      platforms,
    });
    return response;
  } catch (error) {
    console.error('Error fetching profile analytics:', error);
    throw error;
  }
}

// Analytics functions
export async function getPostAnalytics(postId: string) {
  try {
    const client = getAyrshareClient();
    if (!client) {
      throw new Error('Ayrshare client not available');
    }

    const response = await client.analyticsPost({
      id: postId,
    });
    return response;
  } catch (error) {
    console.error('Error fetching post analytics:', error);
    throw error;
  }
}

export async function getSocialAnalytics(platforms: string[], lastDays = 30) {
  try {
    const client = getAyrshareClient();
    if (!client) {
      throw new Error('Ayrshare client not available');
    }

    const response = await client.analyticsSocial({
      platforms,
      lastDays,
    });
    return response;
  } catch (error) {
    console.error('Error fetching social analytics:', error);
    throw error;
  }
}

// Media upload functions
export async function uploadMedia(mediaUrl: string) {
  try {
    const client = getAyrshareClient();
    if (!client) {
      throw new Error('Ayrshare client not available');
    }

    const response = await client.upload({
      url: mediaUrl,
    });
    return response;
  } catch (error) {
    console.error('Error uploading media:', error);
    throw error;
  }
}

// User management functions
export async function getUser() {
  try {
    const client = getAyrshareClient();
    if (!client) {
      throw new Error('Ayrshare client not available');
    }

    const response = await client.getUser();
    return response;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

// Comment and message functions
export async function getComments(postId?: string) {
  try {
    const client = getAyrshareClient();
    if (!client) {
      throw new Error('Ayrshare client not available');
    }

    const response = await client.getComments(postId ? { id: postId } : {});
    return response;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
}

export async function replyToComment(commentId: string, message: string) {
  try {
    const client = getAyrshareClient();
    if (!client) {
      throw new Error('Ayrshare client not available');
    }

    const response = await client.replyComment({
      id: commentId,
      comment: message,
    });
    return response;
  } catch (error) {
    console.error('Error replying to comment:', error);
    throw error;
  }
}

// AI content generation functions
export async function generateContent(prompt: string) {
  try {
    const client = getAyrshareClient();
    if (!client) {
      throw new Error('Ayrshare client not available');
    }

    const response = await client.generatePost({
      text: prompt,
    });
    return response;
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
}

export async function generateHashtags(text: string) {
  try {
    const client = getAyrshareClient();
    if (!client) {
      throw new Error('Ayrshare client not available');
    }

    const response = await client.generateTags({
      text,
    });
    return response;
  } catch (error) {
    console.error('Error generating hashtags:', error);
    throw error;
  }
}

export async function shortenUrl(url: string) {
  try {
    const client = getAyrshareClient();
    if (!client) {
      throw new Error('Ayrshare client not available');
    }

    const response = await client.shortLink({
      url,
    });
    return response;
  } catch (error) {
    console.error('Error shortening URL:', error);
    throw error;
  }
}
