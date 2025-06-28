import React from 'react';

const AlertsExpert = () => {
  return (
    <div className="alerts-expert">
      <div className="alerts-expert__section">
        <h3 className="alerts-expert__title">Выполняемые предметы</h3>
        <div className="alerts-expert__input-group">
          <input
            type="text"
            placeholder="Введите название предмета по одному"
            className="alerts-expert__input"
          />
          <button className="alerts-expert__button">ДОБАВИТЬ</button>
        </div>
        <div className="alerts-expert__tags">
          <span className="alerts-expert__tag">Информатика</span>
          <span className="alerts-expert__tag">Программирование на заказах высокого уровня</span>
        </div>
      </div>

      <div className="alerts-expert__section">
        <h3 className="alerts-expert__title">Ключевые слова</h3>
        <input
          type="text"
          placeholder="Введите слова через запятую. Например: pascal, photoshop, автокад, 1С"
          className="alerts-expert__input"
        />
      </div>

      <div className="alerts-expert__section">
        <h3 className="alerts-expert__title">Оповещения о новых заказах</h3>
        <div className="alerts-expert__radio-group">
          <label className="alerts-expert__radio">
            <input type="radio" name="notifications" />
            Оповещать по эл. почте и на сайте
          </label>
          <label className="alerts-expert__radio">
            <input type="radio" name="notifications" />
            Оповещать по эл. почте
          </label>
          <label className="alerts-expert__radio">
            <input type="radio" name="notifications" />
            Оповещать на сайте
          </label>
          <label className="alerts-expert__radio">
            <input type="radio" name="notifications" />
            Не оповещать о новых заказах
          </label>
        </div>
        <label className="alerts-expert__checkbox">
          <input type="checkbox" />
          Группировать сообщения
        </label>
      </div>

      <div className="alerts-expert__section">
        <h3 className="alerts-expert__title">Настройка прочих оповещений</h3>
        <table className="alerts-expert__table">
          <thead>
            <tr>
              <th>Информация</th>
              <th>Эл. почта</th>
              <th>Telegram</th>
              <th>VK</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Уведомления</td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
            </tr>
            <tr>
              <td>Выбрали исполнителя</td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
            </tr>
            <tr>
              <td>Персональный заказ</td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
            </tr>
            <tr>
              <td>Остальные оповещения</td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
            </tr>
          </tbody>
        </table>
      </div>

      <button className="alerts-expert__save-button">СОХРАНИТЬ ИЗМЕНЕНИЯ</button>
    </div>
  );
};

export default AlertsExpert;