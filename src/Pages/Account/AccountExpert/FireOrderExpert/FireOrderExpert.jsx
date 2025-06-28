import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Checkbox,
  FormControlLabel,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { CheckBox } from "@mui/icons-material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const FireOrderExpert = () => {
  const [orders, setOrders] = useState([]);
  const [workTypes, setWorkTypes] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [filters, setFilters] = useState({
    query: "",
    fromDate: "",
    toDate: "",
    onlyNew: false,
    urgent: false,
  });

  const handleBookmarkClick = (id) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id
          ? { ...order, isBookmarked: !order.isBookmarked }
          : order
      )
    );
  };
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

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    axios
      .get("http://147.45.146.242/api/orders/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setOrders(response.data))
      .catch((error) => console.error("Ошибка загрузки заказов", error));
  }, []);

  useEffect(() => {
    const fetchWorkTypes = async () => {
      try {
        const response = await fetch("http://147.45.146.242/api/WorkType/");
        const data = await response.json();
        setWorkTypes(data); // Сохраняем список типов работ
      } catch (err) {
        console.error("Ошибка загрузки типов работ:", err);
      }
    };

    fetchWorkTypes();
  }, []);

  console.log(orders);

  

  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    });
  };

  const handleAddFavoritesButton = (orderId) => {
    const token = sessionStorage.getItem("access_token");
    console.log([orderId]);
    
    axios
      .post(
        "http://147.45.146.242/api/favorites/add/",
        { order_id: [orderId] },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log("Заказ добавлен в избранное:", response.data);
      })
      .catch((error) => {
        console.error("Ошибка при добавлении в избранное:", error);
      });
  };

  const handleRemoveFavoritesButton = (orderId) => {
    const token = sessionStorage.getItem("access_token");
    axios
      .delete(
        `http://147.45.146.242/api/favorites/remove/`,
        { order_id: orderId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log("Заказ удалён из избранного:", response.data);
      })
      .catch((error) => {
        console.error("Ошибка при удалении из избранного:", error);
      });
  };

  const filteredOrders = orders.filter((order) => {
    return (
      (filters.query === "" ||
        order.title.toLowerCase().includes(filters.query.toLowerCase())) &&
      (filters.fromDate === "" ||
        new Date(order.deadline) >= new Date(filters.fromDate)) &&
      (filters.toDate === "" ||
        new Date(order.deadline) <= new Date(filters.toDate)) &&
      (!filters.onlyNew || order.is_new) &&
      (!filters.urgent || order.is_urgent)
    );
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => 
    new Date(a.deadline) - new Date(b.deadline)
  );

  return (
    <div className="container">
      <h2>Поиск новых заказов</h2>
      <div className="filter-box">
        <TextField
          label="Введите предмет или тип работы"
          variant="outlined"
          name="query"
          value={filters.query}
          onChange={handleFilterChange}
          fullWidth
          margin="normal"
        />
        <div className="filter-options">
          <TextField
            label="Срок сдачи с"
            type="date"
            name="fromDate"
            value={filters.fromDate}
            onChange={handleFilterChange}
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />
          <TextField
            label="по"
            type="date"
            name="toDate"
            value={filters.toDate}
            onChange={handleFilterChange}
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />
        </div>
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              name="onlyNew"
              checked={filters.onlyNew}
              onChange={handleFilterChange}
            />{" "}
            Без ставок
          </label>
          <label>
            <input
              type="checkbox"
              name="urgent"
              checked={filters.urgent}
              onChange={handleFilterChange}
            />{" "}
            Срочные
          </label>
          <label>
            <input
              type="checkbox"
              name="onlyNew"
              checked={filters.onlyNew}
              onChange={handleFilterChange}
            />{" "}
            Без ставок
          </label>
          <label>
            <input
              type="checkbox"
              name="urgent"
              checked={filters.urgent}
              onChange={handleFilterChange}
            />{" "}
            Срочные
          </label>
          <label>
            <input
              type="checkbox"
              name="onlyNew"
              checked={filters.onlyNew}
              onChange={handleFilterChange}
            />{" "}
            Без ставок
          </label>
          <label>
            <input
              type="checkbox"
              name="urgent"
              checked={filters.urgent}
              onChange={handleFilterChange}
            />{" "}
            Срочные
          </label>
        </div>
        <div className="type">
          <ul className="order-expert__check-box">
            {workTypes.map((type) => (
              <FormControlLabel
                value="bottom"
                className="order-expert__check"
                control={
                  <Checkbox
                    sx={{
                      color: "#545252",
                      "&.Mui-checked": {
                        color: "#0d5e1b",
                      },
                    }}
                  />
                }
                label={type.name}
                labelPlacement="bottom"
              />
            ))}
          </ul>
        </div>
        <button className="apply-filter">Применить фильтр</button>
      </div>
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
            {sortedOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <div
                    onClick={() => {
                      if (order.isBookmarked) {
                        handleRemoveFavoritesButton(order.id); // Удаление из избранного
                      } else {
                        handleAddFavoritesButton(order.id); // Добавление в избранное
                      }
                      handleBookmarkClick(order.id); // Обновление локального состояния
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {order.isBookmarked ? (
                      <BookmarkBorderIcon sx={{ color: "red" }} /> // Закрашенная иконка
                    ) : (
                      <BookmarkBorderIcon sx={{ color: "#545252" }} /> // Пустая иконка
                    )}
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
    </div>
  );
};

export default FireOrderExpert;
