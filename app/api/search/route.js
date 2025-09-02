/**
 * @swagger
 * /api/search:
 *   get:
 *     summary: Search content
 *     description: Searches for posts, users, or topics
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Search query
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [posts, users, topics, all]
 *           default: all
 *         description: Type of content to search
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Number of results per page
 *     responses:
 *       200:
 *         description: Search results
 *       400:
 *         description: Invalid search query
 */

import { NextResponse } from 'next/server';

// Mock data for search results - in a real app, this would come from a database
const mockPosts = [
  {
    id: 'post_12345',
    content: 'Just deployed my first smart contract on Base! The developer experience is incredible. 🚀 #web3',
    author: {
      address: '0x1234567890abcdef1234567890abcdef12345678',
      username: 'cryptouser',
      displayName: 'Crypto User',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    createdAt: '2023-06-21T14:30:00Z',
    likesCount: 24,
    commentsCount: 5,
    repostsCount: 8
  },
  {
    id: 'post_67890',
    content: 'Building the future of social media on blockchain with #web3 technology. Every interaction should be owned by the user, not the platform.',
    author: {
      address: '0xabcdef1234567890abcdef1234567890abcdef12',
      username: 'web3fan',
      displayName: 'Web3 Fan',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    createdAt: '2023-06-21T10:15:00Z',
    likesCount: 156,
    commentsCount: 23,
    repostsCount: 42
  }
];

const mockUsers = [
  {
    address: '0xabcdef1234567890abcdef1234567890abcdef12',
    username: 'web3fan',
    displayName: 'Web3 Fan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    bio: 'Passionate about Web3 technology and decentralization',
    followersCount: 85
  },
  {
    address: '0x9876543210fedcba9876543210fedcba98765432',
    username: 'web3developer',
    displayName: 'Web3 Developer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    bio: 'Building the decentralized future with Web3 technologies',
    followersCount: 120
  }
];

const mockTopics = [
  {
    tag: 'web3',
    postCount: 1250,
    trend: '+15%'
  },
  {
    tag: 'web3social',
    postCount: 450,
    trend: '+25%'
  },
  {
    tag: 'web3gaming',
    postCount: 320,
    trend: '+18%'
  }
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  
  // Parse query parameters
  const query = searchParams.get('q');
  const type = searchParams.get('type') || 'all';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  
  // Validate query
  if (!query || query.trim() === '') {
    return NextResponse.json(
      { error: true, code: 'VALIDATION_ERROR', message: 'Search query is required' },
      { status: 400 }
    );
  }
  
  // Validate type
  if (!['posts', 'users', 'topics', 'all'].includes(type)) {
    return NextResponse.json(
      { error: true, code: 'VALIDATION_ERROR', message: 'Invalid type. Must be one of: posts, users, topics, all' },
      { status: 400 }
    );
  }
  
  // Perform search based on type
  const results = {
    query,
    type,
    results: {}
  };
  
  const lowerQuery = query.toLowerCase();
  
  // Search posts
  if (type === 'posts' || type === 'all') {
    const matchedPosts = mockPosts.filter(post => 
      post.content.toLowerCase().includes(lowerQuery) ||
      post.author.username.toLowerCase().includes(lowerQuery) ||
      post.author.displayName.toLowerCase().includes(lowerQuery)
    );
    
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    results.results.posts = matchedPosts.slice(startIndex, endIndex);
  }
  
  // Search users
  if (type === 'users' || type === 'all') {
    const matchedUsers = mockUsers.filter(user => 
      user.username.toLowerCase().includes(lowerQuery) ||
      user.displayName.toLowerCase().includes(lowerQuery) ||
      user.bio.toLowerCase().includes(lowerQuery)
    );
    
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    results.results.users = matchedUsers.slice(startIndex, endIndex);
  }
  
  // Search topics
  if (type === 'topics' || type === 'all') {
    const matchedTopics = mockTopics.filter(topic => 
      topic.tag.toLowerCase().includes(lowerQuery)
    );
    
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    results.results.topics = matchedTopics.slice(startIndex, endIndex);
  }
  
  // Calculate total results for pagination
  let totalResults = 0;
  if (results.results.posts) totalResults += results.results.posts.length;
  if (results.results.users) totalResults += results.results.users.length;
  if (results.results.topics) totalResults += results.results.topics.length;
  
  // Add pagination info
  results.pagination = {
    currentPage: page,
    totalPages: Math.ceil(totalResults / limit),
    hasNextPage: page * limit < totalResults,
    hasPreviousPage: page > 1
  };
  
  return NextResponse.json(results);
}

