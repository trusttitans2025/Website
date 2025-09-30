import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { products } from '../data/products';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-detail-page">
      <Container>
        <Row>
          <Col md={6}>
            <Image src={product.image} fluid />
          </Col>
          <Col md={6}>
            <h2>{product.name}</h2>
            <p className="price">${product.price}</p>
            <p>{product.description}</p>
            <h5>Features</h5>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <Button variant="primary">Add to Cart</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductDetailPage;