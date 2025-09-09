import React from 'react';
import '../css/GetStarted.css';
import { Link } from 'react-router-dom';

const GetStarted = () => {
     
  return (
    <div className="get-started-wrapper">
      {/* Background Image */}
      <img src="/assets/Kriziano Homes.png" alt="Chair Scene" className="background-image" />
      <img src="/assets/Group 1000003480.png" alt="line" className="line-image" />

      {/* Get Started Button + Arrow */}
      <div className="cta-button">
        <Link to="/signup" className="button-circle">Get started</Link>
        <div className="arrow"></div>
      </div>
    </div>
  );
};

export default GetStarted;