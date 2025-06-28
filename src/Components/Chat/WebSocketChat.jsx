import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

const WebSocketChat = ({ chatId, token, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const socketRef = useRef(null);

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
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "400px",
        width: "100%",
      }}
    >
      <Typography variant="h6">Чат</Typography>
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px",
          backgroundColor: "#f9f9f9",
        }}
      >
        {messages.map((msg, index) => (
          <Typography key={index}>
            <strong>{msg.sender?.username || "Система"}:</strong> {msg.text}
          </Typography>
        ))}
      </Box>
      <TextField
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        placeholder="Введите сообщение..."
        fullWidth
        multiline
        rows={2}
      />
      <Button onClick={sendMessage} variant="contained" sx={{ mt: 1 }}>
        Отправить
      </Button>
      <Button onClick={onClose} variant="outlined" sx={{ mt: 1 }}>
        Закрыть
      </Button>
    </Box>
  );
};

export default WebSocketChat;