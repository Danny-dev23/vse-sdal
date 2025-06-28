import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import React, { useState } from "react";
import "./experience.css";

// experience_writing_papers_students

const Experience = () => {
  const [experiencecheck, setExperienceCheck] = useState(false);
  const [experience, setExperience] = useState("");

  const [jobType, setJobType] = useState("");
  const [work, setWork] = useState("PartTimeJob");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("access_token");
    const data = {
      experience_writing_papers_students: experience,
      experience_writing: experiencecheck,
      work: work,
      work_experience: jobType,
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

  const [openPrivacyPolicy, setOpenPrivacyPolicy] = React.useState(false);
  const [openUserAgreement, setOpenUserAgreement] = React.useState(false);

  const handleOpenPrivacyPolicy = () => {
    setOpenPrivacyPolicy(true);
  };

  const handleClosePrivacyPolicy = () => {
    setOpenPrivacyPolicy(false);
  };

  const handleOpenUserAgreement = () => {
    setOpenUserAgreement(true);
  };

  const handleCloseUserAgreement = () => {
    setOpenUserAgreement(false);
  };

  return (
    <div className="experience-container">
      <form action="" onSubmit={handleSubmit}>
        <p className="experience-title">
          Есть ли у вас опыт в написании работ для помощи студентам? Если да, то
          какой?
        </p>
        <FormControlLabel
          control={
            <Checkbox
              checked={experiencecheck === true}
              onChange={(e) =>
                setExperienceCheck(e.target.checked ? true : "")
              }
              value="yes"
            />
          }
          label="Да"
          className="experience-checkbox"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={experiencecheck === false}
              onChange={(e) => setExperienceCheck(e.target.checked ? false : "")}
              value="no"
            />
          }
          label="Нет"
          className="experience-checkbox"
        />
        <TextField
          label="Вы раньше выполняли работы для студентов"
          variant="outlined"
          fullWidth
          margin="normal"
          className="experience-textfield"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />

        <p className="job-type-title">
          Вы рассматриваете помощь студентам как подработку или как основную
          работу?
        </p>
        <FormControlLabel
          control={
            <Checkbox
              checked={work === "PartTimeJob"}
              onChange={(e) =>
                setWork(e.target.checked ? "PartTimeJob" : "")
              }
              value="partTime"
            />
          }
          label="Подработка"
          className="job-type-checkbox"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={work === "MainJob"}
              onChange={(e) => setWork(e.target.checked ? "MainJob" : "")}
              value="fullTime"
            />
          }
          label="Основной"
          className="job-type-checkbox"
        />
        <TextField
          label="В какой сфере у вас есть опыт работы?"
          variant="outlined"
          fullWidth
          margin="normal"
          className="job-type-textfield"
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
        />

        <FormControlLabel
          control={<Checkbox />}
          label={
            <span>
              Даю согласие на обработку персональных данных, с{" "}
              <Button variant="link" onClick={handleOpenPrivacyPolicy}>
                Политикой конфиденциальности
              </Button>{" "}
              ознакомлен, с условиями{" "}
              <Button variant="link" onClick={handleOpenUserAgreement}>
                Пользовательского соглашения
              </Button>{" "}
              согласен.
            </span>
          }
          className="consent-checkbox"
        />
              <button type="submit">Submit</button>
      </form>

      <Dialog open={openPrivacyPolicy} onClose={handleClosePrivacyPolicy}>
        <DialogTitle>Политика конфиденциальности</DialogTitle>
        <DialogContent>
          <p>Политика конфиденциальности</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePrivacyPolicy}>Закрыть</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openUserAgreement} onClose={handleCloseUserAgreement}>
        <DialogTitle>Пользовательское соглашение</DialogTitle>
        <DialogContent>
          <p>Пользовательское соглашение</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUserAgreement}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Experience;
