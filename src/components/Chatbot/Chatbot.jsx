import React from 'react';
import Chatbot from 'react-chatbot-kit';
import config from './config.jsx';
import MessageParser from './MessageParser.js';
import 'react-chatbot-kit/build/main.css';
import './Chatbot.css';

const SimpleChatbot = ({ toggleChatbot, user }) => {
  const chatbotConfig = config(user);

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <span>Chatbot</span>
        <button onClick={toggleChatbot} className="close-button">
          &times;
        </button>
      </div>
      <Chatbot
        {...chatbotConfig}
        messageParser={MessageParser}
      />
    </div>
  );
};

export default SimpleChatbot;