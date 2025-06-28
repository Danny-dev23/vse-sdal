import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";
import { CheckCircle, Delete } from "@mui/icons-material";
import "./tolerance.css";

const Tolerance = () => {
  const [socialLink, setSocialLink] = useState("");
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files).map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      file: file,
    }));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("access_token");
    const formData = new FormData();
    
    files.forEach((file) => {
      formData.append("diploma", file.file);
    });
    formData.append("social_network", socialLink);
    
    try {
      const response = await fetch(
        "http://147.45.146.242/api/expert-profile/",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Errors from backend:", errorData);
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFileDelete = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <form className="tolerance-container" onSubmit={handleSubmit}>
      <Box className="tolerance-container">
        <div className="tolerance-content">
          <p className="tolerance-text">
            Укажите ваш профиль в соц. сетях (необходимо для подтверждения вашей
            личности, не будет отображаться в вашем профиле)
          </p>
          <TextField
            fullWidth
            label="Ссылка на ваш профиль в соцсетях"
            variant="outlined"
            margin="normal"
            className="tolerance-input"
            value={socialLink}
            onChange={(e) => setSocialLink(e.target.value)}
          />
          <p className="tolerance-subtitle" variant="h6" gutterBottom>
            Загрузите фото диплома (вместе с вкладышем) в формате PNG или JPG.
          </p>
          <p className="tolerance-description" variant="body2" gutterBottom>
            Если вы студент, то фото/скан зачетки за весь период обучения.
          </p>
          <Box
            sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
            className="tolerance-protection"
          >
            <IconButton color="success" className="tolerance-icon">
              <CheckCircle />
            </IconButton>
            <p
              className="tolerance-protection-text"
              variant="body2"
              color="success.main"
            >
              Ваши данные защищены
            </p>
          </Box>
          <Button
            variant="contained"
            component="label"
            color="primary"
            className="tolerance-button"
          >
            Добавить файлы
            <input
              type="file"
              accept="image/png, image/jpeg"
              multiple
              hidden
              onChange={handleFileChange}
            />
          </Button>
          <Box className="tolerance-file-list">
            {files.map((file, index) => (
              <Paper key={index} className="tolerance-file-item">
                <Typography variant="body2">{file.name}</Typography>
                <Typography variant="body2">
                  {(file.size / 1024).toFixed(2)} KB
                </Typography>
                <IconButton onClick={() => handleFileDelete(index)}>
                  <Delete />
                </IconButton>
              </Paper>
            ))}
          </Box>
          <p className="tolerance-footer">
            Если у вас уже есть аккаунт исполнителя на других ресурсах помощи
            студентам, то вы можете подтвердить свою квалификацию загрузив
            скриншот личного кабинета, где видно количество выполненных вами
            работ и % положительных отзывов.
          </p>
        </div>
      </Box>
      <button type="submit">Отправить</button>
    </form>
  );
};

export default Tolerance;