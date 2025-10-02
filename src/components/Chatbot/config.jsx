import React from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';
import ActionProvider from './ActionProvider.js';

const config = (user) => ({
  initialMessages: [createChatBotMessage(`Hello! How can I help you today?`)],
  customComponents: {
    header: (props) => (
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
          onClick={props.toggleChatbot}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
          }}
        >
          &times;
        </button>
      </div>
    ),
  },
  actionProvider: ActionProvider,
  state: {
    user: user,
  },
});

export default config;
