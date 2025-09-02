/**
 * @swagger
 * /api/posts/{id}/comments:
 *   get:
 *     summary: Get comments
 *     description: Retrieves comments for a post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post
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
 *         description: Number of comments per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [newest, oldest, popular]
 *           default: newest
 *         description: Sort order
 *     responses:
 *       200:
 *         description: List of comments
 *       404:
 *         description: Post not found
 *   post:
 *     summary: Create comment
 *     description: Adds a comment to a post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               parentCommentId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment created
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 */

import { NextResponse } from 'next/server';

// Mock posts and comments data - in a real app, this would come from a database
const mockPosts = {
  'post_12345': {
    id: 'post_12345',
    commentsCount: 2
  }
};

const mockComments = [
  {
    id: 'comment_6789',
    content: 'Great first post!',
    author: {
      address: '0xabcdef1234567890abcdef1234567890abcdef12',
      username: 'web3fan',
      displayName: 'Web3 Fan',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    postId: 'post_12345',
    parentCommentId: null,
    createdAt: '2023-06-21T15:00:00Z',
    likesCount: 1,
    isLiked: false,
    replies: [
      {
        id: 'comment_5432',
        content: 'I agree completely!',
        author: {
          address: '0x9876543210fedcba9876543210fedcba98765432',
          username: 'commentuser',
          displayName: 'Comment User',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
        },
        postId: 'post_12345',
        parentCommentId: 'comment_6789',
        createdAt: '2023-06-21T18:15:00Z',
        likesCount: 1,
        isLiked: false
      }
    ]
  },
  {
    id: 'comment_1234',
    content: 'I\'ve been exploring Base too. The integration with Coinbase is seamless!',
    author: {
      address: '0x9876543210fedcba9876543210fedcba98765432',
      username: 'coinbasefan',
      displayName: 'Coinbase Fan',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    },
    postId: 'post_12345',
    parentCommentId: null,
    createdAt: '2023-06-21T16:15:00Z',
    likesCount: 3,
    isLiked: false,
    replies: []
  }
];

export async function GET(request, { params }) {
  const { id } = params;
  const { searchParams } = new URL(request.url);
  
  // Check if post exists
  if (!mockPosts[id]) {
    return NextResponse.json(
      { error: true, code: 'NOT_FOUND', message: 'Post not found' },
      { status: 404 }
    );
  }
  
  // Parse query parameters
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  const sort = searchParams.get('sort') || 'newest';
  
  // Filter comments for this post
  let filteredComments = mockComments.filter(comment => 
    comment.postId === id && comment.parentCommentId === null
  );
  
  // Apply sorting
  if (sort === 'newest') {
    filteredComments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (sort === 'oldest') {
    filteredComments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (sort === 'popular') {
    filteredComments.sort((a, b) => b.likesCount - a.likesCount);
  }
  
  // Calculate pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedComments = filteredComments.slice(startIndex, endIndex);
  
  // Prepare response
  return NextResponse.json({
    comments: paginatedComments,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(filteredComments.length / limit),
      totalComments: filteredComments.length,
      hasNextPage: endIndex < filteredComments.length,
      hasPreviousPage: page > 1
    }
  });
}

export async function POST(request, { params }) {
  const { id } = params;
  
  // Check if post exists
  if (!mockPosts[id]) {
    return NextResponse.json(
      { error: true, code: 'NOT_FOUND', message: 'Post not found' },
      { status: 404 }
    );
  }
  
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
    
    // If parentCommentId is provided, verify it exists
    if (data.parentCommentId) {
      const parentComment = mockComments.find(comment => comment.id === data.parentCommentId);
      if (!parentComment) {
        return NextResponse.json(
          { error: true, code: 'NOT_FOUND', message: 'Parent comment not found' },
          { status: 404 }
        );
      }
    }
    
    // Create new comment
    const newComment = {
      id: `comment_${Date.now()}`,
      content: data.content,
      author: {
        address: '0x1234567890abcdef1234567890abcdef12345678',
        username: 'cryptouser',
        displayName: 'Crypto User',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
      },
      postId: id,
      parentCommentId: data.parentCommentId || null,
      createdAt: new Date().toISOString(),
      likesCount: 0,
      isLiked: false
    };
    
    // In a real app, save to database
    if (data.parentCommentId) {
      // Add as a reply to parent comment
      const parentComment = mockComments.find(comment => comment.id === data.parentCommentId);
      if (parentComment) {
        if (!parentComment.replies) {
          parentComment.replies = [];
        }
        parentComment.replies.push(newComment);
      }
    } else {
      // Add as a top-level comment
      mockComments.push({...newComment, replies: []});
    }
    
    // Update post comments count
    mockPosts[id].commentsCount += 1;
    
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: true, code: 'VALIDATION_ERROR', message: 'Invalid request body' },
      { status: 400 }
    );
  }
}

