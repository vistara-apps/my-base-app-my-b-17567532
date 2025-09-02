'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { PostCard } from '../../components/PostCard';

export default function ProfilePage() {
  const { address } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch(`/api/users/${address}`);
        // const data = await response.json();
        
        // Mock data for demonstration
        const mockProfile = {
          address: address,
          username: 'cryptouser',
          displayName: 'Crypto User',
          bio: 'Web3 enthusiast and content creator',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
          coverImage: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1000&h=300&fit=crop',
          followersCount: 120,
          followingCount: 85,
          postsCount: 42,
          isFollowing: false,
          createdAt: '2023-01-15T12:00:00Z',
          updatedAt: '2023-06-20T15:30:00Z'
        };
        
        setProfile(mockProfile);
        setIsFollowing(mockProfile.isFollowing);
        
        // Fetch user's posts
        // const postsResponse = await fetch(`/api/posts?author=${address}`);
        // const postsData = await postsResponse.json();
        
        // Mock posts data
        const mockPosts = [
          {
            id: 1,
            user: {
              name: 'Crypto User',
              handle: '@cryptouser',
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
              name: 'Crypto User',
              handle: '@cryptouser',
              avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
            },
            content: 'Building the future of social media on blockchain. Every interaction should be owned by the user, not the platform.',
            timestamp: '1d',
            likes: 156,
            retweets: 42,
            comments: 23
          }
        ];
        
        setPosts(mockPosts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [address]);

  const handleFollow = async () => {
    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/users/${address}/follow`, {
      //   method: 'POST',
      // });
      // const data = await response.json();
      
      // Mock response
      setIsFollowing(true);
      setProfile(prev => ({
        ...prev,
        followersCount: prev.followersCount + 1
      }));
    } catch (err) {
      console.error('Error following user:', err);
    }
  };

  const handleUnfollow = async () => {
    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/users/${address}/unfollow`, {
      //   method: 'DELETE',
      // });
      // const data = await response.json();
      
      // Mock response
      setIsFollowing(false);
      setProfile(prev => ({
        ...prev,
        followersCount: prev.followersCount - 1
      }));
    } catch (err) {
      console.error('Error unfollowing user:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-6xl mx-auto flex pt-16">
          <Sidebar />
          <main className="flex-1 max-w-2xl mx-auto px-4 py-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="animate-pulse">
                <div className="h-32 bg-gray-200 rounded-t-lg"></div>
                <div className="flex justify-between items-end mt-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-full border-4 border-white -mt-12"></div>
                  <div className="w-32 h-10 bg-gray-200 rounded-full"></div>
                </div>
                <div className="mt-4">
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4 mt-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mt-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6 mt-2"></div>
                </div>
                <div className="flex space-x-4 mt-6">
                  <div className="h-5 bg-gray-200 rounded w-20"></div>
                  <div className="h-5 bg-gray-200 rounded w-20"></div>
                  <div className="h-5 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-6xl mx-auto flex pt-16">
          <Sidebar />
          <main className="flex-1 max-w-2xl mx-auto px-4 py-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-center py-8">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Profile</h2>
                <p className="text-gray-500">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-4 bg-primary text-white px-4 py-2 rounded-full font-medium hover:bg-blue-600 transition-colors duration-200"
                >
                  Try Again
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto flex pt-16">
        <Sidebar />
        
        <main className="flex-1 max-w-2xl mx-auto px-4 py-6">
          {profile && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
              {/* Cover Image */}
              <div 
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${profile.coverImage})` }}
              ></div>
              
              {/* Profile Info */}
              <div className="px-4 py-4 relative">
                <div className="flex justify-between items-end">
                  <img
                    src={profile.avatar}
                    alt={profile.displayName}
                    className="w-24 h-24 rounded-full border-4 border-white absolute -top-12"
                  />
                  
                  {isFollowing ? (
                    <button
                      onClick={handleUnfollow}
                      className="bg-white text-gray-800 border border-gray-300 px-4 py-1.5 rounded-full font-medium hover:bg-gray-50 transition-colors duration-200"
                    >
                      Following
                    </button>
                  ) : (
                    <button
                      onClick={handleFollow}
                      className="bg-primary text-white px-4 py-1.5 rounded-full font-medium hover:bg-blue-600 transition-colors duration-200"
                    >
                      Follow
                    </button>
                  )}
                </div>
                
                <div className="mt-12">
                  <h1 className="font-bold text-xl text-gray-900">{profile.displayName}</h1>
                  <p className="text-gray-500">@{profile.username}</p>
                  
                  <p className="mt-3 text-gray-800">{profile.bio}</p>
                  
                  <div className="flex space-x-6 mt-4">
                    <div>
                      <span className="font-bold text-gray-900">{profile.postsCount}</span>{' '}
                      <span className="text-gray-500">Posts</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-900">{profile.followingCount}</span>{' '}
                      <span className="text-gray-500">Following</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-900">{profile.followersCount}</span>{' '}
                      <span className="text-gray-500">Followers</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Tabs */}
          <div className="bg-white rounded-lg border border-gray-200 mb-6">
            <div className="flex border-b border-gray-200">
              <button className="flex-1 py-3 font-medium text-primary border-b-2 border-primary">
                Posts
              </button>
              <button className="flex-1 py-3 font-medium text-gray-500 hover:text-gray-700">
                Replies
              </button>
              <button className="flex-1 py-3 font-medium text-gray-500 hover:text-gray-700">
                Media
              </button>
              <button className="flex-1 py-3 font-medium text-gray-500 hover:text-gray-700">
                Likes
              </button>
            </div>
          </div>
          
          {/* Posts */}
          <div className="space-y-0">
            {posts.length > 0 ? (
              posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
                <p className="text-gray-500">This user hasn't posted anything yet.</p>
              </div>
            )}
          </div>
        </main>
        
        {/* Right Sidebar */}
        <aside className="w-80 p-4 hidden lg:block">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Who to follow</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">Alex Rivera</p>
                    <p className="text-sm text-gray-500">@alexrivera</p>
                  </div>
                </div>
                <button className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors duration-200">
                  Follow
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">Maya Patel</p>
                    <p className="text-sm text-gray-500">@mayapatel</p>
                  </div>
                </div>
                <button className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors duration-200">
                  Follow
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">Tom Wilson</p>
                    <p className="text-sm text-gray-500">@tomwilson</p>
                  </div>
                </div>
                <button className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors duration-200">
                  Follow
                </button>
              </div>
            </div>
            
            <button className="text-primary text-sm font-medium mt-4 hover:underline">
              Show more
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

