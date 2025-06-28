import { Container } from "@mui/material";
import { useState } from "react";
import Education from "./Education/Education";
import Experience from "./Experience/Experience";
import Items from "./Items/Items";
import Tolerance from "./Tolerance/Tolerance";
import Confirmation from "./Confirmation/Confirmation";
import "./registerexpert.css";

export default function RegisterExpert() {
  const [step, setStep] = useState(1);

  const handleStepChange = (newStep) => {
    setStep(newStep);
  };

  const stepLabels = [
    "Образование",
    "Опыт работы",
    "Предметы",
    "Получение допуска",
    "Подтверждение",
  ];

  return (
    <Container>
      <div className="reg-expert">
        <h2 className="reg-expert__title">Ответы на вопросы анкеты</h2>
        <div className="reg-expert__steps">
          {stepLabels.map((label, index) => (
            <button
              key={index}
              className={`reg-expert__step-button ${step === index + 1 ? 'active' : ''}`}
              onClick={() => handleStepChange(index + 1)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="reg-expert__buttons">
          {step === 1 && (
            <div className="reg-expert__buttons-item">
              <Education />
            </div>
          )}
          {step === 2 && (
            <div className="reg-expert__buttons-item">
              <Experience />
            </div>
          )}
          {step === 3 && (
            <div className="reg-expert__buttons-item">
              <Items />
            </div>
          )}
          {step === 4 && (
            <div className="reg-expert__buttons-item">
              <Tolerance />
            </div>
          )}
          {step === 5 && (
            <div className="reg-expert__buttons-item">
              <Confirmation />
            </div>
          )}
        </div>
        {step < 5 && (
          <button
            className="mb-4 px-4 py-2 bg-green-500 text-white rounded-lg"
            onClick={() => handleStepChange(step + 1)}
          >
            Далее
          </button>
        )}
      </div>
    </Container>
  );
}
