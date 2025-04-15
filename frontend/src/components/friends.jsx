import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useWebSocket } from "./webs";

export function FriendsPage() {
  const [friendsPageSearch, setfriendsPageSearch] = useState({
    type: "search",
    searchItem: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [friendsFound, setFriendsFound] = useState([]);
  const { message, sendMessage, isConnected } = useWebSocket();

  let userdata;

  useEffect(() => {
    try {
      if (message.type  === "friendsFound") {
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
      console.error(error);
      return;
    }
  }, [message, sendMessage]);

  if(isLoading) {
    return(
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

    console.log(friendsPageSearch.searchItem);

    e.target.value = "";
  };

  const handleConnect = () => {
    let friendConnect = document.querySelector("#usernameValue").value;

    console.log(friendConnect);
  };

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
        {friendsFound.map((element, index) => {
        return (
          <div key={index} className="card friend-card">
            <img
              src={`https://images.unsplash.com/photo-151${index}944270255-72b8c68c6a70?auto=format&fit=crop&q=80`}
              alt="Friend"
              className="friend-image"
            />
            <p className="profile-name" id="usernameValue">{element.username}</p>
            <p className="profile-name">{element.name}</p>
            <p className="profile-detail">{element.age}</p>
            <p className="profile-detail">{element.hometown}</p>
            <p className="profile-detail">{element.interests}</p>
            <button className="connect-button" onClick={handleConnect}>Connect</button>
          </div>
        )
        })}
      </div>
    </div>
  );
}
