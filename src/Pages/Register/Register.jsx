import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
import "../../assents/styles/variables.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  NativeSelect,
  TextField,
  Typography,
} from "@mui/material";

const Register = () => {
  const [step, setStep] = useState(1); // Шаги: 1 - регистрация, 2 - код, 3 - пароль
  const [role, setRole] = useState("Заказчик");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [check, setCheck] = useState("");
  const [code, setCode] = useState(""); // Код подтверждения
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  // Валидация данных
  const validate = () => {
    let valid = true;
    let errorMessages = {};

    if (step === 1) {
      if (!username) {
        errorMessages.username = "Имя обязательно";
        valid = false;
      }
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!email || !emailRegex.test(email)) {
        errorMessages.email = "Пожалуйста, введите правильный email";
        valid = false;
      }
      if (!check) {
        errorMessages.check = "Пожалуйста дайте согласие";
        valid = false;
      }
    }

    if (step === 2 && !code) {
      errorMessages.code = "Введите код подтверждения";
      valid = false;
    }

    if (step === 3) {
      if (!password || password.length < 6) {
        errorMessages.password = "Пароль должен быть не менее 6 символов";
        valid = false;
      }
      if (password !== confirmPassword) {
        errorMessages.confirmPassword = "Пароли не совпадают";
        valid = false;
      }
    }

    setErrors(errorMessages);
    return valid;
  };

  // Регистрация (шаг 1)
  const handleRegister = async (e) => {
    e.preventDefault();
        if (!validate()) return;
    
        setLoading(true);
        setErrors({ role: "", username: "", email: "", server: "" });
    
        // Логируем данные, которые отправляются
        const requestData = { role, username, email };
        console.log("Данные, которые отправляются:", requestData);
    
        try {
          const response = await fetch("http://147.45.146.242/api/register/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData), // Отправляем данные
          });
    
          const data = await response.json();
    
          if (!response.ok) {
            throw new Error(data.message || "Ошибка при регистрации");
          }
          setStep(2);
          console.log("Успешная регистрация:", data);
          
        } catch (error) {
          setErrors((prev) => ({ ...prev, server: error.message }));
        } finally {
          setLoading(false);
        }
  };



  // Подтверждение Email (шаг 2)
  const handleConfirmCode = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    const requestData = {
      email, // Предполагается, что email определён в состоянии
      code,
    };

    console.log(JSON.stringify(requestData, null, 2)); // Логируем отправляемый JSON

    try {
      const response = await fetch("http://147.45.146.242/api/activate/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      console.log(JSON.stringify({ status: response.status }, null, 2)); // Логируем статус ответа

      const data = await response.json();
      console.log(JSON.stringify(data, null, 2)); // Логируем ответ сервера

      if (!response.ok) throw new Error(data.message || "Ошибка подтверждения");

      if (role === "expert") {
        setIsModalOpen(true); // Открываем модальное окно
    } else {
        setStep(3); // Для других ролей просто переходим к паролю
    } // Переход на установку пароля
    } catch (error) {
      console.error(JSON.stringify({ error: error.message }, null, 2)); // Логируем ошибку
      setErrors({ server: error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (step === 3 && role === "expert") {
      navigate("/expert-registration"); // Переход на страницу эксперта
    }
  }, [step, role, navigate]);

  // Установка пароля (шаг 3)
  const handleSetPassword = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch("http://147.45.146.242/api/make-password/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          raw_password: password,
          confirm_password: password,
        }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Ошибка установки пароля");

      console.log("Пароль установлен:", data);
      navigate("/"); // Перенаправление на логин
    } catch (error) {
      setErrors({ server: error.message });
    } finally {
      setLoading(false);
    }
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
};

  return (
    <div className="form">
      <Container maxWidth="md">
        {step === 1 && (
          <div className="form-reg">
            <h2 className="form-register__title">Регистрация</h2>
            <hr className="form-register__title-line" />
            <div className="form-size">
              <form onSubmit={handleRegister} className="form-register">
                <div>
                  <FormControl fullWidth className="form-register__select">
                    <InputLabel
                      variant="standard"
                      htmlFor="uncontrolled-native"
                      className="form-register__select-label"
                    >
                      Я
                    </InputLabel>
                    <NativeSelect
                      defaultValue={30}
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="form-register__select-options"
                      inputProps={{
                        name: "Я",
                        id: "uncontrolled-native",
                      }}
                    >
                      <option
                        className="form-register__select-options__option"
                        value="customer"
                      >
                        Заказчик
                      </option>
                      <option
                        className="form-register__select-options__option"
                        value="expert"
                      >
                        Эксперт
                      </option>
                    </NativeSelect>
                  </FormControl>
                </div>

                <div>
                  <TextField
                    className="form-register__input"
                    id="outlined-number"
                    label="Имя"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  />
                  {errors.username && (
                    <p className="error">{errors.username}</p>
                  )}
                </div>

                <div>
                  <TextField
                    className="form-register__input"
                    id="outlined-number"
                    label="Электронная почта"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  />
                  {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div className="">
                  <FormControlLabel
                    className="form-register__check"
                    control={<Checkbox />}
                    onChange={(e) => setCheck(e.target.value)}
                    label="Даю согласие на обработку персональных данных, с Политикой конфиденциальности ознакомлен, с условиями Пользовательского соглашения согласен"
                  />
                  {errors.check && <p className="error">{errors.check}</p>}
                </div>
                {errors.server && <p className="error">{errors.server}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="form-register__button"
                >
                  {loading ? "Загрузка..." : "Зарегистрироваться"}
                </button>
              </form>
            </div>
          </div>
        )}
      </Container>
      <Container>
        {step === 2 && (
          <form onSubmit={handleConfirmCode} className="form-code">
            <p className="form-code__title">
              {email} проверьте почту и активируйте свой аккаунт !
            </p>
            <hr className="form-code__line" />
            <p className="form-code__description">
              Добро пожаловать на сайт Всё сдал! Пожалуйста, активируйте свой
              аккаунт!
            </p>
            <div className="form-code__block">
              <p className="form-code__block-text">
                1.Введите код из письма, высланной вам на эл.почту:{" "}
                <span>{email}</span>
              </p>
              <div className="form-code__inputs">
                <input
                  type="number"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="form-code__input"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="form-control__btn"
                >
                  {loading ? "Проверяем..." : "Активировать аккаунт"}
                </button>
              </div>
              {errors.code && <p className="error">{errors.code}</p>}

              {errors.server && <p className="error">{errors.server}</p>}
              <ul className="form-code__ul">
                <p className="form-code__block-text">
                  2.Если через 5 минут письмо НЕ пришло, проверьте папку «Спам»:
                </p>
                <li className="form-code__text">
                  — если письмо там, отметьте его как «Не спам»
                </li>
                <li className="form-code__text">
                  — если письма нет, нажмите на{" "}
                  <button className="form-code__text-btn">
                    Выслать письмо повторно
                  </button>
                </li>
                <li className="form-code__text">
                  — напишите нам mail@vsesdal.com или vk.com/vsesdal_official
                </li>
              </ul>
            </div>
          </form>
        )}
      </Container>
      <Container maxWidth="md">
        {step === 3 && (
          <div className="form-password">
            <h2 className="form-password__title">Создание пароля</h2>
            <hr />
            <form onSubmit={handleSetPassword} className="form-passowrd__form">
              <label htmlFor="" className="form-password__form-title">
                Введите пароль
              </label>
              <div className="form-password__form-input__block">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Пароль"
                  className="form-password__input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="eye-icon"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && <p className="error">{errors.password}</p>}
              <label htmlFor="" className="form-password__form-title">
                Повторите пароль
              </label>
              <div className="form-password__form-input__block">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Повторите пароль"
                  className="form-password__input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="eye-icon"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.confirmPassword && (
                <p className="error">{errors.confirmPassword}</p>
              )}

              {errors.server && <p className="error">{errors.server}</p>}

              <button
                type="submit"
                disabled={loading}
                className="form-password__btn"
              >
                {loading ? "Устанавливаем..." : "Сохранить пароль"}
              </button>
            </form>
          </div>
        )}
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <Box sx={modalStyle}>
                <Typography variant="h6" component="h2">
                    Пароль отправлен на вашу почту
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    Проверьте свою почту, чтобы получить пароль для входа.
                </Typography>
                <Button onClick={() => setIsModalOpen(false)} sx={{ mt: 2 }} variant="contained">
                    Ок
                </Button>
            </Box>
        </Modal>
      </Container>
    </div>
  );
};

