import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from '../ProductCard/ProductCard';
import './ProductGrid.css';

const ProductGrid = ({ products }) => {
  return (
    <div className="product-grid">
      <Row>
        {products.map(product => (
          <Col key={product.id} sm={12} md={6} lg={4}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductGrid;
