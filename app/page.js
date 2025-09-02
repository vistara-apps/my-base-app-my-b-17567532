'use client';

import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { Identity, Avatar, Name, Address } from '@coinbase/onchainkit/identity';
import { ConnectWallet, Wallet, WalletDropdown, WalletDropdownDisconnect } from '@coinbase/onchainkit/wallet';
import { useEffect, useState } from 'react';
import { PostCard } from './components/PostCard';
import { CreatePost } from './components/CreatePost';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';

const mockPosts = [
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

export default function App() {
  const { setFrameReady, isFrameReady } = useMiniKit();
  const [posts, setPosts] = useState(mockPosts);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
    
    // Mock user data - in a real app, this would come from authentication
    setUser({
      address: '0x1234567890abcdef1234567890abcdef12345678',
      username: 'you',
      displayName: 'You',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    });
  }, [setFrameReady, isFrameReady]);

  const handleNewPost = (content) => {
    const newPost = {
      id: posts.length + 1,
      user: {
        name: user?.displayName || 'You',
        handle: `@${user?.username || 'you'}`,
        avatar: user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
      },
      content,
      timestamp: 'now',
      likes: 0,
      retweets: 0,
      comments: 0
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto flex">
        <Sidebar />
        
        <main className="flex-1 max-w-2xl mx-auto px-4 py-6">
          <div className="bg-white rounded-lg border border-gray-200 mb-6">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Home</h2>
            </div>
            
            <CreatePost onPost={handleNewPost} />
          </div>
          
          <div className="space-y-0">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </main>
        
        <aside className="w-80 p-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Connect Wallet</h3>
            <Wallet className="w-full">
              <ConnectWallet className="w-full">
                <div className="text-center">Connect to get started</div>
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address />
                </Identity>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4 mt-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Trending</h3>
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
