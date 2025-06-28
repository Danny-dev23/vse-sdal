import React from "react";
import "../../../assents/styles/variables.css";
import "./price.css";
import PriceImg from "../../../assents/images/homepage-price-list-bg.png.png";
const Price = () => {
  return (
    <div className="price">
      <div className="custom-container">
        <div className="price-block">
          <div className="price-block__images">
            <div className="price-block__images-text">
              <h2 className="price-block__image-title">
                Цены ниже – <br /> качество выше!
              </h2>
              <p className="price-block__image-description">
                Работайте с проверенными экспертами <br /> без посредников
              </p>
            </div>
            <img src={PriceImg} alt="" className="price-block__image-img" />
          </div>
          <div className="price-block__conditions">
            <div className="price-block__conditions-box">
              <p className="price-block__conditions-box__title">
                Консультации и помощь с курсовой
              </p>
              <div className="price-block__conditions-box__items">
                <div className="price-block__conditions-box__items-box__title">
                  <p className="price-block__conditions-box__items-title">
                    <span className="price-block__conditions-box__items-title__description">
                      От
                    </span>
                    400 руб.
                  </p>
                  <p className="price-block__conditions-box__items-title">
                    <span className="price-block__conditions-box__items-title__description">
                      От
                    </span>
                    3 дней
                  </p>
                </div>
                <div className="price-block__conditions-box__items-box__button">
                  <button className="price-block__conditions-box__items-box__button-btn">
                    Узнать стоимость
                  </button>
                </div>
              </div>
            </div>
            <div className="price-block__conditions-box">
              <p className="price-block__conditions-box__title">
                Консультации и помощь с курсовой
              </p>
              <div className="price-block__conditions-box__items">
                <div className="price-block__conditions-box__items-box__title">
                  <p className="price-block__conditions-box__items-title">
                    <span className="price-block__conditions-box__items-title__description">
                      От
                    </span>
                    400 руб.
                  </p>
                  <p className="price-block__conditions-box__items-title">
                    <span className="price-block__conditions-box__items-title__description">
                      От
                    </span>
                    3 дней
                  </p>
                </div>
                <div className="price-block__conditions-box__items-box__button">
                  <button className="price-block__conditions-box__items-box__button-btn">
                    Узнать стоимость
                  </button>
                </div>
              </div>
            </div>
            <div className="price-block__conditions-box">
              <p className="price-block__conditions-box__title">
                Консультации и помощь с курсовой
              </p>
              <div className="price-block__conditions-box__items">
                <div className="price-block__conditions-box__items-box__title">
                  <p className="price-block__conditions-box__items-title">
                    <span className="price-block__conditions-box__items-title__description">
                      От
                    </span>
                    400 руб.
                  </p>
                  <p className="price-block__conditions-box__items-title">
                    <span className="price-block__conditions-box__items-title__description">
                      От
                    </span>
                    3 дней
                  </p>
                </div>
                <div className="price-block__conditions-box__items-box__button">
                  <button className="price-block__conditions-box__items-box__button-btn">
                    Узнать стоимость
                  </button>
                </div>
              </div>
            </div>
            <div className="price-block__conditions-box">
              <p className="price-block__conditions-box__title">
                Консультации и помощь с курсовой
              </p>
              <div className="price-block__conditions-box__items">
                <div className="price-block__conditions-box__items-box__title">
                  <p className="price-block__conditions-box__items-title">
                    <span className="price-block__conditions-box__items-title__description">
                      От
                    </span>
                    400 руб.
                  </p>
                  <p className="price-block__conditions-box__items-title">
                    <span className="price-block__conditions-box__items-title__description">
                      От
                    </span>
                    3 дней
                  </p>
                </div>
                <div className="price-block__conditions-box__items-box__button">
                  <button className="price-block__conditions-box__items-box__button-btn">
                    Узнать стоимость
                  </button>
                </div>
              </div>
            </div>
            <div className="price-block__conditions-button">
              <button className="price-block__conditions-button__btn">
                Смотреть все типы заданий
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Price;
