/**
 * @swagger
 * /api/users/{address}/unfollow:
 *   delete:
 *     summary: Unfollow a user
 *     description: Unfollows a user
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: The wallet address of the user to unfollow
 *     responses:
 *       200:
 *         description: Follow status updated
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */

import { NextResponse } from 'next/server';

// Mock user data - in a real app, this would come from a database
const mockUsers = {
  '0x1234567890abcdef1234567890abcdef12345678': {
    address: '0x1234567890abcdef1234567890abcdef12345678',
    username: 'cryptouser',
    displayName: 'Crypto User',
    followersCount: 120
  }
};

export async function DELETE(request, { params }) {
  const { address } = params;
  
  // Check if user exists
  if (!mockUsers[address]) {
    return NextResponse.json(
      { error: true, code: 'NOT_FOUND', message: 'User not found' },
      { status: 404 }
    );
  }
  
  // In a real app, verify authentication and check if actually following
  
  // Update followers count (prevent negative counts)
  mockUsers[address].followersCount = Math.max(0, mockUsers[address].followersCount - 1);
  
  return NextResponse.json({
    success: true,
    isFollowing: false,
    followersCount: mockUsers[address].followersCount
  });
}