export default Register;



// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./register.css";
// import "../../assents/styles/variables.css";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import {
//   Checkbox,
//   Container,
//   FormControl,
//   FormControlLabel,
//   InputLabel,
//   MenuItem,
//   NativeSelect,
//   TextField,
// } from "@mui/material";

// const Register = () => {
//   const [step, setStep] = useState(1); // Шаги: 1 - регистрация, 2 - код, 3 - пароль
//   const [role, setRole] = useState("Заказчик");
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [check, setCheck] = useState("");
//   const [code, setCode] = useState(""); // Код подтверждения
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const navigate = useNavigate();

//   // Валидация данных
//   const validate = () => {
//     let valid = true;
//     let errorMessages = {};

//     if (step === 1) {
//       if (!username) {
//         errorMessages.username = "Имя обязательно";
//         valid = false;
//       }
//       const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//       if (!email || !emailRegex.test(email)) {
//         errorMessages.email = "Пожалуйста, введите правильный email";
//         valid = false;
//       }
//       if (!check) {
//         errorMessages.check = "Пожалуйста дайте согласие";
//         valid = false;
//       }
//     }

//     if (step === 2 && !code) {
//       errorMessages.code = "Введите код подтверждения";
//       valid = false;
//     }

//     if (step === 3) {
//       if (!password || password.length < 6) {
//         errorMessages.password = "Пароль должен быть не менее 6 символов";
//         valid = false;
//       }
//       if (password !== confirmPassword) {
//         errorMessages.confirmPassword = "Пароли не совпадают";
//         valid = false;
//       }
//     }

