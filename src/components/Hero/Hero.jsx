import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero-section">
      <Container>
        <h1>Welcome to GeminiStore</h1>
        <p>Find the best products at the best prices.</p>
        <Button variant="primary" size="lg">Shop Now <FaArrowRight /></Button>
      </Container>
    </div>
  );
};

export default Hero;
