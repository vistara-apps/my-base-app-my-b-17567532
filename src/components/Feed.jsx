import React from 'react'
import TweetComposer from './TweetComposer'
import Tweet from './Tweet'
import './Feed.css'

const Feed = () => {
  const tweets = [
    {
      id: 1,
      user: {
        name: 'John Doe',
        username: 'johndoe',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
      },
      content: 'Just shipped a new feature! Really excited about how this turned out. The team did an amazing job bringing this vision to life. 🚀',
      timestamp: '2h',
      likes: 156,
      retweets: 43,
      comments: 28,
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=500&h=280&fit=crop'
    },
    {
      id: 2,
      user: {
        name: 'Sarah Wilson',
        username: 'sarahw',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
      },
      content: 'Beautiful sunset today! Sometimes you just need to stop and appreciate the little things in life. Nature never fails to amaze me.',
      timestamp: '4h',
      likes: 89,
      retweets: 12,
      comments: 15
    },
    {
      id: 3,
      user: {
        name: 'Tech News',
        username: 'technews',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
      },
      content: 'BREAKING: New AI breakthrough announced at major tech conference. This could change everything we know about machine learning and artificial intelligence.',
      timestamp: '6h',
      likes: 234,
      retweets: 78,
      comments: 45
    },
    {
      id: 4,
      user: {
        name: 'Design Studio',
        username: 'designstudio',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
      },
      content: 'New portfolio piece just dropped! Working on this project has been incredibly rewarding. Love collaborating with creative minds.',
      timestamp: '8h',
      likes: 67,
      retweets: 23,
      comments: 11,
      image: 'https://images.unsplash.com/photo-1558655146-364adde1dfd8?w=500&h=280&fit=crop'
    }
  ]

  return (
    <main className="feed">
      <div className="feed-header">
        <h1>Home</h1>
        <div className="feed-options">
          <button className="option-button active">For you</button>
          <button className="option-button">Following</button>
        </div>
      </div>
      
      <TweetComposer />
      
      <div className="tweets">
        {tweets.map(tweet => (
          <Tweet key={tweet.id} tweet={tweet} />
        ))}
      </div>
    </main>
  )
}

export default Feed
