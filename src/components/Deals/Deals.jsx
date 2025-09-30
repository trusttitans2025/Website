import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { products } from '../../data/products';
import ProductCard from '../ProductCard/ProductCard';

const Deals = () => {
  const dealProducts = products.filter(product => product.discount).slice(0, 4);

  return (
    <div className="deals-section">
      <Container>
        <h2>Deals of the Day</h2>
        <Row>
          {dealProducts.map(product => (
            <Col key={product.id} sm={12} md={6} lg={3}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Deals;
