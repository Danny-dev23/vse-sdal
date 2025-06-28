import React, { useEffect, useRef, useState } from "react";
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
  Typography,
  Modal,
  Box,
} from "@mui/material";
import { CheckBox } from "@mui/icons-material";
import { pink } from "@mui/material/colors";
import "./orderExpert.css";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Chat from "../../../../Components/Chat/Chat";
import WebSocketChat from "../../../../Components/Chat/WebSocketChat";
import SearchIcon from "@mui/icons-material/Search";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ruLocale from "date-fns/locale/ru";
// const WebSocketChat = ({ chatId, token, onClose }) => {
//   const [messages, setMessages] = useState([]);
//   const [messageInput, setMessageInput] = useState("");
//   const socketRef = useRef(null);

//   useEffect(() => {
//     if (chatId && token) {
//       const socket = new WebSocket(
//         `ws://147.45.146.242/ws/chat/${chatId}/?token=${token}`
//       );
//       socketRef.current = socket;

//       socket.onmessage = (event) => {
//         const data = JSON.parse(event.data);
//         if (data.type === "initial_data") {
//           setMessages(data.messages);
//         } else if (data.type === "chat_message") {
//           setMessages((prev) => [...prev, data.message]);
//         }
//       };

//       socket.onerror = (error) => {
//         console.error("WebSocket error:", error);
//       };

//       socket.onclose = () => {
//         console.log("WebSocket connection closed");
//       };

//       return () => {
//         socket.close();
//       };
//     }
//   }, [chatId, token]);

//   const sendMessage = () => {
//     if (socketRef.current && messageInput.trim()) {
//       const messageData = { text: messageInput };
//       socketRef.current.send(JSON.stringify(messageData));
//       setMessageInput("");
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         height: "400px",
//         width: "100%",
//       }}
//     >
//       <Typography variant="h6">Чат</Typography>
//       <Box
//         sx={{
//           flex: 1,
//           overflowY: "auto",
//           border: "1px solid #ccc",
//           padding: "10px",
//           marginBottom: "10px",
//           backgroundColor: "#f9f9f9",
//         }}
//       >
//         {messages.map((msg, index) => (
//           <Typography key={index}>
//             <strong>{msg.sender?.username || "Система"}:</strong> {msg.text}
//           </Typography>
//         ))}
//       </Box>
//       <TextField
//         value={messageInput}
//         onChange={(e) => setMessageInput(e.target.value)}
//         placeholder="Введите сообщение..."
//         fullWidth
//         multiline
//         rows={2}
//       />
//       <Button onClick={sendMessage} variant="contained" sx={{ mt: 1 }}>
//         Отправить
//       </Button>
//       <Button onClick={onClose} variant="outlined" sx={{ mt: 1 }}>
//         Закрыть
//       </Button>
//     </Box>
//   );
// };

