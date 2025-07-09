import React from 'react';
import './footer.css';
import Logo from "../../assents/images/Link.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="custom-container">
        <div className="footer-content">
          {/* Left section with logo and description */}
          <div className="footer-left">
            <div className="footer-logo">
              <img src={Logo} alt="Всё сдал!" />
              <span className="footer-logo-text">«Всё сдал!» — безопасный онлайн-сервис с проверенными экспертами</span>
            </div>
            
            <div className="footer-info">
              <p className="footer-usage">
                Используя «Всё сдал!», вы принимаете <a href="#" className="footer-link">пользовательское соглашение</a> и подтверждаете, что ознакомлены с <a href="#" className="footer-link">политикой конфиденциальности</a>.
              </p>
              <p className="footer-usage">
                Сайт работает по московскому времени с 10:00 до 23:00 ч. (пн-пт) и с 11:00 до 20:00 ч. (сб-вс).
              </p>
              <p className="footer-usage">
                Сайт работает по московскому времени 16 февраля 2025 г. 20:36
              </p>
            </div>

            <div className="footer-payment">
              <span>Принимаем к оплате:</span>
              <div className="payment-icons">
                <span className="payment-icon">VISA</span>
                <span className="payment-icon">MC</span>
                <span className="payment-icon">МИР</span>
                <span className="payment-icon">Мир</span>
                <span className="payment-icon">СБП</span>
              </div>
            </div>

            <div className="footer-copyright">
              <p>© 2011 - 2025 Всё сдал!</p>
              <p>Мы используем MaxMind</p>
            </div>

            <div className="footer-social">
              <div className="social-buttons">
                <button className="social-btn social-btn--vk">
                  <span>VK</span>
                  Скачать приложение
                </button>
                <button className="social-btn social-btn--telegram">
                  <span>📱</span>
                  Трейлер о сайте
                </button>
                <button className="social-btn social-btn--youtube">
                  <span>▶</span>
                  
                </button>
              </div>
            </div>
          </div>

          {/* Right section with links */}
          <div className="footer-right">
            <div className="footer-columns">
              <div className="footer-column">
                <h4>О проекте</h4>
                <ul>
                  <li><a href="#">Об оплате</a></li>
                  <li><a href="#">Безопасная сделка</a></li>
                  <li><a href="#">Гарантии</a></li>
                  <li><a href="#">Отзывы</a></li>
                  <li><a href="#">Каталог ВУЗов</a></li>
                  <li><a href="#">Исполнители</a></li>
                </ul>
              </div>

              <div className="footer-column">
                <h4>Помощь</h4>
                <ul>
                  <li><a href="#">Обучающая программа</a></li>
                  <li><a href="#">Контакты</a></li>
                  <li><a href="#">Блог</a></li>
                  <li><a href="#">Наши проекты</a></li>
                  <li><a href="#">Справочник</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-disclaimer">
            Эксперты сайта vsesdal.com проводят работу по подбору, обработке и структурированию материала по предложенной заказчиком теме. Результат данной работы не является готовым научным трудом, но может служить источником для его написания.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;