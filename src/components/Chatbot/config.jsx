import { createChatBotMessage } from 'react-chatbot-kit';
import { FaTimes } from 'react-icons/fa';

const config = {
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
          <FaTimes />
        </button>
      </div>
    ),
  },
};

export default config;
