import React, { useContext, useEffect } from 'react';
import { Container, Row, Col, Button, Image, Table } from 'react-bootstrap';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import './CartPage.css';

const CartPage = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <div className="cart-page-wrapper">
      <Container>
        <h1 className="mb-4">Shopping Cart</h1>
        {cart.length > 0 ? (
          <Row>
            <Col lg={8}>
              <Table responsive className="cart-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th className="text-center">Quantity</th>
                    <th className="text-end">Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => (
                    <tr key={item.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <Image src={item.image} thumbnail width="100" />
                          <span className="ms-3">{item.name}</span>
                        </div>
                      </td>
                      <td>${item.price.toFixed(2)}</td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center align-items-center">
                          <Button variant="outline-secondary" size="sm" onClick={() => decreaseQuantity(item.id)}><FaMinus /></Button>
                          <span className="mx-3">{item.quantity}</span>
                          <Button variant="outline-secondary" size="sm" onClick={() => increaseQuantity(item.id)}><FaPlus /></Button>
                        </div>
                      </td>
                      <td className="text-end">${(item.price * item.quantity).toFixed(2)}</td>
                      <td className="text-center">
                        <Button variant="danger" size="sm" onClick={() => removeFromCart(item.id)}>
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
            <Col lg={4}>
              <div className="order-summary-wrapper">
                <h4>Order Summary</h4>
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
              </div>
            </Col>
          </Row>
        ) : (
          <div className="text-center empty-cart-container">
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