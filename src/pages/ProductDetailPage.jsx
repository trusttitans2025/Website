import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { products } from '../data/products';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
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
            <Button variant="primary" onClick={handleAddToCart}>Add to Cart</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductDetailPage;