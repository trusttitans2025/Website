import React from 'react';
import Hero from '../components/Hero/Hero';
import FeaturedProducts from '../components/FeaturedProducts/FeaturedProducts';
import Categories from '../components/Categories/Categories';
import Deals from '../components/Deals/Deals';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <Categories />
      <Deals />
    </div>
  );
};

export default HomePage;