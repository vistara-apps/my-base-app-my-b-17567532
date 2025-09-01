import React, { useState } from 'react'
import './Tweet.css'

const Tweet = ({ tweet }) => {
  const [liked, setLiked] = useState(false)
  const [retweeted, setRetweeted] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  return (
    <article className="tweet">
      <div className="tweet-avatar">
        <img src={tweet.user.avatar} alt={tweet.user.name} />
      </div>
      
      <div className="tweet-content">
        <div className="tweet-header">
          <span className="tweet-name">{tweet.user.name}</span>
          <span className="tweet-username">@{tweet.user.username}</span>
          <span className="tweet-separator">·</span>
          <span className="tweet-time">{tweet.timestamp}</span>
          <button className="tweet-menu">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
        
        <div className="tweet-text">
          {tweet.content}
        </div>
        
        {tweet.image && (
          <div className="tweet-image">
            <img src={tweet.image} alt="Tweet media" />
          </div>
        )}
        
        <div className="tweet-actions">
          <button className="action-btn comment">
            <div className="action-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M21 6H3C1.9 6 1 6.9 1 8V18C1 19.1 1.9 20 3 20H21C22.1 20 23 19.1 23 18V8C23 6.9 22.1 6 21 6ZM21 18H3V8H21V18ZM7 9H17V11H7V9ZM7 12H17V14H7V12ZM7 15H13V17H7V15Z" fill="currentColor"/>
              </svg>
            </div>
            <span>{formatNumber(tweet.comments)}</span>
          </button>
          
          <button 
            className={`action-btn retweet ${retweeted ? 'active' : ''}`}
            onClick={() => setRetweeted(!retweeted)}
          >
            <div className="action-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M23 12L20.56 9.22L20.9 12.24L15.11 12.24L15.11 14.24L20.9 14.24L20.56 17.78L23 15M1 12L3.44 14.78L3.1 11.76L8.89 11.76L8.89 9.76L3.1 9.76L3.44 6.22L1 9" fill="currentColor"/>
              </svg>
            </div>
            <span>{formatNumber(retweeted ? tweet.retweets + 1 : tweet.retweets)}</span>
          </button>
          
          <button 
            className={`action-btn like ${liked ? 'active' : ''}`}
            onClick={() => setLiked(!liked)}
          >
            <div className="action-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d={liked 
                  ? "M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z"
                  : "M16.5 3C14.76 3 13.09 3.81 12 5.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5C2 12.27 18.6 15.36 13.45 20.03L12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3Z"
                } 
                fill={liked ? "#f91880" : "none"} 
                stroke={liked ? "#f91880" : "currentColor"} 
                strokeWidth="2"
                />
              </svg>
            </div>
            <span>{formatNumber(liked ? tweet.likes + 1 : tweet.likes)}</span>
          </button>
          
          <button className="action-btn share">
            <div className="action-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.34C15.11 18.55 15.08 18.77 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z" fill="currentColor"/>
              </svg>
            </div>
          </button>
          
          <button 
            className={`action-btn bookmark ${bookmarked ? 'active' : ''}`}
            onClick={() => setBookmarked(!bookmarked)}
          >
            <div className="action-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d={bookmarked 
                  ? "M17 3H7C5.9 3 5 3.9 5 5V21L12 18L19 21V5C19 3.9 18.1 3 17 3Z"
                  : "M17 3H7C5.9 3 5 3.9 5 5V21L12 18L19 21V5C19 3.9 18.1 3 17 3ZM17 18L12 15.82L7 18V5H17V18Z"
                } 
                fill={bookmarked ? "#1da1f2" : "currentColor"}
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </article>
  )
}

export default Tweet
