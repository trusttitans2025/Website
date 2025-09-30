import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (user) {
      addToCart(product);
      navigate('/cart');
    } else {
      navigate('/login');
    }
  };

  return (
    <Card className="product-card h-100">
      <Link to={`/products/${product.id}`}>
        <Card.Img variant="top" src={product.image} />
      </Link>
      <Card.Body className="d-flex flex-column">
        <Card.Title as={Link} to={`/products/${product.id}`}>{product.name}</Card.Title>
        <Card.Text>{product.category}</Card.Text>
        <div className="mt-auto">
          <div className="text-center mb-2">
            <Card.Text className="price mb-0">${product.price}</Card.Text>
          </div>
          <Button variant="primary" onClick={handleAddToCart} className="w-100">Add to Cart</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
