import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './App.css';

// Connect to the backend server
const socket = io('http://localhost:3001');

function App() {
  const [username, setUsername] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    // Listen for 'receiveMessage' events from the server
    socket.on('receiveMessage', (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    // Clean up on component unmount
    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  useEffect(() => {
    // Auto-scroll to the bottom of the chat box
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleJoin = () => {
    if (username.trim() !== '') {
      setIsJoined(true);
    }
  };

  const handleSend = () => {
    if (currentMessage.trim() !== '') {
      socket.emit('sendMessage', { username, text: currentMessage });
      setCurrentMessage('');
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Format messages for the text area
  const chatHistory = messages
    .map(msg => `${msg.username} [${msg.timestamp}]: ${msg.text}`)
    .join('\n');

  if (!isJoined) {
    return (
      <div className="chat-container">
        <h1>Real-Time Chat</h1>
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleJoin()}
        />
        <button onClick={handleJoin}>Join Chat</button>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <h1>Real-Time Chat</h1>
      <input 
        type="text" 
        value={username} 
        readOnly 
        className="username-display"
      />
      <textarea
        ref={chatBoxRef}
        className="chat-box"
        value={chatHistory}
        readOnly
        rows="15"
      />
      <textarea
        className="message-input"
        placeholder="Type your message..."
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default App;