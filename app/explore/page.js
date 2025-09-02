'use client';

import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { PostCard } from '../components/PostCard';
import Link from 'next/link';

export default function ExplorePage() {
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTimeframe, setActiveTimeframe] = useState('day');

  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        // In a real app, these would be API calls
        // const topicsResponse = await fetch(`/api/trending?timeframe=${activeTimeframe}`);
        // const topicsData = await topicsResponse.json();
        
        // const postsResponse = await fetch(`/api/posts?filter=trending`);
        // const postsData = await postsResponse.json();
        
        // const usersResponse = await fetch(`/api/users/suggested`);
        // const usersData = await usersResponse.json();
        
        // Mock data for demonstration
        const mockTrendingTopics = [
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
        ];
        
        const mockTrendingPosts = [
          {
            id: 1,
            user: {
              name: 'Sarah Chen',
              handle: '@sarahchen',
              avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
            },
            content: 'Just deployed my first smart contract on Base! The developer experience is incredible. 🚀',
            timestamp: '2h',
            likes: 24,
            retweets: 8,
            comments: 5
          },
          {
            id: 2,
            user: {
              name: 'Alex Rivera',
              handle: '@alexrivera',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
            },
            content: 'Building the future of social media on blockchain. Every interaction should be owned by the user, not the platform.',
            timestamp: '4h',
            likes: 156,
            retweets: 42,
            comments: 23
          },
          {
            id: 3,
            user: {
              name: 'Maya Patel',
              handle: '@mayapatel',
              avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
            },
            content: 'The Base ecosystem is growing so fast! Love seeing all the innovation happening in DeFi and social apps.',
            timestamp: '6h',
            likes: 89,
            retweets: 31,
            comments: 12
          }
        ];
        
        const mockSuggestedUsers = [
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
            username: 'cryptodev',
            displayName: 'Crypto Developer',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
            bio: 'Building the decentralized future',
            followersCount: 120
          },
          {
            address: '0x1234567890abcdef1234567890abcdef12345678',
            username: 'blockchainguru',
            displayName: 'Blockchain Guru',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
            bio: 'Blockchain educator and enthusiast',
            followersCount: 250
          }
        ];
        
        setTrendingTopics(mockTrendingTopics);
        setTrendingPosts(mockTrendingPosts);
        setSuggestedUsers(mockSuggestedUsers);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching trending data:', err);
        setError('Failed to load trending data. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchTrendingData();
  }, [activeTimeframe]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto flex pt-16">
        <Sidebar />
        
        <main className="flex-1 max-w-2xl mx-auto px-4 py-6">
          <div className="bg-white rounded-lg border border-gray-200 mb-6">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Explore</h2>
              <p className="text-gray-500 mt-1">Discover trending content and people</p>
            </div>
          </div>
          
          {loading ? (
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-20 bg-gray-200 rounded"></div>
                      <div className="h-20 bg-gray-200 rounded"></div>
                      <div className="h-20 bg-gray-200 rounded"></div>
                      <div className="h-20 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="space-y-4">
                    <div className="h-40 bg-gray-200 rounded"></div>
                    <div className="h-40 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : error ? (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-center py-8">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Data</h2>
                <p className="text-gray-500">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-4 bg-primary text-white px-4 py-2 rounded-full font-medium hover:bg-blue-600 transition-colors duration-200"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Trending Topics */}
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900">Trending Topics</h3>
                  <div className="flex space-x-2 text-sm">
                    <button 
                      onClick={() => setActiveTimeframe('day')}
                      className={`px-3 py-1 rounded-full ${
                        activeTimeframe === 'day' 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Today
                    </button>
                    <button 
                      onClick={() => setActiveTimeframe('week')}
                      className={`px-3 py-1 rounded-full ${
                        activeTimeframe === 'week' 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      This Week
                    </button>
                    <button 
                      onClick={() => setActiveTimeframe('month')}
                      className={`px-3 py-1 rounded-full ${
                        activeTimeframe === 'month' 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      This Month
                    </button>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    {trendingTopics.slice(0, 6).map((topic) => (
                      <Link 
                        key={topic.tag}
                        href={`/search?q=%23${topic.tag}`}
                        className="block border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-bold text-gray-900">#{topic.tag}</p>
                            <p className="text-sm text-gray-500">{topic.postCount} posts</p>
                          </div>
                          <div className={`text-sm font-medium ${
                            topic.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'
                          }`}>
                            {topic.trend}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  
                  <div className="mt-4 text-center">
                    <Link 
                      href="/search?type=topics"
                      className="text-primary font-medium hover:underline"
                    >
                      View all trending topics
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Trending Posts */}
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900">Trending Posts</h3>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {trendingPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
                
                <div className="p-4 text-center">
                  <Link 
                    href="/search?type=posts&sort=trending"
                    className="text-primary font-medium hover:underline"
                  >
                    View more trending posts
                  </Link>
                </div>
              </div>
              
              {/* Suggested Users */}
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900">Who to Follow</h3>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {suggestedUsers.map((user) => (
                    <div key={user.address} className="p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <Link href={`/profile/${user.address}`}>
                          <img
                            src={user.avatar}
                            alt={user.displayName}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        </Link>
                        <div className="ml-3">
                          <Link href={`/profile/${user.address}`} className="font-medium text-gray-900 hover:underline">
                            {user.displayName}
                          </Link>
                          <p className="text-sm text-gray-500">@{user.username}</p>
                          <p className="text-sm text-gray-700 mt-1 line-clamp-1">{user.bio}</p>
                        </div>
                      </div>
                      <button className="bg-primary text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors duration-200">
                        Follow
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 text-center">
                  <Link 
                    href="/search?type=users"
                    className="text-primary font-medium hover:underline"
                  >
                    View more people to follow
                  </Link>
                </div>
              </div>
            </div>
          )}
        </main>
        
        {/* Right Sidebar */}
        <aside className="w-80 p-4 hidden lg:block">
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
            <div className="space-y-2">
              <Link href="/search?q=crypto" className="block p-2 hover:bg-gray-50 rounded transition-colors duration-200">
                <span className="font-medium text-gray-900">Cryptocurrency</span>
              </Link>
              <Link href="/search?q=defi" className="block p-2 hover:bg-gray-50 rounded transition-colors duration-200">
                <span className="font-medium text-gray-900">DeFi</span>
              </Link>
              <Link href="/search?q=nft" className="block p-2 hover:bg-gray-50 rounded transition-colors duration-200">
                <span className="font-medium text-gray-900">NFTs</span>
              </Link>
              <Link href="/search?q=dao" className="block p-2 hover:bg-gray-50 rounded transition-colors duration-200">
                <span className="font-medium text-gray-900">DAOs</span>
              </Link>
              <Link href="/search?q=web3" className="block p-2 hover:bg-gray-50 rounded transition-colors duration-200">
                <span className="font-medium text-gray-900">Web3</span>
              </Link>
              <Link href="/search?q=metaverse" className="block p-2 hover:bg-gray-50 rounded transition-colors duration-200">
                <span className="font-medium text-gray-900">Metaverse</span>
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Hashtags</h3>
            <div className="flex flex-wrap gap-2">
              {trendingTopics.slice(0, 10).map((topic) => (
                <Link 
                  key={topic.tag}
                  href={`/search?q=%23${topic.tag}`}
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors duration-200"
                >
                  #{topic.tag}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

