import React from "react";
import "../../../assents/styles/variables.css";
import "./guarantee.css";
import SecurityImg from "../../../assents/images/Security.png";
import ShieldImg from "../../../assents/images/guarantees-shield.svg.png";
import GuaranteeImg from "../../../assents/images/Guarantee.png";

const Guarantee = () => {
  return (
    <div className="guarantee">
      <div className="custom-container">
        <div className="guarantee-block">
          {/* Dotted lines */}
          <div className="dotted-line dotted-line--1"></div>
          <div className="dotted-line dotted-line--2"></div>
          <div className="dotted-line dotted-line--3"></div>
          <div className="dotted-line dotted-line--4"></div>
          <div className="dotted-line dotted-line--5"></div>

          {/* Floating elements */}
          <div className="floating-element floating-element--top-right">
            <div className="floating-element__icon">
              <img src={SecurityImg} alt="Security" />
            </div>
            <div className="floating-element__text">
              Разместите заказ и получите предложения с ценами экспертов
            </div>
          </div>

          <div className="floating-element floating-element--middle-right">
            <div className="floating-element__icon">
              <img src={ShieldImg} alt="Shield" />
            </div>
            <div className="floating-element__text">
              Выберите эксперта по цене и отзывам
            </div>
          </div>

          <div className="floating-element floating-element--bottom-left">
            <div className="floating-element__icon">
              <img src={SecurityImg} alt="Security" />
            </div>
            <div className="floating-element__text">
              Сдайте работу на проверку преподавателю
            </div>
          </div>

          <div className="floating-element floating-element--bottom-right">
            <div className="floating-element__icon">
              <img src={ShieldImg} alt="Shield" />
            </div>
            <div className="floating-element__text">
              Получите положительную оценку, оплатите работу и оставьте отзыв эксперту
            </div>
          </div>

          <div className="floating-element floating-element--center-right">
            <div className="floating-element__icon">
              <img src={SecurityImg} alt="Security" />
            </div>
            <div className="floating-element__text">
              Качественная работа с гарантией возврата денег
            </div>
          </div>

          <div className="guarantee-block__text">
            <h4 className="guarantee-block__text-title">
              Гарантия возврата денег
            </h4>
            <p className="guarantee-block__text-description">
              Эксперт получил деньги за заказ, а работу не выполнил? Только не у
              нас!
            </p>
            <div className="guarantee-block__text-box">
              <img src={SecurityImg} alt="" className="guarantee-block__text-box__img"/>
              <div className="guarantee-block__text-box__text">
                <h5 className="guarantee-block__text-box__text-title">Безопасная сделка</h5>
                <p className="guarantee-block__text-box__text-description">
                  Деньги хранятся на вашем балансе во время работы над
                  заданием и гарантийного срока
                </p>
              </div>
            </div>
            <div className="guarantee-block__text-box">
              <img src={ShieldImg} alt="" className="guarantee-block__text-box__img"/>
              <div className="guarantee-block__text-box__text">
                <h5 className="guarantee-block__text-box__text-title">Гарантия возврата денег</h5>
                <p className="guarantee-block__text-box__text-description">
                  В случае, если что-то пойдет не так, мы гарантируем возврат
                  полной уплаченной суммы
                </p>
              </div>
            </div>
          </div>
          <div className="guarantee-block__image">
            <img src={GuaranteeImg} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guarantee;