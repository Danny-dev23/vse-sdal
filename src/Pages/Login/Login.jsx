import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "", server: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

      console.log("Успешный вход:", data);
      navigate("/"); // Перенаправление на главную страницу после входа
    } catch (error) {
      setErrors((prev) => ({ ...prev, server: error.message }));
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = (response) => {
    console.log("Google login success:", response);
    // Отправьте token на сервер для аутентификации
  };

  const handleLoginFailure = (error) => {
    console.log("Google login error:", error);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>

        <div>
          <label>Пароль</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </div>

        {errors.server && <p style={{ color: "red" }}>{errors.server}</p>}

        <button type="submit" disabled={loading}>{loading ? "Загрузка..." : "Вход"}</button>
        <Link to="">Забыли пароль?</Link>

        <p>Или войти с помощью</p>
        <div className="">
          <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
            <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginFailure} />
          </GoogleOAuthProvider>
        </div>
      </form>
    </div>
  );
};

export default Login;