const OrderExpert = () => {
  const [orders, setOrders] = useState([]);
  const [chatId, setChatId] = useState();
  const [workTypes, setWorkTypes] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isAdvancedSearchVisible, setIsAdvancedSearchVisible] = useState(false);

  const toggleAdvancedSearch = () => {
    setIsAdvancedSearchVisible((prev) => !prev);
  };

  const [filters, setFilters] = useState({
    query: "",
    fromDate: "",
    toDate: "",
    onlyNew: false,
    urgent: false,
    selectedWorkTypes: [],
  });

  const handleOpenModal = () => {
    setIsModalOpen(true); // Открываем модальное окно
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Закрываем модальное окно
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [token, setToken] = useState("");

  const handleOpenChat = (orderId) => {
    const userId = sessionStorage.getItem("user_id");
    const token = sessionStorage.getItem("access_token");
    setToken(token);

    axios
      .post(
        "http://147.45.146.242/api/chats/start_chat/",
        { order_id: orderId, expert_id: userId },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        setCurrentChatId(response.data.chat_id);
        setIsModalOpen(true);
      })
      .catch((error) => {
        console.error("Ошибка при создании чата:", error);
      });
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

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");

    // Получение всех заказов
    axios
      .get("http://147.45.146.242/api/orders/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const allOrders = response.data;

        // Получение сохранённых заказов
        axios
          .get("http://147.45.146.242/api/favorites/orders/", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((favoritesResponse) => {
            const favoriteOrders = favoritesResponse.data;

            // Отметка сохранённых заказов
            const updatedOrders = allOrders.map((order) => ({
              ...order,
              isBookmarked: favoriteOrders.some(
                (favOrder) => favOrder.id === order.id
              ),
            }));

            setOrders(updatedOrders);
          })
          .catch((error) =>
            console.error("Ошибка загрузки сохранённых заказов", error)
          );
      })
      .catch((error) => console.error("Ошибка загрузки заказов", error));
  }, []);
  console.log(orders);
  useEffect(() => {
    if (workTypes.length > 0) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        selectedWorkTypes: workTypes.map((type) => type.name), // Устанавливаем все типы работ активными
      }));
    }
  }, [workTypes]);
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
  const handleAddFavoritesButton = (orderId) => {
    const token = sessionStorage.getItem("access_token");
    console.log(orderId);

    axios
      .post(
        "http://147.45.146.242/api/favorites/orders/add/",
        { order_id: orderId },
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
      .post(
        `http://147.45.146.242/api/favorites/orders/remove/`,
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

  const handleWorkTypeChange = (type) => {
    setFilters((prevFilters) => {
      const isSelected = prevFilters.selectedWorkTypes.includes(type);
      return {
        ...prevFilters,
        selectedWorkTypes: isSelected
          ? prevFilters.selectedWorkTypes.filter((t) => t !== type) // Удалить, если уже выбран
          : [...prevFilters.selectedWorkTypes, type], // Добавить, если не выбран
      };
    });
  };

  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    });
  };
  const typeOfWorkFilter = filters.typeOfWork?.toLowerCase() || "";

  const filteredOrders = orders.filter((order) => {
    const title = order.title?.toLowerCase() || "";
    const typeOfWork = order.type_of_work?.toLowerCase() || "";
    const query = filters.query?.toLowerCase() || "";

    return (
      (query === "" || title.includes(query) || typeOfWork.includes(query)) &&
      (filters.selectedWorkTypes.length === 0 || // Если ничего не выбрано, пропускаем фильтр
        filters.selectedWorkTypes.includes(order.type_of_work)) && // Проверка типа работы
      (filters.fromDate === "" ||
        new Date(order.deadline) >= new Date(filters.fromDate)) &&
      (filters.toDate === "" ||
        new Date(order.deadline) <= new Date(filters.toDate)) &&
      (!filters.onlyNew || order.is_new) &&
      (!filters.urgent || order.is_urgent)
    );
  });
  return (
    <div className="order-search__container">
      <h2 className="order-search__title">Поиск новых заказов</h2>
      <div className="order-search__box">
        <TextField
          label="Введите предмет или тип работы"
          variant="outlined"
          name="query"
          value={filters.query}
          onChange={handleFilterChange}
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: <SearchIcon className="order-search-box__svg" />,
          }}
        />
        {!isAdvancedSearchVisible && (
          <Button
            className="toggle-advanced-search"
            onClick={toggleAdvancedSearch}
          >
            Расширенный поиск
          </Button>
        )}
      </div>
      {isAdvancedSearchVisible && (
        <div className="filter-box">
          <h3 className="filter-box__title">Расширенный поиск заказов</h3>
          <div className="filter-options">
            <p className="filter-options__title">Срок сдачи</p>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              locale={ruLocale}
            >
              <DatePicker
                label="Срок сдачи с"
                value={filters.fromDate}
                onChange={(newValue) =>
                  handleFilterChange({
                    target: { name: "fromDate", value: newValue },
                  })
                }
                renderInput={(params) => (
                  <TextField {...params} margin="normal" />
                )}
              />
              <DatePicker
                label="по"
                value={filters.toDate}
                onChange={(newValue) =>
                  handleFilterChange({
                    target: { name: "toDate", value: newValue },
                  })
                }
                renderInput={(params) => (
                  <TextField {...params} margin="normal" />
                )}
              />
            </LocalizationProvider>
          </div>
          <div className="checkbox-group">
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.onlyNew} // Проверка, выбран ли тип
                  onChange={handleFilterChange} // Обработчик изменения
                  name="onlyNew"
                  icon={
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        border: "1px solid #999",
                        borderRadius: "5px",
                        padding: "5px",
                        backgroundColor: "#fff",
                      }}
                    />
                  }
                  checkedIcon={
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        border: "1px solid #0d5e1b", // рамка залитого состояния
                        borderRadius: "5px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: 15,
                          height: 15,
                          backgroundColor: "#0d5e1b", // цвет заливки
                          borderRadius: "5px",
                        }}
                      />
                    </Box>
                  }
                  sx={{
                    color: "#545252",
                    "&.Mui-checked": {
                      color: "#0d5e1b",
                    },
                  }}
                  label="Без ставок"
                />
              }
              labelPlacement="bottom"
              label="Без ставок"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.urgent} // Проверка, выбран ли тип
                  onChange={handleFilterChange} // Обработчик изменения
                  name="urgent"
                  icon={
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        border: "1px solid #999",
                        borderRadius: "5px",
                        padding: "5px",
                        backgroundColor: "#fff",
                      }}
                    />
                  }
                  checkedIcon={
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        border: "1px solid #0d5e1b", // рамка залитого состояния
                        borderRadius: "5px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: 15,
                          height: 15,
                          backgroundColor: "#0d5e1b", // цвет заливки
                          borderRadius: "5px",
                        }}
                      />
                    </Box>
                  }
                  sx={{
                    color: "#545252",
                    "&.Mui-checked": {
                      color: "#0d5e1b",
                    },
                  }}
                />
              }
              labelPlacement="bottom"
              label="Срочные"
            />

            {/* <label>
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
            </label> */}
          </div>
          <div className="type">
            <div className="button-group">
              <p className="button-group__text">Типы работ</p>
              <button
                className="button-group__remove"
                onClick={() =>
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    selectedWorkTypes: [],
                  }))
                }
              >
                Снять выделенные
              </button>
              <button
                className="button-group__remove"
                onClick={() =>
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    selectedWorkTypes: workTypes.map((type) => type.name),
                  }))
                }
              >
                Выделить все
              </button>
            </div>
            <ul className="order-expert__check-box">
              {workTypes.map((type) => (
                <FormControlLabel
                  key={type.id}
                  value="bottom"
                  className="order-expert__check"
                  control={
                    <Checkbox
                      checked={filters.selectedWorkTypes.includes(type.name)} // Проверка, выбран ли тип
                      onChange={() => handleWorkTypeChange(type.name)} // Обработчик изменения
                      icon={
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            border: "1px solid #999",
                            borderRadius: "5px",
                            padding: "5px",
                            backgroundColor: "#fff",
                          }}
                        />
                      }
                      checkedIcon={
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            border: "1px solid #0d5e1b", // рамка залитого состояния
                            borderRadius: "5px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Box
                            sx={{
                              width: 15,
                              height: 15,
                              backgroundColor: "#0d5e1b", // цвет заливки
                              borderRadius: "5px",
                            }}
                          />
                        </Box>
                      }
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
          <div className="" style={{ textAlign: "right" }}>
            <Button
              className="toggle-advanced-search"
              onClick={toggleAdvancedSearch}
              style={{ marginTop: "10px" }}
            >
              Скрыть
            </Button>
          </div>
        </div>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <BookmarkBorderIcon />
              </TableCell>
              <TableCell sx={{ width: "50%" }}>Название</TableCell>
              <TableCell>Чат</TableCell>
              <TableCell>Ставки</TableCell>
              <TableCell>Срокииии</TableCell>
              <TableCell>Статус заказа</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
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
                <TableCell>
                  <button onClick={() => handleOpenChat(order.id)}>Чат</button>
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

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
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
          {currentChatId && (
            <WebSocketChat
              chatId={currentChatId}
              token={token}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default OrderExpert;
