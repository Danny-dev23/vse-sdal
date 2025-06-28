import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import "./payment.css";

const Payment = () => {
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all"); // Фильтр для операций
  const [paymentMethods, setPaymentMethods] = useState([]); // Состояние для методов оплаты
  const [selectedMethod, setSelectedMethod] = useState("МИР, Visa, MasterCard"); // Выбранный метод оплаты
  const [amounCommission, setAmountCommissio] = useState(""); // Состояние для комиссии
  const [total, setTotal] = useState(""); // Состояние для общей суммы

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await fetch(
          "http://147.45.146.242/api/payments-method/"
        );
        const data = await response.json();
        setPaymentMethods(data); // Сохраняем методы оплаты в состояние
        console.log(data);
        
      } catch (error) {
        console.error("Ошибка при загрузке методов оплаты:", error);
      }
    };

    fetchPaymentMethods();
  }, []);

  const statusTranslations = {
    completed: "Успешно",
    pending: "В обработке",
    rejected: "Отклонен",
  };

  useEffect(() => {
    const amountNumber = parseFloat(amount) || 0;
  
    const selectedPaymentMethod = paymentMethods.find(
      (method) => method.name === selectedMethod
    );
  
    const commissionRate = selectedPaymentMethod
      ? parseFloat(selectedPaymentMethod.percent) / 100
      : 0;
  
    const commission = amountNumber * commissionRate;
    setAmountCommissio(commission.toFixed(2));
  
    const total = (amountNumber + commission).toFixed(2);
    setTotal(total); // если нужно
  }, [amount, selectedMethod]);

  const calculateTotal = () => {
    const amountNumber = parseFloat(amount) || 0;
    const commission = amountNumber * (
      parseFloat(
        paymentMethods.find((method) => method.name === selectedMethod)?.percent
      ) || 0
    ) / 100;
  
    return (amountNumber + commission).toFixed(2);
  };

  // const calculateTotal = () => {
  //   const amountNumber = parseFloat(amount) || 0;
  
  //   // Найти выбранный метод оплаты
  //   const selectedPaymentMethod = paymentMethods.find(
  //     (method) => method.name === selectedMethod
  //   );
  
  //   // Получить процент комиссии из выбранного метода
  //   const commissionRate = selectedPaymentMethod
  //     ? parseFloat(selectedPaymentMethod.percent) / 100 // Преобразовать процент в дробное число
  //     : 0;
  
  //   const commission = amountNumber * commissionRate;
  //     // Сохраняем комиссию в состояние
  //     setAmountCommissio(commission);
  //   return (amountNumber + commission).toFixed(2);
  // };

  console.log(amounCommission);
  
  useEffect(() => {
    const fetchTransactions = async () => {
      const access_token = sessionStorage.getItem("access_token");
      if (!access_token) {
        alert("Access token not found in session storage");
        return;
      }

      try {
        const response = await fetch("http://147.45.146.242/api/transactions", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        const data = await response.json();
        setTransactions(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const handleDeposit = async () => {
    const user_id = sessionStorage.getItem("user_id");
    if (!user_id) {
      alert("User ID not found in session storage");
      return;
    }

    const requestBody = {
      user_id,
      amount,
      payment_method: selectedMethod,
      percent: amounCommission,
    };


    console.log("Request body:", requestBody);

    try {
      await fetch("http://147.45.146.242/api/deposit/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      alert("Deposit successful!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const filteredTransactions = transactions.filter((transaction) => {
    if (filter === "all") return true;
    return transaction.type === filter;
  });

  console.log(transactions);

  return (
    <div className="payment">
      <h2 className="payment-title">Пополнить баланс</h2>
      <div className="payment-box">
        <TextField
          label="Введите сумму"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Введите сумму"
          className="paymnet-box__input"
        />
        <div className="payment-type">
          <h3 className="payment-type__title">ВЫБЕРИТЕ СПОСОБ ПОПОЛНЕНИЯ</h3>
          <RadioGroup
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
            className="payment-type__box"
          >
            {paymentMethods.map((method) => (
              <FormControlLabel
                key={method.id}
                value={method.name}
                control={
                  <Radio
                    sx={{
                      color: "#999999", // цвет не выбранного радио
                      "&.Mui-checked": {
                        color: "#55C112", // цвет выбранного радио
                      },
                      transform: "scale(1.3)", // увеличить размер
                    }}
                  />
                }
                label={
                  <div className="payment-radion__box">
                    <span className="payment-radio__label-title">
                      {method.title}
                    </span>
                    <br />
                    <span className="payment-radio__label-description">
                      {method.name},{" "}
                      <span className="payment-radio__label-description__span">
                        комиссия {method.percent}%
                      </span>
                    </span>
                  </div>
                }
              />
            ))}
          </RadioGroup>
        </div>
        <div className="payment-amount">
          <p className="payment-amount__text">
            К оплате: {calculateTotal()} руб.
          </p>
          <button className="payment-amount__button" onClick={handleDeposit}>
            Пополнить счет
          </button>
        </div>
        <div className="payment-promo">
          Если у вас есть промокод, введите его при оплате <br /> определённого
          заказа через кнопку  «Выбрать исполнителя».
        </div>
      </div>
      <div className="payment-filter">
        <h3 className="payment-filter__title">История операций</h3>
        <div>
          <FormControl fullWidth>
            <Select
              labelId="filter-label"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              displayEmpty
              sx={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                fontSize: "14px",
                color: "#333",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ccc",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#55C112",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#55C112",
                },
                "& .MuiSelect-icon": {
                  color: "#999999",
                },
              }}
            >
              <MenuItem value="all">Все операции</MenuItem>
              <MenuItem value="deposit">Поступления</MenuItem>
              <MenuItem value="withdrawal">Списания</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <ul>
        {filteredTransactions.map((transaction) => (
          <li key={transaction.id} className="transaction-item">
            <div className="transaction-details">
              <span className="">
                <span className="transaction-type">
                  {transaction.type === "deposit" ? "Поступление" : "Списание"}
                </span>
                <span className="transaction-amount">
                  {transaction.amount} руб.
                </span>
              </span>
              <span className="">
                <span className="transaction-type">Комиссия</span>
                <span className="transaction-amount">
                  {transaction.percent} руб.
                </span>
              </span>
              <span className="">
                <span className="transaction-type">
                  {transaction.type === "deposit"
                    ? "К поступлению"
                    : "К списанию"}
                </span>
                <span className="transaction-amount">
                {transaction.amount - transaction.percent} руб.
                </span>
              </span>
              <span className="transaction-date">{transaction.payment_method}</span>
              <span className="transaction-date">
                {new Date(transaction.created_at).toLocaleDateString("ru-RU")}
              </span>
              <span
                className={`transaction-status status-${transaction.status}`}
              >
                {statusTranslations[transaction.status] || transaction.status}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Payment;
