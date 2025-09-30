import React from 'react';
import Chatbot from 'react-chatbot-kit';
import config from './config.jsx';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import { FaTimes } from 'react-icons/fa';
import 'react-chatbot-kit/build/main.css';
import './Chatbot.css';

const SimpleChatbot = ({ toggleChatbot }) => {
  const chatbotConfig = {
    ...config,
    customComponents: {
      ...config.customComponents,
      header: () => (
        <div
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTopLeftRadius: '5px',
            borderTopRightRadius: '5px',
          }}
        >
          <span>Chatbot</span>
          <button
            onClick={toggleChatbot}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '20px',
              cursor: 'pointer',
            }}
          >
            <FaTimes />
          </button>
        </div>
      ),
    },
  };

  return (
    <div className="chatbot-container">
      <Chatbot
        config={chatbotConfig}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
};

export default SimpleChatbot;

