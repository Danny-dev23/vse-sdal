import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";
import './chatInterface.css';

function Chat({chatId}) {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [templates, setTemplates] = useState([]);
  const chatRef = useRef(null);
  const socketRef = useRef(null);
  const token = sessionStorage.getItem("access_token");
  const chat = chatId;
  
  useEffect(() => {
    const wsUrl = `ws://147.45.146.242/ws/chat/${chatId}/?token=${encodeURIComponent(token)}`;
    socketRef.current = new WebSocket(wsUrl);

    socketRef.current.onopen = async () => {
      console.log("✅ Соединение установлено");
      await loadTemplates();
    };

    socketRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.message) {
          setMessages((prev) => [...prev, data.message]);
        }
      } catch (e) {
        console.error("Ошибка обработки сообщения", e);
      }
    };

    socketRef.current.onclose = () => {
      console.log("❌ Соединение закрыто");
    };

    return () => {
      socketRef.current.close();
    };
  }, [token]);
  console.log(messages);
  
  const loadTemplates = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/templates/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Ошибка загрузки шаблонов");
      const data = await response.json();
      setTemplates(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (messageText.trim() && socketRef.current) {
      socketRef.current.send(JSON.stringify({ text: messageText }));
      setMessageText("");
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
        </div>

        <div className="chat-messages" ref={chatRef}>
          {messages.map((msg, index) => (
            <Message key={index} sender={msg.sender} text={msg.text} />
          ))}
        </div>

        <div className="chat-input">
          <div className="chat-input__container">
            <select 
              onChange={(e) => setMessageText(e.target.value)}
              className="chat-input__templates"
              style={{ marginRight: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #e9ecef' }}
            >
              <option value="">Выберите шаблон...</option>
              {templates.map((t, index) => (
                <option key={index} value={`${t.title}\nЦена: ${t.price} ₽\n${t.comment}`}>
                  {t.title} - {t.price} ₽
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Введите сообщение"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="chat-input__field"
            />
            <button className="chat-input__emoji">😊</button>
            <button 
              className="chat-input__send"
              onClick={sendMessage}
              disabled={!messageText.trim()}
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;