import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useWebSocket } from "./webs";

export function FriendsPage() {
  const [friendsPageSearch, setfriendsPageSearch] = useState({
    type: "search",
    name: "",
    hometown: "",
    age: 0,
    school: "",
    interests: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [friendsFound, setFriendsFound] = useState([]);
  const { message, sendMessage, isConnected } = useWebSocket();

  let userdata;

  useEffect(() => {
    try {
      if (message?.type === "friendsFound") {
        setFriendsFound(message.content);
      } else if (message?.logbool || message?.content) {
        setIsLoading(false);
        userdata = message?.logbool || message?.content;
        userdata.type = "recommend";
        sendMessage(userdata);
      } else {
        throw new Error(`Mmmmhhh weird: ws message is undefined!`);
      }
    } catch (error) {
      console.error("Error processing WebSocket message:", error);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(friendsPageSearch);

    if (!(friendsPageSearch.name.trim()) && !(friendsPageSearch.hometown.trim()) && friendsPageSearch.age < 3 && !(friendsPageSearch.school.trim()) && !(friendsPageSearch.interests.trim())) {
      console.error(`Cannot search an empty form!`); // or create a pop up
    } else {
      if (isConnected) {
        sendMessage(friendsPageSearch);
        
      }
    }
  };

  const handleConnect = (username) => {
    console.log(username); // Now 'username' will hold the correct value
    // Here you would implement the logic to send a connection request
  };

  return (
    <div>
<div className="friends-header">
        <h2>Find Friends</h2>
        <form onSubmit={handleSubmit} >
          <div>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Name"
                className="search-input"
                style={{ paddingLeft: '30px' }} // Add left padding for the icon
                onChange={(e) => setfriendsPageSearch({ ...friendsPageSearch, name: e.target.value })}
              />
              <Search style={{ position: 'absolute', left: '8px', top: '8px', color: '#9ca3af' }} size={20} />
            </div>
            <br />
            <div style={{ position: 'relative' }}>
              <input type="text"
                placeholder="Hometown, comma separated"
                className="search-input"
                style={{ paddingLeft: '30px' }}
                onChange={(e) => setfriendsPageSearch({ ...friendsPageSearch, hometown: e.target.value })}
              />
              <Search style={{ position: 'absolute', left: '8px', top: '8px', color: '#9ca3af' }} size={20} />
            </div>
            <br />
            <div style={{ position: 'relative' }}>
              <input type="number"
                placeholder="Age"
                className="search-input"
                style={{ paddingLeft: '30px' }}
                onChange={(e) => setfriendsPageSearch({ ...friendsPageSearch, age: e.target.value })}
              />
              <Search style={{ position: 'absolute', left: '8px', top: '8px', color: '#9ca3af' }} size={20} />
            </div>
            <br />
            <div style={{ position: 'relative' }}>
              <input type="text"
                placeholder="school, comma separated"
                className="search-input"
                style={{ paddingLeft: '30px' }}
                onChange={(e) => setfriendsPageSearch({ ...friendsPageSearch, school: e.target.value })}
              />
              <Search style={{ position: 'absolute', left: '8px', top: '8px', color: '#9ca3af' }} size={20} />
            </div>
            <br />
            <div style={{ position: 'relative' }}>
              <input type="text"
                placeholder="Interests, comma separated"
                className="search-input"
                style={{ paddingLeft: '30px' }}
                onChange={(e) => setfriendsPageSearch({ ...friendsPageSearch, interests: e.target.value })}
              />
              <Search style={{ position: 'absolute', left: '8px', top: '8px', color: '#9ca3af' }} size={20} />
            </div>
            <br />
            <button type='submit' className='connect-button' onClick={handleSubmit}>Search</button>
          </div>
        </form>
      </div>

      <div className="friends-grid">
        {friendsFound.map((element, index) => {
          return (
            <div key={index} className="card friend-card">
              <img
                src={`https://images.unsplash.com/photo-151${index % 10}944270255-72b8c68c6a70?auto=format&fit=crop&q=80`}
                alt="Friend"
                className="friend-image"
              />
              <p className="profile-name">{element.username}</p>
              <p className="profile-name">{element.name}</p>
              <p className="profile-detail">{element.age}</p>
              <p className="profile-detail">{element.hometown}</p>
              <p className="profile-detail">{element.interests}</p>
              <button className="connect-button" onClick={() => handleConnect(element.username)}>Connect</button>
            </div>
          )
        })}
      </div>
    </div>
  );
}