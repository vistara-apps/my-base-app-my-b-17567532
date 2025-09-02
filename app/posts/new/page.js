'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

export default function NewPostPage() {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Post content cannot be empty');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      // const response = await fetch('/api/posts', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ content, media: mediaFiles })
      // });
      // const data = await response.json();
      
      // Mock successful response
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      
      // Redirect to home page or post detail page
      router.push('/');
    } catch (err) {
      console.error('Error creating post:', err);
      setError('Failed to create post. Please try again later.');
      setIsSubmitting(false);
    }
  };
  
  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files);
    
    // In a real app, you would upload these files to a storage service
    // and get back URLs to store in the mediaFiles state
    
    // For now, we'll just create object URLs for preview
    const newMediaFiles = files.map(file => ({
      id: Date.now() + Math.random().toString(36).substring(2, 9),
      type: file.type.startsWith('image/') ? 'image' : 'video',
      url: URL.createObjectURL(file),
      file
    }));
    
    setMediaFiles([...mediaFiles, ...newMediaFiles]);
  };
  
  const removeMedia = (id) => {
    setMediaFiles(mediaFiles.filter(media => media.id !== id));
  };
  
  const addEmoji = (emoji) => {
    setContent(content + emoji);
    setShowEmojiPicker(false);
  };
  
  // Simple emoji picker for demonstration
  const emojis = ['😀', '😂', '😍', '🥳', '😎', '🤔', '👍', '🎉', '🔥', '❤️', '🚀', '✨'];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto flex pt-16">
        <Sidebar />
        
        <main className="flex-1 max-w-2xl mx-auto px-4 py-6">
          <div className="bg-white rounded-lg border border-gray-200 mb-6">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Create Post</h2>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="p-4">
                <div className="flex space-x-3">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                    alt="Your avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  
                  <div className="flex-1">
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="What's happening?"
                      className="w-full text-xl placeholder-gray-500 border-none resize-none focus:outline-none"
                      rows="5"
                    />
                    
                    {/* Media Preview */}
                    {mediaFiles.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        {mediaFiles.map(media => (
                          <div key={media.id} className="relative">
                            {media.type === 'image' ? (
                              <img
                                src={media.url}
                                alt="Media preview"
                                className="w-full h-40 object-cover rounded-lg"
                              />
                            ) : (
                              <video
                                src={media.url}
                                className="w-full h-40 object-cover rounded-lg"
                                controls
                              />
                            )}
                            <button
                              type="button"
                              onClick={() => removeMedia(media.id)}
                              className="absolute top-2 right-2 bg-gray-800 bg-opacity-75 text-white rounded-full p-1 hover:bg-opacity-100 transition-colors duration-200"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {error && (
                      <div className="mt-4 text-red-500 text-sm">
                        {error}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-4 text-primary">
                        <label className="cursor-pointer hover:bg-blue-50 p-2 rounded-full transition-colors duration-200">
                          <input
                            type="file"
                            accept="image/*,video/*"
                            className="hidden"
                            onChange={handleMediaUpload}
                            multiple
                          />
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </label>
                        
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            className="hover:bg-blue-50 p-2 rounded-full transition-colors duration-200"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9-4V8a3 3 0 013-3h4a3 3 0 013 3v2M7 21h10a2 2 0 002-2v-4a2 2 0 00-2-2H7a2 2 0 00-2 2v4a2 2 0 002 2z" />
                            </svg>
                          </button>
                          
                          {showEmojiPicker && (
                            <div className="absolute bottom-12 left-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10">
                              <div className="grid grid-cols-6 gap-2">
                                {emojis.map(emoji => (
                                  <button
                                    key={emoji}
                                    type="button"
                                    onClick={() => addEmoji(emoji)}
                                    className="text-xl hover:bg-gray-100 p-2 rounded transition-colors duration-200"
                                  >
                                    {emoji}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <button type="button" className="hover:bg-blue-50 p-2 rounded-full transition-colors duration-200">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="text-sm text-gray-500">
                          {content.length}/280
                        </div>
                        
                        <button
                          type="submit"
                          disabled={!content.trim() || isSubmitting}
                          className="bg-primary text-white px-6 py-2 rounded-full font-bold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                          {isSubmitting ? 'Posting...' : 'Post'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Tips for Great Posts</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Keep it concise and clear</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Use hashtags to increase visibility</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Add images or videos for more engagement</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Ask questions to encourage responses</span>
              </li>
            </ul>
          </div>
        </main>
        
        {/* Right Sidebar */}
        <aside className="w-80 p-4 hidden lg:block">
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

