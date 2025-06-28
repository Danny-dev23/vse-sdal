import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Box, Typography, Button } from "@mui/material";

const NewOrderExpert = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // Для хранения выбранного заказа
  const [isModalOpen, setIsModalOpen] = useState(false); // Управление видимостью модального окна

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = sessionStorage.getItem("access_token");
        if (!token) {
          console.error("No access token found in sessionStorage");
          return;
        }

        const response = await axios.get("http://147.45.146.242/api/orders/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Фильтруем заказы, оставляя только те, которые созданы за последний день
        const now = new Date();
        const oneDayAgo = new Date();
        oneDayAgo.setDate(now.getDate() - 1);

        const filteredOrders = response.data.filter((order) => {
          const createdAt = new Date(order.created_at);
          return createdAt >= oneDayAgo;
        });

        // Сортируем заказы по дате создания (самые свежие сверху)
        const sortedOrders = filteredOrders.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setOrders(sortedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleOpenModal = (order) => {
    setSelectedOrder(order); // Устанавливаем выбранный заказ
    setIsModalOpen(true); // Открываем модальное окно
  };

  const handleCloseModal = () => {
    setSelectedOrder(null); // Очищаем выбранный заказ
    setIsModalOpen(false); // Закрываем модальное окно
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ru-RU", {
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    })
      .format(date)
      .replace(" г.", "");
  };

  return (
    <div>
      <h1>Сообщения о новых заказах</h1>
      <p>
        Откликайтесь на заказ в течение 30 минут после его создания. И если вас
        выберут исполнителем - мы начислим на 50% больше баллов рейтинга за
        заказ 😎
      </p>
      <div>
        {orders.map((order) => (
          <div
            key={order.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "16px",
              backgroundColor: "#fff",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: "14px", color: "#888" }}>
                {formatDate(order.created_at)}
              </span>
              <a
                href="#"
                style={{
                  fontSize: "14px",
                  color: "#007bff",
                  textDecoration: "none",
                }}
              >
                Удалить
              </a>
            </div>
            <h3 style={{ margin: "8px 0" }}>{order.title}</h3>
            <p style={{ fontSize: "14px", color: "#555" }}>
              {order.description}
            </p>
            <div style={{ marginTop: "16px", display: "flex", gap: "16px" }}>
              <button
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={() => handleOpenModal(order)} // Открываем модальное окно
              >
                Быстрый просмотр заказа
              </button>
              <button
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#f8f9fa",
                  color: "#007bff",
                  border: "1px solid #007bff",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Перейти на страницу заказа
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Модальное окно */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: "800px",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          {selectedOrder && (
            <>
              <Typography variant="h6" component="h2" gutterBottom>
                {selectedOrder.title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Описание:</strong> {selectedOrder.description}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Срок сдачи:</strong>{" "}
                {new Date(selectedOrder.deadline).toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "long",
                })}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Количество файлов:</strong> {selectedOrder.files_count}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Заказчик:</strong> {selectedOrder.customer_name} [
                {selectedOrder.customer_id}]
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCloseModal}
                sx={{ mt: 2 }}
              >
                Закрыть
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default NewOrderExpert;