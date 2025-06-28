import React, { useState, useEffect } from "react";
import "./order.css";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import OrderForm from "./OrderForm/OrderForm";



const Order = () => {
  const [step, setStep] = useState(1); // Управление шагами
  const [workTypes, setWorkTypes] = useState([]); // Храним список типов работ
  const [selectedWorkType, setSelectedWorkType] = useState(null); // Выбранный тип работы

  // Данные формы

  const [searchQuery, setSearchQuery] = useState(""); // Строка поиска
  const [filteredWorkTypes, setFilteredWorkTypes] = useState([]);
  

  const handleTabClick = (tab) => {
    if (tab === 2 && !selectedWorkType) {
      // Если тип работы не выбран, не переходим ко второму табу
      alert("Пожалуйста, выберите тип работы.");
      return;
    }
    setStep(tab);
  };
  console.log(selectedWorkType);
  
  // Загружаем список типов работ
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

  // Обработчик отправки формы заказа
 

  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setFilteredWorkTypes([]); // Пока введено меньше 3 символов, скрываем список
    } else {
      setFilteredWorkTypes(
        workTypes.filter((type) =>
          type.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, workTypes]);

  return (
    <div className="order-container">
      <div className="order">
        <div className="tabs">
          <div className="order-text">
            <div className="order-text__box">
              <h2 className="order-text__box-title">Новый заказ</h2>
            </div>
          </div>
          <div className="order-block__btn">
            <button
              onClick={() => handleTabClick(1)}
              className={`tab-btn ${step === 1 ? "active" : ""}`}
            >
              Тип работы
            </button>
            <button
              onClick={() => handleTabClick(2)}
              className={`tab-btn ${step === 2 ? "active" : ""}`}
              disabled={!selectedWorkType}
            >
              Задание
            </button>
          </div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
        </div>
        <hr className="order-line" />
        {step === 1 && (
          <div className="">
            <h3 className="order-search__title">Выберите тип работы:</h3>
            <div className="order-search">
              <TextField
                variant="outlined"
                placeholder="ВВЕДИТЕ ТЕКСТ ДЛЯ ПОИСКА"
                value={searchQuery}
                className="order-search__input"
                onChange={(e) => setSearchQuery(e.target.value)}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon className="order-search__svg" />
                    </InputAdornment>
                  ),
                }}
              />

              <ul className="order-search__list">
                {filteredWorkTypes.map((type) => (
                  <li
                    className="order-search__list-item"
                    key={type.id}
                    onClick={() => {
                      setSelectedWorkType(type.name);
                      setStep(2);
                    }}
                  >
                    {type.name}
                  </li>
                ))}
              </ul>
            </div>
            {workTypes.length > 0 ? (
              <ul className="order-type__work">
                {workTypes.map((type) => (
                  <li key={type.name}>
                    <button
                      onClick={() => {
                        setSelectedWorkType(type.name);
                        setStep(2);
                      }}
                      className="order-type__work-btn"
                    >
                      {type.name}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Загрузка типов работ...</p>
            )}
          </div>
        )}

        {step === 2 && (
          <div>
            <OrderForm selectedWorkType={selectedWorkType} handleTabClick={handleTabClick}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;


