'use client';

import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import Link from 'next/link';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/notifications');
        // const data = await response.json();
        
        // Mock notifications data
        const mockNotifications = [
          {
            id: 1,
            type: 'follow',
            user: {
              address: '0xabcdef1234567890abcdef1234567890abcdef12',
              username: 'web3fan',
              displayName: 'Web3 Fan',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
            },
            createdAt: '2023-06-21T15:30:00Z',
            read: false
          },
          {
            id: 2,
            type: 'like',
            user: {
              address: '0x9876543210fedcba9876543210fedcba98765432',
              username: 'cryptodev',
              displayName: 'Crypto Developer',
              avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
            },
            post: {
              id: 'post_12345',
              content: 'Just deployed my first smart contract on Base!'
            },
            createdAt: '2023-06-21T14:45:00Z',
            read: false
          },
          {
            id: 3,
            type: 'comment',
            user: {
              address: '0x9876543210fedcba9876543210fedcba98765432',
              username: 'cryptodev',
              displayName: 'Crypto Developer',
              avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
            },
            post: {
              id: 'post_12345',
              content: 'Just deployed my first smart contract on Base!'
            },
            comment: {
              id: 'comment_6789',
              content: 'Great first post!'
            },
            createdAt: '2023-06-21T13:15:00Z',
            read: true
          },
          {
            id: 4,
            type: 'mention',
            user: {
              address: '0x1234567890abcdef1234567890abcdef12345678',
              username: 'blockchainguru',
              displayName: 'Blockchain Guru',
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
            },
            post: {
              id: 'post_67890',
              content: 'Hey @cryptouser, what do you think about the new Base features?'
            },
            createdAt: '2023-06-20T18:30:00Z',
            read: true
          },
          {
            id: 5,
            type: 'repost',
            user: {
              address: '0xabcdef1234567890abcdef1234567890abcdef12',
              username: 'web3fan',
              displayName: 'Web3 Fan',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
            },
            post: {
              id: 'post_12345',
              content: 'Just deployed my first smart contract on Base!'
            },
            createdAt: '2023-06-20T16:45:00Z',
            read: true
          }
        ];
        
        setNotifications(mockNotifications);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setError('Failed to load notifications. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchNotifications();
  }, []);
  
  const markAllAsRead = async () => {
    try {
      // In a real app, this would be an API call
      // await fetch('/api/notifications/mark-all-read', { method: 'POST' });
      
      // Update local state
      setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    } catch (err) {
      console.error('Error marking notifications as read:', err);
    }
  };
  
  const markAsRead = async (id) => {
    try {
      // In a real app, this would be an API call
      // await fetch(`/api/notifications/${id}/mark-read`, { method: 'POST' });
      
      // Update local state
      setNotifications(notifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      ));
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
      return 'just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}m`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}h`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days}d`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    }
  };
  
  const getNotificationText = (notification) => {
    switch (notification.type) {
      case 'follow':
        return `${notification.user.displayName} followed you`;
      case 'like':
        return `${notification.user.displayName} liked your post`;
      case 'comment':
        return `${notification.user.displayName} commented on your post`;
      case 'mention':
        return `${notification.user.displayName} mentioned you in a post`;
      case 'repost':
        return `${notification.user.displayName} reposted your post`;
      default:
        return 'New notification';
    }
  };
  
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'follow':
        return (
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-primary">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
        );
      case 'like':
        return (
          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-500">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
        );
      case 'comment':
        return (
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-500">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
        );
      case 'mention':
        return (
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-500">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
          </div>
        );
      case 'repost':
        return (
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-500">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
        );
    }
  };
  
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'mentions' && notification.type === 'mention') return true;
    if (activeTab === 'unread' && !notification.read) return true;
    return false;
  });
  
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto flex pt-16">
        <Sidebar />
        
        <main className="flex-1 max-w-2xl mx-auto px-4 py-6">
          <div className="bg-white rounded-lg border border-gray-200 mb-6">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
              {unreadCount > 0 && (
                <button 
                  onClick={markAllAsRead}
                  className="text-primary hover:text-blue-700 font-medium text-sm"
                >
                  Mark all as read
                </button>
              )}
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
                onClick={() => setActiveTab('mentions')}
                className={`flex-1 py-3 font-medium transition-colors duration-200 ${
                  activeTab === 'mentions' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Mentions
              </button>
              <button 
                onClick={() => setActiveTab('unread')}
                className={`flex-1 py-3 font-medium transition-colors duration-200 ${
                  activeTab === 'unread' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Unread
                {unreadCount > 0 && (
                  <span className="ml-2 bg-primary text-white text-xs rounded-full px-2 py-0.5">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>
          </div>
          
          {loading ? (
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="animate-pulse space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : error ? (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-center py-8">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Notifications</h2>
                <p className="text-gray-500">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-4 bg-primary text-white px-4 py-2 rounded-full font-medium hover:bg-blue-600 transition-colors duration-200"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
              <p className="text-gray-500">
                {activeTab === 'all' ? "You don't have any notifications yet." : 
                 activeTab === 'mentions' ? "You haven't been mentioned in any posts yet." :
                 "You don't have any unread notifications."}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
              {filteredNotifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 flex items-start space-x-3 ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
                  onClick={() => !notification.read && markAsRead(notification.id)}
                >
                  <div className="flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-shrink-0">
                    <Link href={`/profile/${notification.user.address}`}>
                      <img
                        src={notification.user.avatar}
                        alt={notification.user.displayName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </Link>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <p className="text-gray-900">
                        <Link href={`/profile/${notification.user.address}`} className="font-medium hover:underline">
                          {notification.user.displayName}
                        </Link>{' '}
                        <span className="text-gray-700">{getNotificationText(notification)}</span>
                      </p>
                      <span className="text-sm text-gray-500">{formatDate(notification.createdAt)}</span>
                    </div>
                    
                    {notification.post && (
                      <Link 
                        href={`/posts/${notification.post.id}`}
                        className="mt-1 text-gray-600 text-sm block hover:text-gray-900"
                      >
                        {notification.post.content.length > 60 
                          ? `${notification.post.content.substring(0, 60)}...` 
                          : notification.post.content
                        }
                      </Link>
                    )}
                    
                    {notification.comment && (
                      <p className="mt-1 text-gray-600 text-sm">
                        "{notification.comment.content}"
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
        
        {/* Right Sidebar */}
        <aside className="w-80 p-4 hidden lg:block">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Notification Settings</h3>
            <div className="space-y-4">
              <Link 
                href="/settings/notifications"
                className="text-primary hover:text-blue-700 font-medium block"
              >
                Manage notification preferences
              </Link>
              <Link 
                href="/settings/privacy"
                className="text-primary hover:text-blue-700 font-medium block"
              >
                Privacy settings
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

