import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './CheckoutPage.css';

const CheckoutPage = () => {
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
          <Button variant="primary" size="lg">Place Order</Button>
        </div>
      </Container>
    </div>
  );
};

export default CheckoutPage;