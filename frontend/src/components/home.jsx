import { useWebSocket } from "./webs";
import { useEffect, useState } from "react";

export function HomePage() {
  const { message, sendMessage, isConnected, friends } = useWebSocket();
  const [isLoading, setIsLoading] = useState(true);
  const [userdata, setUserData] = useState(null);

  useEffect(() => {
  try {
      
    if (message.logbool || message.content) {
      setUserData(message.logbool || message.content);
      setIsLoading(false);
    } else {
      throw new Error(`Mmmmhhh weird: ws message is undefined!`); 
    }
  } catch (error) {
    console.error(error);
    return;
  }
  }, [message]);

  if (isLoading) {
    return (
      <section className="section-title">
        <h2>Welcome to FriendlyConnect</h2>
        <p>Loading profile information...</p>
        <p className="connection-status">
          Connection Status: {isConnected ? 'Connected' : 'Disconnected'}
        </p>
      </section>
    );
  }

  return (
    <div>
      <section className="section-title">
        <h2>Welcome to FriendlyConnect</h2>
        <p>Reconnect with old friends and make new ones!</p>
        <p className="connection-status">
          Connection Status: {isConnected ? 'Connected' : 'Disconnected'}
        </p>
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
            <p className='profile-name'>{userdata.username || 'N/A'}</p>
            <p className="profile-name">{userdata?.name || 'N/A'}</p>
            <p className="profile-detail">Age: {userdata?.age || 'N/A'}</p>
            <p className="profile-detail">Interests: {userdata?.interests || 'N/A'}</p>
            <p className='profile-detail'>Hometown: {userdata?.hometown || 'N/A'}</p>
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
/*

            {message ? (
              <>
                <img
                  src="https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?auto=format&fit=crop&q=80"
                  alt="Profile"
                  className="profile-image"
                />
                <p className='profile-name'>{message.logbool?.username || message.content?.username || 'N/A'}</p>
                <p className="profile-name">{message.logbool?.name || message.content?.name || 'N/A'}</p>
                <p className="profile-detail">{message.logbool?.age || message.content?.age || 'N/A'}</p>
                <p className="profile-detail">{message.logbool?.interests || message.content?.interests || 'N/A'}</p>
                <p className='profile-detail'>{message.logbool?.hometown || message.content?.hometown || 'N/A'}</p>
              </>
            ) : (
              <p>Loading user data</p>
            )}

*/