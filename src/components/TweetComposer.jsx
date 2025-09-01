import React, { useState } from 'react'
import './TweetComposer.css'

const TweetComposer = () => {
  const [tweetText, setTweetText] = useState('')
  const maxLength = 280

  const handleTweet = () => {
    if (tweetText.trim()) {
      console.log('Tweet:', tweetText)
      setTweetText('')
    }
  }

  return (
    <div className="tweet-composer">
      <div className="composer-avatar">
        <img 
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face" 
          alt="Your avatar" 
        />
      </div>
      
      <div className="composer-content">
        <textarea
          placeholder="What's happening?"
          value={tweetText}
          onChange={(e) => setTweetText(e.target.value)}
          className="composer-textarea"
          maxLength={maxLength}
        />
        
        <div className="composer-footer">
          <div className="composer-actions">
            <button className="action-button" title="Add image">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM13.96 12.29L11.21 15.83L9.25 13.47L6.5 17H17.5L13.96 12.29Z" fill="currentColor"/>
              </svg>
            </button>
            <button className="action-button" title="Add GIF">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z" fill="currentColor"/>
              </svg>
            </button>
            <button className="action-button" title="Add poll">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" fill="currentColor"/>
              </svg>
            </button>
            <button className="action-button" title="Add emoji">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM8.5 11C9.33 11 10 10.33 10 9.5C10 8.67 9.33 8 8.5 8C7.67 8 7 8.67 7 9.5C7 10.33 7.67 11 8.5 11ZM15.5 11C16.33 11 17 10.33 17 9.5C17 8.67 16.33 8 15.5 8C14.67 8 14 8.67 14 9.5C14 10.33 14.67 11 15.5 11ZM12 17.5C14.33 17.5 16.31 16.04 17 14H7C7.69 16.04 9.67 17.5 12 17.5Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
          
          <div className="composer-controls">
            <div className="character-count">
              <span className={tweetText.length > maxLength - 20 ? 'warning' : ''}>
                {maxLength - tweetText.length}
              </span>
            </div>
            <button 
              className={`tweet-button ${tweetText.trim() ? 'active' : ''}`}
              onClick={handleTweet}
              disabled={!tweetText.trim() || tweetText.length > maxLength}
            >
              Tweet
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TweetComposer
