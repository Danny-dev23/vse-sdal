import React from "react";
import "../../../assents/styles/variables.css";
import "./about.css";
import AboutImg from "../../../assents/images/computer_man_right.svg.png";
import Rating from "../../../assents/images/rating.png";
import Radius from "../../../assents/images/Border.png";
const About = () => {
  return (
    <div className="about-bg">
      <div className="custom-container">
        <div className="about">
          <div className="about-block__image">
            <div className="about-block__image-box">
              <h2 className="about-block__image-title">
                Разместите задание, а мы подберём эксперта
              </h2>
              <p className="about-block__image-description">
                Сайт бесплатно разошлёт задание экспертам. А эксперты предложат
                цены. Это удобнее, чем искать кого-<br/> то в Интернете
              </p>
            </div>
            <img src={AboutImg} alt="" className="about-block__image-img" />
          </div>
          <div className="about-block-text">
            <div className="about-block-text__box">
              <div className="about-block-text__box-image">
                <img
                  src={Radius}
                  alt=""
                  className="about-block-text__box-img"
                />
                <p className="about-block-text__box-img__number">1</p>
              </div>
              <div className="about-block-text__box-text">
                <h4 className="about-block-text__box-text__title">
                  Тысячи отзывов о нашей работе
                </h4>
                <p className="about-block-text__box-text__description">
                  <img src={Rating} alt="" />
                  <img src={Rating} alt="" />
                  <img src={Rating} alt="" />
                  <img src={Rating} alt="" />
                  <img src={Rating} alt="" />
                  <span className="about-block-text__box-text__description-span">
                    811 494 оценки
                  </span>
                  <span className="about-block-text__box-text__description-span">
                    среднее 4,9 из 5
                  </span>
                </p>
              </div>
            </div>
            <div className="about-block-text__box">
              <div className="about-block-text__box-image">
                <img
                  src={Radius}
                  alt=""
                  className="about-block-text__box-img"
                />
                <p className="about-block-text__box-img__number">2</p>
              </div>
              <div className="about-block-text__box-text">
                <h4 className="about-block-text__box-text__title">
                  Отклик экспертов с первых минут
                </h4>
                <p className="about-block-text__box-text__description">
                  С нами работают более 15 000 проверенных экспертов с высшим
                  образованием. Вы можете выбрать исполнителя уже через 15 минут
                  после публикации заказа. Срок исполнения — от 1 часа
                </p>
              </div>
            </div>
            <div className="about-block-text__box">
              <div className="about-block-text__box-image">
                <img
                  src={Radius}
                  alt=""
                  className="about-block-text__box-img"
                />
                <p className="about-block-text__box-img__number">3</p>
              </div>
              <div className="about-block-text__box-text">
                <h4 className="about-block-text__box-text__title">
                  Цены ниже в 2-3 раза
                </h4>
                <p className="about-block-text__box-text__description">
                  Вы работаете с экспертами напрямую, поэтому цены ниже, чем в
                  агентствах
                </p>
              </div>
            </div>
            <div className="about-block-text__box">
              <div className="about-block-text__box-image">
                <img
                  src={Radius}
                  alt=""
                  className="about-block-text__box-img"
                />
                <p className="about-block-text__box-img__number">4</p>
              </div>
              <div className="about-block-text__box-text">
                <h4 className="about-block-text__box-text__title">
                  Доработки и консультации – бесплатны
                </h4>
                <p className="about-block-text__box-text__description">
                  Доработки и консультации в рамках задания бесплатны и
                  выполняются в максимально короткие сроки
                </p>
              </div>
            </div>
            <div className="about-block-text__box">
              <div className="about-block-text__box-image">
                <img
                  src={Radius}
                  alt=""
                  className="about-block-text__box-img"
                />
                <p className="about-block-text__box-img__number">5</p>
              </div>
              <div className="about-block-text__box-text">
                <h4 className="about-block-text__box-text__title">
                  Гарантия возврата денег
                </h4>
                <p className="about-block-text__box-text__description">
                  Если эксперт не справится — мы вернем 100% стоимости
                </p>
              </div>
            </div>
            <div className="about-block-text__box">
              <div className="about-block-text__box-image">
                <img
                  src={Radius}
                  alt=""
                  className="about-block-text__box-img"
                />
                <p className="about-block-text__box-img__number">6</p>
              </div>
              <div className="about-block-text__box-text">
                <h4 className="about-block-text__box-text__title">
                  На связи 7 дней в неделю
                </h4>
                <p className="about-block-text__box-text__description">
                  Вы всегда можете к нам обратиться — и в выходные, и в
                  праздники
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
