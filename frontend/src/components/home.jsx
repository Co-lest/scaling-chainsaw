import { useWebSocket } from "./webs";
import { useEffect, useState } from "react";
let userdata;

export function HomePage() {
  const { message, sendMessage, isConnected } = useWebSocket();
  const [isLoading, setIsLoading] = useState(true);
  const [userdata2, setUserdata2] = useState(null);

  useEffect(() => {
    try {
      if (localStorage.getItem('profileData') !== null) {
        userdata = JSON.parse(localStorage.getItem("profileData"));
        setUserdata2(userdata);
        setIsLoading(false);
        console.log("Localstorage: ", userdata2);
      } else if (message.logbool !== undefined) { // (message.content !== undefined && !(typeof message.type === "friendsFound"))
        userdata = message.logbool;
        setUserdata2(userdata);
        setIsLoading(false);

        if (localStorage.getItem("profileData") === null) {
          localStorage.setItem("profileData", JSON.stringify(userdata));
          console.log("Set: ", userdata);
        }
        
      } else if (message.content !== undefined && message.type !== "friendsFound") {
        userdata = message.content;
        setUserdata2(userdata);
        setIsLoading(false);

        if (localStorage.getItem("profileData") !== null) {
          localStorage.setItem("profileData", JSON.stringify(userdata));
          console.log("Set: ", userdata);
        }
        
      } else {
        throw new Error(`Mmmmhhh weird: ws message is undefined!`);
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }, [message, sendMessage]);

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

  console.log("Final: ", userdata);

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
            <p className='profile-name'>{userdata?.username || userdata[0].username || 'N/A'}</p>
            <p className="profile-name">{userdata?.name || userdata[0].name || 'N/A'}</p>
            <p className="profile-detail">Age: {userdata?.age || userdata[0].age || 'N/A'}</p>
            <p className="profile-detail">Interests: {userdata?.interests || userdata[0].interests || 'N/A'}</p>
            <p className='profile-detail'>Hometown: {userdata?.hometown || userdata[0].hometown || 'N/A'}</p>
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