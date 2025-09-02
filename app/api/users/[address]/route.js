/**
 * @swagger
 * /api/users/{address}:
 *   get:
 *     summary: Get user profile
 *     description: Retrieves a user's profile information based on their wallet address
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: The wallet address of the user
 *     responses:
 *       200:
 *         description: User profile information
 *       404:
 *         description: User not found
 *   put:
 *     summary: Update user profile
 *     description: Updates a user's profile information
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: The wallet address of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               displayName:
 *                 type: string
 *               bio:
 *                 type: string
 *               avatar:
 *                 type: string
 *               coverImage:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated user profile
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
    bio: 'Web3 enthusiast and content creator',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    coverImage: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1000&h=300&fit=crop',
    followersCount: 120,
    followingCount: 85,
    postsCount: 42,
    createdAt: '2023-01-15T12:00:00Z',
    updatedAt: '2023-06-20T15:30:00Z'
  }
};

export async function GET(request, { params }) {
  const { address } = params;
  
  // Check if user exists
  if (!mockUsers[address]) {
    return NextResponse.json(
      { error: true, code: 'NOT_FOUND', message: 'User not found' },
      { status: 404 }
    );
  }
  
  // Return user profile
  return NextResponse.json(mockUsers[address]);
}

export async function PUT(request, { params }) {
  const { address } = params;
  
  // Check if user exists
  if (!mockUsers[address]) {
    return NextResponse.json(
      { error: true, code: 'NOT_FOUND', message: 'User not found' },
      { status: 404 }
    );
  }
  
  try {
    const data = await request.json();
    
    // Update user profile
    const updatedUser = {
      ...mockUsers[address],
      ...data,
      updatedAt: new Date().toISOString()
    };
    
    // In a real app, save to database
    mockUsers[address] = updatedUser;
    
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(
      { error: true, code: 'VALIDATION_ERROR', message: 'Invalid request body' },
      { status: 400 }
    );
  }
}

