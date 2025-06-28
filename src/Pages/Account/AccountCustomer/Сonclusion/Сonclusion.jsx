import React, { useState, useEffect } from "react";
import { RadioGroup, FormControlLabel, Radio, TextField, Button, Checkbox, Select, MenuItem } from "@mui/material";

const Conclusion = () => {
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0); // Доступный баланс
  const [selectedMethod, setSelectedMethod] = useState("Карта МИР, Visa, MasterCard"); // Выбранный способ вывода
  const [commission, setCommission] = useState(0); // Комиссия
  const [cardNumber, setCardNumber] = useState(""); // Номер карты
  const [phoneNumber, setPhoneNumber] = useState(""); // Номер телефона
  const [saveTemplate, setSaveTemplate] = useState(false); // Сохранить как шаблон
  const [banks, setBanks] = useState([]); // Список банков
  const [selectedBank, setSelectedBank] = useState(""); // Выбранный банк

  const withdrawalMethods = [
    {
      id: 1,
      name: "Карта МИР, Visa, MasterCard",
      minCommission: 28,
      additionalFee: 180,
      percent: 3,
    },
    {
      id: 2,
      name: "Система быстрых платежей (СБП)",
      minCommission: 10,
      additionalFee: 0,
      percent: 3,
    },
  ];

  useEffect(() => {
    const fetchBalance = async () => {
      const balanceResponse = await fetch(`http://147.45.146.242/api/users/`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      });
      const balanceData = await balanceResponse.json();
      setBalance(balanceData[0].active_balance);
    };

    const fetchBanks = async () => {
      try {
        const response = await fetch("http://147.45.146.242/api/TypeBank/");
        const data = await response.json();
        setBanks(data); // Сохраняем список банков
        console.log(data);
        
      } catch (error) {
        console.error("Ошибка при загрузке банков:", error);
      }
    };

    fetchBalance();
    fetchBanks();
  }, []);

  const calculateCommission = () => {
    const method = withdrawalMethods.find((m) => m.name === selectedMethod);
    if (!method) return 0;

    const amountNumber = parseFloat(amount) || 0;
    const percentFee = (amountNumber * method.percent) / 100;
    const totalCommission = Math.max(method.minCommission, percentFee) + method.additionalFee;

    return totalCommission.toFixed(2);
  };

  const handleWithdraw = async () => {
    if (!selectedMethod) {
      alert("Выберите способ вывода средств");
      return;
    }

    if (amount > balance) {
      alert("Недостаточно средств для вывода");
      return;
    }

    const userId = sessionStorage.getItem("user_id");
    const requestBody = {
      user_id: userId,
      amount,
      method: selectedMethod,
      card_number: selectedMethod === "Карта МИР, Visa, MasterCard" ? cardNumber : undefined,
      phone_number: selectedMethod === "Система быстрых платежей (СБП)" ? phoneNumber : undefined,
      bank: selectedMethod === "Система быстрых платежей (СБП)" ? selectedBank : undefined,
      save_template: saveTemplate,
    };

    const response = await fetch("http://147.45.146.242/api/withdraw/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      alert("Вывод средств успешно выполнен");
    } else {
      alert("Ошибка при выводе средств");
    }
  };

  return (
    <div className="conclusion">
      <h2 className="conclusion-title">Вывести деньги</h2>
      <div className="conclusion-balance">
        Доступно для вывода: <span className="balance-amount">{balance} руб.</span>
      </div>
      <div className="conclusion-methods">
        <h3 className="methods-title">ВЫБЕРИТЕ СПОСОБ ВЫВОДА ДЕНЕЖНЫХ СРЕДСТВ</h3>
        <RadioGroup
          value={selectedMethod}
          onChange={(e) => setSelectedMethod(e.target.value)}
          className="methods-group"
        >
          {withdrawalMethods.map((method) => (
            <FormControlLabel
              key={method.id}
              value={method.name}
              control={<Radio />}
              label={
                <div>
                  <span className="method-name">{method.name}</span>
                  <br />
                  <span className="method-details">
                    мин. комиссия {method.minCommission}р., карты не РФ {method.additionalFee}р., комиссия {method.percent}%
                  </span>
                </div>
              }
            />
          ))}
        </RadioGroup>
      </div>
      <div className="conclusion-amount">
        <TextField
          label="Введите сумму"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Введите сумму"
          fullWidth
        />
        {/* <p className="commission-info">Комиссия: {calculateCommission()} руб.</p> */}
      </div>
      {selectedMethod === "Карта МИР, Visa, MasterCard" && (
        <TextField
          label="Введите номер карты"
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="Например: 4200 5600 8400 9600"
          fullWidth
        />
      )}
      {selectedMethod === "Система быстрых платежей (СБП)" && (
        <>
          <TextField
            label="Введите номер телефона"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Например для РФ: +7XXXXXXXXXX"
            fullWidth
          />
          <Select
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
            displayEmpty
            fullWidth
            sx={{ marginTop: "16px" }}
          >
            <MenuItem value="" disabled>
              Поиск по названию банка
            </MenuItem>
            {banks.map((bank) => (
              <MenuItem key={bank.id} value={bank.name}>
                {bank.name}
              </MenuItem>
            ))}
          </Select>
        </>
      )}
      <div className="save-template">
        <Checkbox
          checked={saveTemplate}
          onChange={(e) => setSaveTemplate(e.target.checked)}
        />
        <span>Сохранить как шаблон</span>
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleWithdraw}
        className="withdraw-button"
      >
        Вывести деньги
      </Button>
    </div>
  );
};

export default Conclusion;