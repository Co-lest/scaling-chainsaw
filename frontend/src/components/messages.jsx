export function MessagesPage() {
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