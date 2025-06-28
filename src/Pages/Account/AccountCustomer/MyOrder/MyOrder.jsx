import React, { useEffect, useState } from "react";
import "./myOrder.css";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import MyOrderDetails from "./MyOrderDetails/MyOrderDetails";

const MyOrder = () => {
  const [step, setStep] = useState(1);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");

    fetch("http://147.45.146.242/api/orders/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => setOrders(data))
      .catch((error) => console.error("Ошибка при получении заказов:", error));
  }, []);

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

  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = orders.filter((order) =>
    order.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenStep = (order) => {
    setSelectedOrder(order);
    setStep(2);
  };
  const handlePrevStep = () => {
    setStep(1);
  };
  console.log(filteredOrders);

  return (
    <div className="myorder-container">
      {step === 1 && (
        <div className="myorder">
          <div className="myorder-text">
            <h2 className="myorder-text__title">Мои заказы</h2>
          </div>
          <hr />
          <div className="myorder-content">
            <div className="myorder-search">
              <div className="search-bar">
                <TextField
                  variant="outlined"
                  placeholder="Поиск по названию"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  className="myorder-search__input"
                />
              </div>
            </div>
            <div className="myorder-list">
              <table className="myorder-table">
                <thead className="myorder-table__head">
                  <tr>
                    <th
                      className="myorder-table__header"
                      style={{ width: "50%" }}
                    >
                      Название
                    </th>
                    <th className="myorder-table__header"></th>
                    <th className="myorder-table__header">Срок/Цена</th>
                    <th className="myorder-table__header">Отклики/Эксперт</th>
                    <th className="myorder-table__header">Статус заказа</th>
                  </tr>
                </thead>
                <br />
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="myorder-table__row"
                      onClick={() => handleOpenStep(order)}
                    >
                      <td className="myorder-table__cell">
                        <p className="myorder-table__cell-title">
                          {order.type_of_work} {order.title}
                        </p>
                        <p className="myorder-table__cell-description">
                          {order.subjects}
                        </p>
                      </td>
                      <td className="myorder-table__cell">
                        <p className="myorder-table__cell-chat">
                          <EmailIcon />
                        </p>
                      </td>
                      <td className="myorder-table__cell">
                        <span className="myorder-table__cell-deadline">
                          к{" "}
                          {new Date(order.deadline).toLocaleDateString(
                            "ru-RU",
                            {
                              day: "numeric",
                              month: "short",
                            }
                          )}
                        </span>
                        <span className="myorder-table__cell-price">
                          {order.price}
                        </span>
                      </td>
                      <td className="myorder-table__cell">
                        <span className="myorder-table__cell-expert">
                          {order.expert}
                        </span>
                        <span className="myorder-table__cell-responses">
                          {order.responses}
                        </span>
                      </td>
                      <td className="myorder-table__cell">
                        <span className="myorder-table__cell-status">
                          на выбор исполнителя <br /> осталось{" "}
                          {calculateTimeLeft(order.deadline)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {step === 2 && (
        <div>
          <MyOrderDetails order={selectedOrder} onBack={handlePrevStep} />
        </div>
      )}
    </div>
  );
};

export default MyOrder;
