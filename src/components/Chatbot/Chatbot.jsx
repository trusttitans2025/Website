import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';
import { FiHeadphones, FiSend, FiX } from 'react-icons/fi';

const Chatbot = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      addMessage('Hello! How can I help you today?', 'bot');
      if (user) {
        handleUserOrders();
      }
    }
  }, [isOpen, user]);

  const toggleChatbot = () => {
    setIsOpen(prev => !prev);
    if (!isOpen) {
      setMessages([]);
    }
  };

  const addMessage = (text, sender) => {
    setMessages(prev => [...prev, { text, sender }]);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    addMessage(inputValue, 'user');
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('https://web-chat-service-631872245250.us-central1.run.app/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputValue }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from the chatbot API');
      }

      const data = await response.json();
      addMessage(data.response, 'bot');
    } catch (error) {
      addMessage('Sorry, something went wrong. Please try again later.', 'bot');
    }

    setIsTyping(false);
  };

  const handleUserOrders = async () => {
    setIsTyping(true);
    try {
      const response = await fetch('https://web-chat-service-631872245250.us-central1.run.app/orders');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      const userOrders = data.filter(order => order.userId === user.email);

      if (userOrders.length > 0) {
        const orderIds = userOrders.map(order => order.orderId).join(', ');
        addMessage(`Here are your order IDs: ${orderIds}`, 'bot');
      } else {
        addMessage('You have no orders.', 'bot');
      }
    } catch (error) {
      addMessage('Sorry, I couldn\'t fetch your orders right now.', 'bot');
    }
    setIsTyping(false);
  };

  return (
    <div className={`chatbot-wrapper ${isOpen ? 'open' : ''}`}>
      <div className="chatbot-toggle-button" onClick={toggleChatbot}>
        {isOpen ? <FiX /> : <FiHeadphones />}
      </div>
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>Chatbot</h3>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="message bot typing-indicator">
                <span></span><span></span><span></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button onClick={handleSendMessage}><FiSend /></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
