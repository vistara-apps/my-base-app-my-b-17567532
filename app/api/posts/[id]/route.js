/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Get post details
 *     description: Retrieves detailed information about a specific post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post
 *     responses:
 *       200:
 *         description: Detailed post data
 *       404:
 *         description: Post not found
 */

import { NextResponse } from 'next/server';

// Mock posts data - in a real app, this would come from a database
const mockPosts = {
  'post_12345': {
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
    },
    comments: [
      {
        id: 'comment_6789',
        content: 'Great first post!',
        author: {
          address: '0xabcdef1234567890abcdef1234567890abcdef12',
          username: 'web3fan',
          displayName: 'Web3 Fan',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
        },
        createdAt: '2023-06-21T15:00:00Z',
        likesCount: 1,
        isLiked: false
      },
      {
        id: 'comment_5432',
        content: 'I\'ve been exploring Base too. The integration with Coinbase is seamless!',
        author: {
          address: '0x9876543210fedcba9876543210fedcba98765432',
          username: 'coinbasefan',
          displayName: 'Coinbase Fan',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
        },
        createdAt: '2023-06-21T16:15:00Z',
        likesCount: 3,
        isLiked: false
      }
    ]
  }
};

export async function GET(request, { params }) {
  const { id } = params;
  
  // Check if post exists
  if (!mockPosts[id]) {
    return NextResponse.json(
      { error: true, code: 'NOT_FOUND', message: 'Post not found' },
      { status: 404 }
    );
  }
  
  // Return post details
  return NextResponse.json(mockPosts[id]);
}

