import React from 'react';
import '../css/ReviewPage.css';

const ReviewPage = () => {
  
  return (
    <div className="review-page">
      {/* Left Section */}
      <div className="left">
        <button className="back-btn">&larr;</button>
        <h2>Ratings & Reviews</h2>

        <div className="overview">
          <div className="star-bars">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="star-bar">
                <span>{star}</span>
                <div className="bar-bg">
                  <div className="bar-fill"></div>
                </div>
              </div>
            ))}
          </div>
          <div className="summary">
            <div className="avg-score">4.0</div>
            <div className="stars">
              {[...Array(4)].map((_, i) => <span key={i}>★</span>)}
              <span>☆</span>
            </div>
            <p>52 Reviews</p>
          </div>
        </div>

        <div className="reviews">
          {[1, 2, 3, 4].map((_, idx) => (
            <div key={idx} className="review-item">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="user"
                />
              <div>
                <div className="review-header">
                  <strong>Cameron Williamson</strong>
                  <div className="stars">★★★★★</div>
                  <span className="rating">(4.8)</span>
                  <span className="time">2 mins ago</span>
                </div>
                <p className="review-text">
                  Consequat velit qui adipisicing sunt do reprehenderit ad laborum tempor ullamco.
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="read-all">Read all 1415 reviews</p>

        <div className="rate-it">
          <p>How do you rate this product</p>
          <div className="rate-stars">☆☆☆☆☆</div>
        </div>
      </div>

      {/* Right Section */}
      <div className="right">
        <div className="write-review">
          <div className="product-info">
            <img src="https://via.placeholder.com/60" alt="product" />
            <div>
              <h4>Modern Chairs</h4>
              <div className="stars">☆☆☆☆☆</div>
            </div>
          </div>
          <textarea placeholder="Write a review"></textarea>
        </div>

        <div className="add-photo">
          <h4>Add a Photo</h4>
          <p className="small">Image Instruction</p>
          <ol className="instructions">
            <li>Ensure uploaded images are relevant to the product.</li>
            <li>Poor quality/irrelevant images will be rejected.</li>
            <li>Max upload: 10 images.</li>
          </ol>
          <div className="upload-container">
            <div className="upload-box">+</div>
            <img src="https://via.placeholder.com/60" alt="uploaded" />
          </div>
          <p className="upload-text">Upload Photos(1)</p>
        </div>

        <button className="post-btn">Post your Review</button>
      </div>
    </div>
  );
};

export default ReviewPage;
