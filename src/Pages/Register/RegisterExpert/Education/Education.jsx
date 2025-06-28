import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import "./education.css";

const Education = () => {
  const [university_name, setUniversity_name] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [graduation_year, setGraduation_year] = useState("");
  const [university_name2, setUniversity_name2] = useState("");
  const [specialization2, setSpecialization2] = useState("");
  const [course, setСourse] = useState("");
  const [additional_education, setAdditional_education] = useState("");
  const [city, setCity] = useState("");
  const [date_of_birth, setDate_of_birth] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("access_token");
    const data = {
      university_name: university_name,
      specialization: specialization,
      graduation_year: graduation_year,
      university_name2: university_name2,
      specialization2: specialization2,
      course: course,
      city: city,
      date_of_birth: date_of_birth,
      additional_education: additional_education,
    };

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

  return (
    <div className="education-container">
      <form className="education-form" onSubmit={handleSubmit}>
        <div className="education-section">
          <p className="education-question">Ваше образование?</p>
          <div className="education-input-group">
            <TextField
              value={university_name}
              onChange={(e) => setUniversity_name(e.target.value)}
              className="education-input"
              placeholder="УЧЕБНОЕ ЗАВЕДЕНИЕ"
              fullWidth
              margin="normal"
            />
            <TextField
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="education-input"
              placeholder="СПЕЦИАЛЬНОСТЬ"
              fullWidth
              margin="normal"
            />
            <TextField
              value={graduation_year}
              onChange={(e) => setGraduation_year(e.target.value)}
              className="education-input"
              placeholder="ГОД ОКОНЧАНИЯ"
              fullWidth
              margin="normal"
              type="number"
            />
          </div>
        </div>
        <div className="education-section">
          <p className="education-question">
            На данный момент вы учитесь? Если да, укажите ВУЗ, специальность и
            курс.
          </p>
          <div className="education-input-group">
            <TextField
              value={university_name2}
              onChange={(e) => setUniversity_name2(e.target.value)}
              className="education-input"
              placeholder="УЧЕБНОЕ ЗАВЕДЕНИЕ"
              fullWidth
              margin="normal"
            />
            <TextField
              value={specialization2}
              onChange={(e) => setSpecialization2(e.target.value)}
              className="education-input"
              placeholder="СПЕЦИАЛЬНОСТЬ"
              fullWidth
              margin="normal"
            />
            <TextField
              value={course}
              onChange={(e) => setСourse(e.target.value)}
              className="education-input"
              placeholder="КУРС"
              fullWidth
              margin="normal"
            />
          </div>
        </div>
        <div className="education-section">
          <p className="education-question">Город проживания?</p>
          <TextField
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="education-input"
            placeholder="ГОРОД ИЛИ ОБЛАСТЬ И НАСЕЛЕННЫЙ ПУНКТ"
            fullWidth
            margin="normal"
          />
        </div>
        <div className="education-section">
          <p className="education-question">Дата рождения?</p>
          <TextField
            value={date_of_birth}
            onChange={(e) => setDate_of_birth(e.target.value)}
            className="education-input"
            placeholder="ДД. ММ. ГГГГ."
            fullWidth
            type="date"
            margin="normal"
          />
        </div>
        <div className="education-section">
          <p className="education-question">
            Есть ли доп. образование, научные статьи, курсы повышения
            квалификации или другие достижения (победы в конкурсах, олимпиадах,
            сертификаты, звания и т.п.)?
          </p>
          <TextField
            value={additional_education}
            onChange={(e) => setAdditional_education(e.target.value)}
            className="education-input"
            placeholder="ДОПОЛНИТЕЛЬНОЕ ОБРАЗОВАНИЕ"
            multiline
            rows={4}
            fullWidth
            margin="normal"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Education;
