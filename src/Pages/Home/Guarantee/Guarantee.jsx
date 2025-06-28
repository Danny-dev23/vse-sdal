import React from "react";
import "../../../assents/styles/variables.css";
import "./guarantee.css";
import SecurityImg from "../../../assents/images/Security.png"
import ShieldImg from "../../../assents/images/guarantees-shield.svg.png"
import GuaranteeImg from "../../../assents/images/Guarantee.png"
const Guarantee = () => {
  return (
    <div className="guarantee">
      <div className="custom-container">
        <div className="guarantee-block">
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
                <p className="guarantee-block__text-box__text-description">Деньги хранятся на вашем балансе во время работы над
                заданием и гарантийного срока</p>
              </div>
            </div>
            <div className="guarantee-block__text-box">
              <img src={ShieldImg} alt="" className="guarantee-block__text-box__img"/>
              <div className="guarantee-block__text-box__text">
                <h5 className="guarantee-block__text-box__text-title">Гарантия возврата денег</h5>
                <p className="guarantee-block__text-box__text-description">В случае, если что-то пойдет не так, мы гарантируем возврат
                полной уплаченной суммы</p>
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
