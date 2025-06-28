import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./accountExpert.css";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "../../../assents/styles/variables.css";
import OrdersExpert from "./OrdersExpert/OrdersExpert.jsx";
import FavoritesExpert from "./FavoritesExpert/FavoritesExpert.jsx";
import FireOrderExpert from "./FireOrderExpert/FireOrderExpert.jsx";
import { Button, Modal, Typography } from "@mui/material";
import NewOrderExpert from "./NewOrderExpert/NewOrderExpert.jsx";
import TemplatesExpert from "./TemplatesExpert/TemplatesExpert.jsx";
import { useTabs } from "../../../utils/TabsContext.jsx";
import InfoExpert from "./ProfileExpert/CabinetExpet.jsx";
import TransactionHistory from "../AccountCustomer/TransactionHistory/TransactionHistory.jsx";
import Payment from "../AccountCustomer/Payment/Payment.jsx";
import Conclusion from "../AccountCustomer/Сonclusion/Сonclusion.jsx";
import Notifications from "../AccountCustomer/Notifications/Notifications.jsx";

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
  selectedTab: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const AccountExpert = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedTab, setSelectedTab } = useTabs();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
    if (newValue === 8) {
      setIsModalOpen(true); // Открыть модальное окно при выборе вкладки с индексом 8
    }
  };

  const handleButtonModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleButtonNext = () => {
    setIsModalOpen(false);
    setSelectedTab(0);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Закрыть модальное окно
  };

  return (
    <div>
      <div className="account-custom__tabs">
        <div className="custom-container">
          <Box sx={{ width: "100%" }} className="account-custom__tabs-box">
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <p className="account-custom__tabs-title">Заказы</p>
              <Tabs
                value={selectedTab}
                onChange={handleChange}
                aria-label="basic tabs example"
                className="account-custom__tabs-tab"
              >
                <Tab
                  className="account-custom__tabs-tab__label"
                  label="Поиск новых заказов"
                  {...a11yProps(0)}
                />

                <Tab
                  className="account-custom__tabs-tab__label"
                  label="Избранные"
                  {...a11yProps(1)}
                />
                <Tab
                  className="account-custom__tabs-tab__label"
                  label="Предложенные цены"
                  {...a11yProps(2)}
                />
                <Tab
                  className="account-custom__tabs-tab__label"
                  label="Закрытые"
                  {...a11yProps(3)}
                />
                <Tab
                  className="account-custom__tabs-tab__label"
                  label="На выполнении"
                  {...a11yProps(4)}
                />
                <Tab
                  className="account-custom__tabs-tab__label"
                  label="Готовые"
                  {...a11yProps(5)}
                />
                <Tab
                  className="account-custom__tabs-tab__label"
                  label="Персональные заказы"
                  {...a11yProps(6)}
                />
                <Tab
                  className="account-custom__tabs-tab__label"
                  label="Горящие заказы 🔥"
                  {...a11yProps(7)}
                />
                <p
                  className="account-custom__tabs-tab__label"
                  onClick={handleButtonModalOpen}
                >
                  Заработать больше
                </p>
                <Tab
                  className="account-custom__tabs-tab__label"
                  label="Уведомления"
                  {...a11yProps(9)}
                />
                <Tab
                  className="account-custom__tabs-tab__label"
                  label="Шаблоны"
                  {...a11yProps(10)}
                />
                <Tab
                  className="account-custom__tabs-tab__label"
                  label="Новые заказы"
                  {...a11yProps(11)}
                />
                <Tab
                  className="account-custom__tabs-tab__label"
                  label="Мои заказчики"
                  {...a11yProps(12)}
                />
                <p className="account-custom__tabs-title">Личный Счет</p>
                <Tab
                  className="account-custom__tabs-tab__label"
                  label="Вывести деньги"
                  {...a11yProps(14)}
                />
                <Tab
                  className="account-custom__tabs-tab__label"
                  label="Пополнить баланс"
                  {...a11yProps(15)}
                />
                <Tab
                  className="account-custom__tabs-tab__label"
                  label="История операций"
                  {...a11yProps(16)}
                />
              </Tabs>
            </Box>
            <CustomTabPanel
              value={selectedTab}
              index={0}
              className="account-custom__tabs-panel"
            >
              <OrdersExpert />
            </CustomTabPanel>

            <CustomTabPanel
              value={selectedTab}
              index={1}
              className="account-custom__tabs-panel"
            >
              <FavoritesExpert />
            </CustomTabPanel>

            <CustomTabPanel
              value={selectedTab}
              index={2}
              className="account-custom__tabs-panel"
            >
              3
            </CustomTabPanel>

            <CustomTabPanel
              value={selectedTab}
              index={3}
              className="account-custom__tabs-panel"
            >
              4
            </CustomTabPanel>

            <CustomTabPanel
              value={selectedTab}
              index={4}
              className="account-custom__tabs-panel"
            >
              5
            </CustomTabPanel>

            <CustomTabPanel
              value={selectedTab}
              index={5}
              className="account-custom__tabs-panel"
            >
              6
            </CustomTabPanel>
            <CustomTabPanel
              value={selectedTab}
              index={6}
              className="account-custom__tabs-panel"
            >
              7
            </CustomTabPanel>
            <CustomTabPanel
              value={selectedTab}
              index={7}
              className="account-custom__tabs-panel"
            >
              <FireOrderExpert />
            </CustomTabPanel>
            <CustomTabPanel
              value={selectedTab}
              index={8}
              className="account-custom__tabs-panel"
            >
              9
            </CustomTabPanel>
            <CustomTabPanel
              value={selectedTab}
              index={9}
              className="account-custom__tabs-panel"
            >
              <Notifications/>
            </CustomTabPanel>
            <CustomTabPanel
              value={selectedTab}
              index={10}
              className="account-custom__tabs-panel"
            >
              <TemplatesExpert />
            </CustomTabPanel>
            <CustomTabPanel
              value={selectedTab}
              index={11}
              className="account-custom__tabs-panel"
            >
              <NewOrderExpert />
            </CustomTabPanel>
            <CustomTabPanel
              value={selectedTab}
              index={12}
              className="account-custom__tabs-panel"
            >
              13
            </CustomTabPanel>
            <CustomTabPanel
              value={selectedTab}
              index={14}
              className="account-custom__tabs-panel"
            >
              <Conclusion/>
            </CustomTabPanel>
            <CustomTabPanel
              value={selectedTab}
              index={15}
              className="account-custom__tabs-panel"
            >
              <Payment/>
            </CustomTabPanel>
            <CustomTabPanel
              value={selectedTab}
              index={16}
              className="account-custom__tabs-panel"
            >
              <TransactionHistory/>
            </CustomTabPanel>
            <CustomTabPanel
              value={selectedTab}
              index={17}
              className="account-custom__tabs-panel"
            >
              <InfoExpert/>
            </CustomTabPanel>
          </Box>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: 800,
            width: "100%",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          <div className="expert-account__modal">
            <Typography
              id="modal-title"
              variant="h6"
              component="h2"
              sx={{ mb: 2, fontWeight: "bold" }}
            >
              Онлайн-репетиторство
            </Typography>
            <p
              className="expert-account__modal-close"
              onClick={handleCloseModal}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              x
            </p>
          </div>
          <hr />
          <Typography id="modal-description" sx={{ mt: 2, mb: 2 }}>
            <ul style={{ paddingLeft: "20px" }}>
              <li>
                Чаще всего ученики просят объяснить решение задачи,
                подготовиться к экзамену, объяснить тему и многое другое
              </li>
              <li>Задание предполагает один видеозвонок</li>
              <li>
                Сервис предоставляет удобную площадку для онлайн видео-занятия и
                записи встречи
              </li>
            </ul>
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#fbc02d",
                  mr: 2,
                }}
              >
                1
              </Typography>
              <Typography>
                Откликайтесь на задание онлайн-репетиторства
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#fbc02d",
                  mr: 2,
                }}
              >
                2
              </Typography>
              <Typography>
                Договаривайтесь с учеником о дате и времени видео-занятия
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#fbc02d",
                  mr: 2,
                }}
              >
                3
              </Typography>
              <Typography>
                Проводите занятие (ссылку на звонок мы пришлем заранее)
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#fbc02d",
                  mr: 2,
                }}
              >
                4
              </Typography>
              <Typography>
                После подтверждения учеником, получайте деньги на счет в сервисе
              </Typography>
            </Box>
          </Box>
          <Button
            onClick={handleButtonNext}
            variant="contained"
            color="primary"
            sx={{ mt: 4 }}
          >
            Продолжить
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AccountExpert;
