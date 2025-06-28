import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const FavoritesExpert = () => {
  const [orders, setOrders] = useState([]); // Инициализируем как массив
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    axios
      .get("http://147.45.146.242/api/favorites/orders/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setOrders(response.data))
      .catch((error) => console.error("Ошибка загрузки заказов", error));
  }, []);
  console.log(orders[0]);

  const calculateTimeLeft = (deadline) => {
    const now = new Date();
    const endDate = new Date(deadline);
    const timeDifference = endDate - now;

    if (timeDifference <= 0) {
      return "Дедлайн прошел";
    }

    const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    return `${daysLeft} дн. ${hoursLeft} ч.`;
  };

  const handleBookmarkClick = (id) => {
    const token = sessionStorage.getItem("access_token");

    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id
          ? { ...order, isBookmarked: !order.isBookmarked }
          : order
      )
    );

    const order = orders.find((order) => order.id === id);

    if (order.isBookmarked) {
      // Удаление из избранного
      axios
        .post(
          "http://147.45.146.242/api/favorites/orders/add/",
          { order_id: id },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(() => console.log("Заказ удалён из избранного"))
        .catch((error) =>
          console.error("Ошибка при удалении из избранного", error)
        );
    } else {
      // Добавление в избранное
      axios
        .post(
          "http://147.45.146.242/api/favorites/orders/add/",
          { order_id: id },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(() => console.log("Заказ добавлен в избранное"))
        .catch((error) =>
          console.error("Ошибка при добавлении в избранное", error)
        );
    }
  };

  const handleRemoveFavoritesButton = async (orderId) => {
    const token = sessionStorage.getItem("access_token");
  
    try {
      // Отправляем запрос на удаление заказа из избранного
      await axios.post(
        `http://147.45.146.242/api/favorites/orders/remove/`,
        { order_id: orderId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      // Удаляем заказ из локального состояния
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
  
      console.log(`Заказ с ID ${orderId} удалён из избранного`);
    } catch (error) {
      console.error("Ошибка при удалении из избранного:", error);
    }
  };

  return (
    <div>
      <p>Избранные заказы</p>
      <hr />
      {error && <p style={{ color: "red" }}>Ошибка: {error}</p>}
      <ul>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <BookmarkBorderIcon />
                </TableCell>
                <TableCell>Название</TableCell>
                <TableCell>Ставки</TableCell>
                <TableCell>Срокииии</TableCell>
                <TableCell>Статус заказа</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div style={{ cursor: "pointer" }} onClick={() => handleRemoveFavoritesButton(order.id)}>
                      <BookmarkBorderIcon sx={{ color: "red" }} />
                    </div>
                  </TableCell>
                  <TableCell sx={{ width: "50%" }}>
                    <p>{order.id}</p>
                    <p className="myorder-table__cell-title">
                      {order.type_of_work}, {order.title}
                    </p>
                    <p className="myorder-table__cell-description">
                      {order.subjects}
                    </p>
                  </TableCell>
                  <TableCell>{order.bids}</TableCell>
                  <TableCell>
                    к{" "}
                    {new Date(order.deadline).toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "short",
                    })}
                  </TableCell>
                  <TableCell>
                    <p>
                      На выбор исполнителя осталось{" "}
                      {calculateTimeLeft(order.deadline)}
                    </p>
                    <button variant="contained" color="primary" size="small">
                      Быстрый просмотр
                    </button>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ul>
    </div>
  );
};

export default FavoritesExpert;
