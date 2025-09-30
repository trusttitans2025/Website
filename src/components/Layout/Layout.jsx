import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SimpleChatbot from '../Chatbot/Chatbot';
import { FaHeadphones } from 'react-icons/fa';
import './Layout.css';

const Layout = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => {
    setShowChatbot(prev => !prev);
  };

  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      {showChatbot && <SimpleChatbot toggleChatbot={toggleChatbot} />}
      {!showChatbot && (
        <button className="chatbot-toggle-button" onClick={toggleChatbot}>
          <FaHeadphones style={{ border: '2px solid red' }} />
        </button>
      )}
    </div>
  );
};

export default Layout;
