import React from 'react'
import './RightPanel.css'

const RightPanel = () => {
  const trends = [
    { category: 'Trending in Technology', hashtag: '#AI', tweets: '125K' },
    { category: 'Trending in Sports', hashtag: '#WorldCup', tweets: '89K' },
    { category: 'Trending in Music', hashtag: '#NewMusic', tweets: '67K' },
    { category: 'Trending', hashtag: '#MondayMotivation', tweets: '45K' },
    { category: 'Trending in Gaming', hashtag: '#Gaming', tweets: '34K' }
  ]

  const suggestions = [
    {
      name: 'Alex Chen',
      username: 'alexchen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      verified: true
    },
    {
      name: 'Design Co',
      username: 'designco',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      verified: false
    },
    {
      name: 'Tech Daily',
      username: 'techdaily',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      verified: true
    }
  ]

  return (
    <aside className="right-panel">
      <div className="search-widget">
        <div className="search-container">
          <div className="search-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search Twitter"
            className="search-input"
          />
        </div>
      </div>

      <div className="widget">
        <h2 className="widget-title">What's happening</h2>
        <div className="trends-list">
          {trends.map((trend, index) => (
            <div key={index} className="trend-item">
              <div className="trend-info">
                <span className="trend-category">{trend.category}</span>
                <h3 className="trend-hashtag">{trend.hashtag}</h3>
                <span className="trend-tweets">{trend.tweets} Tweets</span>
              </div>
              <button className="trend-menu">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
        <button className="show-more">Show more</button>
      </div>

      <div className="widget">
        <h2 className="widget-title">Who to follow</h2>
        <div className="suggestions-list">
          {suggestions.map((user, index) => (
            <div key={index} className="suggestion-item">
              <div className="suggestion-avatar">
                <img src={user.avatar} alt={user.name} />
              </div>
              <div className="suggestion-info">
                <div className="suggestion-name">
                  {user.name}
                  {user.verified && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="verified-icon">
                      <path d="M22.46 6C21.69 6.35 20.86 6.58 20 6.69C20.88 6.16 21.56 5.32 21.88 4.31C21.05 4.81 20.13 5.16 19.16 5.36C18.37 4.5 17.26 4 16 4C13.65 4 11.73 5.92 11.73 8.29C11.73 8.63 11.77 8.96 11.84 9.27C8.28 9.09 5.11 7.38 3 4.79C2.63 5.42 2.42 6.16 2.42 6.94C2.42 8.43 3.17 9.75 4.33 10.5C3.62 10.5 2.96 10.3 2.38 10V10.03C2.38 12.11 3.86 13.85 5.82 14.24C5.46 14.34 5.08 14.39 4.69 14.39C4.42 14.39 4.15 14.36 3.89 14.31C4.43 16 6 17.26 7.89 17.29C6.43 18.45 4.58 19.13 2.56 19.13C2.22 19.13 1.88 19.11 1.54 19.07C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79C20.33 8.6 20.33 8.42 20.32 8.23C21.16 7.63 21.88 6.87 22.46 6Z" fill="#1da1f2"/>
                    </svg>
                  )}
                </div>
                <span className="suggestion-username">@{user.username}</span>
              </div>
              <button className="follow-button">Follow</button>
            </div>
          ))}
        </div>
        <button className="show-more">Show more</button>
      </div>

      <div className="footer">
        <div className="footer-links">
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Cookie Policy</a>
          <a href="#">Accessibility</a>
          <a href="#">Ads info</a>
          <a href="#">More</a>
        </div>
        <p className="copyright">© 2024 Social Corp.</p>
      </div>
    </aside>
  )
}

export default RightPanel
