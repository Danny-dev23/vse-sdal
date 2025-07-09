import React, { useState, useEffect, useRef } from 'react';
import './chatInterface.css';

const ChatInterface = ({ isOpen, onClose }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([
    {
      id: 1,
      name: 'Данил',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1',
      lastMessage: 'привет',
      time: '13:33',
      date: '11 апр. 2025 г.',
      isOnline: true,
      unread: 0,
      messages: [
        {
          id: 1,
          text: 'привет',
          time: '13:33',
          date: '11 апр. 2025 г.',
          isOwn: false,
          status: 'read'
        }
      ]
    }
  ]);

  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'саламалексус',
      time: '15:46',
      date: '10 апр. 2025 г.',
      status: 'read'
    },
    {
      id: 2,
      name: 'Цена: 2000 руб. дою миллион',
      time: '15:49',
      date: '10 апр. 2025 г.',
      status: 'read'
    },
    {
      id: 3,
      name: 'хеллоу',
      time: '13:32',
      date: '11 апр. 2025 г.',
      status: 'read'
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat?.messages]);

  const handleSendMessage = () => {
    if (!message.trim() || !selectedChat) return;

    const newMessage = {
      id: Date.now(),
      text: message,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString('ru-RU'),
      isOwn: true,
      status: 'sent'
    };

    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === selectedChat.id 
          ? { ...chat, messages: [...chat.messages, newMessage], lastMessage: message }
          : chat
      )
    );

    setMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

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
          {chats.map(chat => (
            <div 
              key={chat.id}
              className={`chat-contact ${selectedChat?.id === chat.id ? 'active' : ''}`}
              onClick={() => setSelectedChat(chat)}
            >
              <div className="chat-contact__avatar">
                <img src={chat.avatar} alt={chat.name} />
                {chat.isOnline && <div className="chat-contact__online-indicator"></div>}
              </div>
              <div className="chat-contact__info">
                <div className="chat-contact__header">
                  <span className="chat-contact__name">{chat.name}</span>
                  <span className="chat-contact__id">ID{chat.id}681916</span>
                </div>
                <div className="chat-contact__status">привет</div>
              </div>
            </div>
          ))}
        </div>

        <div className="chat-sidebar__recent">
          {contacts.map(contact => (
            <div key={contact.id} className="chat-recent-item">
              <div className="chat-recent-item__content">
                <span className="chat-recent-item__name">{contact.name}</span>
                <div className="chat-recent-item__meta">
                  <span className="chat-recent-item__time">{contact.time}</span>
                  <span className="chat-recent-item__date">{contact.date}</span>
                  <span className="chat-recent-item__status">прочитано ✓✓</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="chat-main">
        {selectedChat ? (
          <>
            <div className="chat-header">
              <div className="chat-header__user">
                <img src={selectedChat.avatar} alt={selectedChat.name} />
                <div className="chat-header__info">
                  <span className="chat-header__name">{selectedChat.name}</span>
                  {selectedChat.isOnline && <span className="chat-header__status">●</span>}
                </div>
              </div>
              <button className="chat-header__close" onClick={onClose}>✕</button>
            </div>

            <div className="chat-messages">
              {selectedChat.messages.map(msg => (
                <div key={msg.id} className={`chat-message ${msg.isOwn ? 'own' : 'other'}`}>
                  <div className="chat-message__bubble">
                    <div className="chat-message__text">{msg.text}</div>
                    <div className="chat-message__meta">
                      <span className="chat-message__time">{msg.time}</span>
                      <span className="chat-message__date">{msg.date}</span>
                      {msg.isOwn && (
                        <span className="chat-message__status">
                          {msg.status === 'read' ? '✓✓' : '✓'}
                        </span>
                      )}
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
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="chat-input__field"
                />
                <button className="chat-input__emoji">😊</button>
                <button 
                  className="chat-input__send"
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                >
                  ➤
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="chat-empty">
            <p>Выберите чат для начала общения</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;