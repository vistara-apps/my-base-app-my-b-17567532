'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import Link from 'next/link';

export default function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [liked, setLiked] = useState(false);
  const [retweeted, setRetweeted] = useState(false);
  const [likes, setLikes] = useState(0);
  const [retweets, setRetweets] = useState(0);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch(`/api/posts/${id}`);
        // const data = await response.json();
        
        // Mock data for demonstration
        const mockPost = {
          id: id,
          content: 'Just deployed my first smart contract on Base! The developer experience is incredible. 🚀',
          media: [],
          tags: ['web3', 'blockchain', 'base'],
          author: {
            address: '0x1234567890abcdef1234567890abcdef12345678',
            username: 'cryptouser',
            displayName: 'Crypto User',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
          },
          likesCount: 24,
          commentsCount: 5,
          repostsCount: 8,
          createdAt: '2023-06-21T14:30:00Z',
          onchainReference: {
            transactionHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
            blockNumber: 12345678
          }
        };
        
        setPost(mockPost);
        setLikes(mockPost.likesCount);
        setRetweets(mockPost.repostsCount);
        
        // Fetch comments
        // const commentsResponse = await fetch(`/api/posts/${id}/comments`);
        // const commentsData = await commentsResponse.json();
        
        // Mock comments data
        const mockComments = [
          {
            id: 'comment_6789',
            content: 'Great first post!',
            author: {
              address: '0xabcdef1234567890abcdef1234567890abcdef12',
              username: 'web3fan',
              displayName: 'Web3 Fan',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
            },
            createdAt: '2023-06-21T15:00:00Z',
            likesCount: 1,
            isLiked: false
          },
          {
            id: 'comment_5432',
            content: 'I\'ve been exploring Base too. The integration with Coinbase is seamless!',
            author: {
              address: '0x9876543210fedcba9876543210fedcba98765432',
              username: 'coinbasefan',
              displayName: 'Coinbase Fan',
              avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
            },
            createdAt: '2023-06-21T16:15:00Z',
            likesCount: 3,
            isLiked: false
          }
        ];
        
        setComments(mockComments);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching post details:', err);
        setError('Failed to load post. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchPostDetails();
  }, [id]);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
    
    // In a real app, this would be an API call
    // const endpoint = liked ? `/api/posts/${id}/unlike` : `/api/posts/${id}/like`;
    // const method = liked ? 'DELETE' : 'POST';
    // fetch(endpoint, { method });
  };

  const handleRetweet = () => {
    setRetweeted(!retweeted);
    setRetweets(retweeted ? retweets - 1 : retweets + 1);
    
    // In a real app, this would be an API call
    // fetch(`/api/posts/${id}/repost`, { method: 'POST' });
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    
    if (!commentText.trim()) return;
    
    // In a real app, this would be an API call
    // fetch(`/api/posts/${id}/comments`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ content: commentText })
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     setComments([data, ...comments]);
    //     setCommentText('');
    //   });
    
    // Mock response
    const newComment = {
      id: `comment_${Date.now()}`,
      content: commentText,
      author: {
        address: '0x1234567890abcdef1234567890abcdef12345678',
        username: 'you',
        displayName: 'You',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
      },
      createdAt: new Date().toISOString(),
      likesCount: 0,
      isLiked: false
    };
    
    setComments([newComment, ...comments]);
    setCommentText('');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
                <div className="flex space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mt-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mt-2"></div>
                </div>
                <div className="mt-4 flex justify-between">
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
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
                <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Post</h2>
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
          {post && (
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
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
                  </div>
                  
                  <p className="text-gray-900 mt-2 text-lg leading-relaxed">{post.content}</p>
                  
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                        <Link 
                          key={tag} 
                          href={`/search?q=%23${tag}`}
                          className="text-primary hover:underline"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  )}
                  
                  <div className="text-gray-500 text-sm mt-2">
                    {formatDate(post.createdAt)}
                  </div>
                  
                  {post.onchainReference && (
                    <div className="mt-3 text-xs text-gray-500 border-t border-gray-100 pt-2">
                      <span>On-chain reference: </span>
                      <a 
                        href={`https://basescan.org/tx/${post.onchainReference.transactionHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline break-all"
                      >
                        {post.onchainReference.transactionHash.substring(0, 10)}...
                        {post.onchainReference.transactionHash.substring(post.onchainReference.transactionHash.length - 8)}
                      </a>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mt-4 max-w-md">
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors duration-200 group">
                      <div className="p-2 rounded-full group-hover:bg-blue-50">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <span className="text-sm">{comments.length}</span>
                    </button>
                    
                    <button 
                      onClick={handleRetweet}
                      className={`flex items-center space-x-2 transition-colors duration-200 group ${
                        retweeted ? 'text-green-500' : 'text-gray-500 hover:text-green-500'
                      }`}
                    >
                      <div className="p-2 rounded-full group-hover:bg-green-50">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </div>
                      <span className="text-sm">{retweets}</span>
                    </button>
                    
                    <button 
                      onClick={handleLike}
                      className={`flex items-center space-x-2 transition-colors duration-200 group ${
                        liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                      }`}
                    >
                      <div className="p-2 rounded-full group-hover:bg-red-50">
                        <svg className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                      <span className="text-sm">{likes}</span>
                    </button>
                    
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors duration-200 group">
                      <div className="p-2 rounded-full group-hover:bg-blue-50">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Comment Form */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <form onSubmit={handleSubmitComment}>
              <div className="flex space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                  alt="Your avatar"
                  className="w-12 h-12 rounded-full object-cover"
                />
                
                <div className="flex-1">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full text-lg placeholder-gray-500 border-none resize-none focus:outline-none"
                    rows="2"
                  />
                  
                  <div className="flex justify-end mt-2">
                    <button
                      type="submit"
                      disabled={!commentText.trim()}
                      className="bg-primary text-white px-4 py-1.5 rounded-full font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          
          {/* Comments */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Comments</h2>
            </div>
            
            {comments.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {comments.map((comment) => (
                  <div key={comment.id} className="p-4">
                    <div className="flex space-x-3">
                      <Link href={`/profile/${comment.author.address}`}>
                        <img
                          src={comment.author.avatar}
                          alt={comment.author.displayName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      </Link>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <Link href={`/profile/${comment.author.address}`} className="font-bold text-gray-900 hover:underline">
                            {comment.author.displayName}
                          </Link>
                          <span className="text-gray-500 text-sm">@{comment.author.username}</span>
                          <span className="text-gray-500 text-sm">·</span>
                          <span className="text-gray-500 text-sm">{formatDate(comment.createdAt)}</span>
                        </div>
                        
                        <p className="text-gray-900 mt-1">{comment.content}</p>
                        
                        <div className="flex items-center space-x-4 mt-2">
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors duration-200">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span className="text-xs">{comment.likesCount}</span>
                          </button>
                          
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors duration-200">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                            </svg>
                            <span className="text-xs">Reply</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No comments yet</h3>
                <p className="text-gray-500">Be the first to comment on this post!</p>
              </div>
            )}
          </div>
        </main>
        
        {/* Right Sidebar */}
        <aside className="w-80 p-4 hidden lg:block">
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">About the Author</h3>
            {post && (
              <div className="flex items-center">
                <Link href={`/profile/${post.author.address}`}>
                  <img
                    src={post.author.avatar}
                    alt={post.author.displayName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </Link>
                <div className="ml-3">
                  <Link href={`/profile/${post.author.address}`} className="font-medium text-gray-900 hover:underline">
                    {post.author.displayName}
                  </Link>
                  <p className="text-sm text-gray-500">@{post.author.username}</p>
                </div>
              </div>
            )}
            <button className="mt-4 w-full bg-primary text-white py-2 rounded-full font-medium hover:bg-blue-600 transition-colors duration-200">
              Follow
            </button>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Related Topics</h3>
            <div className="space-y-3">
              {post && post.tags && post.tags.map(tag => (
                <Link 
                  key={tag}
                  href={`/search?q=%23${tag}`}
                  className="block cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <p className="font-bold text-gray-900">#{tag}</p>
                  <p className="text-sm text-gray-500">View related posts</p>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

