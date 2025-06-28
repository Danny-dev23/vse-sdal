import React from "react";
import "../../../assents/styles/variables.css";
import "./task.css";
import TaskImg from "../../../assents/images/last-orders.png.png";
const Task = () => {
  return (
    <div className="task">
      <div className="custom-container">
        <div className="task-block">
          <div className="task-block__items">
            <div className="task-block__items-box">
              <div className="task-block__items-box__text">
                <h6 className="task-block__imtems-box__text-title">
                  Гели, как лекарственная форма. Особенности, технол…
                </h6>
                <p className="task-block__imtems-box__text-description">
                  Курсовая, Клиническая фармакология
                </p>
                <p className="task-block__imtems-box__text-term">
                  Срок сдачи к 20 мар.
                </p>
              </div>
              <div className="task-block__imtems-box__time">12 минут назад</div>
            </div>
            <div className="task-block__items-box">
              <div className="task-block__items-box__text">
                <h6 className="task-block__imtems-box__text-title">
                  Гели, как лекарственная форма. Особенности, технол…
                </h6>
                <p className="task-block__imtems-box__text-description">
                  Курсовая, Клиническая фармакология
                </p>
                <p className="task-block__imtems-box__text-term">
                  Срок сдачи к 20 мар.
                </p>
              </div>
              <div className="task-block__imtems-box__time">12 минут назад</div>
            </div>
            <div className="task-block__items-box">
              <div className="task-block__items-box__text">
                <h6 className="task-block__imtems-box__text-title">
                  Гели, как лекарственная форма. Особенности, технол…
                </h6>
                <p className="task-block__imtems-box__text-description">
                  Курсовая, Клиническая фармакология
                </p>
                <p className="task-block__imtems-box__text-term">
                  Срок сдачи к 20 мар.
                </p>
              </div>
              <div className="task-block__imtems-box__time">12 минут назад</div>
            </div>
            <div className="task-block__items-box">
              <div className="task-block__items-box__text">
                <h6 className="task-block__imtems-box__text-title">
                  Гели, как лекарственная форма. Особенности, технол…
                </h6>
                <p className="task-block__imtems-box__text-description">
                  Курсовая, Клиническая фармакология
                </p>
                <p className="task-block__imtems-box__text-term">
                  Срок сдачи к 20 мар.
                </p>
              </div>
              <div className="task-block__imtems-box__time">12 минут назад</div>
            </div>
            <div className="task-block__items-box">
              <div className="task-block__items-box__text">
                <h6 className="task-block__imtems-box__text-title">
                  Гели, как лекарственная форма. Особенности, технол…
                </h6>
                <p className="task-block__imtems-box__text-description">
                  Курсовая, Клиническая фармакология
                </p>
                <p className="task-block__imtems-box__text-term">
                  Срок сдачи к 20 мар.
                </p>
              </div>
              <div className="task-block__imtems-box__time">12 минут назад</div>
            </div>
            <div className="task-block__items-box">
              <div className="task-block__items-box__text">
                <h6 className="task-block__imtems-box__text-title">
                  Гели, как лекарственная форма. Особенности, технол…
                </h6>
                <p className="task-block__imtems-box__text-description">
                  Курсовая, Клиническая фармакология
                </p>
                <p className="task-block__imtems-box__text-term">
                  Срок сдачи к 20 мар.
                </p>
              </div>
              <div className="task-block__imtems-box__time">12 минут назад</div>
            </div>
          </div>
          <div className="task-block__image">
            <h2 className="task-block__image-title">
              Последние <br />
              размещенные задания
            </h2>
            <p className="task-block__image-description">
              Вы работаете с экспертами напрямую, не переплачивая <br />
              посредникам, поэтому наши цены в 2-3 раза ниже
            </p>
            <img src={TaskImg} alt="" className="task-block__image-img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
