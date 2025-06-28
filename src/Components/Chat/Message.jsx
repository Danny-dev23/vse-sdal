import React, { useEffect, useState } from "react";

function Message({ sender, text }) {
  const isCurrentUser = sender.username;
  console.log("вы", isCurrentUser);
  
  return (
    <div
      style={{
        background: isCurrentUser ? "#d1e7dd" : "#fff3cd",
        margin: isCurrentUser ? "10px 0 10px 20%" : "10px 20% 10px 0",
        padding: "8px",
        borderRadius: "5px",
        textAlign: isCurrentUser ? "right" : "left",
      }}
    >
      <div><strong>{sender.username}</strong></div>
      <div>{text}</div>
      <div style={{ fontSize: "0.8em", color: "#999" }}>{new Date().toLocaleTimeString()}</div>
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
