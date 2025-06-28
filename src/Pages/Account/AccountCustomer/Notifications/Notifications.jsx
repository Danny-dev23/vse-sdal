import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WebSocketChat from '../../../../Components/Chat/WebSocketChat';
 // подключаем компонент

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [openedChatId, setOpenedChatId] = useState(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('access_token');
    setToken(token);

    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://147.45.146.242/api/notifications', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotifications(response.data);
      } catch (error) {
        console.error('Ошибка при получении уведомлений:', error);
      }
    };

    fetchNotifications();
  }, []);

  const openChat = (chatId) => {
    setOpenedChatId(chatId);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Уведомления</h1>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id} style={{ marginBottom: 20 }}>
              <p><strong>Заказ:</strong> {notification.order}</p>
              <p><strong>Эксперт:</strong> {notification.expert}</p>
              <p><strong>Сообщение:</strong> {notification.message}</p>
              <p><strong>Статус:</strong> {notification.status}</p>
              <p><strong>Создано:</strong> {notification.create_at}</p>
              <p><strong>Обновлено:</strong> {notification.updated_at}</p>
              <p><strong>ID чата:</strong> {notification.chat_id}</p>
              {notification.chat_id && (
                <button onClick={() => openChat(notification.chat_id)}>Открыть чат</button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Нет уведомлений.</p>
      )}

      {openedChatId && token && (
        <WebSocketChat token={token} chatId={openedChatId} />
      )}
    </div>
  );
};

export default Notifications;
