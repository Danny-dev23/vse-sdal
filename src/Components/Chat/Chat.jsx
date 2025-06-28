import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";

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
    <div>
      <div ref={chatRef} style={{ border: "1px solid #ccc", padding: "10px", height: "400px", overflowY: "auto" }}>
        {messages.map((msg, index) => (
          <Message key={index} sender={msg.sender} text={msg.text} />
        ))}
      </div>

      <select onChange={(e) => setMessageText(e.target.value)}>
        <option value="">Выберите шаблон...</option>
        {templates.map((t, index) => (
          <option key={index} value={`${t.title}\nЦена: ${t.price} ₽\n${t.comment}`}>
            {t.title} - {t.price} ₽
          </option>
        ))}
      </select>

      <form onSubmit={sendMessage} style={{ display: "flex", marginTop: "10px" }}>
        <input
          type="text"
          placeholder="Введите сообщение"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
}

export default Chat;
