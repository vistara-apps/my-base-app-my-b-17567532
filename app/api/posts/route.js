/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get posts
 *     description: Retrieves posts for the feed
 *     parameters:
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
 *         description: Number of posts per page
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *           enum: [all, following, trending]
 *           default: all
 *         description: Filter type
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: Filter by author address
 *     responses:
 *       200:
 *         description: List of posts
 *   post:
 *     summary: Create post
 *     description: Creates a new post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               media:
 *                 type: array
 *                 items:
 *                   type: object
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Post created
 *       401:
 *         description: Unauthorized
 */

import { NextResponse } from 'next/server';

// Mock posts data - in a real app, this would come from a database
const mockPosts = [
  {
    id: 'post_12345',
    content: 'Just deployed my first smart contract on Base! The developer experience is incredible. 🚀',
    media: [],
    tags: ['web3', 'blockchain', 'base'],
    author: {
      address: '0x1234567890abcdef1234567890abcdef12345678',
      username: 'cryptouser',
      displayName: 'Crypto User',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    likesCount: 24,
    commentsCount: 5,
    repostsCount: 8,
    createdAt: '2023-06-21T14:30:00Z',
    onchainReference: {
      transactionHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
      blockNumber: 12345678
    }
  },
  {
    id: 'post_67890',
    content: 'Building the future of social media on blockchain. Every interaction should be owned by the user, not the platform.',
    media: [],
    tags: ['web3social', 'decentralization'],
    author: {
      address: '0xabcdef1234567890abcdef1234567890abcdef12',
      username: 'web3fan',
      displayName: 'Web3 Fan',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    likesCount: 156,
    commentsCount: 23,
    repostsCount: 42,
    createdAt: '2023-06-21T10:15:00Z',
    onchainReference: {
      transactionHash: '0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef',
      blockNumber: 12345670
    }
  }
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  
  // Parse query parameters
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  const filter = searchParams.get('filter') || 'all';
  const author = searchParams.get('author');
  
  // Apply filters
  let filteredPosts = [...mockPosts];
  
  if (author) {
    filteredPosts = filteredPosts.filter(post => post.author.address === author);
  }
  
  if (filter === 'trending') {
    filteredPosts.sort((a, b) => b.likesCount - a.likesCount);
  }
  
  // Calculate pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
  
  // Prepare response
  return NextResponse.json({
    posts: paginatedPosts,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(filteredPosts.length / limit),
      totalPosts: filteredPosts.length,
      hasNextPage: endIndex < filteredPosts.length,
      hasPreviousPage: page > 1
    }
  });
}

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validate request
    if (!data.content || data.content.trim() === '') {
      return NextResponse.json(
        { error: true, code: 'VALIDATION_ERROR', message: 'Content is required' },
        { status: 400 }
      );
    }
    
    // In a real app, verify authentication
    
    // Create new post
    const newPost = {
      id: `post_${Date.now()}`,
      content: data.content,
      media: data.media || [],
      tags: data.tags || [],
      author: {
        address: '0x1234567890abcdef1234567890abcdef12345678',
        username: 'cryptouser',
        displayName: 'Crypto User',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
      },
      likesCount: 0,
      commentsCount: 0,
      repostsCount: 0,
      createdAt: new Date().toISOString(),
      onchainReference: {
        transactionHash: `0x${Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`,
        blockNumber: 12345680
      }
    };
    
    // In a real app, save to database
    mockPosts.unshift(newPost);
    
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: true, code: 'VALIDATION_ERROR', message: 'Invalid request body' },
      { status: 400 }
    );
  }
}

