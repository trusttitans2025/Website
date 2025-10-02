import React, { useState, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SimpleChatbot from '../Chatbot/Chatbot';
import { FiHeadphones } from 'react-icons/fi';
import { AuthContext } from '../../context/AuthContext';
import './Layout.css';

const Layout = () => {
  const { user } = useContext(AuthContext);
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => {
    setShowChatbot(prev => !prev);
  };

  return (
    <div className="layout">
      <Header />
      <div className="header-spacer"></div>
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      {showChatbot && <SimpleChatbot user={user} />}
      {!showChatbot && (
        <button className="chatbot-toggle-button" onClick={toggleChatbot}>
          <FiHeadphones />
        </button>
      )}
    </div>
  );
};

export default Layout;
