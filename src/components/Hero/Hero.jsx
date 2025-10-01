import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>Welcome to GeminiStore</h1>
        <p>Find the best products at the best prices.</p>
        <Link to="/products" className="btn btn-primary btn-lg">Shop Now</Link>
      </div>
    </div>
  );
};

export default Hero;
