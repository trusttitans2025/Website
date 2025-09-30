import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <Card className="product-card">
      <Link to={`/products/${product.id}`}>
        <Card.Img variant="top" src={product.image} />
      </Link>
      <Card.Body>
        <Card.Title as={Link} to={`/products/${product.id}`}>{product.name}</Card.Title>
        <Card.Text>{product.category}</Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <Card.Text className="price">${product.price}</Card.Text>
          <Button variant="primary">Add to Cart</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
