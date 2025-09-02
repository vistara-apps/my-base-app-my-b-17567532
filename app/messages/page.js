'use client';

import { useState, useEffect, useRef } from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import Link from 'next/link';

export default function MessagesPage() {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/conversations');
        // const data = await response.json();
        
        // Mock conversations data
        const mockConversations = [
          {
            id: 1,
            user: {
              address: '0xabcdef1234567890abcdef1234567890abcdef12',
              username: 'web3fan',
              displayName: 'Web3 Fan',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
            },
            lastMessage: {
              content: 'Hey, what do you think about the new Base features?',
              timestamp: '2023-06-21T15:30:00Z',
              sender: '0xabcdef1234567890abcdef1234567890abcdef12'
            },
            unread: 2
          },
          {
            id: 2,
            user: {
              address: '0x9876543210fedcba9876543210fedcba98765432',
              username: 'cryptodev',
              displayName: 'Crypto Developer',
              avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
            },
            lastMessage: {
              content: 'Thanks for the help with my smart contract!',
              timestamp: '2023-06-20T18:45:00Z',
              sender: '0x1234567890abcdef1234567890abcdef12345678'
            },
            unread: 0
          },
          {
            id: 3,
            user: {
              address: '0x1234567890abcdef1234567890abcdef12345678',
              username: 'blockchainguru',
              displayName: 'Blockchain Guru',
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
            },
            lastMessage: {
              content: 'Let me know if you want to collaborate on a project!',
              timestamp: '2023-06-19T12:15:00Z',
              sender: '0x1234567890abcdef1234567890abcdef12345678'
            },
            unread: 0
          }
        ];
        
        setConversations(mockConversations);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching conversations:', err);
        setError('Failed to load conversations. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchConversations();
  }, []);
  
  useEffect(() => {
    if (activeConversation) {
      const fetchMessages = async () => {
        try {
          // In a real app, this would be an API call
          // const response = await fetch(`/api/conversations/${activeConversation.id}/messages`);
          // const data = await response.json();
          
          // Mock messages data
          const mockMessages = activeConversation.id === 1 ? [
            {
              id: 1,
              content: 'Hey there! How are you?',
              timestamp: '2023-06-21T14:30:00Z',
              sender: '0x1234567890abcdef1234567890abcdef12345678',
              read: true
            },
            {
              id: 2,
              content: 'I\'m good, thanks! Just exploring the new Base features.',
              timestamp: '2023-06-21T14:35:00Z',
              sender: '0xabcdef1234567890abcdef1234567890abcdef12',
              read: true
            },
            {
              id: 3,
              content: 'What do you think of them so far?',
              timestamp: '2023-06-21T14:40:00Z',
              sender: '0x1234567890abcdef1234567890abcdef12345678',
              read: true
            },
            {
              id: 4,
              content: 'They\'re amazing! The developer experience is so smooth.',
              timestamp: '2023-06-21T14:45:00Z',
              sender: '0xabcdef1234567890abcdef1234567890abcdef12',
              read: true
            },
            {
              id: 5,
              content: 'Have you tried building anything with them yet?',
              timestamp: '2023-06-21T15:00:00Z',
              sender: '0xabcdef1234567890abcdef1234567890abcdef12',
              read: true
            },
            {
              id: 6,
              content: 'Hey, what do you think about the new Base features?',
              timestamp: '2023-06-21T15:30:00Z',
              sender: '0xabcdef1234567890abcdef1234567890abcdef12',
              read: false
            }
          ] : activeConversation.id === 2 ? [
            {
              id: 1,
              content: 'Hi there! I\'m having some trouble with my smart contract. Could you help me out?',
              timestamp: '2023-06-20T17:30:00Z',
              sender: '0x9876543210fedcba9876543210fedcba98765432',
              read: true
            },
            {
              id: 2,
              content: 'Sure, what seems to be the issue?',
              timestamp: '2023-06-20T17:35:00Z',
              sender: '0x1234567890abcdef1234567890abcdef12345678',
              read: true
            },
            {
              id: 3,
              content: 'I\'m getting an error when trying to deploy it to Base testnet.',
              timestamp: '2023-06-20T17:40:00Z',
              sender: '0x9876543210fedcba9876543210fedcba98765432',
              read: true
            },
            {
              id: 4,
              content: 'Can you share the error message?',
              timestamp: '2023-06-20T17:45:00Z',
              sender: '0x1234567890abcdef1234567890abcdef12345678',
              read: true
            },
            {
              id: 5,
              content: 'It says "Gas estimation failed" and something about reverting.',
              timestamp: '2023-06-20T17:50:00Z',
              sender: '0x9876543210fedcba9876543210fedcba98765432',
              read: true
            },
            {
              id: 6,
              content: 'That usually means there\'s an issue with your constructor or one of the functions is reverting. Check your constructor parameters and make sure they\'re valid.',
              timestamp: '2023-06-20T18:00:00Z',
              sender: '0x1234567890abcdef1234567890abcdef12345678',
              read: true
            },
            {
              id: 7,
              content: 'You were right! I was passing an invalid address to the constructor. It works now!',
              timestamp: '2023-06-20T18:30:00Z',
              sender: '0x9876543210fedcba9876543210fedcba98765432',
              read: true
            },
            {
              id: 8,
              content: 'Thanks for the help with my smart contract!',
              timestamp: '2023-06-20T18:45:00Z',
              sender: '0x1234567890abcdef1234567890abcdef12345678',
              read: true
            }
          ] : [
            {
              id: 1,
              content: 'Hello! I saw your posts about Base and I\'m impressed with your knowledge.',
              timestamp: '2023-06-19T11:30:00Z',
              sender: '0x1234567890abcdef1234567890abcdef12345678',
              read: true
            },
            {
              id: 2,
              content: 'Thanks! I\'ve been studying blockchain technology for years.',
              timestamp: '2023-06-19T11:35:00Z',
              sender: '0x1234567890abcdef1234567890abcdef12345678',
              read: true
            },
            {
              id: 3,
              content: 'I\'m working on a new project and could use someone with your expertise.',
              timestamp: '2023-06-19T11:40:00Z',
              sender: '0x1234567890abcdef1234567890abcdef12345678',
              read: true
            },
            {
              id: 4,
              content: 'Let me know if you want to collaborate on a project!',
              timestamp: '2023-06-19T12:15:00Z',
              sender: '0x1234567890abcdef1234567890abcdef12345678',
              read: true
            }
          ];
          
          setMessages(mockMessages);
          
          // Mark conversation as read
          setConversations(conversations.map(conv => 
            conv.id === activeConversation.id ? { ...conv, unread: 0 } : conv
          ));
        } catch (err) {
          console.error('Error fetching messages:', err);
        }
      };
      
      fetchMessages();
    }
  }, [activeConversation, conversations]);
  
  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !activeConversation) return;
    
    // In a real app, this would be an API call
    // fetch(`/api/conversations/${activeConversation.id}/messages`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ content: newMessage })
    // });
    
    // Add message to local state
    const newMsg = {
      id: Date.now(),
      content: newMessage,
      timestamp: new Date().toISOString(),
      sender: '0x1234567890abcdef1234567890abcdef12345678', // Current user's address
      read: false
    };
    
    setMessages([...messages, newMsg]);
    
    // Update conversation's last message
    setConversations(conversations.map(conv => 
      conv.id === activeConversation.id ? {
        ...conv,
        lastMessage: {
          content: newMessage,
          timestamp: new Date().toISOString(),
          sender: '0x1234567890abcdef1234567890abcdef12345678'
        }
      } : conv
    ));
    
    setNewMessage('');
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
  
  const formatMessageTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto flex pt-16">
        <Sidebar />
        
        <main className="flex-1 max-w-4xl mx-auto px-4 py-6">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden h-[calc(100vh-8rem)]">
            <div className="flex h-full">
              {/* Conversations List */}
              <div className="w-80 border-r border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900">Messages</h2>
                </div>
                
                {loading ? (
                  <div className="p-4">
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
                  <div className="p-4 text-center">
                    <p className="text-red-500">{error}</p>
                    <button 
                      onClick={() => window.location.reload()}
                      className="mt-2 text-primary hover:text-blue-700 font-medium"
                    >
                      Try Again
                    </button>
                  </div>
                ) : conversations.length === 0 ? (
                  <div className="p-8 text-center flex-1 flex flex-col items-center justify-center">
                    <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
                    <p className="text-gray-500">Start a conversation with someone!</p>
                  </div>
                ) : (
                  <div className="overflow-y-auto flex-1">
                    {conversations.map((conversation) => (
                      <div 
                        key={conversation.id}
                        onClick={() => setActiveConversation(conversation)}
                        className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${
                          activeConversation?.id === conversation.id ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="relative">
                            <Link href={`/profile/${conversation.user.address}`}>
                              <img
                                src={conversation.user.avatar}
                                alt={conversation.user.displayName}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                            </Link>
                            {conversation.unread > 0 && (
                              <div className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {conversation.unread}
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between">
                              <h3 className="font-medium text-gray-900 truncate">
                                {conversation.user.displayName}
                              </h3>
                              <span className="text-xs text-gray-500">
                                {formatDate(conversation.lastMessage.timestamp)}
                              </span>
                            </div>
                            
                            <p className={`text-sm truncate ${conversation.unread > 0 ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
                              {conversation.lastMessage.sender === '0x1234567890abcdef1234567890abcdef12345678' ? 'You: ' : ''}
                              {conversation.lastMessage.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Messages */}
              <div className="flex-1 flex flex-col">
                {activeConversation ? (
                  <>
                    {/* Conversation Header */}
                    <div className="p-4 border-b border-gray-200 flex items-center space-x-3">
                      <Link href={`/profile/${activeConversation.user.address}`}>
                        <img
                          src={activeConversation.user.avatar}
                          alt={activeConversation.user.displayName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      </Link>
                      
                      <div>
                        <Link href={`/profile/${activeConversation.user.address}`} className="font-medium text-gray-900 hover:underline">
                          {activeConversation.user.displayName}
                        </Link>
                        <p className="text-sm text-gray-500">@{activeConversation.user.username}</p>
                      </div>
                    </div>
                    
                    {/* Messages List */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {messages.map((message) => {
                        const isCurrentUser = message.sender === '0x1234567890abcdef1234567890abcdef12345678';
                        
                        return (
                          <div 
                            key={message.id}
                            className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`max-w-xs md:max-w-md ${
                              isCurrentUser 
                                ? 'bg-primary text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg' 
                                : 'bg-gray-100 text-gray-800 rounded-tl-lg rounded-tr-lg rounded-br-lg'
                            } p-3`}
                            >
                              <p>{message.content}</p>
                              <p className={`text-xs mt-1 ${isCurrentUser ? 'text-blue-100' : 'text-gray-500'}`}>
                                {formatMessageTime(message.timestamp)}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                      <div ref={messagesEndRef} />
                    </div>
                    
                    {/* Message Input */}
                    <div className="p-4 border-t border-gray-200">
                      <form onSubmit={handleSendMessage} className="flex space-x-2">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type a message..."
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <button
                          type="submit"
                          disabled={!newMessage.trim()}
                          className="bg-primary text-white p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </button>
                      </form>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                    <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                    <p className="text-gray-500">Choose a conversation from the list to start messaging</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

