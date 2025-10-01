import React, { useContext, useEffect, useState } from 'react';
import { Container, Table, Spinner, Alert } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

const OrdersPage = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://web-chat-service-631872245250.us-central1.run.app/orders');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        if (user) {
          const userOrders = data.filter(order => order.userId === user.email);
          setOrders(userOrders);
        }
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  return (
    <div className="orders-page" style={{ padding: '4rem 0' }}>
      <Container>
        <h2 className="mb-4">My Orders</h2>
        {orders.length > 0 ? (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.orderDate}</td>
                  <td>${order.totalAmount.toFixed(2)}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>You have no orders.</p>
        )}
      </Container>
    </div>
  );
};

export default OrdersPage;
