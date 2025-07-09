import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WebSocketChat from '../../../../Components/Chat/WebSocketChat';
import './notifications.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [openedChatId, setOpenedChatId] = useState(null);
  const [token, setToken] = useState('');
  const [selectedNotifications, setSelectedNotifications] = useState(new Set());

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

  const closeChat = () => {
    setOpenedChatId(null);
  };

  const handleNotificationSelect = (notificationId) => {
    const newSelected = new Set(selectedNotifications);
    if (newSelected.has(notificationId)) {
      newSelected.delete(notificationId);
    } else {
      newSelected.add(notificationId);
    }
    setSelectedNotifications(newSelected);
  };

  const handleDeleteNotification = (notificationId) => {
    setNotifications(notifications.filter(n => n.id !== notificationId));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }) + ' в ' + date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="notifications">
      <h1 className="notifications__title">Уведомления</h1>
      {notifications.length > 0 ? (
        <ul className="notifications__list">
          {notifications.map((notification) => (
            <li key={notification.id} className="notification-item">
              <div className="notification-header">
                <div className="notification-date">
                  <input
                    type="checkbox"
                    className="notification-checkbox"
                    checked={selectedNotifications.has(notification.id)}
                    onChange={() => handleNotificationSelect(notification.id)}
                  />
                  <span>{formatDate(notification.create_at)}</span>
                </div>
                <button 
                  className="notification-delete"
                  onClick={() => handleDeleteNotification(notification.id)}
                >
                  УДАЛИТЬ
                </button>
              </div>

              <div className="notification-content">
                <h3 className="notification-title">
                  Подробное заполнение — быстрое выполнение!
                </h3>
                
                <div className="notification-message">
                  <p>Здравствуйте, {notification.expert || 'Данил'}!</p>
                  <p>Если у вас есть файлы (методические указания, примеры и т.п.), тогда добавьте их к заказу и подробно опишите задание.</p>
                  <p>Это поможет исполнителю успешно выполнить заказ и, возможно, уменьшит стоимость.</p>
                </div>

                <div className="notification-actions">
                  <button className="notification-btn notification-btn--primary">
                    ДОБАВИТЬ ФАЙЛЫ
                  </button>
                  <button className="notification-btn notification-btn--secondary">
                    РЕДАКТИРОВАТЬ ЗАКАЗ
                  </button>
                </div>

                <div className="notification-details">
                  <div className="notification-meta">
                    <div className="notification-meta-item">
                      <span className="notification-meta-label">Тип:</span>
                      <span>Контрольная</span>
                    </div>
                    <div className="notification-meta-item">
                      <span className="notification-meta-label">Предмет:</span>
                      <span>vvv</span>
                    </div>
                    <div className="notification-meta-item">
                      <span className="notification-meta-label">Название:</span>
                      <span>vvvv</span>
                    </div>
                    <div className="notification-meta-item">
                      <span className="notification-meta-label">Срок сдачи:</span>
                      <span>28 февр. 2025</span>
                    </div>
                    <div className="notification-meta-item">
                      <span className="notification-meta-label">ID (номер) заказа:</span>
                      <span>6072474</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="notifications-empty">
          <h3>Нет уведомлений</h3>
          <p>Здесь будут отображаться ваши уведомления</p>
        </div>
      )}

      {openedChatId && token && (
        <div className="chat-modal-overlay" onClick={closeChat}>
          <div className="chat-modal" onClick={(e) => e.stopPropagation()}>
            <WebSocketChat 
              token={token} 
              chatId={openedChatId} 
              onClose={closeChat}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;