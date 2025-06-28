import React from "react";
import "../../../assents/styles/variables.css";
import "./help.css";
import HelpImg from "../../../assents/images/help-task-pencil.png.png";
import SmailImg from "../../../assents/images/smile-winking.png.png";
const Help = () => {
  return (
    <div className="help">
      <div className="custom-container">
        <div className="help-box">
          <div className="help-box__images">
            <img src={HelpImg} alt="" className="help-box__img" />
          </div>
          <div className="help-box__text">
            <p className="help-box__text-title">
              Поможем вам со сложной задачкой 
              <img
                src={SmailImg}
                alt=""
                className="help-box__title-title__img"
              />
            </p>
          </div>
          <div className="help-box__button">
            <button className="help-box__button-btn">Узнать стоимость</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
