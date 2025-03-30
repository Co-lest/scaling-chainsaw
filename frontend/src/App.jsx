import React, { useState, useEffect, useRef } from 'react';
import { IoMdHome, IoMdPeople, IoMdChatbubbles, IoMdSettings } from "react-icons/io";
import { Search, Lock, User, MapPin, School, Heart } from 'lucide-react';

let websocket;

function useWebSocket(handleReceivedData) { //url = 'ws://localhost:3333'
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  const hostname = window.location.hostname;
  const url = `${protocol}//${hostname}:3333`;

  useEffect(() => {
    websocket.current = new WebSocket(url);

    websocket.current.onopen = () => {
      console.log('WebSocket connected');
    };

    websocket.current.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        // console.log('Received:', message);
        // Handle received data here (e.g., update state, call a function)
        // Example:
        handleReceivedData(message);
      } catch (error) {
        console.error('Error parsing message:', error);
        console.log('Raw Message:', event.data); //log the raw message for debugging.
      }
    };

    websocket.current.onclose = () => {
      console.log('WebSocket disconnected');
    };

    websocket.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      if (websocket.current) {
        //websocket.current.close();
      }
    };
  }, [url, handleReceivedData]);

  const sendMessage = (message) => {
    if (websocket.current && websocket.current.readyState === WebSocket.OPEN) {
      websocket.current.send(JSON.stringify(message));
    } else {
      console.error('WebSocket not connected or not open.');
    }
  };

  return sendMessage; // Return only the sendMessage function.
}

function App() {
  websocket = useRef(null);
  const [messageContent, setMessageContent] = useState(null);

  const handleReceivedData = (message) => {
    if (message) {
      setIsAuthenticated(true);
      setMessageContent(message);
    } else {
      alert(`Wrong username or password!`);
      setIsAuthenticated(false);
    }
  };

  const sendMessage = useWebSocket(handleReceivedData);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    console.log("messageContent changed:", messageContent);
  }, [messageContent]);

  if (!isAuthenticated) {
    return isLogin ? (
      <LoginPage
        onLogin={() => setIsAuthenticated(true)}
        onSwitchToSignup={() => setIsLogin(false)}
      />
    ) : (
      <SignupPage
        onSignup={() => setIsAuthenticated(true)}
        onSwitchToLogin={() => setIsLogin(true)}
      />
    );
  }

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
        {/* Conditional rendering for messageContent */}
        {messageContent ? (
          <>
            {currentPage === 'home' && <HomePage userData={messageContent} />}
            {currentPage === 'friends' && <FriendsPage userData={messageContent} />}
            {currentPage === 'messages' && <MessagesPage userData={messageContent} />}
            {currentPage === 'settings' && <SettingsPage userData={messageContent} />}
          </>
        ) : (
          <p>Loading user data...</p> // Or a loading spinner
        )}
      </main>
    </div>
  );
}

function LoginPage({ onLogin, onSwitchToSignup }) {
  const [formData, setFormData] = useState({
    type: 'log',
    username: '',
    password: '',
  });

  const sendMessage = useWebSocket();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.username === "" && formData.password === "") {
      console.error("Form is empty!");
      return;
    }
    sendMessage(formData);
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <div className="mt-1 relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                id='username'
                required
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your username"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="mt-1 relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                id='password'
                required
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={onSwitchToSignup}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}

function SignupPage({ onSignup, onSwitchToLogin}) {
  const [formData, setFormData] = useState({
    type: 'sign',
    username: '',
    name: '',
    school: '',
    hometown: '',
    age: '',
    interests: '',
    password: '',
    pictureUrl: ''
  });data

  const sendMessage = useWebSocket();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Object.values(formData).forEach((value) => {
    //   if (value === "") {
    //     console.error("Some fields are empty!");
    //     return;
    //   }
    // });
    sendMessage(formData);
    onSignup();
  };
  data
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <div className="mt-1 relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                required
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Choose a username"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <div className="mt-1 relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                required
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">School</label>
            <div className="mt-1 relative">
              <School className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                required
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your school"
                value={formData.school}
                onChange={(e) => setFormData({...formData, school: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Hometown</label>
            <div className="mt-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                required
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your hometown"
                value={formData.hometown}
                onChange={(e) => setFormData({...formData, hometown: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <div className="mt-1">
              <input
                type="number"
                required
                min="13"
                max="120"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your age"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Interests</label>
            <div className="mt-1 relative">
              <Heart className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                required
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your interests (comma separated)"
                value={formData.interests}
                onChange={(e) => setFormData({...formData, interests: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Profile Picture URL</label>
            <div className="mt-1">
              <input
                type="url"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter URL for your profile picture"
                value={formData.pictureUrl}
                onChange={(e) => setFormData({...formData, pictureUrl: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="mt-1 relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                required
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Choose a password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Account
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}

function HomePage(userData) {
  //const sendMessage = useWebSocket(handleReceivedData);
  // const [data, setData] = useState(undefined);
  // setData(userData);
  console.log(userData);


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
            <p className='profile-name'>{userData.userData.username}</p>
            <p className="profile-name">Name: {userData.userData.name}</p>
            <p className="profile-detail">Age: {userData.userData.age}</p>
            <p className="profile-detail">Interests: {userData.userData.interests}</p>
            <p className='profile-detail'>{userData.userData.hometown}</p>
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

function FriendsPage(userData) {
  let friendsObj = {
    type: "friendsPage",
    name: userData.userData.name,
    hometown: userData.userData.hometown,
    age: userData.userData.age,
    interests: userData.userData.interests,
    school: userData.userData.school,
    username: userData.userData.username
  }

  let handleReceivedData = (message) => {
    console.log(message);
  }  

  const sendMessage = useWebSocket(handleReceivedData);
  sendMessage(friendsObj);

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
            <p className="profile-name">{friendsObj.name}</p>
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