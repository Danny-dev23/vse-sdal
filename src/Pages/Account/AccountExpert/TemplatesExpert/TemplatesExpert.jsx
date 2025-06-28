import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import "./templatesExpert.css"; // Импорт стилей для компонента

const TemplatesExpert = () => {
  const [isFormVisible, setIsFormVisible] = useState(false); // Управление видимостью формы
  const [templates, setTemplates] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    total_cost: "",
    comment: "",
  });
  const [editingTemplateId, setEditingTemplateId] = useState(null);
  const [error, setError] = useState(null); // Для обработки ошибок

  useEffect(() => {
    const fetchTemplates = async () => {
      const token = sessionStorage.getItem("access_token"); // Получение токена
      try {
        const response = await axios.get(
          "http://147.45.146.242/api/message-templates/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTemplates(response.data); // Сохранение шаблонов в состояние
      } catch (err) {
        console.error("Ошибка при загрузке шаблонов:", err);
        setError("Не удалось загрузить шаблоны. Попробуйте снова.");
      }
    };

    fetchTemplates();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  console.log(formData);

  // const handleSubmit = async () => {
  //   const token = sessionStorage.getItem("access_token"); // Получение токена
  //   try {
  //     const response = await axios.post(
  //       "http://147.45.146.242/api/message-templates/",
  //       formData,
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //     console.log("Шаблон успешно создан:", response.data);
  //     console.log(formData);

  //     setIsFormVisible(false); // Скрыть форму после успешного создания
  //     setFormData({ name: "", total_cost: "", comment: "" }); // Очистить форму
  //   } catch (err) {
  //     console.error("Ошибка при создании шаблона:", err);
  //     setError("Не удалось создать шаблон. Попробуйте снова.");
  //   }
  // };

  const handleSubmit = async () => {
    const token = sessionStorage.getItem("access_token"); // Получение токена
    try {
      if (editingTemplateId) {
        // Редактирование шаблона
        const response = await axios.put(
          `http://147.45.146.242/api/message-templates/${editingTemplateId}/`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Шаблон успешно обновлен:", response.data);

        // Обновление списка шаблонов
        setTemplates((prevTemplates) =>
          prevTemplates.map((template) =>
            template.id === editingTemplateId ? response.data : template
          )
        );
      } else {
        // Создание нового шаблона
        const response = await axios.post(
          "http://147.45.146.242/api/message-templates/",
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Шаблон успешно создан:", response.data);

        // Добавление нового шаблона в список
        setTemplates((prevTemplates) => [...prevTemplates, response.data]);
      }

      setFormData({ name: "", total_cost: "", comment: "" }); // Очистить форму
      setIsFormVisible(false); // Скрыть форму после успешного создания/редактирования
      setEditingTemplateId(null); // Сбросить ID редактируемого шаблона
    } catch (err) {
      console.error("Ошибка при сохранении шаблона:", err);
      setError("Не удалось сохранить шаблон. Попробуйте снова.");
    }
  };

  const handleEdit = (template) => {
    setEditingTemplateId(template.id); // Установить ID редактируемого шаблона
    setFormData({
      name: template.name,
      total_cost: template.total_cost,
      comment: template.comment,
    });
    setIsFormVisible(false); // Показать форму
  };

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem("access_token"); // Получение токена
    try {
      await axios.delete(`http://147.45.146.242/api/message-templates/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Шаблон успешно удален");

      // Удаление шаблона из списка
      setTemplates((prevTemplates) =>
        prevTemplates.filter((template) => template.id !== id)
      );
    } catch (err) {
      console.error("Ошибка при удалении шаблона:", err);
      setError("Не удалось удалить шаблон. Попробуйте снова.");
    }
  };

  return (
    <div className="templates-expert">
      <h3 className="templates-expert__title">Шаблоны сообщений</h3>
      <br />
      <div className="templates-box">
        <p className="templates-expert__discription">
          Создавайте шаблоны на основе сообщений, которые часто отправляете. Это
          значительно сэкономит ваше время. Шаблоны можно отправлять в меню
          <span className="templates-expert__discription-span">
            Предложить цену.
          </span>{" "}
          Там же можно сохранить сообщение как шаблон.
        </p>
        <Button
          variant="contained"
          className="templates-expert__button"
          onClick={() => {
            setFormData({ name: "", total_cost: "", comment: "" }); // Сбрасываем форму
            setIsFormVisible(true); // Показываем форму
            setEditingTemplateId(null); // Убираем режим редактирования
          }}
          
        >
          Создать новый шаблон
        </Button>

        {isFormVisible && (
          <div className="form-templates__expert">
            <Box component="form" className="form-templates__expert-box">
              <div className="form-templates__expert-name">
                <TextField
                  label="Название шаблона"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  sx={{ width: "50%" }}
                  margin="normal"
                  className="form-templates__expert-input"
                />
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => setIsFormVisible(false)}
                  className="form-templates__expert-cancel-button"
                >
                  Отменить
                </Button>
              </div>
              <TextField
                label="Цена за всю работу"
                name="total_cost"
                value={formData.total_cost}
                onChange={handleInputChange}
                sx={{ width: "30%" }}
                margin="normal"
                className="form-templates__expert-input"
              />
              <div className="form-templates__expert-comment">
                <TextField
                  label="Мой комментарий"
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  sx={{ width: "50%" }}
                  multiline
                  rows={12}
                  margin="normal"
                  className="form-templates__expert-textarea"
                />
                <div className="form-templates__expert-comment-hint">
                  <h5 className="form-templates__expert-comment__title">Что писать в комментарии?</h5>
                  <ul className="form-templates__expert-comment-list">
                    <li className="form-templates__expert-comment-item">
                      Поздоровайтесь и представьтесь, расскажите об образовании
                      и опыте работы.
                    </li>
                    <li className="form-templates__expert-comment-item">
                      Уточните детали по заказу: <br />
                      <span className="form-templates__expert-comment-item__span"> - есть ли методические материалы;</span> <br />
                      <span className="form-templates__expert-comment-item__span">
                        - требования к оформлению: шрифт, отступы и тд;
                      </span>{" "}
                      <br />
                      <span className="form-templates__expert-comment-item__span"> - программу проверки на плагиат;</span> <br />{" "}
                      <span className="form-templates__expert-comment-item__span">- процент уникальности работы.</span>
                    </li>
                    <li className="form-templates__expert-comment-item">
                      Укажите, когда вы бываете на связи.
                    </li>
                    <li className="form-templates__expert-comment-item">
                      Напишите, что выполните работу в срок или раньше срока.
                    </li>
                    <li className="form-templates__expert-comment-item">
                      Расскажите, что доработки в рамках темы и требований
                      выполняются бесплатно.
                    </li>
                  </ul>
                </div>
              </div>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 2,
                }}
                className="form-templates__expert-actions"
              >
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSubmit}
                  className="form-templates__expert-save-button"
                >
                  Сохранить шаблон
                </Button>
              </Box>
              {error && (
                <Typography
                  color="error"
                  sx={{ mt: 2 }}
                  className="form-templates__expert-error"
                >
                  {error}
                </Typography>
              )}
            </Box>
          </div>
        )}
        <List
        sx={{
          mt: 3,
          maxWidth: "600px",
          bgcolor: "#f9f9f9",
          borderRadius: "8px",
        }}
        className="templates-expert__list"
      >
        {templates.map((template) => (
          <ListItem
            key={template.id}
            sx={{ borderBottom: "1px solid #ccc" }}
          >
            {editingTemplateId === template.id ? (
              // Форма редактирования
              <Box
                component="form"
                sx={{ width: "100%" }}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <TextField
                  label="Название шаблона"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Цена за всю работу"
                  name="total_cost"
                  value={formData.total_cost}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Мой комментарий"
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => setEditingTemplateId(null)}
                  >
                    Отменить
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleSubmit}
                  >
                    Сохранить
                  </Button>
                </Box>
              </Box>
            ) : (
              // Отображение шаблона
              <>
                <ListItemText
                  primary={template.name}
                  secondary={`Цена: ${template.total_cost} | Комментарий: ${template.comment}`}
                />
                <ListItemSecondaryAction>
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => handleEdit(template)}
                  >
                    Редактировать
                  </Button>
                  <Button
                    variant="text"
                    color="error"
                    onClick={() => handleDelete(template.id)}
                  >
                    Удалить
                  </Button>
                </ListItemSecondaryAction>
              </>
            )}
          </ListItem>
        ))}
      </List>
      </div>
    </div>
  );
};

export default TemplatesExpert;
