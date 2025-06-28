import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assents/images/Link.png";
import Geo from "../../assents/images/geo-mark.svg.png";
import "./header.css";
import "../../assents/styles/variables.css";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { login } from "../../services/authService";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { refreshToken } from "../../services/tokenService";
import { useTabs } from "../../utils/TabsContext";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "", server: "" });
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Данные пользователя
  const [anchorEl, setAnchorEl] = useState(null);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({
    id: "",
    username: "",
    email: "",
    city: "",
    date_of_birth: "",
    active_balance: "0.00",
    frozen_balance: "0.00",
    currency: "Ruble",
    educational_institution: "",
    faculty: "",
    specialization: "",
  });
  const { setSelectedTab } = useTabs();
  const navigate = useNavigate();

  const token = sessionStorage.getItem("access_token");

  const fetchWithToken = async (url, options = {}) => {
    let token = sessionStorage.getItem("access_token");
    if (!token) {
      throw new Error("Access token not found");
    }
  
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  
    let response = await fetch(url, options);
  
    if (response.status === 401) {
      try {
        // Token might be expired, try to refresh it
        token = await refreshToken();
        options.headers.Authorization = `Bearer ${token}`;
        response = await fetch(url, options);
      } catch (error) {
        // If refresh token is also invalid, redirect to login
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("refresh_token");
        sessionStorage.removeItem("user");
        window.location.href = "/login";
        throw new Error("Failed to refresh token");
      }
    }
  
    return response;
  };
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetchWithToken("http://147.45.146.242/api/users");
        const data = await response.json();
        setUserData(data[0]);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };
  
    fetchUserData();
  }, []);
  
  if (token) {
    fetchWithToken("http://147.45.146.242/api/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data[0]);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
      });
  } else {
    console.error("Токен не найден в sessionStorage");
  }

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    const accessToken = sessionStorage.getItem("access_token");

    if (user && accessToken) {
      // Если данные есть в sessionStorage, восстанавливаем состояние
      setUser(JSON.parse(user));
      setIsLoggedIn(true);
    }
  }, []);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    handleMenuClose();
  };

  const validate = () => {
    let valid = true;
    let errorMessages = { email: "", password: "", server: "" };
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email || !emailRegex.test(email)) {
      errorMessages.email = "Пожалуйста, введите правильный email";
      valid = false;
    }

    if (!password) {
      errorMessages.password = "Пароль обязателен";
      valid = false;
    }

    setErrors(errorMessages);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
  
    setLoading(true);
    setErrors({ email: "", password: "", server: "" });
  
    try {
      const response = await fetch("http://147.45.146.242/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Ошибка входа");
  
      const { access_token, refresh_token } = data;
  
      // Сохраняем токены
      sessionStorage.setItem("access_token", access_token);
      sessionStorage.setItem("refresh_token", refresh_token);
  
      // Получаем данные пользователя
      const userResponse = await fetchWithToken("http://147.45.146.242/api/users");
      const userData = await userResponse.json();
  
      // Сохраняем данные пользователя
      const user = userData[0];
      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("user_id", user.id);
      sessionStorage.setItem("role", user.role); 
      setUser(user);
  
      console.log("Сохраненные данные пользователя:", sessionStorage.getItem("user"));
      console.log("Сохраненный ID пользователя:", sessionStorage.getItem("user_id"));
  
      setIsLoggedIn(true);
      setIsModalOpen(false);
    } catch (error) {
      setErrors((prev) => ({ ...prev, server: error.message }));
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <div className="custom-container">
      <header className="header">
        <div className="header-logo">
          <Link to="/" className="header-logo__link">
            <img src={Logo} alt="" />
          </Link>
          <span className="header-logo__text">
            Онлайн-сервис <br /> помощи студентам
          </span>
        </div>
        <nav className="header-navigation">
          <ul className="header-navigation__list">
            <li className="header-navgitation__list-item">
              <Link className="header-navigation__list-item__link" to="/">
                топ экспертов
              </Link>
            </li>
            <li className="header-navgitation__list-item">
              <Link className="header-navigation__list-item__link" to="/">
                о проекте
              </Link>
            </li>
            <li className="header-navgitation__list-item">
              <Link className="header-navigation__list-item__link" to="/">
                услуги
              </Link>
            </li>
            <li className="header-navgitation__list-item">
              <Link className="header-navigation__list-item__link" to="/">
                партнеры
              </Link>
            </li>
            <li className="header-navgitation__list-item">
              <Link className="header-navigation__list-item__link" to="/">
                контакты
              </Link>
            </li>
          </ul>
        </nav>
        <div className="header-geo">
          <img src={Geo} alt="" className="header-logo__image" />
          <span className="header-geo__text">Москва</span>
        </div>
        <div className="header-block__btn">
          <div>
            {!isLoggedIn ? (
              <Button
                className="header-block__btn-button"
                onClick={toggleModal}
              >
                Войти
              </Button>
            ) : (
              <div className="">
                <div className="header-user">
                  <div>
                    <IconButton onClick={handleMenuClick}>
                      <Avatar
                        sx={{
                          bgcolor: "#0d5e1b",
                          width: 60,
                          height: 60,
                          fontSize: "30px",
                        }}
                      >
                        {user.email ? user.email[0].toUpperCase() : "?"}
                      </Avatar>
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={handleMenuClose}>
                        <Link to={`/${userData.role === "expert" ? "expert" : "customer"}/${userData.id || "unknown"}`} onClick={() => setSelectedTab(0)}>
                          Личный кабинет
                        </Link>
                        <br/>
                        <Link to={`/${userData.role === "expert" ? "expert" : "customer"}/${userData.id || "unknown"}`} onClick={() => setSelectedTab(17)}>
                          Настройка аккаунта
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>Выход</MenuItem>
                    </Menu>
                  </div>
                  <div className="header-user__info">
                    <p className="header-user__name">{userData.username}</p>
                    <p className="header-user__balance-active">
                      {parseFloat(userData.active_balance)} руб
                      <span className="header-user__balance-frozen">
                        <AcUnitIcon fontSize="150" />{" "}
                        {parseFloat(userData.frozen_balance)} руб
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <Modal open={isModalOpen} onClose={toggleModal}>
        <Box
          sx={{
            top: "50%",
            textAlign: "center",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            position: "relative",
          }}
        >
          <IconButton
            onClick={toggleModal}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" component="h2" gutterBottom>
            Вход
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Электронная почта"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              variant="outlined"
              error={Boolean(errors.password)}
              helperText={errors.password}
            />
            {errors.server && <p style={{ color: "red" }}>{errors.server}</p>}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? "Загрузка..." : "Войти"}
            </Button>
            <Link to="#">Забыли пароль?</Link>

            <p>Или войти с помощью</p>
            {/* <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginFailure}
              />
            </GoogleOAuthProvider> */}
            <p className="modal-text__register">
              Нет аккаунта? <Link to="/register">Регистрация</Link>
            </p>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Header;
