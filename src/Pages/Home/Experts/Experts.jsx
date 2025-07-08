import React from "react";
import "../../../assents/styles/variables.css";
import "./experts.css";

const Experts = () => {
  const experts = [
    {
      id: 1,
      name: "Максим 1985",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      experience: "С нами с 2018 года",
      studentsHelped: "18 659",
      rating: "264 019",
      averageRating: "4.95 из 5",
      reviews: "13 262 оценки",
      badge: "Золотой",
      badgeColor: "#FFD700"
    },
    {
      id: 2,
      name: "Алексей",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      experience: "С нами с 2017 года",
      studentsHelped: "22 964",
      rating: "243 413",
      averageRating: "4.92 из 5",
      reviews: "11 306 оценок",
      badge: "Золотой",
      badgeColor: "#FFD700"
    },
    {
      id: 3,
      name: "Ольга",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      experience: "С нами с 2018 года",
      studentsHelped: "4 801",
      rating: "50 355",
      averageRating: "4.88 из 5",
      reviews: "2 600 оценок",
      badge: "Золотой",
      badgeColor: "#FFD700"
    },
    {
      id: 4,
      name: "Анна",
      avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      experience: "С нами с 2019 года",
      studentsHelped: "3 623",
      rating: "46 996",
      averageRating: "4.82 из 5",
      reviews: "2 208 оценок",
      badge: "Золотой",
      badgeColor: "#FFD700"
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="star star--filled">★</span>);
      } else {
        stars.push(<span key={i} className="star star--empty">☆</span>);
      }
    }
    return stars;
  };

  return (
    <div className="experts">
      <div className="custom-container">
        <div className="experts-block">
          <div className="experts-block__text">
            <h2 className="experts-block__text-title">
              Переживаете<br />
              за доработки?<br />
              Они бесплатны
            </h2>
            <p className="experts-block__text-description">
              С вами будут работать лучшие эксперты.<br />
              Они знают и понимают, что получат деньги<br />
              после вашего подтверждения. Поэтому работу<br />
              доводят до конца
            </p>
            <button className="experts-block__button">
              ПОСМОТРЕТЬ ВСЕХ ЭКСПЕРТОВ
            </button>
          </div>
          
          <div className="experts-block__cards">
            <div className="experts-grid">
              {experts.map((expert) => (
                <div key={expert.id} className="expert-card">
                  <div className="expert-card__avatar">
                    <img src={expert.avatar} alt={expert.name} />
                    <div 
                      className="expert-card__badge"
                      style={{ backgroundColor: expert.badgeColor }}
                    >
                      {expert.badge}
                    </div>
                  </div>
                  
                  <div className="expert-card__content">
                    <h3 className="expert-card__name">{expert.name}</h3>
                    <p className="expert-card__experience">{expert.experience}</p>
                    
                    <div className="expert-card__stats">
                      <div className="expert-card__stat">
                        <span className="expert-card__stat-label">Помог студентам:</span>
                        <span className="expert-card__stat-value">{expert.studentsHelped}</span>
                      </div>
                      
                      <div className="expert-card__stat">
                        <span className="expert-card__stat-label">Рейтинг:</span>
                        <span className="expert-card__stat-value">{expert.rating}</span>
                      </div>
                      
                      <div className="expert-card__rating">
                        <span className="expert-card__stat-label">Средняя:</span>
                        <span className="expert-card__stat-value">{expert.averageRating}</span>
                      </div>
                      
                      <div className="expert-card__stars">
                        {renderStars(parseFloat(expert.averageRating))}
                        <span className="expert-card__reviews">{expert.reviews}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="experts-block__note">
              <p>Обращайтесь внимание на отзывы и рейтинг исполнителя</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experts;