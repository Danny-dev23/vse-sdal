import React, { useEffect, useRef, useState } from "react";
import "./myorderdetails.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import VerifiedIcon from "@mui/icons-material/Verified";
import Hit from "../../../../../assents/images/hit.png";
import CloseIcon from "@mui/icons-material/Close";
import WebSocketChat from "../../../../../Components/Chat/WebSocketChat";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  // p: 4,
};

const MyOrderDetails = ({ order, onBack }) => {
  const [step, setStep] = useState(1);
  const [open, setOpen] = React.useState(false);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const token = sessionStorage.getItem("access_token");
  console.log(token);
  
  const connectToChat = () => {
    if (!token) {
      alert("Токен не найден в sessionStorage");
      return;
    }

    const ws = new WebSocket(`ws://147.45.146.242/ws/dialogs/?token=${token}`);
    setSocket(ws);

    ws.onopen = () => {
      console.log("WebSocket соединение установлено");
    };
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };
    console.log(messages[0].dialogs);

    ws.onerror = (error) => {
      console.error("Ошибка WebSocket:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket соединение закрыто");
    };
  };

  const sendMessage = () => {
    if (socket && messageInput.trim()) {
      socket.send(JSON.stringify({ text: messageInput }));
      setMessageInput("");
    }
  };

  useEffect(() => {
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("ru-RU", options);
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

  return (
    <div className="order-details">
      <div className="order-details__steps">
        <h4 className="order-details__steps-header">
          Шаг 1: выбор исполнителя
        </h4>
        <p className="order-details__steps-description">
          Чтобы исполнитель приступил к заказу и вы могли обмениваться файлами,
          необходимо:
        </p>
        <ol className="order-details__steps-list">
          <li className="order-details__steps-item">
            Обсудите условия работы в чате и нажмите на кнопку «Выбрать
            исполнителя».
          </li>
          <li className="order-details__steps-item">
            Внести предоплату (деньги будут храниться у вас на счете до конца
            гарантии){" "}
            <a href="#" className="order-details__link">
              о гарантиях
            </a>{" "}
            /{" "}
            <a href="#" className="order-details__link">
              о способах оплаты
            </a>
            .
          </li>
          <li className="order-details__steps-item">
            Не затягивать с выбором исполнителя и предоплатой, т.к. сегодня
            исполнитель свободен, а завтра уже может быть занят.
          </li>
        </ol>
      </div>
      <div className="order-details__steps-back">
        <button className="order-details__steps-back__button" onClick={onBack}>
          {" "}
          <ArrowBackIosIcon /> <span>к списку заказов</span>
        </button>
      </div>
      <div className="order-details__title">
        <div className="order-details__title-text">
          <h2 className="order-details__header">
            {order.type_of_work}, {order.title}
          </h2>
          <h3 className="order-details__description">{order.subjects}</h3>
        </div>
        <div className="order-details__title-date">
          <p>
            {" "}
            <AccessTimeIcon /> На выбор исполнителя <br /> осталось{" "}
            {calculateTimeLeft(order.deadline)}
          </p>
        </div>
      </div>
      <div className="order-dedatils__button-box">
        <button className="order-details__button" onClick={handleOpen}>
          Привлечь исполнителей
        </button>
        <button className="order-details__button">Редактировать заказ</button>
        <button className="order-details__button">Отменить заказ</button>
      </div>
      <div className="order-details__step-block">
        <div className="order-details__step-block__button">
          <button
            className={`order-details__step-block__button-btn ${
              step === 1 ? "active" : ""
            }`}
            onClick={() => setStep(1)}
          >
            Задания
          </button>
          <button
            className={`order-details__step-block__button-btn ${
              step === 2 ? "active" : ""
            }`}
            onClick={() => setStep(2)}
          >
            Выбрать эксперта
          </button>
        </div>
        {step === 1 && (
          <div className="order-details__info">
            <div className="order-details__info-box">
              <p className="order-details__info-item__task">
                ID (номер) заказа:{" "}
                <span className="order-details__info-item__task-span">
                  {order.id}
                </span>
              </p>
              <p className="order-details__info-item__task">
                Заказ размещен:{" "}
                <span className="order-details__info-item__task-span">
                  {formatDate(order.created_at)}
                </span>
              </p>
              <p className="order-details__info-item__task">
                Срок выполнения:{" "}
                <span className="order-details__info-item__task-span">
                  {formatDate(order.deadline)}
                </span>
              </p>
              <p className="order-details__info-item__task">
                Антиплагиат:{" "}
                <span className="order-details__info-item__task-span">
                  {order.antiplagiarism}
                </span>
              </p>
            </div>
            <div className="order-details__info-box">
              <h4 className="order-details__info-item__task">Текст задания</h4>
              <p className="order-details__info-item__task-text">
                {order.description}
              </p>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="order-details__info">
            {" "}
            <div className="order-details__chat">
              <button className="order-details__button" onClick={connectToChat}>
                Подключиться к чату
              </button>
              {socket && (
                <div className="chat-container">
                  <WebSocketChat token={token}/>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="order-details__file">
        <button className="order-details__file-btn">Добавить файлы</button>
      </div>
      <div className="order-details__expert">
        <h5 className="order-details__expert-title">
          Если ставки не подошли, предложите заказ другим исполнителям
        </h5>
        <h6 className="order-details__expert-description">
          Эти исполнители уже успешно выполняли задания по вашему предмету и
          типу работ
        </h6>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <button onClick={handleClose} className="modal-executor__close">
            <CloseIcon />
          </button>
          <h6 className="modal-executor__title">
            Как привлечь больше исполнителей?
          </h6>
          <div className="modal-executor__content">
            <h6 className="modal-executor__content-title">
              Продвинь свой заказ в ТОП
            </h6>
            <ul className="modal-executor__list">
              <li className="modal-executor__item">
                заказ будет выделен цветом в общем списке;
              </li>
              <li className="modal-executor__item">
                заказ будет отмечен для исполнителей как «Рекомендуемый»;
              </li>
              <li className="modal-executor__item">
                заказ будет чаще попадать на верхние строчки в поиске и
                рекомендациях;
              </li>
              <li className="modal-executor__item">
                заказ разошлем исполнителям по вашему предмету.
              </li>
            </ul>
            <input
              type="text"
              className="modal-executor__promo-code"
              placeholder="Промо-код"
            />
            <div className="modal-executor__options">
              <div className="modal-executor__option">
                <p className="modal-executor__option-time">
                  <span className="modal-executor__option-time__check">
                    <VerifiedIcon />
                  </span>{" "}
                  24ч.
                </p>
                <div className="modal-executor__option-header">
                  <p className="modal-executor__option-price">390 руб</p>
                  <button className="modal-executor__option-button">
                    ВЫБРАТЬ
                  </button>
                </div>
              </div>
              <div className="modal-executor__option">
                <img src={Hit} alt="" className="modal-executor__option-hit" />
                <p className="modal-executor__option-time">
                  <span className="modal-executor__option-time__check">
                    <VerifiedIcon />
                  </span>{" "}
                  48ч.
                </p>
                <div className="modal-executor__option-header">
                  <p className="modal-executor__option-discount">-25%</p>
                  <p className="modal-executor__option-price-prev">780 руб</p>
                  <p className="modal-executor__option-price">590 руб</p>
                  <button className="modal-executor__option-button">
                    ВЫБРАТЬ
                  </button>
                </div>
              </div>
              <div className="modal-executor__option">
                <p className="modal-executor__option-time">
                  <span className="modal-executor__option-time__check">
                    <VerifiedIcon />
                  </span>{" "}
                  72ч.
                </p>
                <div className="modal-executor__option-header">
                  <p className="modal-executor__option-discount">-15%</p>
                  <p className="modal-executor__option-price-prev">1170 руб</p>
                  <p className="modal-executor__option-price">990 руб</p>
                  <button className="modal-executor__option-button">
                    ВЫБРАТЬ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default MyOrderDetails;
