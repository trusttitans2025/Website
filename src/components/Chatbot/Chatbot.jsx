import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';
import { FiHeadphones, FiSend, FiX } from 'react-icons/fi';
import OrderList from './OrderList';
import { parseErrorMessage } from './errorHandling';

const Chatbot = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userOrders, setUserOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
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
      setUserOrders([]);
      setSelectedOrder(null);
    }
  };

  const addMessage = (text, sender, type = 'text') => {
    setMessages(prev => [...prev, { text, sender, type }]);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    addMessage(inputValue, 'user');
    const messageText = inputValue;
    setInputValue('');
    setIsTyping(true);

    if (selectedOrder) {
      try {
        const response = await fetch(`https://web-chat-service-631872245250.us-central1.run.app/conversations/${selectedOrder.orderId}/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sender: 'user', text: messageText }),
        });

        if (!response.ok) {
          throw new Error('Failed to send message');
        }

        const data = await response.json();
        addMessage(data.response, 'bot');
      } catch (error) {
        addMessage('Sorry, something went wrong. Please try again later.', 'bot', 'error');
      }
    } else {
      try {
        const response = await fetch('https://web-chat-service-631872245250.us-central1.run.app/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: messageText }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          const errorMessage = parseErrorMessage(errorData);
          addMessage(errorMessage, 'bot', 'error');
          return;
        }

        const data = await response.json();
        addMessage(data.response, 'bot');
      } catch (error) {
        addMessage('Sorry, something went wrong. Please try again later.', 'bot', 'error');
      }
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
      const orders = data.filter(order => order.userId === user.email);
      setUserOrders(orders);
    } catch (error) {
      addMessage('Sorry, I couldn\'t fetch your orders right now.', 'bot', 'error');
    }
    setIsTyping(false);
  };

  const handleOrderClick = async (order) => {
    setSelectedOrder(order);
    const conversation = {
      id: 'string', // This should be a unique ID
      ticketNumber: 'string', // This should be a unique ticket number
      customerName: user.email, // Assuming the user's email is the customer name
      orderId: order.orderId,
      email: user.email,
      messages: [],
      lastMessage: 'string',
      sentiment_score: 0,
      response_quality: 0,
      summary: 'string',
    };

    try {
      const response = await fetch('https://web-chat-service-631872245250.us-central1.run.app/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(conversation),
      });

      if (response.status === 409) {
        // Conversation already exists, fetch it
        const existingConversationResponse = await fetch(`https://web-chat-service-631872245250.us-central1.run.app/conversations/${order.orderId}`);
        if (!existingConversationResponse.ok) {
          throw new Error('Failed to fetch existing conversation');
        }
        const existingConversation = await existingConversationResponse.json();
        setMessages(existingConversation.messages);
        addMessage('Order already in process', 'bot', 'info');
      } else if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = parseErrorMessage(errorData);
        addMessage(errorMessage, 'bot', 'error');
      }

      addMessage(`You have selected order ${order.orderId}. How can I help you with this order?`, 'bot', 'info');
    } catch (error) {
      addMessage('Sorry, something went wrong. Please try again later.', 'bot', 'error');
    }
  };

  return (
    <div className={`chatbot-wrapper ${isOpen ? 'open' : ''}`}>
      {!isOpen && (
        <div className="chatbot-toggle-button" onClick={toggleChatbot}>
          <FiHeadphones />
        </div>
      )}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>Chatbot</h3>
            <button className="close-button" onClick={toggleChatbot}><FiX /></button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender} ${msg.type}`}>
                {msg.text}
              </div>
            ))}
            {userOrders.length > 0 && <OrderList orders={userOrders} onOrderClick={handleOrderClick} />}
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
