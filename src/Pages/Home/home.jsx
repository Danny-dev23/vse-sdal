import React from "react";
import Main from "./Main/Main";
import Lamp from "../../assents/images/lamp.svg.png";
import "./Main/main.css"
import About from "./About/About";
import Price from "./Price/Price";
import Task from "./Task/Task";
import Help from "../Home/Help/Help.jsx"
import Guarantee from "./Guarantee/Guarantee.jsx";
const home = () => {
  return (
    <div>
      <div className="header-main">
        <img src={Lamp} alt="" className="header-main__image" />
        <span className="header-main__description">
          Эксперты сайта «Всё сдал!» проводят работу по подбору, обработке и
          структурированию материала по предложенной заказчиком теме.<br/> Результат
          данной работы не является готовым научным трудом, но может служить
          источником для его написания.
        </span>
      </div>
      <Main />
      <About />
      <Price/>
      <Task/>
      <Help/>
      <Guarantee/>
    </div>
  );
};

export default home;
