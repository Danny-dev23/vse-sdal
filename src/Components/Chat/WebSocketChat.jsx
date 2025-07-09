import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import './chatInterface.css';

const WebSocketChat = ({ chatId, token, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (chatId && token) {
      const socket = new WebSocket(
        `ws://147.45.146.242/ws/chat/${chatId}/?token=${token}`
      );
      socketRef.current = socket;

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "initial_data") {
          setMessages(data.messages);
        } else if (data.type === "chat_message") {
          setMessages((prev) => [...prev, data.message]);
        }
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      socket.onclose = () => {
        console.log("WebSocket connection closed");
      };

      return () => {
        socket.close();
      };
    }
  }, [chatId, token]);

  const sendMessage = () => {
    if (socketRef.current && messageInput.trim()) {
      const messageData = { text: messageInput };
      socketRef.current.send(JSON.stringify(messageData));
      setMessageInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-interface">
      <div className="chat-sidebar">
        <div className="chat-sidebar__header">
          <button className="chat-sidebar__menu-btn">☰</button>
          <div className="chat-sidebar__search">
            <span>Все, галактическая планета космос</span>
          </div>
        </div>

        <div className="chat-sidebar__subtitle">
          <span>например: Решить 10 задач по высшей математике</span>
        </div>

        <div className="chat-contacts">
          <div className="chat-contact active">
            <div className="chat-contact__avatar">
              <img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1" alt="Данил" />
              <div className="chat-contact__online-indicator"></div>
            </div>
            <div className="chat-contact__info">
              <div className="chat-contact__header">
                <span className="chat-contact__name">Данил</span>
                <span className="chat-contact__id">ID2681916</span>
              </div>
              <div className="chat-contact__status">привет</div>
            </div>
          </div>
        </div>

        <div className="chat-sidebar__recent">
          <div className="chat-recent-item">
            <div className="chat-recent-item__content">
              <span className="chat-recent-item__name">саламалексус</span>
              <div className="chat-recent-item__meta">
                <span className="chat-recent-item__time">15:46</span>
                <span className="chat-recent-item__date">10 апр. 2025 г.</span>
                <span className="chat-recent-item__status">прочитано ✓✓</span>
              </div>
            </div>
          </div>
          <div className="chat-recent-item">
            <div className="chat-recent-item__content">
              <span className="chat-recent-item__name">Цена: 2000 руб. дою миллион</span>
              <div className="chat-recent-item__meta">
                <span className="chat-recent-item__time">15:49</span>
                <span className="chat-recent-item__date">10 апр. 2025 г.</span>
                <span className="chat-recent-item__status">прочитано ✓✓</span>
              </div>
            </div>
          </div>
          <div className="chat-recent-item">
            <div className="chat-recent-item__content">
              <span className="chat-recent-item__name">хеллоу</span>
              <div className="chat-recent-item__meta">
                <span className="chat-recent-item__time">13:32</span>
                <span className="chat-recent-item__date">11 апр. 2025 г.</span>
                <span className="chat-recent-item__status">прочитано ✓✓</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="chat-main">
        <div className="chat-header">
          <div className="chat-header__user">
            <img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1" alt="Данил" />
            <div className="chat-header__info">
              <span className="chat-header__name">Данил</span>
              <span className="chat-header__status">●</span>
            </div>
          </div>
          <button className="chat-header__close" onClick={onClose}>✕</button>
        </div>

        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender?.username ? 'other' : 'own'}`}>
              <div className="chat-message__bubble">
                <div className="chat-message__text">{msg.text}</div>
                <div className="chat-message__meta">
                  <span className="chat-message__time">
                    {new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className="chat-message__date">
                    {new Date().toLocaleDateString('ru-RU')}
                  </span>
                  {!msg.sender?.username && <span className="chat-message__status">✓✓</span>}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input">
          <div className="chat-input__container">
            <input
              type="text"
              placeholder="Напишите сообщение..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="chat-input__field"
            />
            <button className="chat-input__emoji">😊</button>
            <button 
              className="chat-input__send"
              onClick={sendMessage}
              disabled={!messageInput.trim()}
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebSocketChat;