import React, { useContext } from 'react';
import { Container, Row, Col, Button, Image, Card } from 'react-bootstrap';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './CartPage.css';

const CartPage = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-page-wrapper">
      <Container>
        <h1 className="mb-4">Your Shopping Cart</h1>
        {cart.length > 0 ? (
          <Row>
            <Col lg={8}>
              {cart.map(item => (
                <Card key={item.id} className="cart-item-card mb-3">
                  <Card.Body>
                    <Row className="align-items-center">
                      <Col md={2}>
                        <Image src={item.image} thumbnail />
                      </Col>
                      <Col md={3}>
                        <h5>{item.name}</h5>
                      </Col>
                      <Col md={2} className="text-center">
                        <strong>${item.price.toFixed(2)}</strong>
                      </Col>
                      <Col md={3} className="d-flex justify-content-center align-items-center">
                        <Button variant="outline-secondary" size="sm" onClick={() => decreaseQuantity(item.id)}><FaMinus /></Button>
                        <span className="mx-3">{item.quantity}</span>
                        <Button variant="outline-secondary" size="sm" onClick={() => increaseQuantity(item.id)}><FaPlus /></Button>
                      </Col>
                      <Col md={1} className="text-end">
                        <Button variant="danger" size="sm" onClick={() => removeFromCart(item.id)}>
                          <FaTrash />
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </Col>
            <Col lg={4}>
              <Card className="cart-summary-card">
                <Card.Body>
                  <Card.Title as="h4">Order Summary</Card.Title>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <span>Subtotal</span>
                    <strong>${cartTotal.toFixed(2)}</strong>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <span>Shipping</span>
                    <strong>$5.00</strong>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between fw-bold">
                    <span>Total</span>
                    <span>${(cartTotal + 5).toFixed(2)}</span>
                  </div>
                  <div className="d-grid mt-4">
                    <Link to="/payment" className="btn btn-primary btn-lg">Proceed to Checkout</Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : (
          <div className="text-center empty-cart-container">
            <FaShoppingCart size={100} className="text-muted mb-4" />
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/products" className="btn btn-primary btn-lg">Continue Shopping</Link>
          </div>
        )}
      </Container>
    </div>
  );
};

export default CartPage;