import React, { useState } from 'react';
import '../css/Rating.css';
import { FaStar } from 'react-icons/fa';

export default function Rating() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [review, setReview] = useState('');

  const reviews = [
    {
      name: 'Courtney Henry',
      rating: 4.8,
      time: '2 mins ago',
      text: 'Consequat velit qui adipisicing sunt do rependerit ad laborum tempor ullamco exercitation.',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      name: 'Cameron Williamson',
      rating: 4.8,
      time: '2 mins ago',
      text: 'Consequat velit qui adipisicing sunt do rependerit ad laborum tempor ullamco.',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    },
    {
      name: 'Cameron Williamson',
      rating: 4.8,
      time: '2 mins ago',
      text: 'Consequat velit qui adipisicing sunt do rependerit ad laborum tempor ullamco.',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    },
  ];

  const handleSubmit = () => {
    console.log('Review submitted:', { rating, review });
    setReview('');
    setRating(0);
  };

  return (
    <div className="rating-page">
      <div className="left-section">
        <div className="rating-summary">
          <div>
            <h2>Ratings & Reviews</h2>
            {[5, 4, 3, 2, 1].map((num) => (
              <div key={num} className="star-row">
                <span>{num} <FaStar color="#f5a623" /></span>
                <div className="star-bar" style={{ width: `${num * 10}%` }}></div>
              </div>
            ))}
          </div>
          <div className="stars-overall">
            <span style={{ fontSize: '2rem' }}>4.0</span>
            <div>
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} color={i < 4 ? '#f5a623' : '#ccc'} />
              ))}
            </div>
            <small>52 Reviews</small>
          </div>
        </div>

        {reviews.map((r, i) => (
          <div className="review-card" key={i}>
            <img src={r.avatar} alt={r.name} />
            <div className="review-content">
              <h4>{r.name}</h4>
              <div className="review-meta">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} color={i < Math.floor(r.rating) ? '#f5a623' : '#ccc'} />
                ))}
                <span style={{ marginLeft: 8 }}>({r.rating}) {r.time}</span>
              </div>
              <p className="review-text">{r.text}</p>
            </div>
          </div>
        ))}

        <div className="read-more">Read all 1415 reviews →</div>
      </div>

      <div className="right-section">
        <div className="product-review">
          <img src="/assets/product.jpg" alt="Product" />
          <div className="product-title">Modern Chairs</div>
        </div>

        <div className="star-input">
          {[...Array(5)].map((_, i) => {
            const starValue = i + 1;
            return (
              <FaStar
                key={i}
                className={starValue <= (hover || rating) ? 'active' : ''}
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHover(starValue)}
                onMouseLeave={() => setHover(null)}
              />
            );
          })}
        </div>

        <textarea
          className="review-textarea"
          placeholder="Write a review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <button className="submit-btn" onClick={handleSubmit}>
          Post your Review
        </button>
      </div>
    </div>
  );
}
