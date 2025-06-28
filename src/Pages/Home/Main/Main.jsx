import React from "react";
import "./main.css";
import "../../../assents/styles/variables.css";
import MainBg from "../../../assents/images/Container-main.png"
import Arrow from "../../../assents/images/arrow-left.svg.png"
const Main = () => {
  return (
    <div className="main">
      <div className="custom-container">
        <div className="main-block">
          <div className="main-block__text">
            <h1 className="main-block__text-title">
              «Всё сдал!» — онлайн-сервис
              <br />
              помощи студентам.
            </h1>
            <p className="main-block__text-description">
              Здесь эксперты помогают и консультируют по учёбе без
              <br />
              посредников
            </p>
            <div className="main-block__text-statistics">
              <div className="main-block__text-statistics__box">
                <h3 className="main-block__text-statistics__box-title">
                  460 972
                </h3>
                <strong className="main-block__text-statistics__box-designation">
                  студента
                </strong>
                <p className="main-block__text-statistics__box-description">
                  обратились к нам <br/> за последний год
                </p>
              </div>
              <div className="main-block__text-statistics__box">
                <h3 className="main-block__text-statistics__box-title">
                  380 981
                </h3>
                <strong className="main-block__text-statistics__box-designation">
                  эксперт
                </strong>
                <p className="main-block__text-statistics__box-description">
                  работают с нашим <br/> сервисом
                </p>
              </div>
              <div className="main-block__text-statistics__box">
                <h3 className="main-block__text-statistics__box-title">
                  2 320 999
                </h3>
                <strong className="main-block__text-statistics__box-designation">
                  заданий и <br/> консультаций
                </strong>
                <p className="main-block__text-statistics__box-description">
                  выполнено и сдано
                </p>
              </div>
            </div>
            <div className="main-block__text-button">
              <button className="main-block__text-button__btn-one">Разместить задание</button>
              <button className="main-block__text-button__btn-two">Стать экспертом</button>
            </div>
          </div>
          <div className="main-block__image">
            <img src={MainBg} alt="" />
            <p className="main-block__description">
            Жизнь становится проще, <br/>
            когда разместил задание на «Всё сдал!»
            <img src={Arrow} alt=""  className="main-block-description-arrow"/>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