//     setErrors(errorMessages);
//     return valid;
//   };

//   // Регистрация (шаг 1)
//   const handleRegister = async (e) => {
//     e.preventDefault();
//         if (!validate()) return;
    
//         setLoading(true);
//         setErrors({ role: "", username: "", email: "", server: "" });
    
//         // Логируем данные, которые отправляются
//         const requestData = { role, username, email };
//         console.log("Данные, которые отправляются:", requestData);
    
//         try {
//           const response = await fetch("http://147.45.146.242/api/register/", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(requestData), // Отправляем данные
//           });
    
//           const data = await response.json();
    
//           if (!response.ok) {
//             throw new Error(data.message || "Ошибка при регистрации");
//           }
//           setStep(2);
//           console.log("Успешная регистрация:", data);
          
//         } catch (error) {
//           setErrors((prev) => ({ ...prev, server: error.message }));
//         } finally {
//           setLoading(false);
//         }
//   };

//   useEffect(() => {
//     if (step === 3 && role === "expert") {
//       navigate("/expert-registration"); // Переход на страницу эксперта
//     }
//   }, [step, role, navigate]);

//   // Подтверждение Email (шаг 2)
//   const handleConfirmCode = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     setLoading(true);
//     setErrors({});

//     const requestData = {
//       email, // Предполагается, что email определён в состоянии
//       code,
//     };

//     console.log(JSON.stringify(requestData, null, 2)); // Логируем отправляемый JSON

//     try {
//       const response = await fetch("http://147.45.146.242/api/activate/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(requestData),
//       });

//       console.log(JSON.stringify({ status: response.status }, null, 2)); // Логируем статус ответа

//       const data = await response.json();
//       console.log(JSON.stringify(data, null, 2)); // Логируем ответ сервера

//       if (!response.ok) throw new Error(data.message || "Ошибка подтверждения");

//       setStep(3); // Переход на установку пароля
//     } catch (error) {
//       console.error(JSON.stringify({ error: error.message }, null, 2)); // Логируем ошибку
//       setErrors({ server: error.message });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Установка пароля (шаг 3)
//   const handleSetPassword = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     setLoading(true);
//     setErrors({});

//     try {
//       const response = await fetch("http://147.45.146.242/api/make-password/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email,
//           raw_password: password,
//           confirm_password: password,
//         }),
//       });

//       const data = await response.json();
//       if (!response.ok)
//         throw new Error(data.message || "Ошибка установки пароля");

//       console.log("Пароль установлен:", data);
//       navigate("/"); // Перенаправление на логин
//     } catch (error) {
//       setErrors({ server: error.message });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="form">
//       <Container maxWidth="md">
//         {step === 1 && (
//           <div className="form-reg">
//             <h2 className="form-register__title">Регистрация</h2>
//             <hr className="form-register__title-line" />
//             <div className="form-size">
//               <form onSubmit={handleRegister} className="form-register">
//                 <div>
//                   <FormControl fullWidth className="form-register__select">
//                     <InputLabel
//                       variant="standard"
//                       htmlFor="uncontrolled-native"
//                       className="form-register__select-label"
//                     >
//                       Я
//                     </InputLabel>
//                     <NativeSelect
//                       defaultValue={30}
//                       value={role}
//                       onChange={(e) => setRole(e.target.value)}
//                       className="form-register__select-options"
//                       inputProps={{
//                         name: "Я",
//                         id: "uncontrolled-native",
//                       }}
//                     >
//                       <option
//                         className="form-register__select-options__option"
//                         value="customer"
//                       >
//                         Заказчик
//                       </option>
//                       <option
//                         className="form-register__select-options__option"
//                         value="expert"
//                       >
//                         Эксперт
//                       </option>
//                     </NativeSelect>
//                   </FormControl>
//                 </div>

