import React, { useState, useEffect } from "react";
import "./infoSlider.css";

const InfoSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      category: "ПЕРЕВОД С ИН. ЯЗЫКА",
      title: "Правила оформления переводов текста",
      items: [
        "Что нужно знать о качественном переводе текстов с английского на русский",
        "Другая полезная информация для вашего перевода"
      ],
      buttonText: "УЗНАТЬ СТОИМОСТЬ"
    },
    {
      id: 2,
      category: "ДИПЛОМ",
      title: "Как составить план дипломной работы",
      items: [
        "Оформление страниц в дипломной работе по ГОСТу 2022",
        "Темы дипломных работ по экономике предприятия, экономическому анализу",
        "Другая полезная информация для вашего диплома"
      ],
      buttonText: "УЗНАТЬ СТОИМОСТЬ"
    },
    {
      id: 3,
      category: "КУРСОВАЯ",
      title: "Методические указания по написанию курсовой",
      items: [
        "Структура и содержание курсовой работы",
        "Требования к оформлению по ГОСТу",
        "Другая полезная информация для вашей курсовой"
      ],
      buttonText: "УЗНАТЬ СТОИМОСТЬ"
    },
    {
      id: 4,
      category: "РЕФЕРАТ",
      title: "Правила написания реферата",
      items: [
        "Структура и план реферата",
        "Оформление списка литературы",
        "Другая полезная информация для вашего реферата"
      ],
      buttonText: "УЗНАТЬ СТОИМОСТЬ"
    },
    {
      id: 5,
      category: "КОНТРОЛЬНАЯ",
      title: "Методика выполнения контрольных работ",
      items: [
        "Требования к оформлению контрольной работы",
        "Примеры решения типовых задач",
        "Другая полезная информация для вашей контрольной"
      ],
      buttonText: "УЗНАТЬ СТОИМОСТЬ"
    },
    {
      id: 6,
      category: "ЭССЕ",
      title: "Как написать качественное эссе",
      items: [
        "Структура и композиция эссе",
        "Аргументация и примеры",
        "Другая полезная информация для вашего эссе"
      ],
      buttonText: "УЗНАТЬ СТОИМОСТЬ"
    }
  ];

  // Количество слайдов для показа (по 2 карточки)
  const slidesToShow = 2;
  const maxSlide = Math.ceil(slides.length / slidesToShow) - 1;

  // Автоматическое переключение слайдов
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [maxSlide]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
  };

  // Получить слайды для текущего показа
  const getCurrentSlides = () => {
    const startIndex = currentSlide * slidesToShow;
    return slides.slice(startIndex, startIndex + slidesToShow);
  };

  return (
    <div className="info-slider">
      <div className="custom-container">
        <div className="info-slider__header">
          <h2 className="info-slider__title">
            Советы по написанию и защите работ для студента
          </h2>
        </div>

        <div className="info-slider__container">
          <button className="info-slider__nav info-slider__nav--prev" onClick={prevSlide}>
            ‹
          </button>

          <div className="info-slider__content">
            <div className="info-slider__slides-wrapper">
              <div className="info-slider__slides-grid">
                {getCurrentSlides().map((slide) => (
                  <div key={slide.id} className="info-slider__slide">
                    <div className="info-slider__card">
                      <div className="info-slider__card-header">
                        <span className="info-slider__category">{slide.category}</span>
                      </div>
                      
                      <div className="info-slider__card-content">
                        <h3 className="info-slider__card-title">{slide.title}</h3>
                        
                        <ul className="info-slider__list">
                          {slide.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="info-slider__list-item">
                              <a href="#" className="info-slider__link">{item}</a>
                            </li>
                          ))}
                        </ul>
                        
                        <button className="info-slider__button">
                          {slide.buttonText}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button className="info-slider__nav info-slider__nav--next" onClick={nextSlide}>
            ›
          </button>
        </div>

        <div className="info-slider__dots">
          {Array.from({ length: maxSlide + 1 }, (_, index) => (
            <button
              key={index}
              className={`info-slider__dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoSlider;