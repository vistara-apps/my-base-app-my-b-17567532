import React, { useState } from 'react'
import './Header.css'

const Header = () => {
  const [searchValue, setSearchValue] = useState('')

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <div className="logo">
            <span className="logo-text">Social</span>
          </div>
        </div>
        
        <div className="header-center">
          <div className="search-container">
            <div className="search-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="header-right">
          <button className="icon-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L9 7V9H3V11H21V9Z" fill="currentColor"/>
            </svg>
          </button>
          <button className="icon-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2.02C6.48 2.02 2.02 6.48 2.02 12C2.02 17.52 6.48 21.98 12 21.98C17.52 21.98 21.98 17.52 21.98 12C21.98 6.48 17.52 2.02 12 2.02ZM11.39 19V15.42H8.25V19H11.39ZM9.82 14C8.84 14 8.25 13.28 8.25 12.5C8.25 11.72 8.84 11 9.82 11C10.8 11 11.39 11.72 11.39 12.5C11.39 13.28 10.8 14 9.82 14Z" fill="currentColor"/>
            </svg>
          </button>
          <div className="profile-button">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" 
              alt="Profile" 
              className="profile-image"
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
