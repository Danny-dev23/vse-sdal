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
    }
  ];

  // Автоматическое переключение слайдов
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
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
            <div 
              className="info-slider__slides"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
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

          <button className="info-slider__nav info-slider__nav--next" onClick={nextSlide}>
            ›
          </button>
        </div>

        <div className="info-slider__dots">
          {slides.map((_, index) => (
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