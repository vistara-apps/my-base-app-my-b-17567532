/**
 * @swagger
 * /api/trending:
 *   get:
 *     summary: Get trending topics
 *     description: Retrieves trending hashtags and topics
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of trending topics to return
 *       - in: query
 *         name: timeframe
 *         schema:
 *           type: string
 *           enum: [day, week, month]
 *           default: day
 *         description: Time period for trending calculation
 *     responses:
 *       200:
 *         description: List of trending topics
 */

import { NextResponse } from 'next/server';

// Mock trending topics data - in a real app, this would be calculated from actual post data
const mockTrendingTopics = {
  day: [
    { tag: 'web3', postCount: 1250, trend: '+15%' },
    { tag: 'defi', postCount: 980, trend: '+8%' },
    { tag: 'nft', postCount: 750, trend: '-3%' },
    { tag: 'blockchain', postCount: 620, trend: '+5%' },
    { tag: 'crypto', postCount: 580, trend: '+2%' },
    { tag: 'base', postCount: 520, trend: '+25%' },
    { tag: 'ethereum', postCount: 480, trend: '-1%' },
    { tag: 'web3social', postCount: 450, trend: '+25%' },
    { tag: 'dao', postCount: 320, trend: '+10%' },
    { tag: 'metaverse', postCount: 280, trend: '-5%' }
  ],
  week: [
    { tag: 'web3', postCount: 8500, trend: '+10%' },
    { tag: 'defi', postCount: 7200, trend: '+5%' },
    { tag: 'nft', postCount: 6800, trend: '-8%' },
    { tag: 'blockchain', postCount: 5400, trend: '+3%' },
    { tag: 'crypto', postCount: 4900, trend: '+1%' },
    { tag: 'ethereum', postCount: 4200, trend: '+2%' },
    { tag: 'base', postCount: 3800, trend: '+30%' },
    { tag: 'dao', postCount: 2500, trend: '+7%' },
    { tag: 'web3social', postCount: 2200, trend: '+20%' },
    { tag: 'metaverse', postCount: 1900, trend: '-10%' }
  ],
  month: [
    { tag: 'web3', postCount: 35000, trend: '+8%' },
    { tag: 'defi', postCount: 32000, trend: '+3%' },
    { tag: 'nft', postCount: 30000, trend: '-15%' },
    { tag: 'blockchain', postCount: 28000, trend: '+5%' },
    { tag: 'crypto', postCount: 25000, trend: '+2%' },
    { tag: 'ethereum', postCount: 22000, trend: '+4%' },
    { tag: 'base', postCount: 18000, trend: '+40%' },
    { tag: 'dao', postCount: 15000, trend: '+12%' },
    { tag: 'web3social', postCount: 12000, trend: '+35%' },
    { tag: 'metaverse', postCount: 10000, trend: '-5%' }
  ]
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  
  // Parse query parameters
  const limit = parseInt(searchParams.get('limit') || '10');
  const timeframe = searchParams.get('timeframe') || 'day';
  
  // Validate timeframe
  if (!['day', 'week', 'month'].includes(timeframe)) {
    return NextResponse.json(
      { error: true, code: 'VALIDATION_ERROR', message: 'Invalid timeframe. Must be one of: day, week, month' },
      { status: 400 }
    );
  }
  
  // Get trending topics for the specified timeframe
  const topics = mockTrendingTopics[timeframe].slice(0, limit);
  
  return NextResponse.json({ topics });
}

