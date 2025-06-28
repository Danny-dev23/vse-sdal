import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import AlertsExpert from "./AlertsExpert/AlertsExpert";
import StatiscsExpert from "./StatisticsExpert/StatiscsExpert";
import StatusExpert from "./StatusExpert/StatusExpert";
import SessionExpert from "./SessionExpert/SessionExpert";
import AchievementsExpert from "./AchievementsExpert/AchievementsExpert";
import "./cabinetExpert.css";
import InfoExpert from "./InfoExpert/InfoExpert";

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

const CabinetExpert = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="info-expert">
      <h2 className="info-expert__title">Настройки профиля</h2>
      <Box sx={{ width: "100%" }}>
        <div className="info-expert__tabs">
          <Box>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                className={`info-expert__tabs-tab ${value === 0 ? "tab-active" : ""}`}
                label="Личные данные"
                {...a11yProps(0)}
              />
              <Tab
                className={`info-expert__tabs-tab ${value === 1 ? "tab-active" : ""}`}
                label="Оповещения"
                {...a11yProps(1)}
              />
              <Tab
                className={`info-expert__tabs-tab ${value === 2 ? "tab-active" : ""}`}
                label="Моя статистика"
                {...a11yProps(2)}
              />
              <Tab
                className={`info-expert__tabs-tab ${value === 3 ? "tab-active" : ""}`}
                label="Мой статус"
                {...a11yProps(3)}
              />
              <Tab
                className={`info-expert__tabs-tab ${value === 4 ? "tab-active" : ""}`}
                label="Сеансы"
                {...a11yProps(4)}
              />
              <Tab
                className={`info-expert__tabs-tab ${value === 5 ? "tab-active" : ""}`}
                label="Достижения"
                {...a11yProps(5)}
              />
            </Tabs>
          </Box>
        </div>
        <CustomTabPanel value={value} index={0}>
          <InfoExpert />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <AlertsExpert />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <StatiscsExpert />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <StatusExpert />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <SessionExpert />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
          <AchievementsExpert />
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default CabinetExpert;
