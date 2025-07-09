import React, { useEffect, useState } from "react";
import './chatInterface.css';

function Message({ sender, text }) {
  const isCurrentUser = sender.username;
  console.log("вы", isCurrentUser);
  
  return (
    <div className={`chat-message ${isCurrentUser ? 'own' : 'other'}`}>
      <div className="chat-message__bubble">
        <div className="chat-message__text">{text}</div>
        <div className="chat-message__meta">
          <span className="chat-message__time">
            {new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
          </span>
          <span className="chat-message__date">
            {new Date().toLocaleDateString('ru-RU')}
          </span>
          {isCurrentUser && <span className="chat-message__status">✓✓</span>}
        </div>
      </div>
    </div>
  );
}

function Chat() {
  const [messages, setMessages] = useState([]);
  const accessToken = sessionStorage.getItem("access_token");

  useEffect(() => {
    if (!accessToken) {
      console.error("Access token not found in sessionStorage");
      return;
    }

    const ws = new WebSocket(`ws://147.45.146.242/ws/dialogs/?token=${accessToken}`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("",data);
      
      if (data.type === "dialogs" && Array.isArray(data.dialogs)) {
        const newMessages = data.dialogs.map((dialog) => ({
          sender: dialog.companion,
          text: dialog.last_message.text || "No message",
        }));
        setMessages((prevMessages) => [...prevMessages, ...newMessages]);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      ws.close();
    };
  }, [accessToken]);

  return (
    <div>
      {messages.map((msg, index) => (
        <Message key={index} sender={msg.sender} text={msg.text} />
      ))}
    </div>
  );
}

export default Chat;
