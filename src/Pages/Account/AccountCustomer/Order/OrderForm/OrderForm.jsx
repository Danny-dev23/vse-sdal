import React, { useState } from "react";
import {
  Button,
  FormControlLabel,
  Input,
  InputAdornment,
  TextField,
  FormControl,
  RadioGroup,
  Radio,
  FormLabel,
} from "@mui/material";
import CheckYes from "../../../../../assents/images/check-yes.svg";
import CheckNo from "../../../../../assents/images/check-no.svg";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import "dayjs/locale/ru";
import dayjs from "dayjs";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

dayjs.locale("ru");

const OrderForm = ({ selectedWorkType, handleTabClick }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [mutualRejection, setMutualRejection] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [customer, setCustomer] = useState(12); // Пример ID заказчика
  const [expert, setExpert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [antiplagiat, setAntiplagiat] = useState(true)
  const [selectedDate, setSelectedDate] = useState(null);
  const [file, setFile] = useState(null);

  const [value, setValue] = React.useState("option1");
  const [antiPlagiarism, setAntiPlagiarism] = React.useState("");
  const [percentage, setPercentage] = React.useState(75);

  const [files, setFiles] = useState([]); // Храним массив файлов

  const [inputValues, setInputValues] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
  });

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files); // Преобразуем FileList в массив
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]); // Добавляем файлы в массив
  };

  const handleFileRemove = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index)); // Удаляем файл по индексу
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleAntiPlagiarismChange = (event) => {
    setAntiPlagiarism(event.target.value);
  };

  const handlePercentageChange = (event) => {
    let value = event.target.value;

    // Если инпут пустой — устанавливаем 0
    if (value === "") {
      setPercentage(0);
      return;
    }

    // Преобразуем в число и ограничиваем диапазон
    value = Math.max(0, Math.min(100, Number(value)));

    setPercentage(value);
  };
  const handleInputChange = (inputName, value) => {
    setInputValues({
      ...inputValues,
      [inputName]: value, // Обновляем соответствующее поле
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Собираем данные из формы
    const orderData = {
      subjects: inputValues.input1, // Текст задания
      title: inputValues.input2, // Предположим, что input1 - это название
      description: inputValues.input3, // Заголовок
      deadline: selectedDate, // Дата выполнения задания
      type_of_work: selectedWorkType, // Тип работы
      status: "new", // Статус
      customer: 1,
      anti_plagiarism: antiplagiat, // Замените на реальные данные
    };
    console.log(
      "Отправляемые данные на бэк:",
      JSON.stringify(orderData, null, 2)
    );

    try {
      // Получаем токен из sessionStorage
      const token = sessionStorage.getItem("access_token");
      console.log(token);
      
      // Выполняем запрос с токеном
      const response = await fetch("http://147.45.146.242/api/orders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
        },
        body: JSON.stringify(orderData), // Отправка данных в формате JSON
      });

      const result = await response.json(); // Получаем ответ от сервера

      if (response.ok) {
        console.log("Order successfully submitted:", result);
        // Обработка успешного ответа
      } else {
        console.error("Ошибка от сервера:", result);
        // Выводим ошибку, если сервер вернул ошибку
      }
    } catch (error) {
      console.error("Ошибка отправки запроса:", error);
      // Выводим ошибку, если произошел сбой при отправке запроса
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-order">
          <div className="form-order__input-group">
            <TextField
              id="outlined-basic"
              label="Тип работы"
              variant="outlined"
              value={selectedWorkType}
              disabled
              InputLabelProps={{
                shrink: true, // Заставит текст "Поиск" оставаться над полем
              }}
            />
            <div className="image-container">
              <img src={CheckYes} alt="" className="check-image" />
            </div>
          </div>
          <div className="form-order__input-group">
            <TextField
              className="form-order__input-group__textfield"
              label="ПРЕДМЕТ"
              variant="outlined"
              value={inputValues.input1}
              onChange={(e) => handleInputChange("input1", e.target.value)}
              fullWidth
            />
            <div className="image-container">
              <img
                src={inputValues.input1.length > 3 ? CheckYes : CheckNo}
                alt={inputValues.input1.length > 3 ? "checkYes" : "checkNo"}
                className="check-image"
              />
              <p className="form-order__input-group__title">
                например: Высшая математика
              </p>
            </div>
          </div>
          <div className="form-order__input-group">
            <TextField
              className="form-order__input-group__textfield"
              label="ЗАГОЛОВОК"
              variant="outlined"
              value={inputValues.input2}
              onChange={(e) => handleInputChange("input2", e.target.value)}
              fullWidth
            />
            <div className="image-container">
              <img
                src={inputValues.input2.length > 3 ? CheckYes : CheckNo}
                alt={inputValues.input2.length > 3 ? "checkYes" : "checkNo"}
                className="check-image"
              />
              <p className="form-order__input-group__title">
                например: Решить 10 задач по высшей математике
              </p>
            </div>
          </div>
          <div className="form-order__input-group">
            <TextField
              className="form-order__input-group__textfield"
              label="ТЕКСТ ЗАДАНИЯ"
              variant="outlined"
              multiline
              rows={8}
              value={inputValues.input3}
              onChange={(e) => handleInputChange("input3", e.target.value)}
              fullWidth
            />
            <div className="image-container">
              <img
                src={inputValues.input3.length > 3 ? CheckYes : CheckNo}
                alt={inputValues.input3.length > 3 ? "checkYes" : "checkNo"}
                className="check-image"
              />
              <p className="form-order__input-group__title">
                Укажите всё, что необходимо для выполнения
                <br /> задания. Например:
                <br />
                — программу проверки на плагиат
                <br />
                — процент уникальности работы
                <br />
                — часовой пояс (Москва или другой)
                <br />
                — размер шрифта
                <br />
                — номер варианта задания, если их несколько
                <br />
              </p>
            </div>
          </div>

          <div className="form-order__input-group">
            <div className="">
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="ru"
              >
                <DatePicker
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  format="D MMMM YYYY[г.]" // Формат даты (например, 25 марта)
                  shouldDisableDate={(date) => date.isBefore(dayjs(), "day")} // Блокируем прошедшие даты
                  disableOpenTextField={true}
                  label="Сроки выполнения"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      InputProps: { readOnly: true }, // Запрещает ввод вручную
                    },
                  }}
                />
              </LocalizationProvider>
            </div>
            <div className="image-container">
              <img
                src={selectedDate ? CheckYes : CheckNo} // Если дата выбрана, показываем CheckYes, иначе CheckNo
                alt={selectedDate ? "checkYes" : "checkNo"}
                className="check-image"
              />
            </div>
          </div>

          <div className="form-order__input-group">
            <div className="">
              {files.length > 0 && (
                <div className="form-order__input-group__file-box">
                  {files.map((file, index) => (
                    <div key={index} className="form-order__input-group__file">
                      <p>
                        <InsertDriveFileIcon
                          fontSize="small"
                          style={{ color: "#DDDDDD" }}
                        />{" "}
                        {file.name}
                      </p>
                      <p className="form-order__input-group__text">
                        {(file.size / 1024).toFixed(2)} KB{" "}
                      </p>{" "}
                      <Button
                        variant="outlined"
                        color="error"
                        className="form-order__input-group__file-btn"
                        onClick={() => handleFileRemove(index)}
                      >
                        <HighlightOffIcon />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              <div className="form-order__input-group__file-button">
                <Button variant="contained" component="label">
                  Выбрать файл
                  <Input
                    className="form-order__input-group__file-button__btn"
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.png"
                    onChange={handleFileChange}
                    hidden
                  />
                </Button>
              </div>
            </div>
            <div className="image-container">
              <img
                src={files.length > 0 ? CheckYes : CheckNo} // Если есть файлы, показываем CheckYes
                alt={files.length > 0 ? "checkYes" : "checkNo"}
                className="check-image"
              />
            </div>
          </div>

          <div className="form-order__input-group">
            <FormControl component="fieldset">
              <FormLabel component="legend">Антиплагиат</FormLabel>
              <RadioGroup
                value={value}
                onChange={handleChange}
                className="form-order__input-group__radio"
              >
                <div className="">
                  <FormControlLabel
                    value="option1"
                    label="не требуется"
                    control={
                      <Radio
                        sx={{
                          color: "#ddd",
                          "&.Mui-checked": { color: "green" },
                        }}
                      />
                    }
                  />
                  <FormControlLabel
                    value="option2"
                    label="требуется"
                    control={
                      <Radio
                        sx={{
                          color: "#ddd",
                          "&.Mui-checked": { color: "green" },
                        }}
                      />
                    }
                  />
                </div>
                <div className="">
                  {value === "option2" && (
                    <FormControl component="fieldset">
                      <TextField
                        label="Процент"
                        value={percentage}
                        onChange={handlePercentageChange}
                        type="number"
                        inputProps={{
                          min: 0,
                          max: 100,
                          step: 1,
                          style: { textAlign: "center" },
                        }}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">%</InputAdornment>
                          ),
                        }}
                      />
                      <RadioGroup
                        value={antiPlagiarism}
                        onChange={handleAntiPlagiarismChange}
                      >
                        <FormControlLabel
                          value="plagiarism1"
                          control={
                            <Radio
                              sx={{
                                color: "#ddd",
                                "&.Mui-checked": { color: "green" },
                              }}
                            />
                          }
                          label="Тип 1"
                        />
                        <FormControlLabel
                          value="plagiarism2"
                          control={
                            <Radio
                              sx={{
                                color: "#ddd",
                                "&.Mui-checked": { color: "green" },
                              }}
                            />
                          }
                          label="Тип 2"
                        />
                        <FormControlLabel
                          value="plagiarism3"
                          control={
                            <Radio
                              sx={{
                                color: "#ddd",
                                "&.Mui-checked": { color: "green" },
                              }}
                            />
                          }
                          label="Тип 3"
                        />
                      </RadioGroup>
                    </FormControl>
                  )}
                </div>
              </RadioGroup>
            </FormControl>
            <div className="image-container">
              <img
                src={CheckYes} // Если есть файлы, показываем CheckYes
                alt=""
                className="check-image"
              />
            </div>
          </div>
        </div>

        <div className="form-order__input-group__button">
          <div className="form-order__input-group__back">
            <button
              className="form-order__input-group__back-button"
              onClick={() => handleTabClick(1)}
            >
              <ArrowBackIosIcon /> Назад
            </button>
          </div>
          <div className="form-order__input-group__button-order">
            <button className="form-order__input-group__button-order__btn">
              Разместить заказ
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;

{
  /* <div>
<label>Название</label>
<input
  type="text"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  required
/>
</div>
<div>
<label>Описание</label>
<input
  type="text"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  required
/>
</div>
<div>
<label>Тема</label>
<input
  type="text"
  value={subject}
  onChange={(e) => setSubject(e.target.value)}
  required
/>
</div>
<div>
<label>Бюджет</label>
<input
  type="number"
  value={budget}
  onChange={(e) => setBudget(e.target.value)}
  required
/>
</div>
<div>
<label>Дедлайн</label>
<input
  type="datetime-local"
  value={deadline}
  onChange={(e) => setDeadline(e.target.value)}
  required
/>
</div>
<div>
<label>Взаимный отказ</label>
<input
  type="checkbox"
  checked={mutualRejection}
  onChange={(e) => setMutualRejection(e.target.checked)}
/>
</div>
<div>
<label>Причина отказа</label>
<input
  type="text"
  value={rejectionReason}
  onChange={(e) => setRejectionReason(e.target.value)}
/>
</div>
<div>
<button type="submit" disabled={loading}>
  {loading ? "Отправка..." : "Отправить заказ"}
</button>
</div>
{error && <p style={{ color: "red" }}>{error}</p>} */
}