//                 <div>
//                   <TextField
//                     className="form-register__input"
//                     id="outlined-number"
//                     label="Имя"
//                     type="text"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     slotProps={{
//                       inputLabel: {
//                         shrink: true,
//                       },
//                     }}
//                   />
//                   {errors.username && (
//                     <p className="error">{errors.username}</p>
//                   )}
//                 </div>

//                 <div>
//                   <TextField
//                     className="form-register__input"
//                     id="outlined-number"
//                     label="Электронная почта"
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     slotProps={{
//                       inputLabel: {
//                         shrink: true,
//                       },
//                     }}
//                   />
//                   {errors.email && <p className="error">{errors.email}</p>}
//                 </div>
//                 <div className="">
//                   <FormControlLabel
//                     className="form-register__check"
//                     control={<Checkbox />}
//                     onChange={(e) => setCheck(e.target.value)}
//                     label="Даю согласие на обработку персональных данных, с Политикой конфиденциальности ознакомлен, с условиями Пользовательского соглашения согласен"
//                   />
//                   {errors.check && <p className="error">{errors.check}</p>}
//                 </div>
//                 {errors.server && <p className="error">{errors.server}</p>}

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="form-register__button"
//                 >
//                   {loading ? "Загрузка..." : "Зарегистрироваться"}
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}
//       </Container>
//       <Container>
//         {step === 2 && (
//           <form onSubmit={handleConfirmCode} className="form-code">
//             <p className="form-code__title">
//               {email} проверьте почту и активируйте свой аккаунт !
//             </p>
//             <hr className="form-code__line" />
//             <p className="form-code__description">
//               Добро пожаловать на сайт Всё сдал! Пожалуйста, активируйте свой
//               аккаунт!
//             </p>
//             <div className="form-code__block">
//               <p className="form-code__block-text">
//                 1.Введите код из письма, высланной вам на эл.почту:{" "}
//                 <span>{email}</span>
//               </p>
//               <div className="form-code__inputs">
//                 <input
//                   type="number"
//                   value={code}
//                   onChange={(e) => setCode(e.target.value)}
//                   className="form-code__input"
//                 />

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="form-control__btn"
//                 >
//                   {loading ? "Проверяем..." : "Активировать аккаунт"}
//                 </button>
//               </div>
//               {errors.code && <p className="error">{errors.code}</p>}

//               {errors.server && <p className="error">{errors.server}</p>}
//               <ul className="form-code__ul">
//                 <p className="form-code__block-text">
//                   2.Если через 5 минут письмо НЕ пришло, проверьте папку «Спам»:
//                 </p>
//                 <li className="form-code__text">
//                   — если письмо там, отметьте его как «Не спам»
//                 </li>
//                 <li className="form-code__text">
//                   — если письма нет, нажмите на{" "}
//                   <button className="form-code__text-btn">
//                     Выслать письмо повторно
//                   </button>
//                 </li>
//                 <li className="form-code__text">
//                   — напишите нам mail@vsesdal.com или vk.com/vsesdal_official
//                 </li>
//               </ul>
//             </div>
//           </form>
//         )}
//       </Container>
//       <Container maxWidth="md">
//         {step === 3 && (
//           <div className="form-password">
//             <h2 className="form-password__title">Создание пароля</h2>
//             <hr />
//             <form onSubmit={handleSetPassword} className="form-passowrd__form">
//               <label htmlFor="" className="form-password__form-title">
//                 Введите пароль
//               </label>
//               <div className="form-password__form-input__block">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Пароль"
//                   className="form-password__input"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <span
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="eye-icon"
//                 >
//                   {showPassword ? <FaEyeSlash /> : <FaEye />}
//                 </span>
//               </div>
//               {errors.password && <p className="error">{errors.password}</p>}
//               <label htmlFor="" className="form-password__form-title">
//                 Повторите пароль
//               </label>
//               <div className="form-password__form-input__block">
//                 <input
//                   type={showConfirmPassword ? "text" : "password"}
//                   placeholder="Повторите пароль"
//                   className="form-password__input"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                 />
//                 <span
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="eye-icon"
//                 >
//                   {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//                 </span>
//               </div>
//               {errors.confirmPassword && (
//                 <p className="error">{errors.confirmPassword}</p>
//               )}

//               {errors.server && <p className="error">{errors.server}</p>}

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="form-password__btn"
//               >
//                 {loading ? "Устанавливаем..." : "Сохранить пароль"}
//               </button>
//             </form>
//           </div>
//         )}
//       </Container>
//     </div>
//   );
// };

// export default Register;