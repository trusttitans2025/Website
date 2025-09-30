import React, { useState, useContext } from 'react';
import { Container, Button, Spinner, Alert, Form, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FaCreditCard, FaPaypal, FaGoogle } from 'react-icons/fa';
import './PaymentPage.css';

const PaymentPage = () => {
  const [paying, setPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const { clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handlePayment = (e) => {
    e.preventDefault();
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      setPaymentSuccess(true);
      clearCart();
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }, 2000);
  };

  return (
    <div className="payment-page-wrapper">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            {!paymentSuccess ? (
              <Card className="payment-card">
                <Card.Body>
                  <Card.Title as="h2" className="text-center mb-4">Secure Payment</Card.Title>
                  <Form onSubmit={handlePayment}>
                    <div className="payment-methods mb-4">
                      <Form.Check
                        type="radio"
                        id="credit-card"
                        label={<><FaCreditCard className="me-2" /> Credit Card</>}
                        name="paymentMethod"
                        value="credit-card"
                        checked={paymentMethod === 'credit-card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <Form.Check
                        type="radio"
                        id="paypal"
                        label={<><FaPaypal className="me-2" /> PayPal</>}
                        name="paymentMethod"
                        value="paypal"
                        checked={paymentMethod === 'paypal'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <Form.Check
                        type="radio"
                        id="google-pay"
                        label={<><FaGoogle className="me-2" /> Google Pay</>}
                        name="paymentMethod"
                        value="google-pay"
                        checked={paymentMethod === 'google-pay'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                    </div>

                    {paymentMethod === 'credit-card' && (
                      <>
                        <Form.Group className="mb-3" controlId="cardNumber">
                          <Form.Label>Card Number</Form.Label>
                          <div className="input-group">
                            <Form.Control type="text" placeholder="**** **** **** ****" required />
                            <span className="input-group-text"><FaCreditCard /></span>
                          </div>
                        </Form.Group>
                        <Row>
                          <Col>
                            <Form.Group className="mb-3" controlId="expiryDate">
                              <Form.Label>Expiry Date</Form.Label>
                              <Form.Control type="text" placeholder="MM/YY" required />
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="mb-3" controlId="cvv">
                              <Form.Label>CVV</Form.Label>
                              <Form.Control type="text" placeholder="***" required />
                            </Form.Group>
                          </Col>
                        </Row>
                      </>
                    )}

                    <div className="d-grid mt-4">
                      <Button variant="primary" type="submit" disabled={paying} size="lg">
                        {paying ? (
                          <>
                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                            <span className="ms-2">Processing...</span>
                          </>
                        ) : (
                          'Pay Now'
                        )}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            ) : (
              <Alert variant="success" className="payment-success-alert">
                <Alert.Heading>Payment Successful!</Alert.Heading>
                <p>Thank you for your purchase. You will be redirected to the home page shortly.</p>
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PaymentPage;