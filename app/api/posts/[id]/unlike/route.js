/**
 * @swagger
 * /api/posts/{id}/unlike:
 *   delete:
 *     summary: Unlike a post
 *     description: Removes a like from a post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post
 *     responses:
 *       200:
 *         description: Like status updated
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 */

import { NextResponse } from 'next/server';

// Mock posts data - in a real app, this would come from a database
const mockPosts = {
  'post_12345': {
    id: 'post_12345',
    likesCount: 24,
    likedBy: new Set(['0x1234567890abcdef1234567890abcdef12345678']) // In a real app, this would track which users liked the post
  }
};

export async function DELETE(request, { params }) {
  const { id } = params;
  
  // Check if post exists
  if (!mockPosts[id]) {
    return NextResponse.json(
      { error: true, code: 'NOT_FOUND', message: 'Post not found' },
      { status: 404 }
    );
  }
  
  // In a real app, verify authentication
  const userAddress = '0x1234567890abcdef1234567890abcdef12345678'; // This would come from authentication
  
  // Check if user has liked the post
  if (!mockPosts[id].likedBy.has(userAddress)) {
    return NextResponse.json({
      success: true,
      isLiked: false,
      likesCount: mockPosts[id].likesCount
    });
  }
  
  // Update likes count and remove user like
  mockPosts[id].likesCount = Math.max(0, mockPosts[id].likesCount - 1);
  mockPosts[id].likedBy.delete(userAddress);
  
  return NextResponse.json({
    success: true,
    isLiked: false,
    likesCount: mockPosts[id].likesCount
  });
}

