import React, { useState } from "react";
import { useParams } from "react-router-dom";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "./accountcustomer.css";
import "../../../assents/styles/variables.css";
import Order from "./Order/Order";
import MyOrder from "./MyOrder/MyOrder";
import Payment from "./Payment/Payment";
import Conclusion from "./Сonclusion/Сonclusion";
import TransactionHistory from "./TransactionHistory/TransactionHistory";
import Notifications from "./Notifications/Notifications";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const AccountCustomer = () => {
  // const [id, setId] = useState(6);
  const { id } = useParams();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div className="account-custom__tabs">
        <div className="custom-container">
          <Box sx={{ width: "100%" }} className="account-custom__tabs-box">
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                className="account-custom__tabs-tab"
              >
                <Tab
                  className={`account-custom__new-order ${value === 0 ? "account-custom__new-order.active" : ""}`}
                  label="Новый заказ"
                  {...a11yProps(0)}
                />
                <Tab
                  className={`account-custom__tabs-tab__label ${value === 1 ? "account-custom__new-order.active" : ""}`}
                  label="Мои заказы"
                  {...a11yProps(1)}
                />
                <p className="account-custom__tabs-title">Личный кабинет</p>
                <Tab
                  className={`account-custom__tabs-tab__label ${value === 3 ? "account-custom__new-order.active" : ""}`}
                  label="Пополнить баланс"
                  {...a11yProps(3)}
                />
                <Tab
                  className={`account-custom__tabs-tab__label ${value === 4 ? "account-custom__new-order.active" : ""}`}
                  label="Вывести деньги"
                  {...a11yProps(4)}
                />
                <Tab
                  className={`account-custom__tabs-tab__label ${value === 5 ? "account-custom__new-order.active" : ""}`}
                  label="История операций"
                  {...a11yProps(5)}
                />
                <Tab
                  className={`account-custom__tabs-tab__label ${value === 6 ? "account-custom__new-order.active" : ""}`}
                  label="Уведомления"
                  {...a11yProps(6)}
                />
                <Tab
                  className={`account-custom__tabs-tab__label ${value === 7 ? "account-custom__new-order.active" : ""}`}
                  label="Как заработать"
                  {...a11yProps(7)}
                />
                <Tab
                  className={`account-custom__tabs-tab__label ${value === 8 ? "account-custom__new-order.active" : ""}`}
                  label="Мои исполнители"
                  {...a11yProps(8)}
                />
              </Tabs>
            </Box>
            <CustomTabPanel
              value={value}
              index={0}
              className="account-custom__tabs-panel"
            >
              <Order />
            </CustomTabPanel>
            <CustomTabPanel
              value={value}
              index={1}
              className="account-custom__tabs-panel"
            >
              <MyOrder />
            </CustomTabPanel>

            <CustomTabPanel
              value={value}
              index={3}
              className="account-custom__tabs-panel"
            >
              <Payment />
            </CustomTabPanel>

            <CustomTabPanel
              value={value}
              index={4}
              className="account-custom__tabs-panel"
            >
              <Conclusion />
            </CustomTabPanel>

            <CustomTabPanel
              value={value}
              index={5}
              className="account-custom__tabs-panel"
            >
              <TransactionHistory />
            </CustomTabPanel>

            <CustomTabPanel
              value={value}
              index={6}
              className="account-custom__tabs-panel"
            >
              <Notifications/>
            </CustomTabPanel>
            <CustomTabPanel
              value={value}
              index={7}
              className="account-custom__tabs-panel"
            >
              7
            </CustomTabPanel>
            <CustomTabPanel
              value={value}
              index={8}
              className="account-custom__tabs-panel"
            >
              8
            </CustomTabPanel>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default AccountCustomer;
