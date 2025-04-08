import { useState, useEffect } from "react";
import { Search } from "lucide-react";

export function FriendsPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.value = "";
  }

  return (
    <div>
      <div className="friends-header">
        <h2>Find Friends</h2>
        <form onSubmit={handleSubmit} >
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Search by name or hometown..."
            className="search-input"
            onChange={(e) => setfriendsPageSearch({ ...friendsPageSearch, searchItem: e.target.value })}
          />
          <Search style={{ position: 'absolute', left: '12px', top: '10px', color: '#9ca3af',margonTop: "1px" }} size={20} />
          <button type='submit' className='connect-button'>Search</button>
        </div>
        </form>
      </div>

      <div className="friends-grid">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="card friend-card">
            <img
              src={`https://images.unsplash.com/photo-151${i}944270255-72b8c68c6a70?auto=format&fit=crop&q=80`}
              alt="Friend"
              className="friend-image"
            />
            <p className="profile-name">Name: Mark Tom</p>
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