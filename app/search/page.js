'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { PostCard } from '../components/PostCard';
import Link from 'next/link';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const type = searchParams.get('type') || 'all';
  
  const [results, setResults] = useState({
    posts: [],
    users: [],
    topics: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(type);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setLoading(false);
        return;
      }
      
      try {
        // In a real app, this would be an API call
        // const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&type=${type}`);
        // const data = await response.json();
        
        // Mock data for demonstration
        const mockResults = {
          posts: [
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
          ],
          users: [
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
          ],
          topics: [
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
          ]
        };
        
        // Filter results based on query
        const filteredResults = {
          posts: mockResults.posts.filter(post => 
            post.content.toLowerCase().includes(query.toLowerCase()) ||
            post.author.username.toLowerCase().includes(query.toLowerCase()) ||
            post.author.displayName.toLowerCase().includes(query.toLowerCase())
          ),
          users: mockResults.users.filter(user => 
            user.username.toLowerCase().includes(query.toLowerCase()) ||
            user.displayName.toLowerCase().includes(query.toLowerCase()) ||
            user.bio.toLowerCase().includes(query.toLowerCase())
          ),
          topics: mockResults.topics.filter(topic => 
            topic.tag.toLowerCase().includes(query.toLowerCase())
          )
        };
        
        setResults(filteredResults);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching search results:', err);
        setError('Failed to load search results. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchSearchResults();
  }, [query, type]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTotalResults = () => {
    return results.posts.length + results.users.length + results.topics.length;
  };

  const renderResults = () => {
    if (activeTab === 'all') {
      return (
        <div>
          {/* Posts */}
          {results.posts.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Posts</h3>
              <div className="space-y-0">
                {results.posts.map(post => (
                  <div key={post.id} className="bg-white border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex space-x-3">
                      <Link href={`/profile/${post.author.address}`}>
                        <img
                          src={post.author.avatar}
                          alt={post.author.displayName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      </Link>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <Link href={`/profile/${post.author.address}`} className="font-bold text-gray-900 hover:underline">
                            {post.author.displayName}
                          </Link>
                          <span className="text-gray-500 text-sm">@{post.author.username}</span>
                          <span className="text-gray-500 text-sm">·</span>
                          <span className="text-gray-500 text-sm">{formatDate(post.createdAt)}</span>
                        </div>
                        
                        <Link href={`/posts/${post.id}`} className="block">
                          <p className="text-gray-900 mt-2">{post.content}</p>
                        </Link>
                        
                        <div className="flex items-center space-x-6 mt-2 text-sm text-gray-500">
                          <span>{post.commentsCount} comments</span>
                          <span>{post.repostsCount} reposts</span>
                          <span>{post.likesCount} likes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {results.posts.length > 2 && (
                <div className="mt-4 text-center">
                  <button 
                    onClick={() => setActiveTab('posts')}
                    className="text-primary font-medium hover:underline"
                  >
                    View all posts
                  </button>
                </div>
              )}
            </div>
          )}
          
          {/* Users */}
          {results.users.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">People</h3>
              <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
                {results.users.map(user => (
                  <Link 
                    key={user.address}
                    href={`/profile/${user.address}`}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <img
                        src={user.avatar}
                        alt={user.displayName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">{user.displayName}</p>
                        <p className="text-sm text-gray-500">@{user.username}</p>
                        <p className="text-sm text-gray-700 mt-1">{user.bio}</p>
                      </div>
                    </div>
                    <button className="bg-primary text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors duration-200">
                      Follow
                    </button>
                  </Link>
                ))}
              </div>
              {results.users.length > 2 && (
                <div className="mt-4 text-center">
                  <button 
                    onClick={() => setActiveTab('users')}
                    className="text-primary font-medium hover:underline"
                  >
                    View all people
                  </button>
                </div>
              )}
            </div>
          )}
          
          {/* Topics */}
          {results.topics.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Topics</h3>
              <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
                {results.topics.map(topic => (
                  <Link 
                    key={topic.tag}
                    href={`/search?q=%23${topic.tag}`}
                    className="block p-4 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold text-gray-900">#{topic.tag}</p>
                        <p className="text-sm text-gray-500">{topic.postCount} posts</p>
                      </div>
                      <div className="text-sm font-medium text-green-500">{topic.trend}</div>
                    </div>
                  </Link>
                ))}
              </div>
              {results.topics.length > 3 && (
                <div className="mt-4 text-center">
                  <button 
                    onClick={() => setActiveTab('topics')}
                    className="text-primary font-medium hover:underline"
                  >
                    View all topics
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      );
    } else if (activeTab === 'posts') {
      return (
        <div className="space-y-0">
          {results.posts.length > 0 ? (
            results.posts.map(post => (
              <div key={post.id} className="bg-white border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex space-x-3">
                  <Link href={`/profile/${post.author.address}`}>
                    <img
                      src={post.author.avatar}
                      alt={post.author.displayName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </Link>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <Link href={`/profile/${post.author.address}`} className="font-bold text-gray-900 hover:underline">
                        {post.author.displayName}
                      </Link>
                      <span className="text-gray-500 text-sm">@{post.author.username}</span>
                      <span className="text-gray-500 text-sm">·</span>
                      <span className="text-gray-500 text-sm">{formatDate(post.createdAt)}</span>
                    </div>
                    
                    <Link href={`/posts/${post.id}`} className="block">
                      <p className="text-gray-900 mt-2">{post.content}</p>
                    </Link>
                    
                    <div className="flex items-center space-x-6 mt-2 text-sm text-gray-500">
                      <span>{post.commentsCount} comments</span>
                      <span>{post.repostsCount} reposts</span>
                      <span>{post.likesCount} likes</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
              <p className="text-gray-500">Try searching for something else</p>
            </div>
          )}
        </div>
      );
    } else if (activeTab === 'users') {
      return (
        <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
          {results.users.length > 0 ? (
            results.users.map(user => (
              <Link 
                key={user.address}
                href={`/profile/${user.address}`}
                className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center">
                  <img
                    src={user.avatar}
                    alt={user.displayName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">{user.displayName}</p>
                    <p className="text-sm text-gray-500">@{user.username}</p>
                    <p className="text-sm text-gray-700 mt-1">{user.bio}</p>
                    <p className="text-xs text-gray-500 mt-1">{user.followersCount} followers</p>
                  </div>
                </div>
                <button className="bg-primary text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors duration-200">
                  Follow
                </button>
              </Link>
            ))
          ) : (
            <div className="p-8 text-center">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-500">Try searching for something else</p>
            </div>
          )}
        </div>
      );
    } else if (activeTab === 'topics') {
      return (
        <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
          {results.topics.length > 0 ? (
            results.topics.map(topic => (
              <Link 
                key={topic.tag}
                href={`/search?q=%23${topic.tag}`}
                className="block p-4 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-gray-900">#{topic.tag}</p>
                    <p className="text-sm text-gray-500">{topic.postCount} posts</p>
                  </div>
                  <div className="text-sm font-medium text-green-500">{topic.trend}</div>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-8 text-center">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No topics found</h3>
              <p className="text-gray-500">Try searching for something else</p>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto flex pt-16">
        <Sidebar />
        
        <main className="flex-1 max-w-2xl mx-auto px-4 py-6">
          <div className="bg-white rounded-lg border border-gray-200 mb-6">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Search Results</h2>
              <p className="text-gray-500 mt-1">
                {loading ? 'Searching...' : `${getTotalResults()} results for "${query}"`}
              </p>
            </div>
            
            <div className="flex border-b border-gray-200">
              <button 
                onClick={() => setActiveTab('all')}
                className={`flex-1 py-3 font-medium transition-colors duration-200 ${
                  activeTab === 'all' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                All
              </button>
              <button 
                onClick={() => setActiveTab('posts')}
                className={`flex-1 py-3 font-medium transition-colors duration-200 ${
                  activeTab === 'posts' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Posts
                {results.posts.length > 0 && ` (${results.posts.length})`}
              </button>
              <button 
                onClick={() => setActiveTab('users')}
                className={`flex-1 py-3 font-medium transition-colors duration-200 ${
                  activeTab === 'users' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                People
                {results.users.length > 0 && ` (${results.users.length})`}
              </button>
              <button 
                onClick={() => setActiveTab('topics')}
                className={`flex-1 py-3 font-medium transition-colors duration-200 ${
                  activeTab === 'topics' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Topics
                {results.topics.length > 0 && ` (${results.topics.length})`}
              </button>
            </div>
          </div>
          
          {loading ? (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ) : error ? (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-center py-8">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Results</h2>
                <p className="text-gray-500">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-4 bg-primary text-white px-4 py-2 rounded-full font-medium hover:bg-blue-600 transition-colors duration-200"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : getTotalResults() === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-500">Try searching for something else</p>
            </div>
          ) : (
            renderResults()
          )}
        </main>
        
        {/* Right Sidebar */}
        <aside className="w-80 p-4 hidden lg:block">
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Search Tips</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Use <strong>#hashtags</strong> to search for topics</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Search for <strong>@usernames</strong> to find people</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Use quotes for <strong>"exact phrases"</strong></span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Filter results using the tabs above</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Trending Topics</h3>
            <div className="space-y-3">
              <div className="cursor-pointer hover:bg-gray-50 p-2 rounded">
                <p className="text-sm text-gray-500">Trending in Crypto</p>
                <p className="font-bold text-gray-900">#BaseChain</p>
                <p className="text-sm text-gray-500">12.5K posts</p>
              </div>
              <div className="cursor-pointer hover:bg-gray-50 p-2 rounded">
                <p className="text-sm text-gray-500">Trending</p>
                <p className="font-bold text-gray-900">#DeFi</p>
                <p className="text-sm text-gray-500">8.2K posts</p>
              </div>
              <div className="cursor-pointer hover:bg-gray-50 p-2 rounded">
                <p className="text-sm text-gray-500">Technology</p>
                <p className="font-bold text-gray-900">#Web3Social</p>
                <p className="text-sm text-gray-500">5.1K posts</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

