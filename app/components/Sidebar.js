'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export function Sidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Mock user data - in a real app, this would come from authentication
    setUser({
      address: '0x1234567890abcdef1234567890abcdef12345678',
      username: 'you',
      displayName: 'You',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    });
  }, []);
  
  const menuItems = [
    { icon: '🏠', label: 'Home', href: '/', active: pathname === '/' },
    { icon: '🔍', label: 'Explore', href: '/explore', active: pathname === '/explore' },
    { icon: '🔔', label: 'Notifications', href: '/notifications', active: pathname === '/notifications' },
    { icon: '💬', label: 'Messages', href: '/messages', active: pathname === '/messages' },
    { icon: '🔖', label: 'Bookmarks', href: '/bookmarks', active: pathname === '/bookmarks' },
    { 
      icon: '👤', 
      label: 'Profile', 
      href: user ? `/profile/${user.address}` : '/profile', 
      active: pathname.startsWith('/profile') 
    },
    { icon: '⚙️', label: 'Settings', href: '/settings', active: pathname === '/settings' },
  ];

  const [showPostModal, setShowPostModal] = useState(false);

  return (
    <aside className="w-64 p-4 hidden lg:block">
      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`flex items-center space-x-3 px-4 py-3 rounded-full transition-colors duration-200 ${
              item.active
                ? 'bg-primary bg-opacity-10 text-primary font-bold'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-lg">{item.label}</span>
          </Link>
        ))}
      </nav>
      
      <button 
        onClick={() => setShowPostModal(true)}
        className="w-full bg-primary text-white py-3 rounded-full font-bold text-lg mt-8 hover:bg-blue-600 transition-colors duration-200"
      >
        Post
      </button>
      
      {/* Post Modal - In a real app, this would be a proper modal component */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Create Post</h2>
              <button 
                onClick={() => setShowPostModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="mb-4">
              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="What's happening?"
                rows="4"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button 
                onClick={() => setShowPostModal(false)}
                className="bg-primary text-white px-6 py-2 rounded-full font-bold hover:bg-blue-600 transition-colors duration-200"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
