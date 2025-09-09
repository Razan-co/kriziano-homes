// src/components/SplashScreen.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/splash.css';

export default function SplashScreen() {
  const navigate = useNavigate();
  const [showLogo, setShowLogo] = useState(false);
  const [showSlide2, setShowSlide2] = useState(false);

  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setShowLogo(true);
    }, 2000); // Show logo after 3s

    const slide2Timer = setTimeout(() => {
      setShowSlide2(true);
    }, 3000); // Show slide 2 after 5s

    const loginTimer = setTimeout(() => {
      navigate('/login');
    }, 5000); // Navigate to login after 8s

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(slide2Timer);
      clearTimeout(loginTimer);
    };
  }, [navigate]);

  return (
    <div className="carousel">
      {!showSlide2 ? (
        <>
          <img src="/assets/slide1.png" alt="slide1" className="slide" />
          {showLogo && (
            <img src="/assets/KH logo.png" alt="logo" className="logo-cut-join" />
          )}
        </>
      ) : (
        <img src="/assets/slide2.png" alt="slide2" className="slide" />
      )}
    </div>
  );
}
