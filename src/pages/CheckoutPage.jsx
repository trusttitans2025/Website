import React, { useContext } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { user } = useContext(AuthContext);
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    const newOrder = {
      orderId: `ORD-${Date.now()}`,
      userId: user.email,
      products: cart.map(product => ({
        productId: product.id,
        quantity: 1, // Assuming quantity is 1 for now
        price: product.price
      })),
      totalAmount: cart.reduce((total, product) => total + product.price, 0),
      orderDate: new Date().toISOString().split('T')[0],
      deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3 days from now
      status: 'pending',
      transactionId: `TXN-${Date.now()}`,
      paymentMethod: 'Credit Card',
      shippingAddress: 'Full address' // Dummy address
    };

    console.log('New Order:', newOrder);
    clearCart();
    navigate('/');
  };

  return (
    <div className="checkout-page">
      <Container>
        <h2>Checkout</h2>
        <Row>
          <Col md={8}>
            <h4>Shipping Information</h4>
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First Name" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Last Name" />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="Address" />
              </Form.Group>
              <Row>
                <Col md={5}>
                  <Form.Group className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="City" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>State</Form.Label>
                    <Form.Control type="text" placeholder="State" />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control type="text" placeholder="Zip" />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col md={4}>
            <h4>Payment Information</h4>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Card Number</Form.Label>
                <Form.Control type="text" placeholder="Card Number" />
              </Form.Group>
              <Row>
                <Col md={7}>
                  <Form.Group className="mb-3">
                    <Form.Label>Expiration Date</Form.Label>
                    <Form.Control type="text" placeholder="MM/YY" />
                  </Form.Group>
                </Col>
                <Col md={5}>
                  <Form.Group className="mb-3">
                    <Form.Label>CVV</Form.Label>
                    <Form.Control type="text" placeholder="CVV" />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <div className="text-center mt-4">
          <Button variant="primary" size="lg" onClick={handlePlaceOrder}>Place Order</Button>
        </div>
      </Container>
    </div>
  );
};

export default CheckoutPage;