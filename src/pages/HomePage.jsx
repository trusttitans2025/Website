import React from 'react';
import Hero from '../components/Hero/Hero';
import FeaturedProducts from '../components/FeaturedProducts/FeaturedProducts';
import Categories from '../components/Categories/Categories';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <Categories />
    </div>
  );
};

export default HomePage;