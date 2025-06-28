import React, { useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import "./items.css";

// items: [
//   { id: 1, name: "Математическая статистика" },
//   { id: 1, name: "Математическая статистика" },
//   { id: 1, name: "Математическая статистика" },
//   { id: 1, name: "Математическая статистика" },
//   { id: 1, name: "Математическая статистика" },
//   { id: 1, name: "Математическая статистика" },
// ],

const Items = () => {
  const [subject, setSubject] = useState("");
  const [items, setItems] = useState([]);
  const [languages, setLanguages] = useState("");
  const workTypes = [
    "ОНЛАЙН-РЕПЕТИТОР",
    "КОНТРОЛЬНАЯ",
    "РЕШЕНИЕ ЗАДАЧ",
    "КУРСОВАЯ",
    "РЕФЕРАТ",
    "ОНЛАЙН-ПОМОЩЬ",
    "ТЕСТ ДИСТАНЦИОННО",
    "ДИПЛОМ",
    "ЛАБОРАТОРНАЯ",
    "ЧЕРТЕЖ",
    "ОТЧЕТ ПО ПРАКТИКЕ",
    "ЭССЕ",
    "ОТВЕТЫ НА БИЛЕТЫ",
    "ПРЕЗЕНТАЦИЯ",
    "ПЕРЕВОД С ИН. ЯЗЫКА",
    "ДОКЛАД",
    "СТАТЬЯ",
    "СОЧИНЕНИЕ",
    "МАГИСТЕРСКАЯ ДИССЕРТАЦИЯ",
    "КАНДИДАТСКАЯ ДИССЕРТАЦИЯ",
    "БИЗНЕС-ПЛАН",
    "ПОДБОР ЛИТЕРАТУРЫ",
    "ШПАРГАЛКА",
    "ПОИСК ИНФОРМАЦИИ",
    "РЕЦЕНЗИЯ",
    "ДРУГОЕ",
  ];

  const [selectedWorkTypes, setSelectedWorkTypes] = useState([]);
  const handleWorkTypeChange = (label) => {
    setSelectedWorkTypes(
      (prevSelected) =>
        prevSelected.includes(label)
          ? prevSelected.filter((item) => item !== label) // Убираем если уже есть
          : [...prevSelected, label] // Добавляем если нет
    );
  };

  const selectedWorkTypesArray = selectedWorkTypes.map((type, index) => ({
    id: index + 1, // Или можно использовать uuid
    name: type,
  }));

  const handleAddSubject = () => {
    if (subject && !items.some((s) => s.name === subject)) {
      const newItems = [...items, { id: items.length + 1, name: subject }];
      setItems(newItems);
      setSubject("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedWorkTypesArray);

    const token = sessionStorage.getItem("access_token");
    const data = {
      subjects: items.map((item) => ({ id: item.id, name: item.name })),
      foreign_languages: languages,
      type_of_work: selectedWorkTypesArray,
    };
    console.log(data);

    try {
      const response = await fetch(
        "http://147.45.146.242/api/expert-profile/",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );
      console.log(data);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteSubject = (subjectToDelete) => {
    setItems(items.filter((s) => s.name !== subjectToDelete));
  };
  console.log(items);

  return (
    <form onSubmit={handleSubmit}>
      <Box className="items-container">
        <Typography variant="h6" className="items-title">
          По каким предметам вы готовы выполнять работы?
        </Typography>
        <TextField
          label="Введите название предмета по одному"
          variant="outlined"
          fullWidth
          margin="normal"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="subject-input"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddSubject}
          className="add-subject-button"
        >
          Добавить
        </Button>
        <Box mt={2} className="subjects-list">
          {items.map((subj) => (
            <Chip
              key={subj.id}
              label={subj.name}
              onDelete={() => handleDeleteSubject(subj.name)}
              className="subject-chip"
              style={{ margin: "4px" }}
            />
          ))}
        </Box>
        <Typography variant="h6" mt={2} className="items-title">
          Какие типы работ вы планируете выполнять по этим предметам?
        </Typography>
        <FormGroup className="work-types">
          {workTypes.map((label) => (
            <FormControlLabel
              key={label}
              control={
                <Checkbox
                  checked={selectedWorkTypes.includes(label)}
                  onChange={() => handleWorkTypeChange(label)}
                />
              }
              label={label}
              className="work-type-checkbox"
            />
          ))}
        </FormGroup>
        <Typography variant="h6" mt={2} className="items-title">
          На каких иностранных языках готовы писать работы?
        </Typography>
        <TextField
          label="Иностранные языки"
          variant="outlined"
          fullWidth
          margin="normal"
          className="languages-input"
          value={languages}
          onChange={(e) => setLanguages(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="submit-button"
        >
          Отправить
        </Button>
      </Box>
    </form>
  );
};

export default Items;
