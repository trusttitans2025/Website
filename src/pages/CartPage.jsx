import React from 'react';
import { Container, Row, Col, Table, Button, Image } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import './CartPage.css';

const CartPage = () => {
  const cartItems = [
    { id: 1, name: 'Product 1', price: 25.00, quantity: 2, image: 'https://via.placeholder.com/100x100' },
    { id: 2, name: 'Product 2', price: 50.00, quantity: 1, image: 'https://via.placeholder.com/100x100' },
  ];

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <Container>
        <h2>Shopping Cart</h2>
        <Row>
          <Col md={8}>
            <Table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id}>
                    <td>
                      <Image src={item.image} thumbnail width="100" />
                      <span className="ms-3">{item.name}</span>
                    </td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>{item.quantity}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <Button variant="danger" size="sm">
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col md={4}>
            <div className="cart-summary">
              <h4>Cart Summary</h4>
              <p><strong>Subtotal:</strong> ${cartTotal.toFixed(2)}</p>
              <p><strong>Shipping:</strong> $5.00</p>
              <p><strong>Total:</strong> ${(cartTotal + 5).toFixed(2)}</p>
              <Button variant="primary" block>Proceed to Checkout</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CartPage;