import { Type } from "lucide-react";

export function HomePage() {
  const sendMessage = useWebSocket();

  sendMessage(JSON.stringify({ type: "" }));
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