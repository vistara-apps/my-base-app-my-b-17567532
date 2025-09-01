import React from 'react'
import './Sidebar.css'

const Sidebar = () => {
  const menuItems = [
    { icon: '🏠', label: 'Home', active: true },
    { icon: '🔍', label: 'Explore' },
    { icon: '🔔', label: 'Notifications' },
    { icon: '✉️', label: 'Messages' },
    { icon: '📋', label: 'Lists' },
    { icon: '🔖', label: 'Bookmarks' },
    { icon: '👤', label: 'Profile' },
    { icon: '⚙️', label: 'Settings' }
  ]

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href="#"
            className={`nav-item ${item.active ? 'active' : ''}`}
            onClick={(e) => e.preventDefault()}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </a>
        ))}
      </nav>
      
      <button className="tweet-button">
        <span className="tweet-text">Tweet</span>
        <span className="tweet-icon">✏️</span>
      </button>
    </aside>
  )
}

export default Sidebar
