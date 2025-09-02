'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
            </Link>
            <Link href="/">
              <h1 className="text-xl font-bold text-gray-900">Social</h1>
            </Link>
          </div>
          
          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-xs mx-4">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Search"
                />
              </div>
            </form>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`hover:text-primary font-medium ${pathname === '/' ? 'text-gray-900' : 'text-gray-500'}`}
            >
              Home
            </Link>
            <Link 
              href="/explore" 
              className={`hover:text-primary font-medium ${pathname === '/explore' ? 'text-gray-900' : 'text-gray-500'}`}
            >
              Explore
            </Link>
            <Link 
              href="/notifications" 
              className={`hover:text-primary font-medium ${pathname === '/notifications' ? 'text-gray-900' : 'text-gray-500'}`}
            >
              Notifications
            </Link>
            <Link 
              href="/messages" 
              className={`hover:text-primary font-medium ${pathname === '/messages' ? 'text-gray-900' : 'text-gray-500'}`}
            >
              Messages
            </Link>
          </nav>
          
          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => router.push('/posts/new')}
              className="hidden md:block bg-primary text-white px-4 py-2 rounded-full font-medium hover:bg-blue-600 transition-colors duration-200"
            >
              Post
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
            
            {/* User Avatar */}
            <Link href="/profile/0x1234567890abcdef1234567890abcdef12345678">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                alt="Your avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
            </Link>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden py-2 border-t border-gray-200">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Search"
                />
              </div>
            </form>
            
            <nav className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className={`py-2 px-4 rounded-md ${pathname === '/' ? 'bg-primary bg-opacity-10 text-primary' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setShowMobileMenu(false)}
              >
                Home
              </Link>
              <Link 
                href="/explore" 
                className={`py-2 px-4 rounded-md ${pathname === '/explore' ? 'bg-primary bg-opacity-10 text-primary' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setShowMobileMenu(false)}
              >
                Explore
              </Link>
              <Link 
                href="/notifications" 
                className={`py-2 px-4 rounded-md ${pathname === '/notifications' ? 'bg-primary bg-opacity-10 text-primary' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setShowMobileMenu(false)}
              >
                Notifications
              </Link>
              <Link 
                href="/messages" 
                className={`py-2 px-4 rounded-md ${pathname === '/messages' ? 'bg-primary bg-opacity-10 text-primary' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setShowMobileMenu(false)}
              >
                Messages
              </Link>
              <Link 
                href="/profile/0x1234567890abcdef1234567890abcdef12345678" 
                className={`py-2 px-4 rounded-md ${pathname.startsWith('/profile') ? 'bg-primary bg-opacity-10 text-primary' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setShowMobileMenu(false)}
              >
                Profile
              </Link>
              <Link 
                href="/settings" 
                className={`py-2 px-4 rounded-md ${pathname === '/settings' ? 'bg-primary bg-opacity-10 text-primary' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setShowMobileMenu(false)}
              >
                Settings
              </Link>
              <button 
                onClick={() => {
                  router.push('/posts/new');
                  setShowMobileMenu(false);
                }}
                className="py-2 px-4 bg-primary text-white rounded-md font-medium hover:bg-blue-600 transition-colors duration-200"
              >
                Post
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
