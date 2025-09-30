import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { products } from '../../data/products';
import ProductCard from '../ProductCard/ProductCard';
import './FeaturedProducts.css';

const FeaturedProducts = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="featured-products">
      <Container>
        <h2>Featured Products</h2>
        <Row>
          {featuredProducts.map(product => (
            <Col key={product.id} sm={12} md={6} lg={3}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default FeaturedProducts;
