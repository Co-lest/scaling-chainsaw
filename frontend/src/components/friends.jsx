export function FriendsPage() {
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