import { useState } from 'react';
import { IoMdHome, IoMdPeople, IoMdChatbubbles, IoMdSettings } from "react-icons/io";
import { LoginPage } from "./components/login.jsx";
import { SignupPage } from './components/sign.jsx';
import { HomePage } from './components/home.jsx';
import { FriendsPage } from './components/friends.jsx';
import { SettingsPage } from './components/settings.jsx';
import { MessagesPage } from './components/messages.jsx';
import { useWebSocket, WebsocketProvider } from './components/webs.jsx'; 
import React from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');

  if (!isAuthenticated) {
    return isLogin ? (
      <WebsocketProvider>
      <LoginPage
        onLogin={() => setIsAuthenticated(true)}
        onSwitchToSignup={() => setIsLogin(false)}
      />
      </WebsocketProvider>
    ) : (
      <WebsocketProvider>
      <SignupPage
        onSignup={() => setIsAuthenticated(true)}
        onSwitchToLogin={() => setIsLogin(true)}
      />
      </WebsocketProvider>
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
          <>
            {currentPage === 'home' && <HomePage />}
            {currentPage === 'friends' && <FriendsPage/>}
            {currentPage === 'messages' && <MessagesPage/>}
            {currentPage === 'settings' && <SettingsPage/>}
          </>
      </main>
    </div>
  );
}

export default App;


// kikiumana weka "  git revert 535e12a61881bea43a53f564c454bdfd4e284542  "; 

/**
 *        {message ? (
          <>
            {currentPage === 'home' && <HomePage />}
            {currentPage === 'friends' && <FriendsPage/>}
            {currentPage === 'messages' && <MessagesPage/>}
            {currentPage === 'settings' && <SettingsPage/>}
          </>
        ) : (
          <p>Loading user data...</p> // Or a loading spinner
        )}
 */