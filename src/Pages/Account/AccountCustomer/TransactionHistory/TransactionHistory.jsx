import React, { useEffect, useState } from "react";
import axios from "axios";
import { FormControl, MenuItem, Select } from "@mui/material";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all");
  const statusTranslations = {
    completed: "Успешно",
    pending: "В обработке",
    rejected: "Отклонен",
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = sessionStorage.getItem("access_token");
      try {
        const response = await axios.get(
          "http://147.45.146.242/api/transactions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter((transaction) => {
    if (filter === "all") return true;
    return transaction.type === filter;
  });

  return (
    <div className="payment">
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
                  {transaction.net_amount} 200 руб.
                </span>
              </span>
              <span className="transaction-date">ЮMoney</span>
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

export default TransactionHistory;
