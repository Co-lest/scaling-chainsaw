import React, { useState } from 'react';
import { IoMdHome, IoMdPeople, IoMdChatbubbles, IoMdSettings } from "react-icons/io";
import { Search } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const NavLink = ({ icon: Icon, text, page }) => (
    <button
      onClick={() => setCurrentPage(page)}
      className={`nav-link ${currentPage === page ? 'active' : ''}`}
    >
      <Icon size={20} />
      <span>{text}</span>
    </button>
  );

  return (
    <div className="min-h-screen">
      <nav className="nav">
        <div className="container nav-content">
          <h1 className="nav-brand">FriendlyConnect</h1>
          <div className="nav-links">
            <NavLink icon={IoMdHome} text="Home" page="home" />
            <NavLink icon={IoMdPeople} text="Find Friends" page="friends" />
            <NavLink icon={IoMdChatbubbles} text="Messages" page="messages" />
            <NavLink icon={IoMdSettings} text="Settings" page="settings" />
          </div>
        </div>
      </nav>

      <main className="main container">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'friends' && <FriendsPage />}
        {currentPage === 'messages' && <MessagesPage />}
        {currentPage === 'settings' && <SettingsPage />}
      </main>
    </div>
  );
}

function HomePage() {
  return (
    <div>
      <section className="section-title">
        <h2>Welcome to FriendlyConnect</h2>
        <p>Reconnect with old friends and make new ones!</p>
      </section>

      <div className="grid">
        <div className="card">
          <h3>Your Profile</h3>
          <div className="profile-info">
            <img
              src="https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?auto=format&fit=crop&q=80"
              alt="Profile"
              className="profile-image"
            />
            <p className="profile-name">Sarah Johnson</p>
            <p className="profile-detail">Age: 68</p>
            <p className="profile-detail">Hometown: Springfield, IL</p>
          </div>
        </div>

        <div className="card">
          <h3>Activity Feed</h3>
          <div>
            <div className="activity-item">
              <p className="activity-title">Mary Smith liked your photo</p>
              <p className="activity-time">2 hours ago</p>
            </div>
            <div className="activity-item">
              <p className="activity-title">New message from John Davis</p>
              <p className="activity-time">Yesterday</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FriendsPage() {
  return (
    <div>
      <div className="friends-header">
        <h2>Find Friends</h2>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Search by name or hometown..."
            className="search-input"
          />
          <Search style={{ position: 'absolute', left: '12px', top: '10px', color: '#9ca3af' }} size={20} />
        </div>
      </div>

      <div className="friends-grid">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="card friend-card">
            <img
              src={`https://images.unsplash.com/photo-151${i}944270255-72b8c68c6a70?auto=format&fit=crop&q=80`}
              alt="Friend"
              className="friend-image"
            />
            <p className="profile-name">John Doe</p>
            <p className="profile-detail">Age: 70</p>
            <p className="profile-detail">Hometown: Chicago, IL</p>
            <p className="profile-detail">Interests: Gardening, Reading</p>
            <button className="connect-button">Connect</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function MessagesPage() {
  return (
    <div className="messages-container">
      <div className="messages-sidebar">
        <div className="messages-header">
          <h2>Messages</h2>
        </div>
        <div className="contact-list">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="contact-item">
              <img
                src={`https://images.unsplash.com/photo-151${i}944270255-72b8c68c6a70?auto=format&fit=crop&q=80`}
                alt="Contact"
                className="contact-image"
              />
              <div>
                <p className="profile-name">Jane Smith</p>
                <p className="profile-detail">Hello! How are you?</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="messages-main">
        <div className="messages-header">
          <div className="contact-item">
            <img
              src="https://images.unsplash.com/photo-1511944270255-72b8c68c6a70?auto=format&fit=crop&q=80"
              alt="Contact"
              className="contact-image"
            />
            <p className="profile-name">Jane Smith</p>
          </div>
        </div>
        <div style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
          {/* Messages would go here */}
        </div>
        <div style={{ padding: '1rem', borderTop: '1px solid #e5e7eb' }}>
          <input
            type="text"
            placeholder="Type your message..."
            className="message-input"
          />
        </div>
      </div>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="settings-container">
      <h2>Settings</h2>
      
      <div className="settings-section">
        <div className="settings-group">
          <h3>Accessibility</h3>
          <div>
            <div className="settings-row">
              <label className="settings-label">Font Size</label>
              <select className="settings-select">
                <option>Normal</option>
                <option>Large</option>
                <option>Extra Large</option>
              </select>
            </div>
            <div className="settings-row">
              <label className="settings-label">High Contrast</label>
              <input type="checkbox" className="settings-checkbox" />
            </div>
          </div>
        </div>

        <div className="settings-group">
          <h3>Notifications</h3>
          <div>
            <div className="settings-row">
              <label className="settings-label">Email Notifications</label>
              <input type="checkbox" className="settings-checkbox" defaultChecked />
            </div>
            <div className="settings-row">
              <label className="settings-label">Message Alerts</label>
              <input type="checkbox" className="settings-checkbox" defaultChecked />
            </div>
          </div>
        </div>

        <div className="settings-group">
          <h3>Privacy</h3>
          <div>
            <div className="settings-row">
              <label className="settings-label">Profile Visibility</label>
              <select className="settings-select">
                <option>Public</option>
                <option>Friends Only</option>
                <option>Private</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;