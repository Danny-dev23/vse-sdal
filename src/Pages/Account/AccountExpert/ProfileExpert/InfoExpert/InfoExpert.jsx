import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import ExecutorOne from "../../../../../assents/images/executor-one.png";
import ExecutorTwo from "../../../../../assents/images/executor-two.png";
import ExecutorThree from "../../../../../assents/images/executor-three.png";
import ExecutorFour from "../../../../../assents/images/executor-four.png";
import { CircularProgress } from "@mui/material";

import "./infoExpert.css";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ruLocale from "date-fns/locale/ru";

const InfoExpert = () => {
  const [avatar, setAvatar] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = React.useState(null);
  const token = sessionStorage.getItem("access_token");

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await axios.patch(
        "http://147.45.146.242/api/user/avatar/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // 🔁 если сервер возвращает URL нового аватара:
      const avatarUrl = response.data.avatar; // или .avatar_url — уточни

      // Обновляем UI
      setAvatar(avatarUrl);

      // Закрываем диалог
      setIsDialogOpen(false);

      // ✅ Если нужно обновить и в БАЗЕ вручную — добавь сюда второй запрос (если API требует)
      // await axios.put('/your-api/user/update', { avatar: avatarUrl }, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
      console.error("Ошибка загрузки аватара:", error);
    }
  };

  useEffect(() => {
    const fetchExpertData = async () => {
      const userId = sessionStorage.getItem("user_id");
      if (!token || !userId) {
        console.error("Access token or user ID not found in sessionStorage");
        return;
      }

      try {
        const response = await axios.get("http://147.45.146.242/api/experts/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const expert = response.data.find(
          (expert) => expert.id === parseInt(userId, 10)
        );
        if (expert) {
          console.log("Matched Expert Data:", expert);
          setUser(expert);
        } else {
          console.warn("No expert found with the matching user ID");
        }
      } catch (error) {
        console.error("Error fetching expert data:", error);
      } finally {
        setIsLoading(false); // загрузка завершена
      }
    };

    fetchExpertData();
  }, []);

  console.log("userrs:", user);

  return (
    <div>
      <div className="info">
        <div className="info-date">
          <div className="info-avatar">
            {isLoading ? (
              <div className="avatar-loader">
                <CircularProgress />
              </div>
            ) : (
              <img
                src={user.avatar || ExecutorOne}
                alt="Avatar"
                className="info-avatar__image"
                onClick={() => setIsDialogOpen(true)}
              />
            )}

            <Dialog
              open={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
              aria-labelledby="select-avatar-dialog"
            >
              <DialogTitle id="select-avatar-dialog">
                Выберите аватар
              </DialogTitle>
              <DialogContent>
                <div className="avatar-options">
                  {[ExecutorTwo, ExecutorThree, ExecutorFour, ExecutorOne].map(
                    (option, index) => (
                      <img
                        key={index}
                        src={option}
                        alt={`Option ${index + 1}`}
                        className="avatar-option"
                        onClick={() => {
                          setAvatar(option);
                          setIsDialogOpen(false);
                        }}
                      />
                    )
                  )}
                </div>

                <div
                  className="custom-avatar-upload"
                  style={{ marginTop: "1rem" }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    id="avatar-upload"
                    style={{ display: "none" }}
                  />
                  <label htmlFor="avatar-upload">
                    <Button variant="contained" component="span">
                      Загрузить свой аватар
                    </Button>
                  </label>
                </div>
              </DialogContent>

              <DialogActions>
                <Button onClick={() => setIsDialogOpen(false)}>Закрыть</Button>
              </DialogActions>
            </Dialog>
          </div>
          <div className="info-text">
            <div className="info-text__name">
              {user ? (
                <>
                  <p className="info-text__name-text">
                    {user.username}{" "}
                    <span className="info-text__name-id">id{user.id}</span>
                  </p>
                  <Link>мой профиль</Link>
                  <div className="info-text__name-box">
                    <p className="info-text__name-email">{user.email}</p>
                    <button className="info-text__name-password">
                      изменить пароль
                    </button>
                  </div>
                  <span></span>
                </>
              ) : (
                <p>Загрузка данных.....</p>
              )}
              <button>Добавить телефон</button>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={ruLocale}
              >
                <DatePicker
                  label="Дата рождения"
                  value={value}
                  inputFormat="dd.MM.yyyy"
                  onChange={(newValue) => setValue(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      className="info-text__input"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </LocalizationProvider>
            </div>
          </div>
        </div>
        <div className="info-settings">
          <h3>Настройки</h3>
          <div className="settings-options">
            <div className="settings-option">
              <input type="checkbox" id="accept-messages" />
              <label htmlFor="accept-messages">
                Принимать сообщения от незнакомых заказчиков
              </label>
            </div>
            <div className="settings-option">
              <input type="checkbox" id="show-hints" />
              <label htmlFor="show-hints">Показывать подсказки</label>
            </div>
            <div className="settings-option">
              <input type="checkbox" id="sms-protection" />
              <label htmlFor="sms-protection">СМС-защита</label>
            </div>
          </div>
        </div>
        <div className="info-education">
          <h3>Образование</h3>
          <form className="education-form">
            <TextField
              label="Город"
              variant="outlined"
              fullWidth
              className="education-form__input"
            />
            <TextField
              label="Учебное заведение"
              variant="outlined"
              fullWidth
              className="education-form__input"
            />
            <TextField
              label="Факультет"
              variant="outlined"
              fullWidth
              className="education-form__input"
            />
            <TextField
              label="Специальность"
              variant="outlined"
              fullWidth
              className="education-form__input"
            />
            <p className="education-form__warning">
              В разделе про опыт работы запрещено размещать свою реферальную
              ссылку и реферальный личный промокод.
            </p>
            <TextField
              label="Опыт работы"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              className="education-form__input"
            />

            <Button
              variant="contained"
              color="primary"
              className="education-form__submit"
            >
              Сохранить изменения
            </Button>
            <Button
              variant="text"
              color="secondary"
              className="education-form__delete"
            >
              Удалить аккаунт
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InfoExpert;
